import React from 'react';
import logo from '../UserLogo.svg';
import './LoginPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import postUserDetails from '../apiCalls/createUser.js';
import HomePage from './HomePage';
import { connect } from "react-redux";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            enteredEmail: '',
            enteredPassword: '',
            showHomepage: false,
            showForgotPassword: false,
            forgotPasswordEmail: ''
        }
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleShow() {
        this.setState({
            show: true
        })
    }

    forgotPasswordClose() {
        this.setState({
            showForgotPassword: false
        })
    }

    forgotPasswordShow() {
        this.setState({
            showForgotPassword: true
        })
    }

    callMethodsOnLogin(email,password) {
        this.fetchUserDetails(email,password)
        this.fetchBooksForSelling(email)
        this.fetchBooksForBuying(email)
        this.fetchBooksInCart(email)
    }


    fetchUserDetails = (email,password) => {
        var self = this;
        let targetUrl =`/v1/fetchUserDetails/userEmailAddress/${email}/userPassword/${password}`

        return fetch(targetUrl , {method: 'GET'})
                .then(resp => {
                    if (resp.status === 200)
                        return resp.json()

                    alert("Incorrect Credentials !");
                })
                .then(data => {
                    self.props.func1(self.state.enteredEmail, data.userFirstName, data.userLastName, self.state.enteredPassword);
                    self.setState({showHomepage: true});
                })
                .catch(er => console.log(er))
    }

    fetchBooksForSelling = (email) => {
        var self = this;
        let targetUrl =`/v1/viewBooksForSelling/userLoggedIn/${email}`

        return fetch(targetUrl , {method: 'GET'})
                .then(resp => {
                    if (resp.status === 200)
                        return resp.json()
                })
                .then(data => {
                    self.props.func2(data);
                })
                .catch(er => console.log(er))
    }

    fetchBooksForBuying = (email) => {
        var self = this;
        let targetUrl =`/v1/viewBooksForBuying/userLoggedIn/${email}`

        return fetch(targetUrl , {method: 'GET'})
                .then(resp => {
                    if (resp.status === 200)
                        return resp.json()
                })
                .then(data => {
                    self.props.func3(data);
                })
                .catch(er => console.log(er))
    }

    fetchBooksInCart = (email) => {
        var self = this;
        let targetUrl =`/v1/viewCartDetails/bookBoughtBy/${email}`

        return fetch(targetUrl , {method: 'GET'})
                .then(resp => {
                    if (resp.status === 200)
                        return resp.json()
                })
                .then(data => {
                    self.props.func4(data);
                })
                .catch(er => console.log(er))
    }

    forgotPasswordLink = (email) => {
        let targetUrl =`/v1/forgotPassword/userEmailAddress/${email}`

        return fetch(targetUrl , {method: 'GET'})
                .then(resp => {
                    if (resp.status === 200) {
                        this.setState({forgotPasswordEmail: ''})
                        alert("Password reset link sent !");
                    } else if (resp.status === 404) {
                        this.setState({forgotPasswordEmail: ''})
                        alert("User account with entered email does not exist !")
                    }
                })
                .catch(er => console.log(er))
    }

    render() {
        if (this.state.showHomepage)
            return <HomePage/>;

        return (
          <div className="LoginPage">
            <header className="LoginPage-header">
              <img src={logo} className="LoginPage-logo" alt="logo"/>
            </header>
            <div className="LoginPage-body">
              <form>
                <label>
                  Email Address: &emsp;
                  <input type="text" email="email" onChange={(e) => this.setState({enteredEmail: e.target.value})}/>
                </label>
                <br></br>
                <br></br>
                <label>
                  Password: &emsp;&emsp;&emsp;
                  <input type="password" password="password" onChange={(e) => this.setState({enteredPassword: e.target.value})}/>
                </label>
              </form>
              <br></br>
              <br></br>
              <div>
                  <Button variant="primary" onClick={() => this.handleShow()}>Sign Up</Button> &emsp;
                  <Button variant="primary" onClick={() => this.callMethodsOnLogin(this.state.enteredEmail,this.state.enteredPassword)}>Sign In</Button> &emsp;
                  <Button variant="primary" onClick={() => this.forgotPasswordShow()}>Forgot Password</Button>
                  <Modal show={this.state.show} onHide={() => this.handleClose()}>
                      <Modal.Header closeButton>
                          <Modal.Title>Create a account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <label>
                            First Name: &emsp;&emsp;&emsp;
                          </label>
                              <input type="text" firstname="firstname" onChange={(e) => this.setState({firstname: e.target.value})}/>
                          <label>
                              Last Name: &emsp;&emsp;&emsp;
                          </label>
                            <input type="text" lastname="lastname" onChange={(e) => this.setState({lastname: e.target.value})}/>
                          <label>
                              Email Address: &emsp;&ensp;
                          </label>
                              <input type="text" email="email" onChange={(e) => this.setState({email: e.target.value})}/>
                          <label>
                              Password: &emsp;&emsp;&emsp;&ensp;
                          </label>
                              <input type="password" password="password" onChange={(e) => this.setState({password: e.target.value})}/>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={() => this.handleClose()}>Close</Button>
                          <Button variant="primary" onClick={postUserDetails(this.state.email,this.state.password,this.state.firstname,this.state.lastname)}>Create Account</Button>
                      </Modal.Footer>
                  </Modal>
                  {/* Below Modal is defined for Forgot Password */}
                  <Modal show={this.state.showForgotPassword} onHide={() => this.forgotPasswordClose()}>
                      <Modal.Header closeButton>
                          <Modal.Title>Forgot Password !</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <label>
                            Enter your email and we'll send you a link to reset your password. &emsp;&emsp;&emsp;
                          </label>
                              <input type="text" forgotPasswordEmail="forgotPasswordEmail" onChange={(e) => this.setState({forgotPasswordEmail: e.target.value})}/>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={() => this.forgotPasswordClose()}>Close</Button>
                          <Button variant="primary" onClick={() => this.forgotPasswordLink(this.state.forgotPasswordEmail)}>Submit</Button>
                      </Modal.Footer>
                  </Modal>
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
        func2: (book) => dispatch ({
                type: 'FETCH_BOOKS_FOR_SELLING',
                book: book
        }),
        func3: (book) => dispatch ({
                type: 'FETCH_BOOKS_FOR_BUYING',
                book: book
        }),
        func4: (book) => dispatch ({
                type: 'FETCH_BOOKS_IN_CART',
                book: book
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
