'use client';
import {useEffect,useMemo,useState} from 'react';
import {createClient} from '@supabase/supabase-js';

const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const platforms=['Instagram','Facebook','LinkedIn','X','YouTube'];

export default function PromotionStudio(){
 const [ready,setReady]=useState(false),[allowed,setAllowed]=useState(false),[projects,setProjects]=useState([]),[history,setHistory]=useState([]),[projectId,setProjectId]=useState(''),[caption,setCaption]=useState(''),[headline,setHeadline]=useState(''),[brief,setBrief]=useState(''),[selected,setSelected]=useState(['Instagram']),[saving,setSaving]=useState(false),[publishing,setPublishing]=useState(false),[notice,setNotice]=useState(''),[promotionId,setPromotionId]=useState(''),[creativeUrl,setCreativeUrl]=useState(''),[postUrl,setPostUrl]=useState(''),[loginEmail,setLoginEmail]=useState(''),[loginPassword,setLoginPassword]=useState(''),[signingIn,setSigningIn]=useState(false),[loginError,setLoginError]=useState('');

 useEffect(()=>{(async()=>{const {data:{user}}=await db.auth.getUser();if(!user){setReady(true);return}const {data:profile}=await db.from('admin_profiles').select('id').eq('id',user.id).eq('active',true).maybeSingle();if(!profile){setReady(true);return}setAllowed(true);const [{data:p},{data:h}]=await Promise.all([db.from('projects').select('id,name,slug,price_original,bhk_original,possession_original,rera_number,market,locations(name)').eq('active',true).eq('verified',true).order('name'),db.from('project_promotions').select('id,caption,platforms,status,created_at,platform_post_urls,projects(name)').order('created_at',{ascending:false}).limit(30)]);setProjects(p||[]);setHistory(h||[]);setReady(true)})()},[]);

 const project=useMemo(()=>projects.find(x=>x.id===projectId),[projects,projectId]);
 function createDraft(){
  if(!project)return;
  const lines=[project.name,project.locations?.name||project.market,project.bhk_original,project.price_original||'Price on Request',project.possession_original&&project.possession_original.replace('|',' · '),project.rera_number&&'MahaRERA: '+project.rera_number].filter(Boolean);
  setHeadline(project.name+' | '+(project.locations?.name||project.market||''));
  setCaption('Discover '+lines.join(' · ')+'. Connect with Way2Paisa for verified details and a personalised site visit.');
  setBrief('Generate a branded 1080 × 1080 Way2Paisa property creative from the verified listing image and facts. Use the Way2Paisa identity, project name, location and starting price. Keep claims factual and include the MahaRERA number where available.');
  setPromotionId('');setCreativeUrl('');setPostUrl('');setNotice('Editable promotion created. Save the draft, generate the creative, then review it before publishing.');
 }
 async function save(status='draft'){
  if(!project||!caption.trim()){setNotice('Choose a project and generate or enter the caption first.');return null}
  setSaving(true);setNotice('');
  const {data:{user}}=await db.auth.getUser();
  const row={project_id:project.id,caption,headline,creative_brief:brief,platforms:selected,status,approved_by:status==='approved'?user?.id:null,approved_at:status==='approved'?new Date().toISOString():null};
  const {data,error}=await db.from('project_promotions').insert(row).select('id,caption,platforms,status,created_at,platform_post_urls,projects(name)').single();
  setSaving(false);
  if(error){setNotice(error.message);return null}
  setHistory(x=>[data,...x]);setPromotionId(data.id);setCreativeUrl('/api/admin/promotion-creative?project='+encodeURIComponent(project.id)+'&v='+encodeURIComponent(data.id));setNotice(status==='approved'?'Promotion approved and ready for Instagram review.':'Draft saved. Generate and review the creative before publishing.');return data;
 }
 async function generateCreative(){
  if(!project){setNotice('Choose a verified project first.');return}
  if(!promotionId){const saved=await save('draft');if(!saved)return}
  setCreativeUrl('/api/admin/promotion-creative?project='+encodeURIComponent(project.id)+'&v='+(promotionId||Date.now()));setPostUrl('');setNotice('Branded creative generated from the verified listing. Review it below.');
 }
 async function publishInstagram(){
  if(!promotionId){setNotice('Save the promotion draft first.');return}
  if(!selected.includes('Instagram')){setNotice('Select Instagram before publishing.');return}
  if(!window.confirm('Publish this reviewed creative and caption to @way2paisa_ now? This will create a real Instagram post.'))return;
  setPublishing(true);setNotice('');
  const {data:{session}}=await db.auth.getSession();
  const response=await fetch('/api/admin/promotions/publish',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+(session?.access_token||'')},body:JSON.stringify({promotionId})});
  const result=await response.json().catch(()=>({}));
  setPublishing(false);
  if(!response.ok){setNotice(result.error||'Instagram could not publish this promotion.');return}
  setPostUrl(result.permalink||'');setNotice('Published to Instagram successfully.');
  setHistory(x=>x.map(item=>item.id===promotionId?{...item,status:'published',platform_post_urls:{...(item.platform_post_urls||{}),Instagram:result.permalink||result.postId}}:item));
 }

 async function signIn(event){event.preventDefault();setLoginError('');setSigningIn(true);const {error}=await db.auth.signInWithPassword({email:loginEmail.trim(),password:loginPassword});setSigningIn(false);if(error){setLoginError('We could not sign in with those details. Please check your email and password.');return}window.location.reload();}

 if(!ready)return <main className="adminStudio"><p>Loading secure Promotion Studio…</p></main>;
 if(!allowed)return <main className="adminStudio"><header><span>WAY2PAISA ADMIN</span><h1>Admin access required</h1><p>Sign in with an active Way2Paisa admin account to create or review promotions.</p></header><section className="studioCard adminLogin"><form onSubmit={signIn}><label>Admin email<input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} autoComplete="email" required/></label><label>Password<input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} autoComplete="current-password" required/></label>{loginError&&<p className="studioNotice">{loginError}</p>}<button type="submit" disabled={signingIn}>{signingIn?'Signing in…':'Sign in securely'}</button></form><p><small>This is a private administrator login. It does not create a public account.</small></p></section></main>;
 return <main className="adminStudio"><header><span>WAY2PAISA ADMIN</span><h1>AI Promotion Studio</h1><p>Create a branded image from verified listing facts, review the caption and image, then explicitly publish to the connected Instagram account.</p></header>
 <section className="studioCard"><label>Project<select value={projectId} onChange={e=>{setProjectId(e.target.value);setPromotionId('');setCreativeUrl('');setPostUrl('')}}><option value="">Select a verified project</option>{projects.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label>
 <button onClick={createDraft} disabled={!project}>Create promotion</button><label>Headline<input value={headline} onChange={e=>setHeadline(e.target.value)}/></label><label>Caption<textarea value={caption} onChange={e=>setCaption(e.target.value)} rows="6"/></label><label>Creative brief<textarea value={brief} onChange={e=>setBrief(e.target.value)} rows="5"/></label>
 <fieldset><legend>Channels</legend>{platforms.map(x=><label key={x}><input type="checkbox" checked={selected.includes(x)} onChange={()=>setSelected(s=>s.includes(x)?s.filter(y=>y!==x):[...s,x])}/>{x}{x!=='Instagram'&&<small> — coming soon</small>}</label>)}</fieldset>
 <div className="studioActions"><button onClick={()=>save('draft')} disabled={saving}>{saving?'Saving…':'Save draft'}</button><button className="approveBtn" onClick={generateCreative} disabled={saving}>Generate branded creative</button></div>
 {creativeUrl&&<div className="creativePreview"><div><b>Creative preview</b><span>Generated from verified listing data</span></div><img src={creativeUrl} alt={headline||project?.name||'Way2Paisa promotion creative'}/><div className="studioActions"><a className="creativeOpen" href={creativeUrl} target="_blank" rel="noreferrer">Open full image</a><button className="instagramPublish" onClick={publishInstagram} disabled={publishing}>{publishing?'Publishing…':'Publish to Instagram'}</button></div></div>}
 {postUrl&&<p className="studioSuccess">Live post: <a href={postUrl} target="_blank" rel="noreferrer">Open on Instagram ↗</a></p>}
 {notice&&<p className="studioNotice">{notice}</p>}</section>
 <section><h2>Create &amp; Promote</h2><p>Select any verified listing below to load it into the Promotion Studio.</p><div className="promotionProjectList">{projects.map(p=><article key={p.id}><b>{p.name}</b><span>{p.locations?.name||p.market||'Location pending'} · {p.bhk_original||'Configuration on request'}</span><button type="button" onClick={()=>{setProjectId(p.id);setPromotionId('');setCreativeUrl('');setPostUrl('');setNotice('Project loaded. Click Create promotion to generate the editable draft.');window.scrollTo({top:0,behavior:'smooth'})}}>Create &amp; Promote</button></article>)}</div></section>
 <section><h2>Promotion history</h2>{history.length?<div className="history">{history.map(x=><article key={x.id}><b>{x.projects?.name||'Project'}</b><span>{x.status} · {x.platforms.join(', ')}</span><p>{x.caption}</p>{x.platform_post_urls?.Instagram&&<a href={x.platform_post_urls.Instagram} target="_blank" rel="noreferrer">Open Instagram post ↗</a>}<small>{new Date(x.created_at).toLocaleString()}</small></article>)}</div>:<p>No promotion drafts yet.</p>}</section></main>;
}