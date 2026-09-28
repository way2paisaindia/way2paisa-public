'use client';

import { useState } from 'react';

const brandDomains = {
  'Godrej Properties': 'godrejproperties.com',
  'Shapoorji Pallonji': 'shapoorjipallonji.com',
  'Prestige Group': 'prestigeconstructions.com',
  'Hiranandani Group': 'hirandanigroup.com',
  'Embassy Group': 'embassygroup.com',
  'Mahindra Lifespaces': 'mahindralifespaces.com',
  'Piramal Realty': 'piramalrealty.com',
  'Raymond Realty': 'raymondrealty.in',
  'Rustomjee Group': 'rustomjee.com',
  'Adani Group': 'adanirealty.com',
  'L&T Realty': 'lntrealty.com',
  'Runwal Group': 'runwal.com',
  'Oberoi Realty': 'oberoirealty.com',
  'Dosti Realty': 'dostirealty.com',
  'Lodha Group': 'lodhagroup.com',
  'Wadhwa Group': 'thewadhwagroup.com',
  'Kalpataru Group': 'kalpataru.com',
  'Sunteck Realty': 'sunteckindia.com',
  'Chandak Group': 'chandakgroup.com',
  'Kolte Patil': 'koltepatil.com',
  'Ajmera Realty': 'ajmera.com',
  'Birla Estates': 'birlaestates.com',
  'Sobha': 'sobha.com',
  'Puravankara Builders': 'puravankara.com',
  'Bombay Realty': 'bombayrealty.in',
  'SBI': 'sbi.co.in',
  'HDFC Bank': 'hdfcbank.com',
  'ICICI Bank': 'icicibank.com',
  'Axis Bank': 'axisbank.com',
  'Kotak Mahindra Bank': 'kotak.com',
  'IDFC FIRST Bank': 'idfcfirstbank.com',
  'RBL Bank': 'rblbank.com',
  'IndusInd Bank': 'indusind.com',
  'Bank of Baroda': 'bankofbaroda.in',
  'YES BANK': 'yesbank.in',
  'Standard Chartered': 'sc.com',
  'DBS Bank': 'dbs.com',
  'LIC Housing Finance': 'lichousing.com',
  'PNB Housing Finance': 'pnbhousing.com',
  'ICICI Home Finance': 'icicihfc.com',
  'Bajaj Finserv': 'bajajfinserv.in',
  'Tata Capital': 'tatacapital.com',
  'Aditya Birla Capital': 'adityabirlacapital.com',
  'Shriram Housing Finance': 'shriramhousing.in',
  'Ujjivan Small Finance Bank': 'ujjivansfb.in',
  'L&T Finance': 'ltfinance.com',
  'Piramal Finance': 'piramalfinance.com',
  'Aavas Financiers': 'aavas.in',
  'Home First Finance': 'homefirstindia.com',
  'Federal Bank': 'federalbank.co.in',
};


const officialLogoUrls = {
  'Shapoorji Pallonji': 'https://www.shapoorjipallonji.com/assets/vectors/icons/icon_splogo_blue.svg',
  'Prestige Group': 'https://d1t2fddy6amcvs.cloudfront.net/images/logo.svg',
  'Hiranandani Group': 'https://hiranandani.com/img/Hiranandani-logo.png',
  'Mahindra Lifespaces': 'https://mldlprodstorage.blob.core.windows.net/live/2024/04/mahindra_logo_new_horizontal-1-scaled-new.webp',
  'Piramal Realty': 'https://www.piramalrealty.com/images/logo_colour.svg',
  'Raymond Realty': 'https://images.raymondrealty.in/raymond/1770872826510_logo-18-10-2025.png',
  'Rustomjee Group': 'https://www.rustomjee.com/_next/static/media/header-logo.0789e56b.svg',
  'L&T Realty': 'https://www.lntrealty.com/wp-content/themes/lntrealty/assets/images/brand-logo-desktop.webp',
  'Dosti Realty': 'https://admin.dostirealty.com/uploads/logo_d017b4ac56.png',
  'Chandak Group': 'https://www.chandakgroup.com/assets/images/Chandak-Group-Final-Logo.svg',
  'Sobha': 'https://www.sobha.com/wp-content/uploads/2024/11/New-SOBHA-Logo-black.png',
  'Puravankara Builders': 'https://www.puravankara.com/_next/image?url=%2Fimages%2Flogo.png&w=384&q=75',
};

const normalise = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

function domainFor(name) {
  const key = Object.keys(brandDomains).find((item) => {
    const a = normalise(item).replace('group', '');
    const b = normalise(name).replace('group', '');
    return a === b || a.includes(b) || b.includes(a);
  });
  return key ? brandDomains[key] : null;
}

export function BrandLogo({ name, fallback, className = '' }) {
  const [failed, setFailed] = useState(false);
  const domain = domainFor(name);
  const source = officialLogoUrls[name] || fallback || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=256` : null);

  return (
    <div className={`brandLockup ${className}`.trim()} title={name}>
      {source && !failed && (
        <img
          src={source}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
