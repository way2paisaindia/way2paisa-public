// Route visitors from a published project to a genuinely relevant buyer guide.
// Do not attach a luxury, villa or investment label to unrelated properties.
// Inputs are a verified project record and its current active-inventory price.
export function getProjectIntentGuide(project, effectiveStartingPrice){
  if(!project || !project.slug)return null;
  const market=String(project.market||'');
  const category=String(project.category||'');
  if(market==='MMR'&&['plot','land','villa'].includes(category)){
    return {
      href:'/explore/villas-and-plots-mmr',
      eyebrow:'MMR VILLA & PLOT BUYER GUIDE',
      title:'Compare residential plots and villas across MMR',
      description:'Understand land title, construction scope and total cost before shortlisting a second home or residential plot.',
      action:'Explore villas & plot guidance'
    };
  }
  if(market==='Mumbai'&&category==='commercial_office'){
    return {
      href:'/solutions/mumbai-commercial-property',
      eyebrow:'MUMBAI COMMERCIAL PROPERTY GUIDE',
      title:'Compare commercial offices across Mumbai',
      description:'Review office-use requirements, possession, building services and all-inclusive purchase costs.',
      action:'Explore the office buyer guide'
    };
  }
  if(market==='Dubai'&&['apartment','villa'].includes(category)){
    return {
      href:'/solutions/dubai-property-investment',
      eyebrow:'DUBAI PROPERTY BUYER GUIDE',
      title:'Compare Dubai residences and investment considerations',
      description:'Compare AED pricing, payment plans, ownership costs and due-diligence questions before selecting a residence.',
      action:'Explore the Dubai property guide'
    };
  }
  const price=Number(effectiveStartingPrice);
  if(market==='Mumbai'&&category==='apartment'&&Number.isFinite(price)&&price>=5){
    return {
      href:'/solutions/mumbai-luxury-homes',
      eyebrow:'MUMBAI PREMIUM HOMES GUIDE',
      title:'Compare premium residential projects in Mumbai',
      description:'Consider neighbourhood, usable carpet area, construction status and total acquisition cost alongside the advertised price.',
      action:'Explore the luxury home guide'
    };
  }
  return null;
}
