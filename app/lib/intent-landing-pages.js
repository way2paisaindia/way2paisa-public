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
    sections: [
      {
        title: 'Understand whether you are buying a plot or a completed villa',
        paragraphs: [
          'A plotted development and a ready or under-construction villa can look similar in online advertising while offering very different legal and commercial arrangements. For a plot, confirm the exact surveyed parcel, approved layout, usable area, access roads, common infrastructure and what construction is permitted. For a villa, establish what is included in the built residence, the delivery specification, construction stage and the actual obligations of the seller or developer.',
          'Be especially careful with schemes in which a plot is sold separately from a promised house-construction service. The land consideration and the building contract may have different milestones, taxes, warranties and refund terms. Ask whether the advertised villa price includes the plot, construction, utilities, landscaping and applicable charges. Never infer a completed house from an illustrative masterplan photograph.'
        ]
      },
      {
        title: 'Check title, zoning, access and development permissions',
        paragraphs: [
          'A location described as a residential plot, NA plot or second-home development should be checked against the actual land records and applicable local rules. Request the chain of title, survey boundaries, permitted land use, conversion or non-agricultural permissions where relevant, approved layout, infrastructure obligations and any restrictions on transfer or construction. The documents required can vary materially by location and project structure.',
          'Physical access is as important as a map pin. Verify public or legally secured road access, the status of proposed approach roads, electricity and water provision, sewage arrangements, drainage and seasonal site conditions. Environmental, coastal or other development controls may also apply in particular areas. An independent property lawyer and local technical professional should confirm these matters before a booking or final payment.'
        ]
      },
      {
        title: 'Compare Alibaug, Karjat, Khalapur and other MMR locations',
        paragraphs: [
          'The best location depends on how the property will be used. A family planning frequent weekend stays may prioritise predictable travel, year-round road access and nearby essential services. A buyer seeking a larger land holding may value privacy and plot configuration differently. An investor should assess actual demand and holding costs rather than assume that all second-home destinations behave like the same market.',
          'Consider the journey in heavy traffic and during the monsoon, not only an optimistic marketing travel estimate. Review plot gradients, drainage, flood exposure, boundary clarity and distance from practical facilities. When comparing published listings, use the same area units and determine whether a figure represents plot size, built-up villa area or a chargeable construction area.'
        ]
      },
      {
        title: 'Budget for acquisition, infrastructure and ongoing ownership',
        paragraphs: [
          'The advertised starting price may omit statutory duties, registration, clubhouse or maintenance contributions, utility deposits, development charges or construction costs. Villas may also need furniture, landscaping, security and regular upkeep; an undeveloped plot may incur expenses well before a home can be occupied. Request an itemised written schedule that separates one-time acquisition costs from future obligations.',
          'If a project offers a phased construction or payment plan, check how instalments relate to actual milestones and who is responsible if infrastructure is delayed. A potential rental income estimate should account for vacancies, cleaning, property management, repairs and local operating rules. Neither future appreciation nor holiday-letting revenue can be guaranteed from a brochure or a sales pitch.'
        ]
      },
      {
        title: 'Build a project-specific shortlist before booking',
        paragraphs: [
          'Use the selected published listings below as an initial comparison, not proof that a particular plot or villa is still bookable. Share whether you prefer titled residential land or a constructed villa, your expected use, budget, minimum size, preferred area and completion horizon. Then compare like with like: legal scope, title, plans, developer obligations, delivery stages and all-in cost.',
          'Way2Paisa can help coordinate current developer information and site visits while the buyer appoints independent legal and technical advisers for verification. Keep drawings, promises and quotations in writing. A credible second-home decision is based on what is approved, contracted and realistically maintainable, not just on the attractiveness of a render or the idea of owning land.'
        ]
      }
    ],
    faqs: [
      ['Are residential plots and villas interchangeable?', 'No. A plot gives rights in land subject to the legal and planning position. A villa purchase may also involve a completed or proposed structure, construction specifications and separate contractual responsibilities.'],
      ['Does an advertised NA plot automatically permit any villa design?', 'No. Non-agricultural status, zoning, layout approvals, building rules and other restrictions must be checked for the particular site. Obtain independent local advice before planning construction.'],
      ['Are the quoted project prices all-inclusive?', 'Not necessarily. Confirm the current plot or villa quotation, statutory charges, infrastructure contributions, maintenance, construction scope and taxes for the exact property.'],
      ['Can I rent out a second home for guaranteed income?', 'No. Revenue depends on actual demand, permitted use, management, costs and occupancy. Any projected rental yield should be independently stress-tested.'],
      ['Can Way2Paisa coordinate project visits and financing?', 'We can assist with suitable developer discussions, site-visit arrangements and finance introductions, subject to project documentation, lender policy and purchaser eligibility.']
    ]
  }
};
export const intentLandingSlugs = Object.keys(intentLandingPages);
