// hz_touch

/*
	@todo
	单点触摸 无跟随, SINGLE_TOUCH: 只支持单元素,只支持左右
	单点触摸 跟随, SINGLE_FOLLOW_TOUCH: 只支持单元素
	多点手势 跟随 MULTIPLE_FOLLOW_TOUCH: 只支持单元素, 根据两指进行计算:两指直线距离

*/

/*
	事件对象:
	touches:  屏幕上手指列表
	targetTouches:	当前元素上手指列表
	changedTouches:	当前事件手指列表

*/

/*
	@逻辑参数:
		SINGLE_TOUCH:
			sFlag: 手指划动方向
			oDirective: 根据sFlag转换1/-1
			bEnd: 是否可以触发划动
		
	@extends:
		cancel_bubble:
			阻止默认的触摸事件
			目前 需要传递函数调用阻止

*/



const FN_NULL = function(){};
const DEFAULT_ARGUMENTS = {
	touchmove: FN_NULL, 
	touchstart: FN_NULL, 
	touchend: FN_NULL
};

const SINGLE_TOUCH = (dom='body', {touchmove=FN_NULL, touchstart=FN_NULL, touchend=FN_NULL} = DEFAULT_ARGUMENTS) => {
	let oDom = document.querySelector(dom),
		oDirective = {
			"ltor": -1,
			"rtol": 1
		},
		bEnd = false,
		x, 
		sFlag;

	oDom.ontouchstart = function(e){
		let oEvent = e || event;
		x = oEvent.changedTouches[0].clientX;
		touchstart(oEvent);
	}
	oDom.ontouchmove = async function(e){
		let oEvent = e || event;
		if(bEnd){
			x = oEvent.changedTouches[0].clientX;
			return;
		}
		bEnd = true;

		let cX = oEvent.changedTouches[0].clientX;
		if(x - cX > 0){
			sFlag = 'ltor';
		}else{
			sFlag = 'rtol';
		} 
		x = cX;
		await new Promise((resolve, reject) => {
			touchmove(oDirective[sFlag], resolve, reject, oEvent);
		}).catch(function(err){
			console.log(err);
		});
		
		bEnd = false;
	}
	oDom.ontouchend = function(e){
		let oEvent = e || event;
		x = null, sFlag = null;
		touchend(oEvent);
	}
}


const SINGLE_FOLLOW_TOUCH = (dom='body', {touchmove=FN_NULL, touchstart=FN_NULL, touchend=FN_NULL} = DEFAULT_ARGUMENTS) => {
	let oDom,
		x,
		y;
	if(typeof dom === 'string'){
		oDom = document.querySelector(dom);
	}else{
		oDom = dom;
	}
		
	oDom.ontouchstart = function(e){
		let oEvent = e || event;
		x = oEvent.changedTouches[0].clientX,
		y = oEvent.changedTouches[0].clientY;
		touchstart(oEvent);
	}
	oDom.ontouchmove = function(e){
		let oEvent = e || event,
			cX = oEvent.changedTouches[0].clientX,
			cY = oEvent.changedTouches[0].clientY,
			nX,
			nY;
		nX = (x - cX);
		nY = (y - cY);
		touchmove({x:nX, y:nY}, oEvent);

		x = cX,y = cY;
	}
	oDom.ontouchend = function(e){
		let oEvent = e || event;
		x = null, y = null;
		touchend(oEvent);
	}
}


// 计算两点距离
const EdgeNumiceTow = (arr) => 
	arr.reduce((n1, n2) => 
	Math.sqrt(
		Math.pow(Math.abs(n1.clientX-n2.clientX), 2) 
		+ 
		Math.pow(Math.abs(n1.clientY-n2.clientY), 2)
	)
);


const MULTIPLE_FOLLOW_TOUCH = (dom='body', {touchmove=FN_NULL, touchstart=FN_NULL, touchend=FN_NULL} = DEFAULT_ARGUMENTS) => {
	let oDom = document.querySelector(dom),
		iOldDiff,
		iPoint,
		fnOperation;

	const STATIC_INITIAL = (v, e) => {
		if(fnOperation){
			fnOperation(v, e);
			return '';		
		}
		fnOperation = (() => {
			iPoint = v;
			return (v, e) => {
				let diff = -(iPoint - v);
				if(diff === iOldDiff){
					return;
				}
				iOldDiff = diff;
				touchmove({diff}, e);
			}
		})();
	}

	oDom.ontouchstart = (e) => {
		let oEvent = e || event;
		touchstart(oEvent);
	}
	oDom.ontouchmove = (e) => {
		let oEvent = e || event,
			aTouchList = oEvent.changedTouches,
			aNewTouchList = [];
		
		for(let i in aTouchList){
			if((aTouchList[i] instanceof Object) && (typeof aTouchList[i] != "function")){
				aNewTouchList.push(aTouchList[i]);
			}
		}
		switch(aNewTouchList.length){
			case 0:
			case 1:
				break;
			default:
				STATIC_INITIAL(EdgeNumiceTow(aNewTouchList.slice(0, 2)), oEvent);
		}
	}
	oDom.ontouchend = (e) => {
		let oEvent = e || event;
		iPoint = null, iOldDiff = null, fnOperation = null;
		touchend(oEvent);
	}
}





const HZ_TOUCH = {
	singleTouch: SINGLE_TOUCH,
	singleFollowTouch: SINGLE_FOLLOW_TOUCH,
	multipleFollowTouch: MULTIPLE_FOLLOW_TOUCH,
};


export default HZ_TOUCH;









