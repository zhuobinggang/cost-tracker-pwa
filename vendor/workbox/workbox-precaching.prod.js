this.workbox=this.workbox||{},this.workbox.precaching=function(t,e,n,i,s,c){"use strict";try{self["workbox:precaching:5.1.2"]&&_()}catch(t){}const r=[],o={get:()=>r,add(t){r.push(...t)}};function a(t){if(!t)throw new s.WorkboxError("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s.WorkboxError("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),c=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:c.href}}class h{constructor(t){this.t=e.cacheNames.getPrecacheName(t),this.i=new Map,this.s=new Map,this.o=new Map}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=a(n),c="string"!=typeof n&&n.revision?"reload":"default";if(this.i.has(i)&&this.i.get(i)!==t)throw new s.WorkboxError("add-to-cache-list-conflicting-entries",{firstEntry:this.i.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.o.has(t)&&this.o.get(t)!==n.integrity)throw new s.WorkboxError("add-to-cache-list-conflicting-integrities",{url:i});this.o.set(t,n.integrity)}if(this.i.set(i,t),this.s.set(i,c),e.length>0){const t="Workbox is precaching URLs without revision "+`info: ${e.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(t)}}}async install({event:t,plugins:e}={}){const n=[],i=[],s=await self.caches.open(this.t),c=await s.keys(),r=new Set(c.map(t=>t.url));for(const[t,e]of this.i)r.has(e)?i.push(t):n.push({cacheKey:e,url:t});const o=n.map(({cacheKey:n,url:i})=>{const s=this.o.get(n),c=this.s.get(i);return this.h({cacheKey:n,cacheMode:c,event:t,integrity:s,plugins:e,url:i})});return await Promise.all(o),{updatedURLs:n.map(t=>t.url),notUpdatedURLs:i}}async activate(){const t=await self.caches.open(this.t),e=await t.keys(),n=new Set(this.i.values()),i=[];for(const s of e)n.has(s.url)||(await t.delete(s),i.push(s.url));return{deletedURLs:i}}async h({cacheKey:t,url:e,cacheMode:r,event:o,plugins:a,integrity:h}){const u=new Request(e,{integrity:h,cache:r,credentials:"same-origin"});let l,f=await i.fetchWrapper.fetch({event:o,plugins:a,request:u});for(const t of a||[])"cacheWillUpdate"in t&&(l=t);if(!(l?await l.cacheWillUpdate({event:o,request:u,response:f}):f.status<400))throw new s.WorkboxError("bad-precaching-response",{url:e,status:f.status});f.redirected&&(f=await c.copyResponse(f)),await n.cacheWrapper.put({event:o,plugins:a,response:f,request:t===e?u:new Request(t),cacheName:this.t,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.i}getCachedURLs(){return[...this.i.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.i.get(e.href)}async matchPrecache(t){const e=t instanceof Request?t.url:t,n=this.getCacheKeyForURL(e);if(n){return(await self.caches.open(this.t)).match(n)}}createHandler(t=!0){return async({request:e})=>{try{const t=await this.matchPrecache(e);if(t)return t;throw new s.WorkboxError("missing-precache-entry",{cacheName:this.t,url:e instanceof Request?e.url:e})}catch(n){if(t)return fetch(e);throw n}}}createHandlerBoundToURL(t,e=!0){if(!this.getCacheKeyForURL(t))throw new s.WorkboxError("non-precached-url",{url:t});const n=this.createHandler(e),i=new Request(t);return()=>n({request:i})}}let u;const l=()=>(u||(u=new h),u);const f=(t,e)=>{const n=l().getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e,directoryIndex:n,cleanURLs:i,urlManipulation:s}={}){const c=new URL(t,location.href);c.hash="",yield c.href;const r=function(t,e=[]){for(const n of[...t.searchParams.keys()])e.some(t=>t.test(n))&&t.searchParams.delete(n);return t}(c,e);if(yield r.href,n&&r.pathname.endsWith("/")){const t=new URL(r.href);t.pathname+=n,yield t.href}if(i){const t=new URL(r.href);t.pathname+=".html",yield t.href}if(s){const t=s({url:c});for(const e of t)yield e.href}}(t,e)){const t=n.get(i);if(t)return t}};let w=!1;function d(t){w||((({ignoreURLParametersMatching:t=[/^utm_/],directoryIndex:n="index.html",cleanURLs:i=!0,urlManipulation:s}={})=>{const c=e.cacheNames.getPrecacheName();self.addEventListener("fetch",e=>{const r=f(e.request.url,{cleanURLs:i,directoryIndex:n,ignoreURLParametersMatching:t,urlManipulation:s});if(!r)return;let o=self.caches.open(c).then(t=>t.match(r)).then(t=>t||fetch(r));e.respondWith(o)})})(t),w=!0)}const y=t=>{const e=l(),n=o.get();t.waitUntil(e.install({event:t,plugins:n}).catch(t=>{throw t}))},p=t=>{const e=l();t.waitUntil(e.activate())};function g(t){l().addToCacheList(t),t.length>0&&(self.addEventListener("install",y),self.addEventListener("activate",p))}return t.PrecacheController=h,t.addPlugins=function(t){o.add(t)},t.addRoute=d,t.cleanupOutdatedCaches=function(){self.addEventListener("activate",t=>{const n=e.cacheNames.getPrecacheName();t.waitUntil((async(t,e="-precache-")=>{const n=(await self.caches.keys()).filter(n=>n.includes(e)&&n.includes(self.registration.scope)&&n!==t);return await Promise.all(n.map(t=>self.caches.delete(t))),n})(n).then(t=>{}))})},t.createHandler=function(t=!0){return l().createHandler(t)},t.createHandlerBoundToURL=function(t){return l().createHandlerBoundToURL(t)},t.getCacheKeyForURL=function(t){return l().getCacheKeyForURL(t)},t.matchPrecache=function(t){return l().matchPrecache(t)},t.precache=g,t.precacheAndRoute=function(t,e){g(t),d(e)},t}({},workbox.core._private,workbox.core._private,workbox.core._private,workbox.core._private,workbox.core);
//# sourceMappingURL=workbox-precaching.prod.js.map
