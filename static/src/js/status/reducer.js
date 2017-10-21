
// 动作处理处理器

const TEST_LOADING_DATA = (state = 0, action) => {
    switch(action.type){
        case 'TEST_AJAX_GET_DATA': return action.async;
        default: return state;
    }
};



export {
    TEST_LOADING_DATA
};

