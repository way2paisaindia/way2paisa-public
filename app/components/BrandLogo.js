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
  const source = fallback || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=256` : null);

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
      <span>{name}</span>
    </div>
  );
}
