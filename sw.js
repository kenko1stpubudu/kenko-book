/* Kenko 1st Organic e-book: offline support. Bump VERSION after every upload so phones fetch the new files. */
const VERSION='kenko-book-v1';
const CORE=["./","index.html","book-content.js","recipes-content.js","image-slot.js","ds/styles.css","manifest.webmanifest","assets/kenko-logo.png","assets/icon-32.png","assets/icon-180.png","assets/icon-192.png","assets/icon-512.png","assets/cert/pgs.jpg","assets/cert/award.jpg","assets/ch/cabbage.jpg","assets/ch/ch1.jpg","assets/ch/kitchen.jpg","assets/farm/beetroot.jpg","assets/farm/corn.jpg","assets/farm/greenhouse1.jpg","assets/farm/greenhouse2.jpg","assets/farm/papaya.jpg","assets/farm/papaya_banana.jpg","assets/farm/seedlings.jpg","assets/farm/tea.jpg","assets/items/herb_1.jpg","assets/items/herb_2.jpg","assets/items/herb_3.jpg","assets/items/herb_4.jpg","assets/items/herb_5.jpg","assets/items/herb_6.jpg","assets/items/herb_7.jpg","assets/items/herb_8.jpg","assets/items/herb_9.jpg","assets/items/herb_10.jpg","assets/items/herb_11.jpg","assets/items/herb_12.jpg","assets/items/herb_13.jpg","assets/items/herb_14.jpg","assets/items/herb_15.jpg","assets/items/herb_16.jpg","assets/items/herb_17.jpg","assets/items/herb_18.jpg","assets/items/herb_19.jpg","assets/items/food_1.jpg","assets/items/food_2.jpg","assets/items/food_3.jpg","assets/items/food_4.jpg","assets/items/food_5.jpg","assets/items/food_6.jpg","assets/items/food_7.jpg","assets/items/food_8.jpg","assets/items/food_9.jpg","assets/items/food_10.jpg","assets/items/food_11.jpg","assets/items/food_12.jpg","assets/items/food_13.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  const font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if(u.origin!==location.origin&&!font)return;
  if(r.mode==='navigate'||/\.(html|js|css|webmanifest)$/.test(u.pathname)){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp));}return res;})));
});
