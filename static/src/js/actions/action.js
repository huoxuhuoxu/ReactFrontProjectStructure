
// 动作构建器

// 动作 --- 测试
const TEST_AJAX_GET_DATA = () => ({
    type: 'TEST_AJAX_GET_DATA',
    async: new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(parseInt(Math.random()*100))
        }, 3000);
    }),
    fail: () => ({'type': 'AAA'})
});





export {
    TEST_AJAX_GET_DATA
};

