importScripts('vendor/workbox/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: 'vendor/workbox/'
});
const {precacheAndRoute} = workbox.precaching;
const {registerRoute} = workbox.routing;
const {CacheOnly} =workbox.strategies

precacheAndRoute(self.__WB_MANIFEST, {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});

registerRoute(
  /\//,
  new CacheOnly()
);