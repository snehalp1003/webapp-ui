import React from 'react';
import logo from '../UserLogo.svg';
import './HomePage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table';
import HomePage from './HomePage';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SellPage from './SellPage'
import CartPage from './CartPage'

class BuyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedBook: "",
            booksForBuy: this.props.userStore.booksForBuy,
            key: 'Buy',
        };
    }

    handleClose() {
        this.setState({
            show: false,
            selectedBook: ""
        })
    }

    handleShow(item) {
        this.setState({
            show: true,
            selectedBook: item
        })
    }


    addBookToCart = (email, isbn) => {
        var self = this;
        let targetUrl =`/v1/addBookToCart/bookBoughtBy/${email}/bookISBN/${isbn}`

        return fetch(targetUrl , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookBoughtBy: email,
                bookISBN: this.state.selectedBook.bookISBN,
                bookSoldBy: this.state.selectedBook.bookSoldBy
            })
        })
                .then(resp => {
                    if (resp.status === 200) {
                        alert("Book added to cart !");
                        return resp.json()
                    }
                    else if(resp.status === 409) {
                        alert("Book already added to cart !");
                    }

                })
                .then(data => {
                    self.props.func1(this.state.selectedBook);
                })
                .catch(er => console.log(er))
    }

    render() {
        if (this.state.key === 'Profile') {
             return <HomePage {...this.props}/>
        } else if (this.state.key === 'Sell') {
            return <SellPage {...this.props}/>
        } else if (this.state.key === 'Cart') {
            return <CartPage {...this.props}/>
        }
        var contents = ""
        if (this.props.userStore.booksForBuy !== undefined) {
            contents = this.props.userStore.booksForBuy.map(item => {
            return <tr>
                    <td>{item.bookTitle}</td>
                    <td>{item.bookAuthors}</td>
                    <td>{item.bookPrice}</td>
                    <td>{<Button variant="primary" onClick={() => this.handleShow(item)}>View Details</Button>}</td>
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

            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Authors</th>
                        <th>Price</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {contents}
                </tbody>
            </Table>
            <Modal size='lg' show={this.state.show} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                      Title: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                    </label>
                        <input type="text" title="title" value={this.state.selectedBook.bookTitle} readOnly/>
                        <br></br>
                        <br></br>
                    <label>
                        Authors: &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    </label>
                      <input type="text" authors="authors" value={this.state.selectedBook.bookAuthors} readOnly/>
                      <br></br>
                      <br></br>
                    <label>
                        Price: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" price="price" value={this.state.selectedBook.bookPrice} readOnly/>
                        <br></br>
                        <br></br>
                    <label>
                        ISBN: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" isbn="isbn" value={this.state.selectedBook.bookISBN} readOnly/>
                        <br></br>
                        <br></br>
                    <label>
                        Publication Date: &emsp;&emsp;
                    </label>
                        <input type="text" publicationDate="publicationDate" value={this.state.selectedBook.bookPubDate} readOnly/>
                        <br></br>
                        <br></br>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => this.addBookToCart(this.props.userStore.email, this.state.selectedBook.bookISBN)}>Add to Cart</Button>
                </Modal.Footer>
            </Modal>
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
        func1: (book) => dispatch({
                    type: 'ADD_BOOK_TO_CART',
                    book: book
                })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(BuyPage);
