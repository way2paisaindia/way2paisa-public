// Way2Paisa public-image availability controls. These are confirmed missing
// source URLs (HTTP 404), NOT a statement about marketing usage rights.
// Leave database originals intact and allow future project-specific verified
// replacement image URLs without a code change.
const confirmedMissingProjectImageURLs = new Set([
  "https://72parksyde.com/images/gallery/ele/1.webp", // 72-parksyde-ghatkopar-east
  "https://bhakti-pride.chemburproject.site/assets/images/banner/6a85f15d92e30.webp", // bhakti-pride-chembur
  "https://jaydeepgroup.in/images/project/ongoing/Elora/Ellora.webp", // gami-and-jaydeep-elora
  "https://godrejkhargharofficial.com/images/gallery/gallery-1.webp", // godrej-varanya-godrej-properties-kharghar-navi-mumbai
  "https://kaustubhgroup.com/projects/assets/projects/breeze-91/gallery1.webp", // kaustubh-breeze-91-borivali-west
  "https://www.roswalt.com/backend/uploads/raya-1.jpg", // roswalt-raya-roswalt-realty-chembur
  "https://www.paradise-projects.com/sai-world-one/img/ft2-PC.webp", // sai-world-one-paradise-group-nerul-navi-mumbai
  "https://theodyssey.shapoorjirealestate.com/images/gallery/1.webp", // the-odyssey-shapoorji-pallonji-marine-drive
  "https://www.vicl.co/assets/front/images/vardhaman-aarambh.png", // vardhaman-aarambh
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-ananda-lobby.jpg", // vardhaman-ananda-ghatkopar-east
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-palace1.jpg", // vardhaman-palace
  "https://bhakti-pride.chemburproject.site/assets/images/gallery/g1.jpg", // gallery: bhakti-pride-chembur
  "https://bhakti-pride.chemburproject.site/assets/images/gallery/g2.jpg", // gallery: bhakti-pride-chembur
  "https://bhakti-pride.chemburproject.site/assets/images/gallery/g3.jpg", // gallery: bhakti-pride-chembur
  "https://72parksyde.com/images/gallery/inte/1.webp", // gallery: 72-parksyde-ghatkopar-east
  "https://72parksyde.com/images/gallery/inte/3.webp", // gallery: 72-parksyde-ghatkopar-east
  "https://72parksyde.com/images/gallery/inte/2.webp", // gallery: 72-parksyde-ghatkopar-east
  "https://godrejkhargharofficial.com/images/gallery/gallery-3.webp", // gallery: godrej-varanya-godrej-properties-kharghar-navi-mumbai
  "https://godrejkhargharofficial.com/images/gallery/gallery-2.webp", // gallery: godrej-varanya-godrej-properties-kharghar-navi-mumbai
  "https://godrejkhargharofficial.com/images/gallery/gallery-4.webp", // gallery: godrej-varanya-godrej-properties-kharghar-navi-mumbai
  "https://kaustubhgroup.com/projects/assets/projects/breeze-91/gallery4.webp", // gallery: kaustubh-breeze-91-borivali-west
  "https://kaustubhgroup.com/projects/assets/projects/breeze-91/gallery3.webp", // gallery: kaustubh-breeze-91-borivali-west
  "https://kaustubhgroup.com/projects/assets/projects/breeze-91/gallery2.webp", // gallery: kaustubh-breeze-91-borivali-west
  "https://theodyssey.shapoorjirealestate.com/images/gallery/1.webp", // gallery: the-odyssey-shapoorji-pallonji-marine-drive
  "https://theodyssey.shapoorjirealestate.com/images/gallery/2.webp", // gallery: the-odyssey-shapoorji-pallonji-marine-drive
  "https://www.roswalt.com/backend/uploads/raya-3.jpg", // gallery: roswalt-raya-roswalt-realty-chembur
  "https://www.roswalt.com/backend/uploads/raya-1.jpg", // gallery: roswalt-raya-roswalt-realty-chembur
  "https://theodyssey.shapoorjirealestate.com/images/gallery/4.webp", // gallery: the-odyssey-shapoorji-pallonji-marine-drive
  "https://www.vicl.co/assets/front/img/portfolio/aarambh-elevation.png", // gallery: vardhaman-aarambh
  "https://www.vicl.co/assets/front/img/portfolio/aarambh-gym.png", // gallery: vardhaman-aarambh
  "https://www.roswalt.com/backend/uploads/raya-2.jpg", // gallery: roswalt-raya-roswalt-realty-chembur
  "https://www.vicl.co/assets/front/img/portfolio/aarambh-space.png", // gallery: vardhaman-aarambh
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-ananda.jpg", // gallery: vardhaman-ananda-ghatkopar-east
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-ananda-high.jpg", // gallery: vardhaman-ananda-ghatkopar-east
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-ananda-high2.jpg", // gallery: vardhaman-ananda-ghatkopar-east
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-palace-rooftop.png", // gallery: vardhaman-palace
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-palace-shops.png", // gallery: vardhaman-palace
  "https://www.vicl.co/assets/front/img/portfolio/vardhaman-palace-office.png", // gallery: vardhaman-palace
  "https://theodyssey.shapoorjirealestate.com/images/gallery/5.webp", // gallery: the-odyssey-shapoorji-pallonji-marine-drive
  "https://www.paradise-projects.com/sai-world-one/img/ft2-PC.webp", // gallery: sai-world-one-paradise-group-nerul-navi-mumbai
  "https://binghattiweb.imgix.net/ps-new-binghatti-moonlight-two-bedrooms.webp", // gallery: binghatti-moonlight-al-jaddaf
  "https://binghattiweb.imgix.net/ps-new-binghatti-pinnacle-three-bedrooms.webp", // gallery: binghatti-pinnacle-al-jaddaf
  "https://binghattiweb.imgix.net/ps-new-dusk-by-binghatti-studio.webp", // gallery: binghatti-dusk-jvc
  "https://www.godrejproperties.com/backoffice/data_content/projects/godrej_avenue_eleven_mumbai/landing_page/assets/img/gallery/2.jpg", // gallery: avenue-eleven-godrej-properties-mahalaxmi
  "https://speed.damacproperties.com/sites/default/files/2023-05/496370940-5.jpg", // gallery: damac-canal-crown-business-bay
  "https://speed.damacproperties.com/sites/default/files/2023-05/496370958-6.jpg", // gallery: damac-canal-crown-business-bay
  "https://danubeproperties.com/wp-content/uploads/2026/03/4.jpg", // gallery: greenz-by-danube
  "https://danubeproperties.com/wp-content/uploads/2026/03/3.jpg", // gallery: greenz-by-danube
  "https://danubeproperties.com/wp-content/uploads/2026/03/Greenz_livingroom.jpg", // gallery: greenz-by-danube
  "https://ajmera-arham.in/public/admin/images/image1710580385.jpg", // gallery: ajmera-arham
  "https://narangprivado-thane.com/public/admin/images/Narang-Privado-Amenities-Clubhouse-20072026235939.jpg", // gallery: narang-privado-tower-b-thane
  "https://www.ashwinshethgroup.com/wp-content/uploads/2022/06/Cnergy2.jpg", // gallery: sheth-cnergy-phase-1-thane-west
  "https://www.ashwinshethgroup.com/wp-content/uploads/2022/06/Cnergy3.jpg", // gallery: sheth-cnergy-phase-1-thane-west
  "https://www.ashwinshethgroup.com/wp-content/uploads/2022/06/Cnergy5.jpg", // gallery: sheth-cnergy-phase-1-thane-west
  "https://www.ashwinshethgroup.com/wp-content/uploads/2022/06/Cnergy4.jpg", // gallery: sheth-cnergy-phase-1-thane-west
  "https://www.jaydeepgroup.in/images/project/ongoing/estella/cam_1_chembur%20entrance%20lobby_01.webp", // gallery: gami-and-jaydeep-estella
  "https://www.jaydeepgroup.in/images/project/ongoing/estella/cam_2_chembur%20entrance%20lobby_01.webp", // gallery: gami-and-jaydeep-estella
  "https://www.jaydeepgroup.in/images/project/ongoing/estella/cam_1_gym%20area_01.webp", // gallery: gami-and-jaydeep-estella
  "https://www.rivaliparksborivalieast.com/assets/img/gallery/1.webp", // gallery: moonrise-at-rivali-park-borivali-east
  "https://www.rivaliparksborivalieast.com/assets/img/gallery/2.webp", // gallery: moonrise-at-rivali-park-borivali-east
  "https://www.rivaliparksborivalieast.com/assets/img/gallery/3.webp", // gallery: moonrise-at-rivali-park-borivali-east
  "https://www.rivaliparksborivalieast.com/assets/img/gallery/4.webp", // gallery: moonrise-at-rivali-park-borivali-east
  "https://www.shapoorjipallonji-bkc9.com/assets/img/amenities/swimmingpool.webp", // gallery: shapoorji-bkc-9-bandra-east
  "https://www.shapoorjipallonji-bkc9.com/assets/img/amenities/loungearea.webp", // gallery: shapoorji-bkc-9-bandra-east
  "https://www.romellgroup.com/romellorbis/img/gallery/gym-view.jpg", // gallery: romell-orbis-andheri-east
  "https://www.romellgroup.com/romellorbis/img/gallery/interior-view-childrens-bedroom.jpg", // gallery: romell-orbis-andheri-east
  "https://www.romellgroup.com/romellorbis/img/gallery/interior-view-bedroom-1.jpg", // gallery: romell-orbis-andheri-east
  "https://www.skylightadvisors.co/assets/osc-gallery-8-C6KKSnE7.jpg", // gallery: oberoi-sky-city-borivali-east
  // Confirmed 4 Nov 2026: HTTP 200 responses containing HTML, not an image.
  "https://www.runwalgardenvista.com/assets/img/deskban2.webp", // garden-vista-runwal-enterprises-kanjurmarg-east
  "https://www.runwalgardenvista.com/assets/img/deskban1.webp", // garden-vista-runwal-enterprises-kanjurmarg-east
  "https://www.runwalgardenvista.com/assets/img/amenities/amphitheatre.webp", // garden-vista-runwal-enterprises-kanjurmarg-east
  "https://www.runwalgardenvista.com/assets/img/amenities/swimmingpool.webp", // garden-vista-runwal-enterprises-kanjurmarg-east
  "https://centrio-nx.com/images/slider/w1.webp", // mj-shah-centrio-nx-phase-1
  "https://centrio-nx.com/images/gallery/ame/1.jpg", // mj-shah-centrio-nx-phase-1
  "https://centrio-nx.com/images/gallery/interior/1.jpg", // mj-shah-centrio-nx-phase-1
  "https://centrio-nx.com/images/overview.jpg", // mj-shah-centrio-nx-phase-1
  "https://vastushilp-borivali.in/public/admin/images/1730285050.jpg", // vastu-shilp-uvk-develpers-borivali-east
  "https://vastushilp-borivali.in/public/admin/images/image1730284329.jpg", // vastu-shilp-uvk-develpers-borivali-east
  "https://vastushilp-borivali.in/public/admin/images/gallery1730284818.jpg", // vastu-shilp-uvk-develpers-borivali-east
  "https://vastushilp-borivali.in/public/admin/images/gallery1730284832.jpg", // vastu-shilp-uvk-develpers-borivali-east
  // Rechecked 4 Nov 2026: these image addresses return HTML documents, not image bytes.
  "https://aayushgroup.com/aayush-aurum/images/gallery/01.jpg", // aayush-aurum
  "https://aayushgroup.com/aayush-aurum/images/gallery/02.jpg", // aayush-aurum
  "https://aayushgroup.com/aayush-aurum/images/gallery/03.jpg", // aayush-aurum
  "https://edmont.ashwinshethgroup.com/img/highlights/Pagoda.webp", // edmont-aurelia-kandivali-west
  "https://architizer-prod.imgix.net/media/mediadata/uploads/1769584613592SCDA_C33-0.jpg?auto=format%2Ccompress&cs=strip&q=60&w=1680", // Meraas Jumeirah Residences Emirates Towers: HTTP 410 disabled_source

]);

export function isKnownUnavailableProjectImage(url){
  const src=String(url||'');
  return confirmedMissingProjectImageURLs.has(src)
    || /^https:\/\/uae-cms\.emaar\.com\/uploads\//i.test(src)
    || (/^https:\/\/www\.emaar\.com\/_next\/image\?/i.test(src) && /uae-cms\.emaar\.com/i.test(src))
    || /^https:\/\/newwayint\.com\/image\/cache\/catalog\/projects-chini\/serro-emaar\/serro-emaar-02-750x563\.webp(?:\?.*)?$/i.test(src)
    || /^https:\/\/gplwebsitecdnblob\.blob\.core\.windows\.net\/godrej-cdn\/Images\/Godrej-Bliss-Mumbai-Gallery0[1-4]-1332X750/i.test(src);
}

// Some image CDNs deny requests made by social-image crawlers even when
// visitors may be able to see the project photograph in their browser.
// Exclude these exact URLs from social-preview metadata only, never from
// on-page project photography. Verified HTTP 403 using browser, Facebook,
// Twitter and Google image-crawler user agents on 4 Nov 2026.
const knownUnavailableSocialPreviewURLs = new Set([
  'https://meraas.com/sites/default/files/2025-11/3%20-%201920x1080_0.jpg',
  'https://meraas.com/sites/default/files/2026-08/768x432_6.jpg',
  'https://meraas.com/sites/default/files/2025-12/Banner_8.jpg',
]);

export function isKnownUnavailableSocialPreview(url) {
  return isKnownUnavailableProjectImage(url)
    || knownUnavailableSocialPreviewURLs.has(String(url || ''));
}
