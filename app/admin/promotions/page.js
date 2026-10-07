'use client';
import {useEffect,useMemo,useState} from 'react';
import {createClient} from '@supabase/supabase-js';

const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const platforms=['Instagram','Instagram Reel','Facebook','LinkedIn','X','YouTube','Google Business','Website'];
const defaultChannelState={Instagram:'Checking connection…','Instagram Reel':'Checking connection…',Facebook:'Checking connection…',LinkedIn:'Connect account',X:'Connect account',YouTube:'Connect account','Google Business':'Connect account',Website:'Ready for video links'};

export default function PromotionStudio(){
 const [mediaKind,setMediaKind]=useState('image'),[videoUrl,setVideoUrl]=useState(''),[videoPath,setVideoPath]=useState(''),[ready,setReady]=useState(false),[allowed,setAllowed]=useState(false),[projects,setProjects]=useState([]),[galleryProjects,setGalleryProjects]=useState([]),[history,setHistory]=useState([]),[projectId,setProjectId]=useState(''),[galleryProjectId,setGalleryProjectId]=useState(''),[caption,setCaption]=useState(''),[headline,setHeadline]=useState(''),[brief,setBrief]=useState(''),[selected,setSelected]=useState(['Instagram']),[saving,setSaving]=useState(false),[publishing,setPublishing]=useState(false),[uploading,setUploading]=useState(false),[notice,setNotice]=useState(''),[promotionId,setPromotionId]=useState(''),[creativeUrl,setCreativeUrl]=useState(''),[customCreativeUrl,setCustomCreativeUrl]=useState(''),[customCreativePath,setCustomCreativePath]=useState(''),[postUrl,setPostUrl]=useState(''),[channelState,setChannelState]=useState(defaultChannelState),[loginEmail,setLoginEmail]=useState(''),[loginPassword,setLoginPassword]=useState(''),[signingIn,setSigningIn]=useState(false),[loginError,setLoginError]=useState(''),[galleryUrl,setGalleryUrl]=useState(''),[galleryTitle,setGalleryTitle]=useState(''),[galleryVideos,setGalleryVideos]=useState([]),[addingGalleryVideo,setAddingGalleryVideo]=useState(false),[galleryNotice,setGalleryNotice]=useState('');

 useEffect(()=>{(async()=>{const {data:{user}}=await db.auth.getUser();if(!user){setReady(true);return}const {data:profile}=await db.from('admin_profiles').select('id').eq('id',user.id).eq('active',true).maybeSingle();if(!profile){setReady(true);return}setAllowed(true);const [{data:p},{data:h}]=await Promise.all([db.from('projects').select('id,name,slug,price_original,bhk_original,possession_original,rera_number,market,hero_image_url,locations(name)').eq('active',true).eq('verified',true).order('name'),db.from('project_promotions').select('id,caption,platforms,status,created_at,platform_post_urls,creative_image_url,projects(name)').order('created_at',{ascending:false}).limit(30)]);setGalleryProjects(p||[]);setProjects((p||[]).filter(item=>{const price=(item.price_original||'').trim().toLowerCase();return Boolean(item.name&&item.hero_image_url&&price&&price!=='price on request')}));setHistory(h||[]);setReady(true)})()},[]);
 useEffect(()=>{if(!allowed)return;(async()=>{const {data:{session}}=await db.auth.getSession();const response=await fetch('/api/admin/promotions/connections',{headers:{Authorization:'Bearer '+(session?.access_token||'')}});const result=await response.json().catch(()=>({}));if(!response.ok||!result.connections)return;setChannelState(current=>Object.fromEntries(platforms.map(name=>[
  name,
  name==='Website'
   ?'Ready for video links'
   :(result.connections[name]
    ?'Connected'
    :(current[name]==='Checking connection…'?'Connect account':current[name]))
 ])));})()},[allowed]);

 const project=useMemo(()=>projects.find(x=>x.id===projectId),[projects,projectId]);
 const galleryProject=useMemo(()=>galleryProjects.find(x=>x.id===galleryProjectId),[galleryProjects,galleryProjectId]);
 const standardCreativeUrl=project?'/api/admin/promotion-creative?project='+encodeURIComponent(project.id)+'&v='+(promotionId||Date.now()):'';
 function resetCreative(){setPromotionId('');setCreativeUrl('');setCustomCreativeUrl('');setCustomCreativePath('');setVideoUrl('');setVideoPath('');setMediaKind('image');setPostUrl('')}
 function removeAutomaticCreative(){setCreativeUrl('');setPostUrl('');setNotice('Automatic Way2Paisa creative removed. Upload your own approved image or MP4 video to continue.')}
 function createDraft(chosenProject=project){
  if(!chosenProject)return;
  const lines=[chosenProject.name,chosenProject.locations?.name||chosenProject.market,chosenProject.bhk_original,chosenProject.price_original||'Price on Request',chosenProject.possession_original&&chosenProject.possession_original.replace('|',' · '),chosenProject.rera_number&&'MahaRERA: '+chosenProject.rera_number].filter(Boolean);
  setHeadline(chosenProject.name+' | '+(chosenProject.locations?.name||chosenProject.market||''));
  setCaption('Discover '+lines.join(' · ')+'. Connect with Way2Paisa for verified details and a personalised site visit.');
  setBrief('Use only verified listing facts and approved project media. Keep every commercial claim factual.');
  resetCreative();
  setCreativeUrl('/api/admin/promotion-creative?project='+encodeURIComponent(chosenProject.id)+'&v='+Date.now());
  setNotice('Project details loaded. Edit the caption or notes, upload your own creative if preferred, then publish when ready.');
 }
 async function save(status='draft'){
  if(!project||!caption.trim()){setNotice('Choose a project and generate or enter the caption first.');return null}
  setSaving(true);setNotice('');
  const {data:{user}}=await db.auth.getUser();
  const row={project_id:project.id,caption,headline,creative_brief:brief,platforms:selected,status,creative_image_url:customCreativeUrl||null,creative_storage_path:customCreativePath||null,creative_video_url:videoUrl||null,creative_video_storage_path:videoPath||null,approved_by:status==='approved'?user?.id:null,approved_at:status==='approved'?new Date().toISOString():null};
  const {data,error}=await db.from('project_promotions').insert(row).select('id,caption,platforms,status,created_at,platform_post_urls,creative_image_url,projects(name)').single();
  setSaving(false);
  if(error){setNotice(error.message);return null}
  setHistory(x=>[data,...x]);setPromotionId(data.id);setCreativeUrl(customCreativeUrl||('/api/admin/promotion-creative?project='+encodeURIComponent(project.id)+'&v='+encodeURIComponent(data.id)));setNotice('Draft saved. Review the editable caption and selected creative before publishing.');return data;
 }
 async function useStandardCreative(){
  if(!project){setNotice('Choose a verified project first.');return}
  let id=promotionId;
  if(!id){const saved=await save('draft');if(!saved)return;id=saved.id}
  if(customCreativePath){await db.storage.from('promotion-creatives').remove([customCreativePath])}
  const {error}=await db.from('project_promotions').update({creative_image_url:null,creative_storage_path:null}).eq('id',id);
  if(error){setNotice(error.message);return}
  setCustomCreativeUrl('');setCustomCreativePath('');setCreativeUrl('/api/admin/promotion-creative?project='+encodeURIComponent(project.id)+'&v='+encodeURIComponent(id));setPostUrl('');setNotice('Way2Paisa template selected. You can still upload a different approved creative.');
 }
 async function uploadVideo(event){
  const file=event.target.files?.[0];event.target.value='';
  if(!file)return;
  if(file.type!=='video/mp4'||file.size>104857600){setNotice('Upload an MP4 video up to 100 MB.');return}
  let id=promotionId;if(!id){const saved=await save('draft');if(!saved)return;id=saved.id}
  setUploading(true);setNotice('');const {data:{user}}=await db.auth.getUser();
  const path='admin/'+user.id+'/'+id+'/'+Date.now()+'.mp4';
  const {error:uploadError}=await db.storage.from('promotion-videos').upload(path,file,{cacheControl:'3600',contentType:'video/mp4',upsert:false});
  if(uploadError){setUploading(false);setNotice(uploadError.message);return}
  const {data:urlData}=db.storage.from('promotion-videos').getPublicUrl(path);const url=urlData.publicUrl;
  const {error:updateError}=await db.from('project_promotions').update({creative_video_url:url,creative_video_storage_path:path}).eq('id',id);
  if(updateError){await db.storage.from('promotion-videos').remove([path]);setUploading(false);setNotice(updateError.message);return}
  if(videoPath)await db.storage.from('promotion-videos').remove([videoPath]);
  setUploading(false);setPromotionId(id);setVideoUrl(url);setVideoPath(path);setMediaKind('video');setCreativeUrl('');setPostUrl('');setSelected(x=>x.includes('Instagram Reel')?x:[...x,'Instagram Reel']);setNotice('Project video uploaded. It will publish as an Instagram Reel when approved.');
 }
 async function removeVideo(){
  if(!promotionId||!videoUrl){setNotice('There is no uploaded video to remove.');return}
  const {error}=await db.from('project_promotions').update({creative_video_url:null,creative_video_storage_path:null}).eq('id',promotionId);if(error){setNotice(error.message);return}
  if(videoPath)await db.storage.from('promotion-videos').remove([videoPath]);setVideoUrl('');setVideoPath('');setMediaKind('image');setNotice('Uploaded video removed. You can use an image instead.');
 }
 async function uploadCreative(event){
  const file=event.target.files?.[0];event.target.value='';
  if(!file)return;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>8388608){setNotice('Upload a JPG, PNG or WebP image up to 8 MB.');return}
  let id=promotionId;
  if(!id){const saved=await save('draft');if(!saved)return;id=saved.id}
  setUploading(true);setNotice('');
  const {data:{user}}=await db.auth.getUser();
  const extension=(file.name.split('.').pop()||'jpg').toLowerCase();
  const path='admin/'+user.id+'/'+id+'/'+Date.now()+'.'+extension;
  const {error:uploadError}=await db.storage.from('promotion-creatives').upload(path,file,{cacheControl:'3600',contentType:file.type,upsert:false});
  if(uploadError){setUploading(false);setNotice(uploadError.message);return}
  const {data:urlData}=db.storage.from('promotion-creatives').getPublicUrl(path);
  const url=urlData.publicUrl;
  const {error:updateError}=await db.from('project_promotions').update({creative_image_url:url,creative_storage_path:path}).eq('id',id);
  if(updateError){await db.storage.from('promotion-creatives').remove([path]);setUploading(false);setNotice(updateError.message);return}
  if(customCreativePath)await db.storage.from('promotion-creatives').remove([customCreativePath]);
  setUploading(false);setPromotionId(id);setCustomCreativeUrl(url);setCustomCreativePath(path);setCreativeUrl(url);setPostUrl('');setHistory(x=>x.map(item=>item.id===id?{...item,creative_image_url:url}:item));setNotice('Your uploaded creative is ready. Review it, then publish to Instagram.');
 }
 async function removeUploadedCreative(){
  if(!promotionId||!customCreativeUrl){setNotice('There is no uploaded creative to remove.');return}
  const {error}=await db.from('project_promotions').update({creative_image_url:null,creative_storage_path:null}).eq('id',promotionId);
  if(error){setNotice(error.message);return}
  if(customCreativePath)await db.storage.from('promotion-creatives').remove([customCreativePath]);
  setCustomCreativeUrl('');setCustomCreativePath('');setCreativeUrl(standardCreativeUrl);setNotice('Uploaded creative removed. The Way2Paisa template is available again.');
 }
 async function loadGalleryVideos(id=galleryProjectId){
  if(!id){setGalleryVideos([]);return}
  const {data,error}=await db.from('project_media').select('id,source_url,image_url,alt_text,created_at').eq('project_id',id).eq('media_type','video').eq('active',true).order('sort_order').order('created_at',{ascending:false});
  if(!error)setGalleryVideos(data||[]);
 }
 async function addGalleryVideo(){
  if(!galleryProject){setGalleryNotice('Choose a project first.');return}
  const source=galleryUrl.trim();
  let parsed;try{parsed=new URL(source)}catch{setGalleryNotice('Paste the full video link, beginning with https://');return}
  const host=parsed.hostname.toLowerCase();
  const approvedHost=host==='youtu.be'||host.endsWith('youtube.com')||host.endsWith('instagram.com')||host.endsWith('facebook.com')||host.endsWith('fb.watch')||host.endsWith('linkedin.com');
  if(!approvedHost){setGalleryNotice('Use the public Instagram, Facebook, LinkedIn or YouTube video link.');return}
  setAddingGalleryVideo(true);setGalleryNotice('');
  const {data:{user}}=await db.auth.getUser();
  const {data:existing,error:checkError}=await db.from('project_media').select('id').eq('project_id',galleryProject.id).eq('media_type','video').eq('source_url',source).maybeSingle();
  if(checkError){setAddingGalleryVideo(false);setGalleryNotice(checkError.message);return}
  if(existing){setAddingGalleryVideo(false);setGalleryNotice('This video is already in the Reel Gallery for this project.');await loadGalleryVideos();return}
  const {data:maxRow,error:maxError}=await db.from('project_media').select('sort_order').eq('project_id',galleryProject.id).eq('media_type','video').order('sort_order',{ascending:false}).limit(1).maybeSingle();
  if(maxError){setAddingGalleryVideo(false);setGalleryNotice(maxError.message);return}
  const title=galleryTitle.trim()||`${galleryProject.name} — official project video`;
  const {error}=await db.from('project_media').insert({project_id:galleryProject.id,image_url:source,source_url:source,alt_text:title,media_type:'video',sort_order:(Number(maxRow?.sort_order)||0)+1,active:true,verified_at:new Date().toISOString(),license_status:'admin-approved social video'});
  setAddingGalleryVideo(false);
  if(error){setGalleryNotice(error.message);return}
  setGalleryUrl('');setGalleryTitle('');setGalleryNotice('Video added to this project’s public Reel Gallery.');await loadGalleryVideos();
 }
 async function publishSelected(){
  if(mediaKind==='video'&&!videoUrl){setNotice('Upload an approved MP4 video before publishing.');return}
  if(mediaKind!=='video'&&!creativeUrl){setNotice('Add an approved creative before publishing.');return}
  const compatibleChannels=mediaKind==='video'?selected.filter(x=>x==='Instagram Reel'||x==='Facebook'||x==='YouTube'||x==='Website'):selected.filter(x=>x==='Instagram'||x==='Facebook'||x==='Google Business');
  const socialVideoChannels=mediaKind==='video'?compatibleChannels.filter(x=>x!=='Website'):compatibleChannels;
  if(!socialVideoChannels.length){setNotice(mediaKind==='video'?'Select Instagram Reel, Facebook or YouTube as well as Website before publishing this video.':'Select Instagram, Facebook and/or Google Business before publishing this image.');return}
  let id=promotionId;
  if(!id){const saved=await save('draft');if(!saved)return;id=saved.id}
  else {const {error:updateError}=await db.from('project_promotions').update({caption,headline,creative_brief:brief,platforms:selected}).eq('id',id);if(updateError){setNotice(updateError.message);return}}
  const channels=compatibleChannels;
  if(!window.confirm('Publish this reviewed '+(mediaKind==='video'?'MP4 video':'image')+' and caption to '+channels.join(' and ')+' now? This will create real social posts.'))return;
  setPublishing(true);setNotice('');
  const {data:{session}}=await db.auth.getSession();
  const response=await fetch('/api/admin/promotions/publish',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+(session?.access_token||'')},body:JSON.stringify({promotionId:id})});
  const result=await response.json().catch(()=>({}));
  setPublishing(false);
  if(!response.ok){setNotice(result.error||'The selected channels could not publish this promotion.');return}
  const posted=Object.keys(result.results||{});
  const errors=Object.entries(result.errors||{}).map(([platform,message])=>platform+': '+message);
  const urls=result.platformPostUrls||{};
  setPostUrl(urls.Instagram||urls.Facebook||urls.YouTube||urls['Google Business']||'');
  setNotice('Published to '+posted.join(' and ')+(errors.length?' · '+errors.join(' | '):'.'));
  setHistory(x=>x.map(item=>item.id===id?{...item,status:'published',platform_post_urls:{...(item.platform_post_urls||{}),...urls}}:item));
 } async function signIn(event){event.preventDefault();setLoginError('');setSigningIn(true);const {error}=await db.auth.signInWithPassword({email:loginEmail.trim(),password:loginPassword});setSigningIn(false);if(error){setLoginError('We could not sign in with those details. Please check your email and password.');return}window.location.reload();}

 if(!ready)return <main className="adminStudio"><p>Loading secure Promotion Studio…</p></main>;
 if(!allowed)return <main className="adminStudio"><header><span>WAY2PAISA ADMIN</span><h1>Admin access required</h1><p>Sign in with an active Way2Paisa admin account to create or review promotions.</p></header><section className="studioCard adminLogin"><form onSubmit={signIn}><label>Admin email<input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} autoComplete="email" required/></label><label>Password<input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} autoComplete="current-password" required/></label>{loginError&&<p className="studioNotice">{loginError}</p>}<button type="submit" disabled={signingIn}>{signingIn?'Signing in…':'Sign in securely'}</button></form><p><small>This is a private administrator login. It does not create a public account.</small></p></section></main>;
 return <main className="adminStudio"><header><span>WAY2PAISA ADMIN</span><h1>Promotion Studio</h1><p>Write your own caption, select the channels you want, and use either the Way2Paisa template or your own approved branded creative.</p></header>
 <section className="studioCard"><label>Project<ProjectPicker items={projects} value={projectId} placeholder="Type a project or developer name" onClear={()=>{setProjectId('');setGalleryNotice('');resetCreative();setGalleryVideos([])}} onPick={chosen=>{setProjectId(chosen.id);setGalleryNotice('');createDraft(chosen);loadGalleryVideos(chosen.id)}}/></label>
 <button onClick={createDraft} disabled={!project}>Create promotion</button><label>Headline<input value={headline} onChange={e=>setHeadline(e.target.value)}/></label><label>Caption<textarea value={caption} onChange={e=>setCaption(e.target.value)} rows="10"/></label><label>Creative notes (optional)<textarea value={brief} onChange={e=>setBrief(e.target.value)} rows="3"/></label>
 <fieldset><legend>Channels</legend>{platforms.map(x=><label key={x}><input type="checkbox" checked={selected.includes(x)} onChange={()=>setSelected(s=>s.includes(x)?s.filter(y=>y!==x):[...s,x])}/>{x}<small> — {channelState[x]}</small></label>)}</fieldset>
 <div className="studioActions"><button onClick={()=>save('draft')} disabled={saving}>{saving?'Saving…':'Save draft'}</button><button className="approveBtn" onClick={useStandardCreative} disabled={saving||uploading}>Use Way2Paisa template</button><label className="creativeUpload">Upload image creative<input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadCreative} disabled={uploading}/></label><label className="creativeUpload">Upload MP4 project video<input type="file" accept="video/mp4" onChange={uploadVideo} disabled={uploading}/></label>{customCreativeUrl&&<button onClick={removeUploadedCreative} disabled={uploading}>Remove uploaded image</button>}{videoUrl&&<button onClick={removeVideo} disabled={uploading}>Remove uploaded video</button>}</div>
 {videoUrl&&mediaKind==='video'&&<div className="creativePreview"><div><b>Reel video preview</b><span>Your uploaded MP4</span></div><video src={videoUrl} controls preload="metadata"/><div className="studioActions"><a className="creativeOpen" href={videoUrl} target="_blank" rel="noreferrer">Open MP4 video</a><button type="button" onClick={removeVideo}>Remove uploaded video</button><button className="instagramPublish" onClick={publishSelected} disabled={publishing}>{publishing?'Publishing…':'Publish selected channels'}</button></div><p><small>This MP4 can publish to Instagram as a Reel, Facebook as a video and YouTube as a public property video. Google Business uses image posts.</small></p></div>}
 {creativeUrl&&mediaKind!=='video'&&<div className="creativePreview"><div><b>Creative preview</b><span>{customCreativeUrl?'Your uploaded creative':'Automatic Way2Paisa creative'}</span></div><img src={creativeUrl} alt={headline||project?.name||'Way2Paisa promotion creative'} onError={()=>{if(!customCreativeUrl){setCreativeUrl('');setPostUrl('');setNotice('This listing has no compatible automatic project image. Upload an approved JPG, PNG or WebP creative instead.')}}}/><div className="studioActions"><a className="creativeOpen" href={creativeUrl} target="_blank" rel="noreferrer">Open full image</a>{!customCreativeUrl&&<button type="button" onClick={removeAutomaticCreative}>Remove automatic creative</button>}<a className="creativeOpen" href="https://www.instagram.com/reels/create/" target="_blank" rel="noreferrer">Open Instagram Reel creator</a><button className="instagramPublish" onClick={publishSelected} disabled={publishing}>{publishing?'Publishing…':'Publish selected channels'}</button></div><p><small>Images publish to Instagram, Facebook and Google Business. For a full-screen Reel or YouTube video, upload an MP4 instead.</small></p></div>}
 {postUrl&&<p className="studioSuccess">Live post: <a href={postUrl} target="_blank" rel="noreferrer">Open published post ↗</a></p>}
 {notice&&<p className="studioNotice">{notice}</p>}</section>
 <section className="studioCard reelGalleryAdmin"><span className="kicker">PROJECT MEDIA</span><h2>Add to Project Reel Gallery</h2><p>Paste a public video link already posted by Way2Paisa. It will appear only on the selected project’s page, where customers can click it to view the original Reel or video.</p><label>Project<ProjectPicker items={galleryProjects} value={galleryProjectId} placeholder="Type a project or developer name" onClear={()=>{setGalleryProjectId('');setGalleryNotice('');setGalleryUrl('');setGalleryTitle('');setGalleryVideos([])}} onPick={chosen=>{setGalleryProjectId(chosen.id);setGalleryNotice('');setGalleryUrl('');setGalleryTitle('');loadGalleryVideos(chosen.id)}}/></label>{!galleryProject?<p className="studioNotice">Select a project, then add its Instagram, Facebook, LinkedIn or YouTube video link here.</p>:<><label>Video / Reel link<input type="url" value={galleryUrl} onChange={e=>setGalleryUrl(e.target.value)} placeholder="https://www.instagram.com/reel/..."/></label><label>Display title <small>(optional)</small><input value={galleryTitle} onChange={e=>setGalleryTitle(e.target.value)} placeholder={`${galleryProject.name} — walkthrough`}/></label><div className="studioActions"><button type="button" className="approveBtn" onClick={addGalleryVideo} disabled={addingGalleryVideo}>{addingGalleryVideo?'Adding…':'Add to Project Reel Gallery'}</button></div>{galleryNotice&&<p className="studioNotice">{galleryNotice}</p>}{galleryVideos.length>0&&<div className="galleryAdminList"><b>Current public Reel Gallery videos</b>{galleryVideos.map(item=><a key={item.id} href={item.source_url||item.image_url} target="_blank" rel="noreferrer">{item.alt_text||'Official project video'} ↗</a>)}</div>}</>}</section>
 <section><h2>Create &amp; Promote</h2><p>Only verified listings with a starting price and project image are available for promotion. Listings missing those facts are held back until corrected.</p><div className="promotionProjectList">{projects.map(p=><article key={p.id}><b>{p.name}</b><span>{p.locations?.name||p.market||'Location pending'} · {p.bhk_original||'Configuration on request'}</span><button type="button" onClick={()=>{setProjectId(p.id);createDraft(p);window.scrollTo({top:0,behavior:'smooth'})}}>Create &amp; Promote</button></article>)}</div></section>
 <section><h2>Promotion history</h2>{history.length?<div className="history">{history.map(x=><article key={x.id}><b>{x.projects?.name||'Project'}</b><span>{x.status} · {x.platforms.join(', ')}</span><p>{x.caption}</p>{x.platform_post_urls?.Instagram&&<a href={x.platform_post_urls.Instagram} target="_blank" rel="noreferrer">Open Instagram post ↗</a>}{x.platform_post_urls?.Facebook&&<a href={x.platform_post_urls.Facebook} target="_blank" rel="noreferrer">Open Facebook post ↗</a>}{x.platform_post_urls?.YouTube&&<a href={x.platform_post_urls.YouTube} target="_blank" rel="noreferrer">Open YouTube video ↗</a>}{x.platform_post_urls?.['Google Business']&&<a href={x.platform_post_urls['Google Business']} target="_blank" rel="noreferrer">Open Google Business post ↗</a>}{x.platform_post_urls?.Website&&<a href={x.platform_post_urls.Website} target="_blank" rel="noreferrer">Open Website Reel Gallery ↗</a>}<small>{new Date(x.created_at).toLocaleString()}</small></article>)}</div>:<p>No promotion drafts yet.</p>}</section></main>;
}


function ProjectPicker({items,value,onPick,onClear,placeholder}){
 const selected=items.find(item=>item.id===value);
 const [term,setTerm]=useState(selected?.name||'');
 const [open,setOpen]=useState(false);
 useEffect(()=>{if(value&&selected?.name)setTerm(selected.name)},[value,selected?.name]);
 const matches=useMemo(()=>{
  const query=term.trim().toLowerCase();
  if(!query)return items.slice(0,12);
  return items.filter(item=>[item.name,item.locations?.name,item.market].filter(Boolean).join(' ').toLowerCase().includes(query)).slice(0,12);
 },[items,term]);
 function choose(item){setTerm(item.name);setOpen(false);onPick(item)}
 return <div className="projectPicker"><input value={term} onChange={event=>{const next=event.target.value;setTerm(next);setOpen(true);if(value&&next!==selected?.name)onClear()}} onFocus={()=>setOpen(true)} onBlur={()=>window.setTimeout(()=>setOpen(false),160)} placeholder={placeholder} autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-label={placeholder}/>{open&&<div className="projectPickerMenu" role="listbox">{matches.length?matches.map(item=><button type="button" key={item.id} role="option" onMouseDown={event=>event.preventDefault()} onClick={()=>choose(item)}><strong>{item.name}</strong><span>{[item.locations?.name,item.market].filter(Boolean).join(' · ')}</span></button>):<div className="projectPickerEmpty">No matching verified project.</div>}</div>}</div>
}
