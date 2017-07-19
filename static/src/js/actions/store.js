
// 存储器

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { writeOverDispatch } from '../tools/reactMiddleware.js';

import {
    LOGIN_REDUCER,
    TEST_LOADING_DATA
} from './reducer.js';

// 存储器初始化
const DEFAULT_INITIALIZE = {
    login: false,
    test_loading_data: 0
};
// 状态做表处理
/*
    login: {
        bLogin: false
    },
    test_loading_data: {
        data: 0, 
        comment: {},
        ui: {
            ui1: {
                name: '1'
            },
            ui2: {
                name: '2'
            }
        }
    }
 */
// 动作处理器 与 存储字段对接,并且初始化 总动作处理器
/*
    {
        type: 'ADD',
        id: 1,
        message: '223', 
        text: '22',
        ...
    }
    action_handler中进行同域依赖数据/字段再处理
*/
const REDUCERS = combineReducers({
    login: LOGIN_REDUCER,
    test_loading_data: TEST_LOADING_DATA
});

// 建立存储器
const STORE = createStore(REDUCERS, DEFAULT_INITIALIZE, applyMiddleware(writeOverDispatch));


export default STORE;

