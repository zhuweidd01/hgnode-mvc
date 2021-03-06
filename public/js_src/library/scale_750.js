'use strict';

(function (doc, win) {
    var docEl = doc.documentElement || doc.body,
        isIOS = navigator.userAgent.match(/iphone|ipod|ipad|Mac/gi),
        dRatio = win.devicePixelRatio,
        dpr = isIOS && dRatio != undefined ? Math.min(dRatio, 3) : dRatio != undefined ? dRatio : 1,
        //设备像素比devicePixelRatio
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    docEl.setAttribute('dpr', dpr);

    var recalc = function recalc() {
        //页面内容可见区域的宽度(兼容各种平台),对于ios设备devicePixelRatio值只可能是1或者2
        //当width=device-width时，可视区的宽度就是document.documentElement.clientWidth
        //安卓平台下可见区的宽度：document.body.clientWidth || document.documentElement.clientWidth
        var width = docEl.clientWidth || win.innerWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);