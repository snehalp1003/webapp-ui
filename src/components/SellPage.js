import React from 'react';
import logo from '../UserLogo.svg';
import './HomePage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import Table from 'react-bootstrap/Table'
import HomePage from './HomePage';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Alert from 'react-bootstrap/Alert'
import BuyPage from './BuyPage'
import CartPage from './CartPage'

class SellPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewBook: false,
            showUpdateModal: false,
            delete: false,
            selectedBook: "",
            updatedBookTitle: "",
            updatedBookPrice: "",
            updatedBookQuantity: "",
            updatedBookAuthors: "",
            updatedBookPubDate: "",
            booksForSell: this.props.userStore.booksForSell,
            key: 'Sell'
        };
    }

    closeHandleNewBook() {
        this.setState({
            addNewBook: false
        })
    }

    showHandleNewBook(item) {
        this.setState({
            addNewBook: true
        })
    }


    handleClose() {
        this.setState({
            showUpdateModal: false,
            selectedBook: ""
        })
    }

    handleShow(item) {
        this.setState({
            showUpdateModal: true,
            selectedBook: item,
            updatedBookPrice: item.bookPrice,
            updatedBookQuantity: item.bookQuantity,
            updatedBookTitle: item.bookTitle,
            updatedBookAuthors: item.bookAuthors,
            updatedBookPubDate: item.bookPubDate
        })
    }

    closeHandleDelete() {
        this.setState({
            delete: false,
            selectedBook: "",
            updatedBookTitle: "",
            updatedBookPrice: "",
            updatedBookQuantity: "",
            updatedBookAuthors: "",
            updatedBookPubDate: "",
        })
    }

    showHandleDelete(item) {
        this.setState({
            delete: true,
            selectedBook: item
        })
    }

    addNewBookToSell = (bookISBN, email) => {
        var self = this;
        let targetUrl =`/v1/insertBookDetails/bookISBN/${bookISBN}/bookSoldBy/${email}`

        return fetch(targetUrl , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookAuthors: this.state.bookAuthors,
                bookISBN: bookISBN,
                bookPrice: this.state.bookPrice,
                bookPubDate: this.state.bookPubDate,
                bookQuantity: this.state.bookQuantity,
                bookSoldBy: email,
                bookTitle: this.state.bookTitle
            })
        })
                .then(resp => {
                    if (resp.status === 200) {
                        alert("Book added successfully !");
                        return resp.json()
                    }
                    else if(resp.status === 409) {
                        alert("Book already available !");
                    }

                })
                .then(data => {
                    self.props.func1(data);
                })
                .catch(er => console.log(er))
    }


    updateBookDetails = (bookISBN, bookSoldBy, email) => {
        var self = this;
        let targetUrl =`/v1/updateBookDetails/bookISBN/${bookISBN}/bookSoldBy/${bookSoldBy}/userLoggedIn/${email}`

        return fetch(targetUrl , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookAuthors: this.state.updatedBookAuthors ? this.state.updatedBookAuthors : this.state.selectedBook.bookAuthors,
                bookISBN: bookISBN,
                bookPrice: this.state.updatedBookPrice ? this.state.updatedBookPrice : this.state.selectedBook.bookPrice,
                bookPubDate: this.state.updatedBookPubDate ? this.state.updatedBookPubDate : this.state.selectedBook.bookPubDate,
                bookQuantity: this.state.updatedBookQuantity ? this.state.updatedBookQuantity : this.state.selectedBook.bookQuantity,
                bookSoldBy: email,
                bookTitle: this.state.updatedBookTitle ? this.state.updatedBookTitle : this.state.selectedBook.bookTitle
            })
        })
                .then(resp => {
                    if (resp.status === 200) {
                        alert("Book details updated successfully !");
                        return resp.json()
                    }
                    else if(resp.status === 404) {
                        alert("Book not found !");
                    }

                })
                .then(data => {
                    self.props.func1(data);
                })
                .catch(er => console.log(er))
    }

    deleteBook = (bookISBN, email) => {
        this.closeHandleDelete()
        var self = this;
        let targetUrl =`/v1/deleteBook/bookISBN/${bookISBN}/bookSoldBy/${email}/userLoggedIn/${email}`

        return fetch(targetUrl , {
            method: 'DELETE'
        })
                .then(resp => {
                    if (resp.status === 200) {
                        alert("Book deleted successfully !");

                        return resp.json()
                    }
                    else {
                        alert("Could not delete book !");
                    }

                })
                .then(data => {
                    self.props.func2(data);
                })
                .catch(er => console.log(er))
    }

    render() {
        if (this.state.key === 'Profile') {
             return <HomePage {...this.props}/>
        } else if (this.state.key === 'Buy') {
            return <BuyPage {...this.props}/>
        } else if (this.state.key === 'Cart') {
            return <CartPage {...this.props}/>
        }
        var contents = ""
        if (this.state.booksForSell !== undefined) {
            contents = this.state.booksForSell.map(item => {
            return <tr>
                    <td>{item.bookISBN}</td>
                    <td>{item.bookTitle}</td>
                    <td>{item.bookPrice}</td>
                    <td>{item.bookQuantity}</td>
                    <td>{<Button variant="primary" onClick={() => this.handleShow(item)}>Update</Button>}</td>
                    <td>{<Button variant="primary" onClick={() => this.showHandleDelete(item)}>Delete</Button>}</td>
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
            <br></br>
            <Button variant="primary" onClick={() => this.showHandleNewBook()}>Add a Book</Button>
            <br></br>
            <br></br>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Book ISBN</th>
                        <th>Book Title</th>
                        <th>Price</th>
                        <th>Quantity Available</th>
                        <th>Update Details</th>
                        <th>Delete Book</th>
                    </tr>
                </thead>
                <tbody>
                    {contents}
                </tbody>
            </Table>
            {/*Modal for adding new book details*/}
            <Modal size='lg' show={this.state.addNewBook} onHide={() => this.closeHandleNewBook()}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                      Title: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                    </label>
                        <input type="text" title="title" onChange={(e) => this.setState({bookTitle: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        ISBN: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" isbn="isbn" onChange={(e) => this.setState({bookISBN: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        Authors: &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    </label>
                      <input type="text" authors="authors" onChange={(e) => this.setState({bookAuthors: e.target.value})}/>
                      <br></br>
                      <br></br>
                    <label>
                        Price: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" price="price" onChange={(e) => this.setState({bookPrice: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        Quantity: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" quantity="quantity" onChange={(e) => this.setState({bookQuantity: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        Publication Date: &emsp;&emsp;
                    </label>
                        <input type="text" publicationDate="publicationDate" onChange={(e) => this.setState({bookPubDate: e.target.value})}/>
                        <br></br>
                        <br></br>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.closeHandleNewBook()}>Close</Button>
                    <Button variant="primary" onClick={() => this.addNewBookToSell(this.state.bookISBN, this.props.userStore.email)}>Add</Button>
                </Modal.Footer>
            </Modal>
            {/*Modal for updating book details*/}
            <Modal size='lg' show={this.state.showUpdateModal} onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Book Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                      Title: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                    </label>
                        <input type="text" title="title" value={this.state.updatedBookTitle} onChange={(e) => this.setState({updatedBookTitle: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        ISBN: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" isbn="isbn" value={this.state.selectedBook.bookISBN} readOnly/>
                        <br></br>
                        <br></br>
                    <label>
                        Authors: &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    </label>
                      <input type="text" authors="authors" value={this.state.updatedBookAuthors} onChange={(e) => this.setState({updatedBookAuthors: e.target.value})}/>
                      <br></br>
                      <br></br>
                    <label>
                        Price: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" price="price" value={this.state.updatedBookPrice} onChange={(e) => this.setState({updatedBookPrice: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        Quantity: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    </label>
                        <input type="text" price="price" value={this.state.updatedBookQuantity} onChange={(e) => this.setState({updatedBookQuantity: e.target.value})}/>
                        <br></br>
                        <br></br>
                    <label>
                        Publication Date: &emsp;&emsp;
                    </label>
                        <input type="text" publicationDate="publicationDate" value={this.state.updatedBookPubDate} onChange={(e) => this.setState({updatedBookPubDate: e.target.value})}/>
                        <br></br>
                        <br></br>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => this.updateBookDetails(this.state.selectedBook.bookISBN, this.state.selectedBook.bookSoldBy, this.props.userStore.email)}>Update</Button>
                </Modal.Footer>
            </Modal>
            {/*Alert for Deleting*/}
            <Alert show={this.state.delete} variant="success">
                <Alert.Heading>Confirm Delete</Alert.Heading>
                    <p>
                        This book will be deleted from the list! Proceed with deletion?
                    </p>
                    <hr />
                    <div className="d-flex justify-content-center">
                        <Button onClick={() => this.deleteBook(this.state.selectedBook.bookISBN, this.state.selectedBook.bookSoldBy)} variant="outline-success">Delete</Button>
                    </div>
            </Alert>
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
                    type: 'ADD_BOOK_FOR_SELLING',
                    book: book
                }),
        func2: (book) => dispatch({
                    type: 'FETCH_BOOKS_FOR_SELLING',
                    book: book
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SellPage);
