# Mumbai/MMR publication gate — read-only SQL checks

Date: 2026-11-12

Run against Way2Paisa Supabase PostgreSQL from an authorized SQL editor. Every statement is SELECT-only. These checks are diagnostic; they do not replace legal, unit availability, photo licensing or live browser verification.

## 1. Market snapshot
```sql
SELECT market, count(*) AS active_projects
FROM public.projects
WHERE active = true AND market IN ('Mumbai','MMR')
GROUP BY market ORDER BY market;
```

## 2. Exact duplicate registration strings among published projects
```sql
SELECT lower(btrim(rera_number)) AS normalized_registration, count(*) AS published_count,
       string_agg(name || ' [' || slug || ']', '; ' ORDER BY name) AS published_projects
FROM public.projects
WHERE active = true AND market IN ('Mumbai','MMR') AND nullif(btrim(rera_number),'') IS NOT NULL
GROUP BY lower(btrim(rera_number))
HAVING count(*) > 1
ORDER BY published_count DESC;
```
**Important:** a multi-registration project string can be ordered differently, and a tower may share registrations with a larger phase. Manually reconcile any potential collisions before treating them as duplicates.

## 3. Missing foundational information
```sql
SELECT p.name, p.slug, p.market,
       (nullif(btrim(p.rera_number),'') IS NULL) AS missing_registration,
       (p.min_price IS NULL) AS missing_project_start_price,
       (NOT EXISTS (SELECT 1 FROM public.inventory i WHERE i.project_id=p.id AND i.active=true)) AS no_active_inventory,
       (NOT EXISTS (SELECT 1 FROM public.project_sources s WHERE s.project_id=p.id)) AS no_source_records
FROM public.projects p
WHERE p.active=true AND p.market IN ('Mumbai','MMR')
AND (nullif(btrim(p.rera_number),'') IS NULL OR p.min_price IS NULL
     OR NOT EXISTS (SELECT 1 FROM public.inventory i WHERE i.project_id=p.id AND i.active=true)
     OR NOT EXISTS (SELECT 1 FROM public.project_sources s WHERE s.project_id=p.id));
```

## 4. Unsuitable active inventory rows
```sql
SELECT p.name,p.slug,p.market,i.configuration,i.price,i.availability,i.last_verified
FROM public.projects p JOIN public.inventory i ON i.project_id=p.id
WHERE p.active=true AND p.market IN ('Mumbai','MMR') AND i.active=true
AND (i.price IS NULL OR i.price<=0 OR nullif(btrim(i.configuration),'') IS NULL)
ORDER BY p.market,p.name;
```

## 5. No hero and no active image
```sql
SELECT p.name,p.slug,p.market,p.category,p.rera_number
FROM public.projects p
WHERE p.active=true AND p.market IN ('Mumbai','MMR')
  AND nullif(btrim(p.hero_image_url),'') IS NULL
  AND NOT EXISTS (SELECT 1 FROM public.project_media pm WHERE pm.project_id=p.id AND pm.active=true AND pm.media_type='image')
ORDER BY p.market,p.name;
```

## Observed results on 12 November 2026
- 366 Mumbai + 119 MMR = **485** active records.
- Exact duplicate normalized registration strings across published Mumbai/MMR records: **0**.
- Active projects without a RERA field: **0**; without project starting price: **0**.
- Active projects with zero active inventory rows: **0**; without project_sources rows: **0**.
- Active inventory rows with missing/non-positive price or blank configuration: **0**.
- Published Mumbai/MMR projects without hero and without an active image row: **12** (five Mumbai, seven MMR). See `audits/mumbai-mmr-catalogue-quality-2026-11-12.md`.

**Caution:** Zero errors in these checks only means the checked fields are populated and basic duplicate patterns are absent. It does not certify freshness, accuracy, appropriate photo rights, or permission to promote a developer's inventory.

No status, price, inventory or media rows were changed. No new projects were published during this pass.
