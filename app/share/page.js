import ShareHomeRedirect from '../components/ShareHomeRedirect';

export const metadata={
 metadataBase:new URL('https://www.way2paisa.in'),
 title:'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',
 description:'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',
 alternates:{canonical:'/share'},
 openGraph:{title:'Way2Paisa FinPro Services',description:'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',url:'https://www.way2paisa.in/share',siteName:'Way2Paisa FinPro Services',type:'website',images:[{url:'https://www.way2paisa.in/opengraph-image',width:1200,height:630,alt:'Way2Paisa FinPro Services — Premium Real Estate & Finance Advisory'}]},
 twitter:{card:'summary_large_image',title:'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',description:'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',images:['https://www.way2paisa.in/opengraph-image']}
};

export default function SharePage(){return <ShareHomeRedirect/>}
