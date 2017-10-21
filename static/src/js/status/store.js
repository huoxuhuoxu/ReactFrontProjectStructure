
// 存储器
import { createStore, combineReducers, applyMiddleware } from 'redux';
import writeOverDispatch from "react-middleware-async";

import {
    TEST_LOADING_DATA
} from './reducer.js';

// 存储器初始化
const DEFAULT_INITIALIZE = {
    test_loading_data: 0
};

// 动作处理器 与 存储字段对接,并且初始化 总动作处理器
const REDUCERS = combineReducers({
    test_loading_data: TEST_LOADING_DATA
});

// 建立存储器
const STORE = createStore(REDUCERS, DEFAULT_INITIALIZE, applyMiddleware(writeOverDispatch));


export default STORE;

