const app = document.querySelector("#app");
const backBtn = document.querySelector("#backBtn");
let page = "home", history = [];

const data = {
  vehicle: [["Make","Holden"],["Year","2009"],["Colour","Blue"],["Registration","DEMO-123"],["VIN","DEMO-VIN-0000"],["Status","Demo only"]],
  permit: [["Permit number","DEMO-UXP-1435"],["Start date","12 Jul 2026"],["Expiry","29 Aug 2026"],["Status","Sample / not valid"]]
};

function rows(items){
  return `<div class="list">${items.map(([a,b])=>`<div class="row"><span class="label">${a}</span><span class="value">${b}</span></div>`).join("")}</div>`;
}
function card(icon,title,sub,target){
  return `<button class="card" onclick="go('${target}')"><span class="card-icon">${icon}</span><span class="card-main"><span class="card-title">${title}</span><span class="card-sub">${sub}</span></span><span class="chev">›</span></button>`;
}
function render(){
  document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
  backBtn.classList.toggle("hidden", history.length===0);
  if(page==="home") app.innerHTML=`
    <div class="notice">INDEPENDENT DEMO — NOT AN OFFICIAL GOVERNMENT SERVICE</div>
    <h1>Welcome to RoadMate</h1><p>Quick access to fictional demo vehicle and permit information.</p>
    <div class="hero"><strong>Your road services demo</strong><p>Explore the screens and navigation. No real accounts, registrations or permits are connected.</p></div>
    <h2>Quick access</h2>
    ${card("🚗","My vehicle","2009 Holden · Demo vehicle","vehicle")}
    ${card("📄","Permit","View sample permit details","permit")}
    <h2>Services</h2>${card("▦","Registration & licensing","Explore demo service screens","services")}`;
  if(page==="vehicles") app.innerHTML=`<h1>Vehicles</h1><p>Demo vehicle information</p>${card("🚗","2009 Holden","Blue · DEMO-123","vehicle")}`;
  if(page==="services") app.innerHTML=`<h1>Services</h1><p>These screens are for demonstration only.</p>${["Registration","Licence","Permits","Vehicle reports"].map((x,i)=>card(["🪪","📋","📄","🔎"][i],x,"Open demo screen","service-"+x)).join("")}`;
  if(page==="profile") app.innerHTML=`<h1>Profile</h1>${rows([["Name","Demo User"],["Region","Victoria"],["App","RoadMate Victoria Demo"]])}<h2>About</h2><p>This independent prototype is not affiliated with or endorsed by VicRoads or the Victorian Government.</p>`;
  if(page==="vehicle") detail("Vehicle details",data.vehicle,"This is fictional demonstration data.");
  if(page==="permit") detail("Sample permit",data.permit,"This screen is a visual prototype only. It is not a valid permit and cannot be used as proof of registration or authority to drive.");
  if(page.startsWith("service-")) {
    const name=page.replace("service-","");
    app.innerHTML=`<div class="big-icon">✓</div><div class="center"><h1>${name} demo</h1><p>This is a non-functional prototype screen. No government systems, payments or real transactions are connected.</p></div>`;
  }
}
function detail(title,items,note){app.innerHTML=`<h1>${title}</h1>${rows(items)}<h2>Important</h2><p>${note}</p>`}
function go(next){history.push(page);page=next;render();window.scrollTo(0,0)}
backBtn.onclick=()=>{page=history.pop()||"home";render()}
document.querySelectorAll(".tab").forEach(x=>x.onclick=()=>{page=x.dataset.page;history=[];render();window.scrollTo(0,0)});
render();
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
