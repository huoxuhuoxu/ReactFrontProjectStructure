// 检测访问来源,pc || wep
const detechmod = () => {
    let n = window.navigator.userAgent;
    if( n.match(/Android/i)
        || n.match(/webOS/i)
        || n.match(/iPhone/i)
        || n.match(/iPad/i)
        || n.match(/iPod/i)
        || n.match(/BlackBerry/i)
        || n.match(/Windows Phone/i)
    ){
        return true;
    }else {
        return false;
    }
};

// rgb转hsl
const rgbToHsl = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

// hsl转rgb
const hslToRgb = (h, s, l) => {
    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = function (p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// 微信 SPA 更换 title
const wxUpdateDocumentTitle = (n) => {
    let $body = document.getElementsByTagName("body")[0];
    document.title = n;
    let _$iframe = document.createElement("iframe");
    _$iframe.src = "/favicon.ico";
    _$iframe.onload = function(){
        _$iframe.onload = null;
        $body.removeChild(_$iframe);
    };
    $body.appendChild(_$iframe);
};

// 建立 rem
const usingRem = () => {
    let w = window.screen.availWidth;
    document.getElementsByTagName("html")[0].style.fontSize = (w/10) + "px";
    return w;
};

// 适用于自动执行的动画, 返回RAF
const usingAnimationFrame = () => (window.requestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    function(callback) {
                                        window.setTimeout(callback, 1000 / 60);
                                    });

// 检测安卓
const testAndroid = () => /Android/i.test(window.navigator.userAgent);

export {
    rgbToHsl,
    hslToRgb,
    wxUpdateDocumentTitle,
    usingAnimationFrame,
    reduceDomTree,
    reduceClassNameTree,
    usingRem,
    handlerTouchControl,
    detechmod,
    testAndroid
};

