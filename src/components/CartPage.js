import React from 'react';
import logo from '../UserLogo.svg';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table'
import HomePage from './HomePage';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SellPage from './SellPage'
import BuyPage from './BuyPage'
import Button from 'react-bootstrap/Button';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            booksInCart: this.props.userStore.booksInCart,
            key: 'Cart',
        };
    }

    handleClose() {
        this.setState({
            show: false,
        })
    }

    handleShow(item) {
        this.setState({
            show: true,
        })
    }

    refreshFetchBooksInCart = (email) => {
        var self = this;
        let targetUrl =`/v1/viewCartDetails/bookBoughtBy/${email}`

        return fetch(targetUrl , {method: 'GET'})
                .then(resp => {
                    if (resp.status === 200)
                        return resp.json()
                })
                .then(data => {
                    self.props.func1(data);
                })
                .catch(er => console.log(er))
    }

    render() {
        if (this.state.key === 'Profile') {
             return <HomePage {...this.props}/>
        } else if (this.state.key === 'Sell') {
            return <SellPage {...this.props}/>
        } else if (this.state.key === 'Buy') {
            return <BuyPage {...this.props}/>
        }
        var contents = ""
        if (this.state.booksInCart !== undefined) {
            contents = this.state.booksInCart.map(item => {
            return <tr>
                    <td>{item.bookTitle}</td>
                    <td>{item.bookISBN}</td>
                    <td>{item.bookAuthors}</td>
                    <td>{item.bookPrice}</td>
                </tr>
            })
        }

        return (
          <div className="HomePage">
            <header className="HomePage-header">
              <img src={logo} className="HomePage-logo" alt="logo"/>
            </header>
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

            <br></br>
            <label>
            <Button variant="primary" onClick={() => this.refreshFetchBooksInCart(this.props.userStore.email)}>Refresh</Button>
            </label>
            <br></br>

            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                    <th>Book Title</th>
                    <th>ISBN</th>
                    <th>Authors</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {contents}
                </tbody>
            </Table>
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
        func1: (book) => dispatch ({
                type: 'FETCH_BOOKS_IN_CART',
                book: book
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
