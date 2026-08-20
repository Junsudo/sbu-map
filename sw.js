const C='sbumap-v5';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./d_bld1.js','./d_bld2.js','./d_str.js','./d_poi.js','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'].map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.mode==='navigate'||req.url.endsWith('/index.html')){
    e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(req,cp));return r;})
      .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req)));
  }
});
