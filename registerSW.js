if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/ref-helper/sw.js', { scope: '/ref-helper/' })})}