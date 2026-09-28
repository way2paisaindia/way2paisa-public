'use client';

import { useState } from 'react';

/*
 * This is deliberately an allow-list. Do not fall back to a website favicon:
 * favicons are usually a symbol only and look incorrect in a partner logo wall.
 */
const officialLogoUrls = {
  'DAMAC Properties': 'https://commons.wikimedia.org/wiki/Special:FilePath/Damac%20logo.svg',
  'Emaar Properties': 'https://www.emaar.com/images/emaar-logo.svg',
  'Shapoorji Pallonji': 'https://www.shapoorjipallonji.com/assets/vectors/icons/icon_splogo_blue.svg',
  'Prestige Group': 'https://d1t2fddy6amcvs.cloudfront.net/images/logo.svg',
  'Hiranandani Group': 'https://hiranandani.com/img/Hiranandani-logo.png',
  'Embassy Group': 'https://commons.wikimedia.org/wiki/Special:FilePath/Embassy%20New%20Logo.jpg?width=1280',
  'Mahindra Lifespaces': 'https://mldlprodstorage.blob.core.windows.net/live/2024/04/mahindra_logo_new_horizontal-1-scaled-new.webp',
  'Piramal Realty': 'https://www.piramalrealty.com/images/logo_colour.svg',
  'Raymond Realty': 'https://images.raymondrealty.in/raymond/1770872826510_logo-18-10-2025.png',
  'Rustomjee Group': 'https://www.rustomjee.com/_next/static/media/header-logo.0789e56b.svg',
  'Adani Group': 'https://www.adanirealty.com/-/media/project/realty/header/adani_realty.ashx',
  'L&T Realty': 'https://www.lntrealty.com/wp-content/themes/lntrealty/assets/images/brand-logo-desktop.webp',
  'Dosti Realty': 'https://admin.dostirealty.com/uploads/logo_d017b4ac56.png',
  'Sunteck Realty': 'https://www.sunteckindia.com/images/logo.svg',
  'Kolte Patil': 'https://www.koltepatil.com/assets/dist/images/logo.jpg',
  'DLF': 'https://www.dlf.in/images/logo-black.svg',
  'Chandak Group': 'https://www.chandakgroup.com/assets/images/Chandak-Group-Final-Logo.svg',
  'Sobha': 'https://en.wikipedia.org/wiki/Special:FilePath/Sobha_(company).svg',
  'Danube Properties': 'https://commons.wikimedia.org/wiki/Special:FilePath/Danube%20Properties.png?width=1280',
  'SAMANA Developers': '/samana-developers.svg',
  'Puravankara Builders': 'https://www.puravankara.com/uploads/purva_logo01_54d51bb6a0.png',
  'Bombay Realty': 'https://www.bombayrealty.in/images/br_logo_start.jpg',

  'HDFC Bank': 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
  'ICICI Bank': 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
  'Axis Bank': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg',
  'IDFC FIRST Bank': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_of_IDFC_First_Bank.svg',
  'RBL Bank': 'https://upload.wikimedia.org/wikipedia/commons/7/70/RBL_Bank_SVG_Logo.svg',
  'IndusInd Bank': 'https://upload.wikimedia.org/wikipedia/commons/4/40/IndusInd_Bank_SVG_Logo.svg',
  'Bank of Baroda': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Bank_of_Baroda_Logo_since_Dec_19.png',
  'YES BANK': 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Yes_Bank_Logo_2024.jpg',
};

export function hasBrandLogo(name) {
  return Boolean(officialLogoUrls[name]);
}

export function BrandLogo({ name, className = '' }) {
  const [failed, setFailed] = useState(false);
  const source = officialLogoUrls[name];

  if (!source || failed) return null;

  return (
    <div className={`brandLockup ${className}`.trim()} title={name}>
      <img
        src={source}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
