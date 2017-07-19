// 针对 redux->applyMiddleware 中间件处理异步事件的重写
/*
	@todo 
		针对FSA规范,改写dispatch以及action内部带Promise调用:
		默认FSA不支持动作内有函数调用,但是由于目前dispatch为重写后的,
		所以NEXT才是原来的dispatch,NEXT调用时action已经是对象字面量了,
		符合FSA规范.

	@todo N久之后
		按照middleware将原本dispatch的重写改写成规范的中间件,...
		现在 异步动作失败,并且没有错误处理机制,反馈 async = 'fail'
*/
/*
	action 例:
	PPP: (num) => ({
		type: "PPP", 
		before: Actions.PPP_BEFORE, 
		fail: Actions.PPP_FAIL,
		async: new Promise((resolve) => {
			let a = parseInt(Math.random()*100);
			setTimeout(()=>{resolve(a)}, 3000);
		})
	})
*/


const STORE_DISPATCH = store => next => async (action) => {
	let { async, before, fail } = action;
	delete action['fail'];
	delete action['before'];
	delete action['async'];
	if(async && (async instanceof Promise)){
		before ? next(before()) : null;
		await new Promise(resolve => {
			async.then(data =>{
				action = { ...action, async: data};
				resolve(action);
			}, err => {
				action = fail ? { ...action, ...fail() } : { ...action, async: 'fail' };
				resolve(action);
			}).catch(err => {
				throw new Error("Error:" + err.toString());
			});
		});
	};
	next(action);
};



export let writeOverDispatch = STORE_DISPATCH;


