'use client';

/*
 * This is deliberately an allow-list. Do not fall back to a website favicon:
 * favicons are usually a symbol only and look incorrect in a partner logo wall.
 */
const officialLogoUrls = {
  'Godrej Properties': '/brand-logos/godrej.png', 'Runwal Group': '/brand-logos/runwal.png',
  'Oberoi Realty': '/brand-logos/oberoi.jpg', 'Wadhwa Group': '/brand-logos/wadhwa.png',
  'Ajmera Realty': '/brand-logos/ajmera.png',
  'Lodha': '/brand-logos/lodha.svg', 'Lodha Group': '/brand-logos/lodha.svg',
  'Kalpataru': '/brand-logos/kalpataru.svg', 'Kalpataru Group': '/brand-logos/kalpataru.svg',
  'Shapoorji Pallonji Real Estate': '/brand-logos/shapoorji.svg', 'Shapoorji Pallonji': '/brand-logos/shapoorji.svg',
  'DAMAC Properties': '/brand-logos/damac.svg', 'Emaar Properties': '/brand-logos/emaar.svg', 'Prestige Group': '/brand-logos/prestige.svg',
  'Hiranandani Group': '/brand-logos/hiranandani.png', 'Mahindra Lifespaces': '/brand-logos/mahindra.webp', 'Piramal Realty': '/brand-logos/piramal.svg',
  'Embassy Group': '/brand-logos/embassy.jpg',
  'Raymond Realty': '/brand-logos/raymond.png', 'Rustomjee Group': '/brand-logos/rustomjee.svg', 'Adani Group': '/brand-logos/adani.svg',
  'L&T Realty': '/brand-logos/lnt.webp', 'Dosti Realty': '/brand-logos/dosti.png', 'Sunteck Realty': '/brand-logos/sunteck.svg',
  'Kolte Patil': '/brand-logos/kolte-patil.jpg', 'DLF': '/brand-logos/dlf.svg', 'Chandak Group': '/brand-logos/chandak.svg',
  'Sobha': '/brand-logos/sobha.svg', 'Danube Properties': '/brand-logos/danube.png', 'SAMANA Developers': '/brand-logos/samana.svg',
  'Puravankara Builders': '/brand-logos/puravankara.png', 'Bombay Realty': '/brand-logos/bombay-realty.jpg',
  'HDFC Bank': '/brand-logos/hdfc.svg', 'ICICI Bank': '/brand-logos/icici.svg', 'Axis Bank': '/brand-logos/axis.svg',
  'IDFC FIRST Bank': '/brand-logos/idfc.svg', 'RBL Bank': '/brand-logos/rbl.svg', 'IndusInd Bank': '/brand-logos/indusind.svg',
  'Bank of Baroda': '/brand-logos/bob.png', 'YES BANK': '/brand-logos/yes-bank.jpg',
};
export function hasBrandLogo(name, logoUrl) { return Boolean(officialLogoUrls[name] || logoUrl); }
export function BrandLogo({ name, logoUrl = '', className = '' }) {
  const source = officialLogoUrls[name] || logoUrl;
  if (!source) return null;
  return <div className={`brandLockup ${className}`.trim()} title={name} aria-label={`${name} logo`}><img className="brandLogoImage" src={source} alt={`${name} logo`} loading="eager" /></div>;
}
