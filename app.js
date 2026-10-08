async function boot(){const WARD='ward.glb',GLB='patient.glb';const [WB,GB]=await Promise.all([WARD,GLB].map(u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u+' -> HTTP '+r.status);return r.arrayBuffer()})));
let ar=false;const T=(a)=>a[ar?1:0];
const B=(x)=>x.map(s=>s.split('|'));
const mk=(r,l)=>{const o={};for(const k of'faepxc'){o['R'+k]=(r||{})[k]||0;o['L'+k]=(l||{})[k]||0}return o},both=o=>mk(o,o);
const STEPS=[
{t:["General Examination:","الفحص العام:"],sub:["Abdominal Physical Examination","فحص البطن السريري (Abdominal Physical Examination)"]},
{t:["General inspection:","الفحص العام:"],i:["Inspect from the end of the bed for any abnormal observations such as:","افحص من نهاية السرير بحثاً عن أي علامات غير طبيعية مثل:"],b:B(["Skin pigmentation|تصبغ الجلد","Jaundice|اليرقان","Loss of body hair|فقدان شعر الجسم","Bruising|الكدمات","Scars|الندبات","Masses|الكتل","Abdominal distention|انتفاخ البطن","Pallor|الشحوب","Cachexia|الهزال"]),pos:'foot'},
{t:["Eyes inspection:","فحص العينين:"],i:["Now at the right side of the patient inspect the following parts:","الآن من الجهة اليمنى للمريض افحص الأجزاء التالية:"],b:B(["Xanthelasma|الورم الأصفر الجفني","Conjunctival pallor: retract the lower eyelid and inspect the conjunctiva|شحوب الملتحمة: اسحب الجفن السفلي وافحص الملتحمة","Jaundice: retract the upper eyelid and ask the patient to look down|اليرقان: ارفع الجفن العلوي واطلب من المريض النظر للأسفل"]),pos:'right',c:[{e:"Please look down",a:"انظر للأسفل من فضلك",p:{gz:.5}}]},
{t:["Mouth inspection:","فحص الفم:"],i:["Ask the patient to open his mouth and inspect the upper side of the tongue then ask him to lift his tongue to the roof of his mouth and inspect the whole oral cavity for the following:","اطلب من المريض فتح فمه وافحص السطح العلوي للسان ثم اطلب رفع لسانه لسقف الفم وافحص تجويف الفم بالكامل بحثاً عن:"],b:B(["Angular cheilitis|التهاب زاوية الفم","Atrophic glossitis|التهاب اللسان الضموري","Aphthous ulcers|القرحات القلاعية","Hyperpigmented macules|بقع فرطة التصبغ","Oral candidiasis|داء المبيضات الفموي"]),c:[{e:"Open your mouth",a:"افتح فمك",p:{jaw:.35,tg:0,gz:0}},{e:"Lift your tongue to the roof of your mouth",a:"ارفع لسانك إلى سقف فمك",p:{jaw:.5,tg:1}},{e:"You can close your mouth",a:"يمكنك إغلاق فمك",p:{jaw:0,tg:0}}]},
{t:["Axilla and chest inspection:","فحص الإبط والصدر:"],b:B(["Axilla: ask the patient to raise his right arm then left arm and check for any signs of acanthosis nigricans|الإبط: اطلب رفع الذراع اليمنى ثم اليسرى وابحث عن علامات الشواك الأسود (acanthosis nigricans)","Chest: inspect the chest for any signs of gynecomastia (in males), breast atrophy (in females) or spider nevi|الصدر: افحص الصدر بحثاً عن التثدي (gynecomastia) أو ضمور الثدي أو الشامات العنكبوتية (spider nevi)"]),one:1,c:[{e:"Raise your right arm",a:"ارفع ذراعك اليمنى",p:mk({a:1.45,e:.35},{})},{e:"Now your left arm",a:"الآن ذراعك اليسرى",p:mk({},{a:1.45,e:.35})}]},
{t:["Hands inspection:","فحص اليدين:"],b:B(["Ask the patient to raise his hands with their dorsum to the roof, inspect nails for: leukonychia, koilonychia|اطلب رفع اليدين وظهرهما للسقف وافحص الأظافر: leukonychia, koilonychia","Now ask him to rotate his hands and inspect the palms for: pallor, erythema, Dupuytren’s contracture|ثم اطلب قلب اليدين وافحص الراحتين: الشحوب، الاحمرار، تقفع دوبويترين (Dupuytren)"]),one:1,c:[{e:"Raise your hands",a:"ارفع يديك",p:both({f:.5,e:.8,p:1.5})},{e:"Now rotate your hands",a:"الآن اقلب يديك",p:both({f:.5,e:.8,p:-1.35})}]},
{t:["Hands inspection:","فحص اليدين:"],b:B(["Clubbing (using Shamroth’s window): Ask the patient to bring the two nails of both index fingers together and observe space between them, if space is lost, potential clubbing|التبصع (نافذة شامروث): اطلب ضم ظفري السبابتين وراقب الفراغ بينهما؛ فقدان الفراغ يعني احتمال التبصع (clubbing)"]),one:1,c:[{e:"Bring the two nails of index fingers together",a:"قرّب ظفري السبابتين من بعضهما",p:both({f:.35,a:-.3,e:1.55,p:.7,c:1})}]},
{t:["Hands and legs inspection:","فحص اليدين والساقين:"],b:B(["Asterixis: Ask the patient to stretch his arms in front of him, cock hands and wrist joints backward, hold position for 30 seconds and observe asterixis|رعاش الرفرفة (Asterixis): اطلب مد الذراعين أماماً وثني الرسغين للخلف لمدة 30 ثانية وراقب","Legs: Inspect legs for any signs of edema or hair loss|الساقان: افحص الساقين بحثاً عن وذمة (edema) أو فقدان الشعر"]),one:1,timer:1,c:[{e:"Stretch your hands in front of you and cock your wrists back",a:"مد يديك أمامك واثنِ رسغيك للخلف",p:both({f:.82,e:.05,p:1.45,x:1})}]},
{t:["General Examination:","الفحص العام:"],i:["Lower bed to 0° then inspect the following:","اخفض السرير إلى 0° ثم افحص ما يلي:"],b:B(["Abdomen: Pulses|البطن: النبضات","Ascites|الاستسقاء","Striae|الحبال الجلدية","Scars|الندبات","Loose skin folds|ثنيات الجلد المرتخية","Caput medusa|رأس قنديل البحر","Splenomegaly or hepatomegaly|تضخم الطحال أو الكبد","Distension|الانتفاخ","Stomas|الفغرات","Hernias|الفتوق","Cullen’s sign|علامة كولن","Grey Turner’s sign|علامة غراي تيرنر"]),chair:1,fin:1},
{done:1},{quiz:1},{res:1}];
const REV={voice:["Voice Command","أمر صوتي"],say:["Say:","قل:"],or:["Or:","أو:"],cont:["Continue without command","المتابعة بدون أمر"],next:["Next ▶","التالي ◀"],start:["Start","ابدأ"],fin:["Finish","إنهاء"],chairH:["Grab the chair and pull it down so that the patient is laying down","أمسك الكرسي واسحبه للأسفل ليستلقي المريض"]};
const QZ=[
{q:["Where should you stand for the general inspection?","أين تقف أثناء الفحص العام؟"],o:[["At the end (foot) of the bed","عند نهاية (قدم) السرير"],["At the left side of the patient","على يسار المريض"],["Behind the patient's head","خلف رأس المريض"],["Beside the patient's chest","بجانب صدر المريض"]]},
{q:["How do you inspect for conjunctival pallor?","كيف تفحص شحوب الملتحمة (conjunctival pallor)؟"],o:[["Retract the lower eyelid","اسحب الجفن السفلي"],["Retract the upper eyelid","ارفع الجفن العلوي"],["Press on the eyeball","اضغط على كرة العين"],["Ask the patient to close both eyes","اطلب إغلاق العينين"]]},
{q:["How do you look for jaundice in the eyes?","كيف تفحص اليرقان (jaundice) في العينين؟"],o:[["Retract the upper eyelid while the patient looks down","ارفع الجفن العلوي والمريض ينظر للأسفل"],["Retract the lower eyelid while the patient looks up","اسحب الجفن السفلي والمريض ينظر للأعلى"],["Shine a light in the pupil","سلّط ضوءاً على الحدقة"],["Inspect the eyebrows only","افحص الحاجبين فقط"]]},
{q:["Loss of the space in Shamroth’s window suggests:","فقدان الفراغ في نافذة شامروث يشير إلى:"],o:[["Clubbing","التبصع (clubbing)"],["Koilonychia","تقعر الأظافر (koilonychia)"],["Leukonychia","بياض الأظافر (leukonychia)"],["Dupuytren’s contracture","تقفع دوبويترين"]]},
{q:["How long should the wrists be held cocked back to look for asterixis?","كم مدة إبقاء الرسغين مثنيين للخلف لفحص الرفرفة (asterixis)؟"],o:[["30 seconds","30 ثانية"],["5 seconds","5 ثوانٍ"],["10 seconds","10 ثوانٍ"],["2 minutes","دقيقتان"]]},
{q:["Which sign is checked on the palms?","أي علامة تُفحص في راحة اليد؟"],o:[["Dupuytren’s contracture","تقفع دوبويترين"],["Angular cheilitis","التهاب زاوية الفم"],["Gynecomastia","التثدي"],["Xanthelasma","الورم الأصفر الجفني"]]},
{q:["To what angle must the bed be lowered before inspecting the abdomen?","إلى أي زاوية يجب خفض السرير قبل فحص البطن؟"],o:[["0° (flat)","0° (مسطح)"],["45°","45°"],["90°","90°"],["30°","30°"]]}];
let qi=0,qs=0,qa=null,qo=[0,1,2,3];
function qStart(){qo=[0,1,2,3].sort(()=>Math.random()-.5);qa=null}
function ans(k){if(qa!=null)return;qa=k;if(k==0)qs++;draw()}
const log={foot:0,right:0,cmd:0,btn:0,watch:0,legs:0,bed:0,abd:0};
// ---------- scene
const R=new THREE.WebGLRenderer({antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,1.5));R.setSize(innerWidth,innerHeight);R.xr.enabled=true;document.body.appendChild(R.domElement);(function(){const b=document.createElement('button');b.style.cssText='position:fixed;bottom:14px;left:50%;transform:translateX(-50%);z-index:5;padding:10px 18px';b.textContent='ENTER VR';document.body.appendChild(b);b.onclick=async()=>{try{if(R.xr.isPresenting){R.xr.getSession().end();return}const s=await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor','bounded-floor']});R.xr.setReferenceSpaceType('local-floor');await R.xr.setSession(s);b.textContent='EXIT VR';s.addEventListener('end',()=>b.textContent='ENTER VR')}catch(e){b.textContent='VR not available';}}})();
const sc=new THREE.Scene();sc.background=new THREE.Color(0x71868b);
const cam=new THREE.PerspectiveCamera(65,innerWidth/innerHeight,.05,50);const rig=new THREE.Group();rig.add(cam);cam.position.y=1.6;rig.position.set(0,0,2.6);sc.add(rig);
sc.add(new THREE.HemisphereLight(0xffffff,0x8b979c,.85));const dl=new THREE.DirectionalLight(0xffffff,.35);dl.position.set(1,4,2);sc.add(dl);
const M=(c,r=.7)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
function box(w,h,d,m,x,y,z,p=sc){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);p.add(o);return o}
const floor=new THREE.Mesh(new THREE.PlaneGeometry(12,12).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial());floor.visible=false;sc.add(floor);
(function(){const wm=M(0x9db3b8,.9),gm=M(0x5b6a70,.5),st=M(0xcfd6da,.22),wh=M(0xffffff,.55),dk=M(0x1b2226,.5),bl=M(0x2b6f9e,.6),lm=new THREE.MeshBasicMaterial({color:0xffffff});
const X0=-2.7,X1=2.3,Z0=-4.1,Z1=3.5,H=3.1,cx=.3,cz=-.7,W=X1-X0,D=Z1-Z0;
box(W,H,.1,wm,cx,H/2,Z0-.05);box(W,H,.1,wm,cx,H/2,Z1+.05);box(.1,H,D,wm,X0-.05,H/2,cz);box(.1,H,D,wm,X1+.05,H/2,cz);box(W,.05,D,M(0xc3ced2,.9),cx,H+.025,cz);
box(W,.12,.02,gm,cx,.06,Z0+.01);box(W,.12,.02,gm,cx,.06,Z1-.01);box(.02,.12,D,gm,X0+.01,.06,cz);box(.02,.12,D,gm,X1-.01,.06,cz);
for(const z of[-3,-1.2,.6,2.2])for(const x of[-1.8,-.3,1.2]){box(.95,.03,.55,lm,x,H-.02,z);box(1,.02,.6,st,x,H,z)}
const wt=M(0x3d6d72,.8);box(W,1.15,.04,wt,cx,.575,Z0+.02);box(W,1.15,.04,wt,cx,.575,Z1-.02);box(.04,1.15,D,wt,X0+.02,.575,cz);box(.04,1.15,D,wt,X1-.02,.575,cz);
// wall protection rails
box(.03,.12,D,bl,X0+.02,.95,cz);box(.03,.12,D,bl,X1-.02,.95,cz);box(W,.12,.03,bl,cx,.95,Z0+.02);
// whiteboard
box(1.7,1,.03,st,cx,1.7,Z0+.02);box(1.62,.92,.03,wh,cx,1.7,Z0+.035);box(.6,.03,.06,st,cx,1.2,Z0+.06);
for(let i=0;i<3;i++)box(.09,.015,.015,M([0x1144cc,0xcc2222,0x111111][i]),cx-.15+i*.12,1.225,Z0+.07);
// red sign + door + gel dispenser
box(.02,.28,.28,M(0xc4161c),X0+.02,1.75,1.3);box(.02,.06,.18,wh,X0+.03,1.75,1.3);box(.02,.18,.06,wh,X0+.03,1.75,1.3);
box(.06,2.1,.95,M(0x93a1a8,.55),X1-.03,1.05,2.0);box(.02,.55,.22,dk,X1-.07,1.5,2.0);box(.05,.04,.18,st,X1-.08,1.0,1.65);
box(.07,.22,.1,wh,X1-.06,1.25,1.2);box(.03,.1,.05,M(0x1a8a4a),X1-.1,1.3,1.2);
// sink counter + cabinets (back-left corner)
box(.62,.88,2.3,wh,X0+.32,.44,-2.85);box(.66,.04,2.34,st,X0+.32,.9,-2.85);box(.03,.2,2.34,st,X0+.02,1.02,-2.85);
box(.42,.015,.5,dk,X0+.34,.925,-2.55);box(.03,.28,.03,st,X0+.1,1.07,-2.55);box(.14,.03,.03,st,X0+.17,1.2,-2.55);
for(let i=0;i<4;i++){box(.015,.03,.2,st,X0+.64,.6,-3.6+i*.55)}
for(let i=0;i<3;i++){box(.38,.7,.72,wh,X0+.2,1.85,-3.65+i*.78);box(.015,.2,.02,st,X0+.4,1.7,-3.4+i*.78)}
// wall monitor + exam light + curtain rail

box(.03,.03,2.4,st,-.9,2.85,-.2);
const ex=new THREE.Group();box(.03,.5,.03,st,0,2.5,0,ex);ex.add(new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.06,24),M(0xe8eef0,.3)));ex.children[1].position.set(0,2.22,0);ex.position.set(0,0,.3);sc.add(ex);
// trolleys
function tr(x,z){const g=new THREE.Group();g.position.set(x,0,z);sc.add(g);box(.62,.03,.46,st,0,.86,0,g);box(.62,.03,.46,st,0,.35,0,g);for(const a of[-1,1])for(const b of[-1,1]){box(.03,.86,.03,st,a*.29,.43,b*.2,g);const w=new THREE.Mesh(new THREE.SphereGeometry(.035),dk);w.position.set(a*.29,.035,b*.2);g.add(w)}
 box(.3,.04,.2,M(0x99c9e6,.4),-.1,.9,0,g);box(.12,.05,.1,M(0xdd4455,.5),.15,.91,.05,g);box(.1,.1,.1,wh,.2,.95,-.1,g);box(.35,.12,.2,M(0x3a6ea5,.6),0,.43,0,g)}
tr(-1.3,-1.1);tr(-1.25,1.35);tr(1.75,2.1);
const fl=document.createElement('canvas');fl.width=fl.height=128;const fc=fl.getContext('2d');fc.fillStyle='#244f4b';fc.fillRect(0,0,128,128);fc.strokeStyle='#2f625d';fc.lineWidth=3;fc.strokeRect(0,0,128,128);const ft=new THREE.CanvasTexture(fl);ft.wrapS=ft.wrapT=THREE.RepeatWrapping;ft.repeat.set(W/.6,D/.6);const fm=new THREE.MeshStandardMaterial({map:ft,roughness:.4,metalness:.1});box(W,.02,D,fm,cx,-.01,cz);
// desk + stool + bin on the new left area
box(.6,.04,1.5,M(0xd7dde0,.5),X0+.35,.75,1.9);for(const z of[1.2,2.6])box(.05,.75,.5,st,X0+.35,.375,z);box(.04,.35,.5,dk,X0+.12,1.0,1.9);box(.02,.3,.45,M(0x113344,.3),X0+.1,1.02,1.9);
const stl=new THREE.Group();stl.position.set(-2.0,0,.5);sc.add(stl);const sc2=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.06,20),M(0x2b3a40,.7));sc2.position.y=.52;stl.add(sc2);box(.04,.5,.04,st,0,.26,0,stl);box(.4,.03,.4,st,0,.03,0,stl);
const bn=new THREE.Mesh(new THREE.CylinderGeometry(.16,.13,.4,16),M(0xb0392e,.6));bn.position.set(X0+.3,.2,-.2);sc.add(bn);
})();

window.createImageBitmap=undefined;const ld=new THREE.GLTFLoader();const b64=s=>s===WARD?WB:GB;
ld.parse(b64(WARD),'',g=>{const w=g.scene;w.position.set(.3,0,-.1);sc.add(w);w.traverse(o=>{if(['floor','floor_tiles','floor_bottom','medical_machine_1','medical_machine_2','medical_machine_3','wall_panel','hospital_bed','walls','window','window_frame','blinds','sofa','plant','heater','table'].includes(o.name))o.visible=false;o.frustumCulled=false;if(o.isMesh){let p=o,f=0;while(p){if(p.name==='floor_tiles'||p.name==='floor')f=1;p=p.parent}if(f){o.material=M(0x1f4a46,.38);o.material.metalness=.15;return}}if(o.material){o.material.metalness=0;o.material.roughness=Math.max(.7,o.material.roughness||0);if(o.material.emissive)o.material.emissive.setScalar(.04)}})},e=>console.error(e));
// chair
const teal=M(0x1f7570,.9),chrome=M(0xe8eef0,.3);box(.72,.14,1.55,teal,0,.57,.55);for(const x of[-.4,.4])box(.03,.03,1.5,chrome,x,.78,.55);box(.1,.5,.1,chrome,0,.28,.4);box(.6,.03,.6,chrome,0,.02,.4);
const bk=new THREE.Group();bk.position.set(0,.64,-.2);sc.add(bk);box(.7,.12,1.0,teal,0,.02,-.5,bk);
const handle=new THREE.Mesh(new THREE.SphereGeometry(.07),M(0x00e5ff,.4));handle.position.set(0,.02,-1.05);bk.add(handle);handle.visible=false;
// patient: skinned rig (patient_exam_full.glb) driven by the baked "Exam_Full" clip
let pat;const st=Object.assign({phi:.785,jaw:0,tg:0,gz:0},mk()),tg={...st};
const SEQ={"Please look down":[[26.1,27.5],[38.4,40.4]],"Open your mouth":[[45.8,46.9],[54.3,55.6]],"Lift your tongue to the roof of your mouth":[[60.8,62.4]],"You can close your mouth":[[68,70.2]],"Raise your right arm":[[82.7,86.2]],"Now your left arm":[[87.2,90.7]],"Raise your hands":[[98.9,102.6]],"Now rotate your hands":[[105.9,108.7]],"Bring the two nails of index fingers together":[[111.9,115.2],[118.9,123.6]],"Stretch your hands in front of you and cock your wrists back":[[129.5,132.2],[136.5,141.0417]]};
const FL=[141.0417,150.0417],REST=156.3,LIE=168;
let qt={},bn={},raw={},disp={},xf={},endp={},qu=[],qst=false,ct=.05,xw=0,flap=false,fdir=1,flapNext=false;
const pQa=new THREE.Quaternion(),pQb=new THREE.Quaternion();
function sampleAt(t,o){for(const k in qt){const v=qt[k].evaluate(t),a=o[k]||(o[k]=[0,0,0,0]);a[0]=v[0];a[1]=v[1];a[2]=v[2];a[3]=v[3]}}
function enq(l,fn){qu=l.map(r=>r.slice());qst=false;flap=false;flapNext=!!fn}
function playCmd(e){const l=SEQ[e];if(l)enq(l,e.indexOf('Stretch')==0)}
function playChair(){const l=[];if(flap&&ct<FL[1]){l.push([ct,FL[1]]);l.push([152,REST])}else l.push([REST,REST+.05]);enq(l)}
function stepAnim(dt){
 if(!qu.length&&!flap&&xw<=0)return false;
 if(qu.length){if(!qst){qst=true;for(const k in disp){const a=xf[k]||(xf[k]=[0,0,0,0]),d=disp[k];a[0]=d[0];a[1]=d[1];a[2]=d[2];a[3]=d[3]}xw=1;ct=qu[0][0]}
  ct+=dt;if(ct>=qu[0][1]){ct=qu[0][1];qu.shift();qst=false;if(!qu.length&&flapNext){flap=true;fdir=1;flapNext=false}}}
 else if(flap){ct+=dt;if(ct>=FL[1])ct=FL[0]+(ct-FL[1])}
 sampleAt(ct,raw);if(xw>0)xw=Math.max(0,xw-dt/.4);const w=xw*xw*(3-2*xw);
 for(const k in raw){pQa.fromArray(raw[k]);if(w>0){pQb.fromArray(xf[k]);pQa.slerp(pQb,w)}const d=disp[k];d[0]=pQa.x;d[1]=pQa.y;d[2]=pQa.z;d[3]=pQa.w}return true}
function applyPose(){const s=Math.max(0,Math.min(1,(.785-st.phi)/.785));
 for(const k in disp){pQa.fromArray(disp[k]);if(s>0){pQb.fromArray(endp[k]);pQa.slerp(pQb,s)}bn[k].quaternion.copy(pQa)}}
function skin(){bk.rotation.x=st.phi;if(pat)applyPose()}
ld.parse(b64(GLB),'',g=>{pat=g.scene;sc.add(pat);const done=new Set();
 pat.traverse(o=>{if(!o.isMesh)return;o.frustumCulled=false;if(o.geometry.morphAttributes){o.geometry.morphAttributes={};o.morphTargetInfluences=undefined;o.morphTargetDictionary=undefined}(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(done.has(m))return;done.add(m);if(m.name==='Skin')m.color.set(0xe6bf9f);else if(m.name==='Iris')m.color.set(0x000000);else m.color.convertLinearToSRGB();m.morphTargets=false;m.morphNormals=false;m.needsUpdate=true})});
 const clip=g.animations.find(a=>a.name==='Exam_Full');
 for(const t of clip.tracks){const i=t.name.lastIndexOf('.'),nm=t.name.slice(0,i),pr=t.name.slice(i+1),b=pat.getObjectByName(nm);if(!b)continue;
  if(pr==='quaternion'){if(t.times.length>3){qt[nm]=t.createInterpolant();bn[nm]=b}else b.quaternion.fromArray(t.values,0)}
  else if(pr==='position')b.position.fromArray(t.values,0);else if(pr==='scale')b.scale.fromArray(t.values,0)}
 sampleAt(LIE,endp);sampleAt(ct,raw);for(const k in raw)disp[k]=raw[k].slice();skin()},e=>console.error(e));
// ---------- panels
function mkPanel(w,h,cw,ch){const cv=document.createElement('canvas');cv.width=cw;cv.height=ch;const tx=new THREE.CanvasTexture(cv);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tx,transparent:true}));sc.add(m);m.cv=cv;m.tx=tx;m.reg=[];return m}
const P1=mkPanel(1.5,.9,1000,600),P2=mkPanel(.7,.34,700,340);
let step=0,ci=0,timer=-1,t0=0;
function wrap(x,s,w){const ws=s.split(' ');let l='',o=[];for(const k of ws){if(x.measureText(l+' '+k).width>w&&l){o.push(l);l=k}else l=l?l+' '+k:k}o.push(l);return o}
function txt(x,s,px,py,w,lh){const L=wrap(x,s,w);L.forEach((l,i)=>x.fillText(l,px,py+i*lh));return py+L.length*lh}
function btn(P,x,y,w,h,label,fn,solid){const c=P.cv.getContext('2d');c.fillStyle=solid?'#0e8a8a':'#0a1015';c.fillRect(x,y,w,h);c.strokeStyle=solid?'#0e8a8a':'#8de';c.lineWidth=3;c.strokeRect(x,y,w,h);c.fillStyle='#fff';c.textAlign='center';c.font='600 30px "Arial Narrow",Arial,sans-serif';c.fillText(label,x+w/2,y+h*.68);P.reg.push({x,y,w,h,fn})}
function frame(P,w,h){const c=P.cv.getContext('2d');c.clearRect(0,0,w,h);P.reg=[];c.fillStyle='#0a1015';c.fillRect(0,0,w,h);c.strokeStyle='#8de';c.lineWidth=4;c.strokeRect(2,2,w-4,h-4);c.direction=ar?'rtl':'ltr';return c}
function draw(){const S=STEPS[step];let c=frame(P1,1000,600);const X=ar?940:60,al=ar?'right':'left';c.textAlign=al;
 if(S.res){const n=[log.foot,log.right,log.legs,log.watch,log.bed].filter(Boolean).length,cm=log.cmd/(log.cmd+log.btn||1),sc_=Math.round(((n/5*.7+cm*.3)*.6+qs/7*.4)*100),pass=sc_>=70&&log.bed;
  c.fillStyle='#8de';c.font='bold 54px "Arial Narrow",Arial';c.fillText(ar?'النتيجة':'Result',X,90);c.fillStyle='#fff';c.font='34px "Arial Narrow",Arial';
  [[`Foot of bed|عند نهاية السرير`,log.foot],[`Right side|الجهة اليمنى`,log.right],[`Legs viewed|رؤية الساقين`,log.legs],[`30 s watch|مراقبة 30 ثانية`,log.watch],[`Bed lowered to 0° (critical)|خفض السرير 0° (حرج)`,log.bed]].forEach((r,i)=>{c.fillText((r[1]?'✔ ':'✘ ')+r[0].split('|')[ar?1:0],X,160+i*48)});
  c.fillText((ar?'الاختبار: ':'Quiz: ')+qs+'/7   '+(ar?'أوامر صوتية: ':'Voice commands: ')+log.cmd+' / '+(log.cmd+log.btn)+'   '+(ar?'زمن فحص البطن: ':'Abdomen look: ')+Math.round(log.abd)+'s',X,410);
  c.fillStyle=pass?'#4f4':'#f66';c.font='bold 50px "Arial Narrow",Arial';c.fillText(sc_+'%  '+(pass?(ar?'ناجح — شهادة الإتمام':'PASS — Certificate of completion'):(ar?'لم تجتز: أعد المشاهد الناقصة':'FAIL — repeat the missed scenes')),X,500);}
 else if(S.quiz){const Q=QZ[qi];c.textAlign=al;c.fillStyle='#4de';c.font='bold 38px "Arial Narrow",Arial';c.fillText((ar?'سؤال ':'Question ')+(qi+1)+' / 7',X,55);c.fillStyle='#fff';c.font='32px "Arial Narrow",Arial';txt(c,T(Q.q),X,110,880,40);
 qo.forEach((k,i)=>btn(P1,60,185+i*72,880,60,T(Q.o[k]),()=>ans(k)));
 if(qa!=null){c.textAlign=al;c.fillStyle=qa==0?'#4f4':'#f66';c.font='bold 28px "Arial Narrow",Arial';txt(c,qa==0?(ar?'صحيح ✔':'Correct ✔'):((ar?'خطأ ✘ — الإجابة الصحيحة: ':'Wrong ✘ — correct answer: ')+T(Q.o[0])),X,505,880,34);btn(P1,740,525,200,60,T(REV.next),()=>{qi++;if(qi>=7)go(11);else{qStart();draw()}},1)}}
 else if(S.done){c.textAlign='center';c.fillStyle='#fff';c.font='bold 52px "Arial Narrow",Arial';c.fillText(ar?'لقد أكملت الفحص!':'You have completed the examination!',500,290);btn(P1,380,440,240,70,ar?'ابدأ الاختبار':'Start quiz',()=>go(10),1)}
 else if(S.sub){c.textAlign='center';c.fillStyle='#fff';c.font='bold 74px "Arial Narrow",Arial';c.fillText(T(S.t),500,200);c.fillStyle='#4de';c.font='46px "Arial Narrow",Arial';txt(c,T(S.sub),500,290,880,56);btn(P1,380,430,240,76,T(REV.start),()=>go(1),1)}
 else{c.fillStyle='#4de';c.font='bold 56px "Arial Narrow",Arial';c.fillText(T(S.t),X,80);let y=140;c.fillStyle='#fff';c.font='32px "Arial Narrow",Arial';if(S.i)y=txt(c,T(S.i),X,y,880,40)+8;
  const bs=S.b,two=bs.length>5,cw=two?430:880,half=Math.ceil(bs.length/2);c.font='29px "Arial Narrow",Arial';
  bs.forEach((b,k)=>{const col=two?(k>=half?1:0):0,row=two?(k%half):k;let cx=ar?X-col*450:X+col*450,yy=two?y+row*52:y;if(!two){var yy2=y;y=txt2(c,b,cx,y,cw,al)}else drawB(c,b,cx,yy,cw,al)});
  function drawB(c,b,cx,yy,cw,al){c.fillStyle='#4de';c.fillRect(ar?cx-14:cx,yy-16,14,14);const s=T(b),hd=s.split(':');c.fillStyle='#fff';const ox=ar?cx-26:cx+26;c.textAlign=al;txt(c,s,ox,yy,cw-30,34)}
  function txt2(c,b,cx,yy,cw,al){c.fillStyle='#4de';c.fillRect(ar?cx-14:cx,yy-16,14,14);c.fillStyle='#fff';c.textAlign=al;return txt(c,T(b),ar?cx-26:cx+26,yy,cw-30,34)+10}
  if(S.chair)btn(P1,60,500,10,10,'',()=>{});
  if(S.fin){if(log.bed)btn(P1,740,510,200,64,T(REV.fin),()=>go(9),1)}else btn(P1,740,510,200,64,T(REV.next),()=>nxt(),1)}
 btn(P1,20,540,90,50,ar?'EN':'ع',()=>tgl());P1.tx.needsUpdate=true;drawV()}
function drawV(){const S=STEPS[step],c=frame(P2,700,340),cm=S.c&&S.c[ci];c.textAlign='center';
 if(S.chair){c.fillStyle='#fff';c.font='28px "Arial Narrow",Arial';txt(c,T(REV.chairH),350,90,620,36);c.strokeStyle='#8de';c.lineWidth=5;c.beginPath();c.moveTo(150,260);c.lineTo(300,230);c.lineTo(250,170);c.moveTo(500,150);c.lineTo(500,290);c.lineTo(470,260);c.moveTo(500,290);c.lineTo(530,260);c.stroke()}
 else if(S.timer&&timer>=0&&!cm){c.fillStyle='#fff';c.font='bold 130px "Arial Narrow",Arial';c.fillText('00:'+String(Math.max(0,Math.ceil(timer))).padStart(2,'0'),350,220)}
 else if(cm){c.fillStyle='#fff';c.font='bold 32px "Arial Narrow",Arial';c.fillText('🎤 '+T(REV.voice),350,50);c.font='30px "Arial Narrow",Arial';txt(c,T(REV.say)+' “'+(ar?cm.a:cm.e)+'”',350,100,640,38);c.fillText(T(REV.or),170,260);btn(P2,230,215,420,70,T(REV.cont),()=>doCmd(0))}
 P2.tx.needsUpdate=true}
function tgl(){ar=!ar;draw()}document.getElementById('lg').onclick=tgl;
function place(){P1.scale.setScalar(1.45);P2.scale.setScalar(1.5);P1.position.set(2.22,2.15,-.45);P2.position.set(2.22,1.2,-.45);P1.rotation.set(0,-Math.PI/2,0);P2.rotation.set(0,-Math.PI/2,0)}
function go(n){step=n;ci=0;timer=-1;const S=STEPS[step];if(S.quiz){qi=0;qs=0;qStart()}handle.visible=!!S.chair;if(S.chair){tg.phi=Math.max(tg.phi,.785);Object.assign(tg,mk(),{jaw:0,tg:0,gz:0});playChair()}place();draw();listen()}
function nxt(){const S=STEPS[step];if(S.pos==='foot'){log.foot=rig.position.distanceTo(new THREE.Vector3(0,0,1.9))<1.3?1:0}
 if(S.pos==='right'){log.right=rig.position.x<-.3&&Math.abs(rig.position.z)<1?1:0}
 if(S.legs)log.legs=1;if(S.timer)log.legs=1;go(step+1)}
function doCmd(btnp){const S=STEPS[step],cm=S.c[ci];Object.assign(tg,cm.p);playCmd(cm.e);if(btnp===0)log.btn++;else log.cmd++;ci++;if(ci>=S.c.length){ci=0;S.c=null;if(S.timer){timer=30}}draw();listen()}
// speech
let rec;function listen(){try{rec&&rec.abort()}catch(e){}const S=STEPS[step],cm=S.c&&S.c[ci];if(!cm)return;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;rec=new SR();rec.lang=ar?'ar-SA':'en-US';rec.onresult=e=>{const s=e.results[0][0].transcript.toLowerCase(),k=(ar?cm.a:cm.e).toLowerCase().split(' ').filter(w=>w.length>3);if(k.some(w=>s.includes(w)))doCmd(1)};rec.onerror=()=>{};try{rec.start()}catch(e){}}
// interaction
const rc=new THREE.Raycaster(),mp=new THREE.Vector2(),ring=new THREE.Mesh(new THREE.RingGeometry(.18,.24,32).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0x2f2}));const arw=new THREE.Mesh(new THREE.ConeGeometry(.08,.2,3).rotateX(-Math.PI/2),ring.material);ring.add(arw);arw.position.z=-.05;ring.visible=false;sc.add(ring);
let drag=null;
function press(r){rc.ray.copy(r);for(const P of[P1,P2]){const h=rc.intersectObject(P)[0];if(h){const u=h.uv,x=u.x*P.cv.width,y=(1-u.y)*P.cv.height;for(const g of P.reg)if(x>g.x&&x<g.x+g.w&&y>g.y&&y<g.y+g.h){g.fn();return}}}
 if(handle.visible&&rc.intersectObject(handle)[0]){drag=1;return}
 const f=rc.intersectObject(floor)[0];if(f){rig.position.set(Math.max(-2.4,Math.min(2.0,f.point.x)),0,Math.max(-3.6,Math.min(3.1,f.point.z)))}}
function dragUpdate(r){const pl=new THREE.Plane(new THREE.Vector3(1,0,0),0),v=new THREE.Vector3();if(r.intersectPlane(pl,v)){tg.phi=Math.min(.785,Math.max(0,Math.atan2(v.y-.64,-(v.z+.2))))}}
const ctr=[0,1].map(i=>{const c=R.xr.getController(i);rig.add(c);c.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3(0,0,-4)]),new THREE.LineBasicMaterial({color:0x3af})));
 const ray=()=>{const m=new THREE.Matrix4().extractRotation(c.matrixWorld);return new THREE.Ray(new THREE.Vector3().setFromMatrixPosition(c.matrixWorld),new THREE.Vector3(0,0,-1).applyMatrix4(m))};c.ray=ray;
 c.addEventListener('selectstart',()=>press(ray()));c.addEventListener('selectend',()=>drag=null);return c});
let dn=null,yaw=0,pit=0,moved=0;const dom=R.domElement;
dom.onpointerdown=e=>{dn=[e.clientX,e.clientY];moved=0;if(handle.visible){mp.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);rc.setFromCamera(mp,cam);if(rc.intersectObject(handle)[0]){drag=1;dn=null}}};
dom.onpointermove=e=>{if(drag&&!R.xr.isPresenting){mp.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);rc.setFromCamera(mp,cam);dragUpdate(rc.ray)}else if(dn){const dx=e.clientX-dn[0],dy=e.clientY-dn[1];moved+=Math.abs(dx)+Math.abs(dy);yaw-=dx*.004;pit=Math.max(-1,Math.min(1,pit-dy*.004));dn=[e.clientX,e.clientY];rig.rotation.y=yaw;cam.rotation.x=pit}};
dom.onpointerup=e=>{drag=null;if(dn&&moved<6){mp.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);rc.setFromCamera(mp,cam);press(rc.ray)}dn=null};
addEventListener('resize',()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
const clk=new THREE.Clock(),ab=new THREE.Vector3(0,.8,.2);
R.setAnimationLoop(()=>{const dt=clk.getDelta();let ch=0;for(const k in tg){const d=tg[k]-st[k];if(Math.abs(d)>.002){st[k]+=d*Math.min(1,dt*4);ch=1}}if(pat){const mv=stepAnim(dt);if(mv||ch)skin()}
 if(drag&&R.xr.isPresenting){dragUpdate(ctr[0].ray())}
 if(handle.visible&&st.phi<.03&&!log.bed){log.bed=1;draw()}
 if(timer>0){timer-=dt;if(timer<=0){timer=0;log.watch=1}drawV()}
 if(STEPS[step].fin&&log.bed){const c=R.xr.isPresenting?R.xr.getCamera(cam):cam,p=new THREE.Vector3(),d=new THREE.Vector3();c.getWorldPosition(p);c.getWorldDirection(d);const v=ab.clone().sub(p);if(v.length()<2.2&&v.normalize().dot(d)>.8)log.abd+=dt}
 const c0=R.xr.isPresenting?ctr[1].ray():null;if(R.xr.isPresenting){const f=new THREE.Raycaster();f.ray.copy(ctr[0].ray());const h=f.intersectObject(floor)[0];ring.visible=!!h;if(h)ring.position.copy(h.point).setY(.02)}
 R.render(sc,cam)});
go(0);

document.getElementById('ld').remove()}
boot().catch(e=>fail(e));