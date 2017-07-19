

import $ from 'npm-zepto';

// 检测访问来源,pc || wep
const DETECTMOD = () => {
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



// 手机端调试方式,转发信息
const LOGGER_AJAX = (infos) => {
    let obj = {
        url: "/logger/infos",
        data: infos,
        type: "GET",
    };
    $.ajax(obj);
};

// 转发给日志服务器
const LOGGER_AJAXPARAMS = (infos) => {
    let obj = {
        url: 'https://qixidamodaoshi.com/logger/infos',
        data: infos,
        type: "GET",
        jsonp: "callbackparams"
    }
    $.ajax(obj);
};

// rgb转hsl
const RGB_TO_HSL = (r, g, b) => {
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
const HSL_TO_RGB = (h, s, l) => {
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
const UPDATE_DOCUMENT_TITLE = (n) => {
    let $body = $('body');
    document.title = n;
    let _$iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
        setTimeout(function() {
            _$iframe.off('load').remove();
        },0)
    }).appendTo($body);
}

// 建立全局对象
const CREATE_GLOBALS = () => {
    window.GLOBALS = {};
};

// 建立 rem
const USING_REM = () => {
    let w = window.screen.availWidth;
    window.GLOBALS.rem = (w/10);
    document.getElementsByTagName("html")[0].style.fontSize = (w/10) + "px";
};

// 处理华为等有内置触摸条的, 只有需要锁定第一视口情况,才需要
const HANDLER_TOUCH_CONTROL = (c = false) => {
    let a = ((window.screen.availHeight/window.screen.availWidth).toFixed(2)*100),
        b = ((document.body.scrollHeight/window.screen.availWidth).toFixed(2)*100);
    if(c){
        return a === b;
    }
    window.GLOBALS.optimization = (a === b);
};

// debugging, app or webpage
const DEBUGGING_APP_OR_WEBPAGE = () => {
    let b = /^http/.test(window.location.protocol);
    window.GLOBALS.DEBUGGING_PROTOCOL = b;
};

// 适用于自动执行的动画, 返回RAF
const USING_ANIMATION_FRAME = () => (window.requestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.oRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    function(callback) {
                                        window.setTimeout(callback, 1000 / 60);
                                    });

// 递归树,解析DOM
const REDUCE_DOM_TREE = (oDomObject, sDomName) => {
    if(oDomObject.nodeName.toLowerCase() == sDomName){
        return oDomObject;
    }
    return REDUCE_DOM_TREE(oDomObject.parentNode, sDomName);
};

// 递归树,解析className
const REDUCE_CLASSNAME_TREE = (oDomObject, sClassName) => {
    if(oDomObject.className.includes(sClassName)){
        return oDomObject;
    }
    return REDUCE_CLASSNAME_TREE(oDomObject.parentNode, sClassName);
};

// 阻止触摸事件
const CANCEL_BUBBLE_EVENT = (e) => {
    e.preventDefault();
};

// 阻止默认事件
const STOP_PROPAGATION = (e) => {
    e.stopPropagation();
    return false;
};

// 检测安卓
const TEST_ANDROID = () => /Android/i.test(window.navigator.userAgent);


// 数字每三位加, 生成例如: 20000 = 20,000
const HANDLER_THOUSAND = (num) => {
    if(Number(num) >= 1000){
        num += '';
        let c = num.split('').reverse();
        for(let i=2,l=c.length; i<l; i+=3){
            if(i!=l-1){
                c[i] = ','+c[i];
            }
        }
        num = c.reverse().join('');
    }
    return num;
};

// Youtube时间转换 PT3H47M23S
const YOUTUBE_REGEXP = {
    H: /(\d+)H/,
    M: /(\d+)M/,
    S: /(\d+)S/
};

const YOUTUBE_TIME_ADD_ZERO2 = s => {
    let nS = s + '';
    if(nS.length < 2){
        return '0' + nS;
    }
    return nS;
};


// 给string对象添加方法，将 "12345" 返回 "12,345"
String.prototype.addSemi = function(){
    let num = this;
    let c = num.split('').reverse();
    for(let i=2,l=c.length; i<l; i+=3){
        if(i!==l-1){
            c[i] = ','+c[i];
        }
    }
    num = c.reverse().join('');
    return num;
};


// 给Number对象添加方法，将 12345 返回 "12,345"
Number.prototype.addSemi = function(){
    let num = this;
    if(Number(num) >= 1000){
        num += '';
        let c = num.split('').reverse();
        for(let i=2,l=c.length; i<l; i+=3){
            if(i!==l-1){
                c[i] = ','+c[i];
            }
        }
        num = c.reverse().join('');
    }
    return num;
};

// 给时间对象添加格式化方法
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    };

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length===1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};


// reset fetch
const RESET_FETCH = (setToken) => {
    window.oldFetch = window.fetch;
    window.fetch = async (url, obj, timeout = 8000, headers) => {
        let oFormData = new FormData();
        let body;
        oFormData.append('token', window.GLOBALS.token);
        for(let i in obj){
            if(i === 'avatar'){
                oFormData.append(i, obj[i]);
            }else if(typeof obj[i] === "object"){
                oFormData.append(i, JSON.stringify(obj[i]));
            }else{
                oFormData.append(i, obj[i]);
            }
        }
        body = {
            body: oFormData,
            method: 'POST'
        };
        if(headers){
            body['headers'] = headers;
        }
        let timer;
        let oPromise = (url, body) => {
            return new Promise((resolve, reject) => {
                timer = setTimeout(()=>{
                    reject(1);
                }, timeout);
                window.oldFetch(url, body).then( res=>{
                    clearTimeout(timer);
                    resolve(res);
                }).catch( err=>{
                    clearTimeout(timer);
                    reject(err);
                });
            });
        };

        let res;
        try{
            res = await ( await oPromise(url, body)).json();
        }catch(err){
            res = { errcode: -1 };
        }
        if(res.token){
            window.GLOBALS.token = res.token;
            console.log('refresh token : '+window.GLOBALS.token);
            setToken('TOKEN', window.GLOBALS.token);
        }
        return res;
    };
};


exports.loggerAjax = LOGGER_AJAX;
exports.loggerAjaxParams = LOGGER_AJAXPARAMS;
exports.rgbToHsl = RGB_TO_HSL;
exports.hslToRgb = HSL_TO_RGB;
exports.updateDocumentTitle = UPDATE_DOCUMENT_TITLE;
exports.usingAnimationFrame = USING_ANIMATION_FRAME;
exports.reduceDomTree = REDUCE_DOM_TREE;
exports.reduceClassNameTree = REDUCE_CLASSNAME_TREE;
exports.usingRem = USING_REM;
exports.handlerTouchControl = HANDLER_TOUCH_CONTROL;
exports.createGlobals = CREATE_GLOBALS;
exports.handlerThousand = HANDLER_THOUSAND;
exports.debuggingAppOrWebpage = DEBUGGING_APP_OR_WEBPAGE;
exports.resetToken = RESET_FETCH;

const TOOLS = {
	detechmod: DETECTMOD,
    cancelBubbleEvent: CANCEL_BUBBLE_EVENT,
    stopPropagation: STOP_PROPAGATION,
    testAndroid: TEST_ANDROID
};



export default TOOLS;
