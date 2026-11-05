// Step 4: intent-focused entry points, not generic locality/watchlist pages.
// Only the fully published catalogue is eligible to appear in any segment.
export const intentLandingPages = {
  'luxury-apartments-mumbai': {
    title: 'Luxury Apartments in Mumbai',
    metaTitle: 'Luxury Apartments in Mumbai from ₹5 Cr | Way2Paisa',
    description: 'Explore published Mumbai apartment developments with advertised starting prices from ₹5 Cr. Compare developers, configurations and project details, then enquire for current allocations.',
    eyebrow: 'MUMBAI · LUXURY RESIDENCES',
    intro: 'Explore premium Mumbai apartment developments with published starting prices of ₹5 Cr or above. Review each project\'s configurations and advertised price before requesting the latest developer-confirmed availability.',
    guidance: 'A practical starting point for buyers evaluating larger residences across Mumbai. Use the individual project page to check the exact configuration, floor area and possession information.',
    criteria: 'Mumbai apartments with published starting prices of ₹5 Cr or higher',
    browseHref: '/properties?market=Mumbai&category=apartment',
    browseLabel: 'Browse all Mumbai residences',
    match: project => project.market === 'Mumbai'
      && project.category === 'apartment'
      && Number(project.min_price) >= 5,
  },
  'commercial-offices-mumbai-mmr': {
    title: 'Commercial Offices in Mumbai & MMR',
    metaTitle: 'Commercial Office Projects in Mumbai & MMR | Way2Paisa',
    description: 'Compare fully published commercial office developments in Mumbai, Thane and Navi Mumbai. Explore locations, indicative prices, project details and enquiry options.',
    eyebrow: 'MUMBAI & MMR · COMMERCIAL',
    intro: 'Compare published commercial-office developments across Mumbai and the wider metropolitan region. These listings focus on office properties rather than residential apartments or retail claims.',
    guidance: 'For owner-occupiers and investors, confirm the offered unit area, building approvals, commercial terms, parking and handover directly before making a decision.',
    criteria: 'Published commercial-office projects in Mumbai and the wider MMR',
    browseHref: '/properties?market=Mumbai&category=commercial_office',
    browseLabel: 'Explore the commercial catalogue',
    match: project => ['Mumbai', 'MMR'].includes(project.market)
      && project.category === 'commercial_office',
  },
  'villas-and-plots-mmr': {
    title: 'Villas & Residential Plots in MMR',
    metaTitle: 'Villas & Plots in Alibaug, Karjat & MMR | Way2Paisa',
    description: 'Explore published villa and land-plot developments around Alibaug, Karjat, Khalapur and the Mumbai Metropolitan Region. Review project-specific pricing and locations.',
    eyebrow: 'MMR · VILLAS & PLOTS',
    intro: 'Discover published villas and plotted developments across the wider Mumbai Metropolitan Region. Compare distinct property types and locations rather than treating plots and built residences as equivalent.',
    guidance: 'Land purchases and villas require different checks. Verify title, permitted land use, approvals, construction scope and site boundaries independently before booking.',
    criteria: 'Published villa and plot/land projects in the MMR catalogue',
    browseHref: '/properties?market=Mumbai&category=plot',
    browseLabel: 'Explore more MMR properties',
    match: project => project.market === 'MMR'
      && ['villa', 'plot', 'land'].includes(project.category),
  },
  'dubai-residential-projects': {
    title: 'New Residential Projects in Dubai',
    metaTitle: 'Dubai Apartments & Villas for Sale | Way2Paisa',
    description: 'Explore published Dubai apartment and villa projects, advertised AED starting prices and bedroom configurations. Request current developer-confirmed availability.',
    eyebrow: 'DUBAI · RESIDENTIAL',
    intro: 'Discover published apartments and villa developments across Dubai, with advertised prices shown in AED. Compare developers and configurations while keeping Dubai units and Indian RERA carpet areas distinct.',
    guidance: 'Dubai prices, area definitions, service charges, payment plans and residency terms vary by project. Confirm current terms with the developer before deciding.',
    criteria: 'Published apartment and villa projects in the Dubai catalogue',
    browseHref: '/properties?market=Dubai',
    browseLabel: 'Browse all Dubai properties',
    match: project => project.market === 'Dubai'
      && ['apartment', 'villa'].includes(project.category),
  },
};
export const intentLandingSlugs = Object.keys(intentLandingPages);
