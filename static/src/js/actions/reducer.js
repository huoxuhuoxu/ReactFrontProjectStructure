
// 动作处理处理器

// login 处理器
const LOGIN_REDUCER = (state = true, action) => {
    switch(action.type){
        default: return state;
    }
};

// 测试加载数据,异步动作与loading的合用测试
const TEST_LOADING_DATA = (state = 0, action) => {
    switch(action.type){
        case 'TEST_AJAX_GET_DATA': return action.async;
        default: return state;
    }
};



export {
    LOGIN_REDUCER,
    TEST_LOADING_DATA
};

