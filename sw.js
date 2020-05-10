importScripts('vendor/workbox/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: 'vendor/workbox/'
});
const {precacheAndRoute} = workbox.precaching;
const {registerRoute} = workbox.routing;
const {CacheOnly} =workbox.strategies

precacheAndRoute([{"revision":"bf75dab5c0d06475049dc57197711321","url":"daily-analysis.html"},{"revision":"cc26ad0f819178fd40e1d9c86aebd898","url":"favicon.ico"},{"revision":"cbfb354a7355942415e46784d783394e","url":"imgs/icon.png"},{"revision":"0fcbbe16feb9a58377d5050cd1eeb951","url":"index.html"},{"revision":"1568ef384f74902a9a20281ce438de82","url":"js/core/bundle.js"},{"revision":"fd1952b14dffbcdb85ec9ac8b93c3214","url":"js/core/cacheStorage.js"},{"revision":"743fca4ce4b4c971b9587b92af8a1aa3","url":"js/core/db.d.ts"},{"revision":"f8abbd8f193b989af68b805375cbab7d","url":"js/core/db.js"},{"revision":"aa3915b7ff92b4b89db138856579fa65","url":"js/core/index.d.ts"},{"revision":"29eda29974c10f9ab9e7557ee6e64565","url":"js/core/index.js"},{"revision":"931d293d656688c25e35d7625f4a0e86","url":"js/index.js"},{"revision":"57b386e55132229adcd98671ae1788ca","url":"js/lang.js"},{"revision":"12d80dfe9f559408292e1361bef86aab","url":"manifest.json"},{"revision":"65f0137270c4d8974a6ecaf789448443","url":"monthly-analysis.html"},{"revision":"a49f0f9d6180f06800588d5b54fd3448","url":"new-cost.html"},{"revision":"b33c74b17610142b537153f63fab97c8","url":"preset-type-manage.html"},{"revision":"84da5daa23ecdb420f96f00ed8802d33","url":"test.html"},{"revision":"d3803b07a9819728e5b7ad091bba9eab","url":"TODO.md"},{"revision":"b5c2301eb15826bf38c9bdcaa3bbe786","url":"vendor/Chart.min.js"},{"revision":"adfb0281336ee5959cba66034f87ad81","url":"vendor/onsen/font_awesome/css/all.css"},{"revision":"e4c542a7f6bf6f74fdd8cdf6e8096396","url":"vendor/onsen/font_awesome/css/all.min.css"},{"revision":"d835422454fbfc88c7671e67b675af3d","url":"vendor/onsen/font_awesome/css/brands.css"},{"revision":"c9fcdfd0e53dec8552f9dd3b40f75973","url":"vendor/onsen/font_awesome/css/brands.min.css"},{"revision":"66e7586b871fe8363caaac862a267490","url":"vendor/onsen/font_awesome/css/fontawesome.css"},{"revision":"f87b6becf6c4595d38a59016c2460a0b","url":"vendor/onsen/font_awesome/css/fontawesome.min.css"},{"revision":"9e658342a40c268d3d1a8961b31dbf74","url":"vendor/onsen/font_awesome/css/regular.css"},{"revision":"b7c0350118f1465ba68e3b7c93fcc360","url":"vendor/onsen/font_awesome/css/regular.min.css"},{"revision":"d3423093180bf392c68aa82d2a3b4f41","url":"vendor/onsen/font_awesome/css/solid.css"},{"revision":"cddcd8fd12da8dd6bcad774583afd75c","url":"vendor/onsen/font_awesome/css/solid.min.css"},{"revision":"1fbe1ad827c60032129bc6c909d466a6","url":"vendor/onsen/font_awesome/css/svg-with-js.css"},{"revision":"12a9e48af01b59c9e03476b1d0189c98","url":"vendor/onsen/font_awesome/css/svg-with-js.min.css"},{"revision":"474541b77d38d4243656362bb2019a25","url":"vendor/onsen/font_awesome/css/v4-shims.css"},{"revision":"d12f3b2a85c84ec27b7d27eec733af10","url":"vendor/onsen/font_awesome/css/v4-shims.min.css"},{"revision":"a7b95dbdd87e0c809570affaf366a434","url":"vendor/onsen/font_awesome/webfonts/fa-brands-400.eot"},{"revision":"5bf145531213545e03ff41cd27df7d2b","url":"vendor/onsen/font_awesome/webfonts/fa-brands-400.svg"},{"revision":"98b6db59be947f563350d2284fc9ea36","url":"vendor/onsen/font_awesome/webfonts/fa-brands-400.ttf"},{"revision":"2ef8ba3410dcc71578a880e7064acd7a","url":"vendor/onsen/font_awesome/webfonts/fa-brands-400.woff"},{"revision":"5e2f92123d241cabecf0b289b9b08d4a","url":"vendor/onsen/font_awesome/webfonts/fa-brands-400.woff2"},{"revision":"dcce4b7fbd5e895561e18af4668265af","url":"vendor/onsen/font_awesome/webfonts/fa-regular-400.eot"},{"revision":"5eb754ab7dbd2fee562360528db4c3c0","url":"vendor/onsen/font_awesome/webfonts/fa-regular-400.svg"},{"revision":"65b9977aa23185e8964b36eddbce7a20","url":"vendor/onsen/font_awesome/webfonts/fa-regular-400.ttf"},{"revision":"427d721b86fc9c68b2e85ad42b69238c","url":"vendor/onsen/font_awesome/webfonts/fa-regular-400.woff"},{"revision":"e6257a726a0cf6ec8c6fec22821c055f","url":"vendor/onsen/font_awesome/webfonts/fa-regular-400.woff2"},{"revision":"46e7cec623d8bd790d9fdbc8de2d3ee7","url":"vendor/onsen/font_awesome/webfonts/fa-solid-900.eot"},{"revision":"49279363201ed19a840796e05a74a91b","url":"vendor/onsen/font_awesome/webfonts/fa-solid-900.svg"},{"revision":"ff8d9f8adb0d09f11d4816a152672f53","url":"vendor/onsen/font_awesome/webfonts/fa-solid-900.ttf"},{"revision":"a7140145ebaaf5fb14e40430af5d25c4","url":"vendor/onsen/font_awesome/webfonts/fa-solid-900.woff"},{"revision":"418dad87601f9c8abd0e5798c0dc1feb","url":"vendor/onsen/font_awesome/webfonts/fa-solid-900.woff2"},{"revision":"73f88ef494af338af1ab5ab8a52e626e","url":"vendor/onsen/ionicons/css/ionicons-core.css"},{"revision":"4975f2a9ea0bc543e7809f37de482b47","url":"vendor/onsen/ionicons/css/ionicons-core.min.css"},{"revision":"a75a902831e308825a19f8d6fac6f16e","url":"vendor/onsen/ionicons/css/ionicons.css"},{"revision":"d068b6eb54633e69437b7b32c1ee36c6","url":"vendor/onsen/ionicons/css/ionicons.min.css"},{"revision":"7f9fdd5e7c0656fea97141765f3e0b50","url":"vendor/onsen/ionicons/fonts/ionicons.eot"},{"revision":"665921072642ed354618b32af7425a22","url":"vendor/onsen/ionicons/fonts/ionicons.svg"},{"revision":"cfdc15225683b7529d6ba1e9d8a9be59","url":"vendor/onsen/ionicons/fonts/ionicons.ttf"},{"revision":"c37ad37a3a23417b739ac3b297416201","url":"vendor/onsen/ionicons/fonts/ionicons.woff"},{"revision":"96f1c901c087fb64019f7665f7f8aca6","url":"vendor/onsen/ionicons/fonts/ionicons.woff2"},{"revision":"612a746cc755cfd3ceace05a85ab0da5","url":"vendor/onsen/material-design-iconic-font/css/material-design-iconic-font.css"},{"revision":"e9365fe85b7e4db79a87015e52c3db6c","url":"vendor/onsen/material-design-iconic-font/css/material-design-iconic-font.min.css"},{"revision":"e833b2e2471274c238c0553f11031e6a","url":"vendor/onsen/material-design-iconic-font/fonts/Material-Design-Iconic-Font.eot"},{"revision":"381f7754080ed2299a7c66a2504dff02","url":"vendor/onsen/material-design-iconic-font/fonts/Material-Design-Iconic-Font.svg"},{"revision":"b351bd62abcd96e924d9f44a3da169a7","url":"vendor/onsen/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf"},{"revision":"d2a55d331bdd1a7ea97a8a1fbb3c569c","url":"vendor/onsen/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff"},{"revision":"a4d31128b633bc0b1cc1f18a34fb3851","url":"vendor/onsen/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff2"},{"revision":"083c076785f3a37499e6fea161c38db0","url":"vendor/onsen/onsen-css-components.min.css"},{"revision":"8fee004865aafd4b52a21fea12134370","url":"vendor/onsen/onsenui.css"},{"revision":"574e5139fe464c640bea671336d382ad","url":"vendor/onsen/onsenui.min.js"},{"revision":"b0254a6cac766e81034dadc9d534e1f3","url":"vendor/workbox/workbox-background-sync.dev.js"},{"revision":"a2c166daa0032ad726aac00fe62675a6","url":"vendor/workbox/workbox-background-sync.prod.js"},{"revision":"ed372d374eba0028636a4cf4f0367ce4","url":"vendor/workbox/workbox-broadcast-update.dev.js"},{"revision":"0f1b3d4e9b8dcddd91282165f5c4de88","url":"vendor/workbox/workbox-broadcast-update.prod.js"},{"revision":"3b159f3a83e5702a16d5b77ecb6adbbf","url":"vendor/workbox/workbox-cacheable-response.dev.js"},{"revision":"11d64d7b25e1c10e4841ae1117b14495","url":"vendor/workbox/workbox-cacheable-response.prod.js"},{"revision":"41a0f0eaadee17d96a5c913eb998ce09","url":"vendor/workbox/workbox-core.dev.js"},{"revision":"7b8d2eb46b85946a8eec9d77e5d4dbf8","url":"vendor/workbox/workbox-core.prod.js"},{"revision":"1f7a7664e7fd2e17991888f89b698765","url":"vendor/workbox/workbox-expiration.dev.js"},{"revision":"b943e744779a4e401164c4ca638013b3","url":"vendor/workbox/workbox-expiration.prod.js"},{"revision":"de94b06dd21eee1eb24d12110ff43c4c","url":"vendor/workbox/workbox-navigation-preload.dev.js"},{"revision":"3246d2defb0808206b340c7f35d5af67","url":"vendor/workbox/workbox-navigation-preload.prod.js"},{"revision":"1b3f038bd588f13a0671c61bf1257dc2","url":"vendor/workbox/workbox-offline-ga.dev.js"},{"revision":"22e23dd9ead077768c396bc5844ea694","url":"vendor/workbox/workbox-offline-ga.prod.js"},{"revision":"3a3c9c0855eb226c78e3acb4002c1038","url":"vendor/workbox/workbox-precaching.dev.js"},{"revision":"c57f95137010e21657849206c743ef9b","url":"vendor/workbox/workbox-precaching.prod.js"},{"revision":"c988e0385d638591b2646fcfb5c85b1a","url":"vendor/workbox/workbox-range-requests.dev.js"},{"revision":"0c0ede92556a40b19fbf8124f28babf0","url":"vendor/workbox/workbox-range-requests.prod.js"},{"revision":"2548c0d023a2fb32e486bd23d7298ed0","url":"vendor/workbox/workbox-routing.dev.js"},{"revision":"0107c49dea3a35e190a46c2ed35a2cfa","url":"vendor/workbox/workbox-routing.prod.js"},{"revision":"d6e79d0ca5c9b2850823cf480ea97b8d","url":"vendor/workbox/workbox-strategies.dev.js"},{"revision":"e95ef76b307e44395742ebc921b554e1","url":"vendor/workbox/workbox-strategies.prod.js"},{"revision":"4d1f2bb15f32c7178a652523d454c905","url":"vendor/workbox/workbox-streams.dev.js"},{"revision":"200992540a8ae7e9d216cce0fca2e350","url":"vendor/workbox/workbox-streams.prod.js"},{"revision":"a3219bbb2b7f4fc864090a77cd2839e8","url":"vendor/workbox/workbox-sw.js"},{"revision":"0118850b3fb1af1853162d26061a7673","url":"vendor/workbox/workbox-window.dev.umd.js"},{"revision":"933e0ec7461293b16af03a4f810b6649","url":"vendor/workbox/workbox-window.prod.umd.js"},{"revision":"fe6e4f63054f6a421430ed6c6790f72d","url":"weekly-analysis.html"},{"revision":"ecb21ec681de3c097856217b766da8cb","url":"workbox-config.js"}], {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});

registerRoute(
  /\//,
  new CacheOnly()
);