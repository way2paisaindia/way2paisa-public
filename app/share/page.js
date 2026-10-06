import ShareHomeRedirect from '../components/ShareHomeRedirect';

export const metadata={
 title:'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',
 description:'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',
 alternates:{canonical:'/share'},
 openGraph:{title:'Way2Paisa FinPro Services',description:'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',url:'/share',siteName:'Way2Paisa FinPro Services',type:'website',images:[{url:'/opengraph-image',width:1200,height:630,alt:'Way2Paisa FinPro Services'}]},
 twitter:{card:'summary_large_image',title:'Way2Paisa FinPro Services | Premium Real Estate & Finance Advisory',description:'Curated residences and professional finance advisory across Mumbai, MMR and Dubai.',images:['/opengraph-image']}
};

export default function SharePage(){return <ShareHomeRedirect/>}
