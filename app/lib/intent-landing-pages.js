// Buyer-intent landing segment not covered by existing /solutions/ guides.
// Other Step 4 intents use /solutions/ to avoid duplicate-indexed pages.
export const intentLandingPages = {
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
  }
};
export const intentLandingSlugs = Object.keys(intentLandingPages);
