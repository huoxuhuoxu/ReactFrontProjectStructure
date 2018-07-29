// router 
import React from "react";
import { 
    HashRouter as Router, 
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import STORE from "../status/store";


// module
import ModuleLoading from "../modules/moduleLoading/moduleLoading";

// page
import Login from "../views/pageLogin/pageLogin";



class PageNull extends React.Component {
    render (){
        return (
            <div>
                DEMO
            </div>
        );
    }
}

// views-main
class MainRouter extends React.Component {

    state = {
        routers: [
            {
                routeName: "index",
                com: PageNull,
                name: "主页"
            }
        ]
    }

    render (){
        let { match } = this.props;
        return (
            <div>

                <section>
                    <Switch>
                        {
                            this.state.routers.map((item, index) => {
                                return <Route key={index} path={`${match.url}/${item.routeName}`} component={item.com} />;
                            })
                        }
                        <Redirect to={`${match.url}/index`} />
                    </Switch>
                </section>

            </div>
        );
    }
}
MainRouter.propTypes = {
    match: PropTypes.any
};


// 主内容模块, 单独抽离ssr需要
class Container extends React.Component {
    render (){
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={PageNull} />
                    <Route path="/login" component={Login} />
                    <Route path="/main" component={MainRouter} /> 
                </Switch>
                <ModuleLoading />
            </div>
        );
    }
}

// 一级主路由
const App = () => (
    <Provider store={STORE}>
        <Router>
            <Container />
        </Router>
    </Provider>
);

export default App; 
export {
    Container
};
