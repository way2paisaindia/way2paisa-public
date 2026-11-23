// Only link to an exact official MahaRERA project record when the listing
// names ONE registration. A single official URL cannot represent every wing
// when a consolidated page shows multiple phase registrations.
export function officialMahaReraSource(url, registration) {
  const reg=String(registration||'').trim();
  if(!/^P(?:R|M|C)?\d{10,14}$/i.test(reg))return null;
  if(typeof url!=='string'||!url.trim())return null;
  try {
    const parsed=new URL(url);
    if(parsed.protocol!=='https:')return null;
    if(!['maharerait.maharashtra.gov.in','maharera.maharashtra.gov.in'].includes(parsed.hostname.toLowerCase()))return null;
    if(!/^\/(?:public\/)?project\/view\/\d+\/?$/.test(parsed.pathname))return null;
    if(parsed.username||parsed.password||parsed.search||parsed.hash||parsed.port)return null;
    return parsed.href;
  }catch{return null;}
}
