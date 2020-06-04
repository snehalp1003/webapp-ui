import React from 'react';
import logo from '../UserLogo.svg';
import './HomePage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import updateUserPersonalDetails from '../apiCalls/updateUserPersonalDetails.js';
import updateUserPassword from '../apiCalls/updateUserPassword.js';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Form from 'react-bootstrap/Form'
import BuyPage from './BuyPage'
import SellPage from './SellPage'
import CartPage from './CartPage'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.userStore.email,
            firstname: this.props.userStore.firstname,
            lastname: this.props.userStore.lastname,
            password: this.props.userStore.password,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            updatePersonalDetails: false,
            updatePassword: false,
            key: 'Profile',
        }
    }

    updatePersonalDetailsClose() {
        this.setState({
            updatePersonalDetails: false
        })
        // refreshUserDetails(email,password)
    }

    updatePersonalDetailsShow() {
        this.setState({
            updatePersonalDetails: true
        })
    }

    updatePasswordClose() {
        this.setState({
            updatePassword: false
        })
    }

    updatePasswordShow() {
        this.setState({
            updatePassword: true
        })
    }

    logoutUser = () => {
        var self = this;
        self.props.func2();
    }

    render() {
        if (this.state.key === 'Buy') {
             return <BuyPage {...this.props}/>
        } else if (this.state.key === 'Sell') {
            return <SellPage {...this.props}/>
        } else if (this.state.key === 'Cart') {
            return <CartPage {...this.props}/>
        }
        return (
          <div className="HomePage">
            <div className="HomePage-header">
                <img src={logo} className="HomePage-logo" alt="logo"/>
            </div>
            <div className="HomePage-body">
            <Tabs id="uncontrolled-tab"
                  activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                <Tab eventKey="Profile" title="Profile">
                </Tab>
                <Tab eventKey="Buy" title="Buy a book">
                </Tab>
                <Tab eventKey="Sell" title="Sell a book">
                </Tab>
                <Tab eventKey="Cart" title="Cart">
                </Tab>
            </Tabs>
              <Form>
                <br></br>
                <br></br>
                <br></br>
                <label>
                  First Name: &emsp;&emsp;&nbsp;
                </label>
                  <input type="text" firstname="firstname" value={this.props.userStore.firstname} readOnly/>
                <br></br>
                <br></br>
                <label>
                  Last Name: &emsp;&emsp;&nbsp;
                </label>
                  <input type="text" lastname="lastname" value={this.props.userStore.lastname} readOnly/>
                <br></br>
                <br></br>
                <label>
                  Email Address: &emsp;
                </label>
                  <input type="text" email="email" value={this.props.userStore.email} readOnly/>
                <br></br>
                <br></br>
              </Form>
              <br></br>
              <br></br>
              <div>
                <Button variant="primary" onClick={() => this.updatePersonalDetailsShow()}>Update Personal Details</Button> &emsp;
                <Modal show={this.state.updatePersonalDetails} onHide={() => this.updatePersonalDetailsClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Personal Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                          First Name: &emsp;&emsp;&emsp;
                        </label>
                            <input type="text" firstname="firstname" value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})}/>
                        <label>
                            Last Name: &emsp;&emsp;&emsp;
                        </label>
                          <input type="text" lastname="lastname" value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.updatePersonalDetailsClose()}>Close</Button>
                        <Button variant="primary" onClick={updateUserPersonalDetails(this.props.userStore.email,this.state.firstname,this.state.lastname)}>Update</Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="primary" onClick={() => this.updatePasswordShow()}>Update Password</Button> &emsp;
                <Modal show={this.state.updatePassword} onHide={() => this.updatePasswordClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                            Old Password: &emsp;&emsp;&emsp;&nbsp;
                        </label>
                            <input type="password" oldPassword="oldPassword" onChange={(e) => this.setState({oldPassword: e.target.value})}/>
                        <label>
                            New Password: &emsp;&emsp;&emsp;
                        </label>
                          <input type="password" newPassword="oldPassword" onChange={(e) => this.setState({newPassword: e.target.value})}/>
                        <label>
                            Confirm Password: &emsp;&ensp;
                        </label>
                            <input type="password" confirmPassword="oldPassword" onChange={(e) => this.setState({confirmPassword: e.target.value})}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.updatePasswordClose()}>Close</Button>
                        <Button variant="primary" onClick={updateUserPassword(this.props.userStore.email, this.state.oldPassword,this.state.newPassword,this.state.confirmPassword)}>Update Password</Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="secondary" onClick={() => this.logoutUser()}>Logout</Button>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userStore: state.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        func1: (email, firstname, lastname, password) => dispatch({
                    type: 'POST_USER_DETAILS',
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    password: password
                }),
        func2: () => dispatch({
                    type: 'LOGOUT_USER'
                })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
