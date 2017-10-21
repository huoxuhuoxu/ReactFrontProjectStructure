
// 状态容器

import { bindActionCreators } from 'redux';

// 引入动作构造器
import { 
    TEST_AJAX_GET_DATA 
} from './action.js';

// 测试loading与异步动作连用,状态容器
const mapStateToProps_testLoadingData = (state, ownProps) => {
    return {
        loading_data: state.test_loading_data
    }
};
const mapDispatchToProps_testLoadingData = (dispatch, ownProps) => {
    return bindActionCreators({
        GET_DATA: TEST_AJAX_GET_DATA
    }, dispatch);
}


export let testLoadingData = {
    state: mapStateToProps_testLoadingData,
    props: mapDispatchToProps_testLoadingData
};





