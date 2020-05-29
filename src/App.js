import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

class App extends Component {
    constructor(props) {
        super(props);
    }
    getLoginStatus = () => {
        const { userStore } = this.props;
        const { email = '' } = userStore;
        if (!email) {
            return <Redirect from="/" to="/login" />
        } else {
            return null;
        }
    };
    isLoggedIn = () => {
        const { userStore } = this.props;
        const { email = '' } = userStore;
        if (!email) {
            return false;
        } else {
            return true;
        }
    };
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/login"
                        render={(props) =>
                        {
                            if(this.isLoggedIn()) {
                                console.log('True')
                                return <Redirect to="/home"/>
                            } else {
                                return <LoginPage {...props}/>
                            }
                        }}
                    />
                    <Route
                        path="/home"
                        render={(props) =>
                        {
                            if(this.isLoggedIn()) {
                                return <HomePage {...props}/>
                            } else {
                                return <Redirect to="/auth"/>
                            }
                        }}
                    />
                    {this.getLoginStatus()}
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userStore: state.user,
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
