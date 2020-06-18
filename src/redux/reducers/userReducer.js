const initialState = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    booksForSell: [],
    booksForBuy: [],
    booksInCart: [],
    bookImages: []
}

function userReducer(state = initialState, action) {
    console.log(action.type)
    switch(action.type) {
        case 'POST_USER_DETAILS':
            return ({
                ...state,
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname,
                password: action.password
            });
        case 'LOGOUT_USER':
            return ({
                state,
            });
        case 'FETCH_BOOKS_FOR_SELLING':
            return ({
                ...state,
                booksForSell:  action.book
            });
        case 'FETCH_BOOKS_FOR_BUYING':
            return ({
                ...state,
                booksForBuy: action.book
            });
        case 'FETCH_BOOKS_IN_CART':
            return ({
                ...state,
                booksInCart: action.book
            });
        case 'ADD_BOOK_FOR_SELLING':
            if(state.booksForSell === undefined) {
                return ({
                    ...state,
                    booksForSell: [action.book]
                });
            } else {
                return ({
                    ...state,
                    booksForSell: [...state.booksForSell, action.book]
                });
            }
        case 'ADD_BOOK_TO_CART':
            if(state.booksInCart === undefined) {
                return ({
                    ...state,
                    booksInCart: [action.book]
                });
            } else {
                return ({
                    ...state,
                    booksInCart: [...state.booksInCart, action.book]
                });
            }
        case 'DELETE_BOOK_FROM_LIST':
            let filteredArray = state.booksForSell.filter(book => book.bookISBN !== action.bookISBN)
            return ({
                ...state,
                booksForSell: filteredArray
            });
        case 'UPDATE_BOOK_DETAILS':
            let updatedBooksForSell = state.booksForSell.filter(book => book.bookISBN !== action.book.bookISBN)
            updatedBooksForSell.push(action.book)
            return ({
                ...state,
                booksForSell: updatedBooksForSell
            });
        case 'ADD_BOOK_IMAGE':
            if(state.bookImages === undefined) {
                return ({
                    ...state,
                    bookImages: [action.image]
                });
            } else {
                return ({
                    ...state,
                    bookImages: [...state.bookImages, action.image]
                });
            }
        default:
            return state;
    }
}

export default userReducer;
