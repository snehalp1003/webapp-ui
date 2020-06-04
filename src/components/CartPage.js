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

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
