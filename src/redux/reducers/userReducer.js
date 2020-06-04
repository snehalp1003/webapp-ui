const initialState = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    booksForSell: [],
    booksForBuy: [],
    booksInCart: []
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
            return ({
                ...state,
                booksForSell: [...state.booksForSell, action.book]
            });
        case 'ADD_BOOK_TO_CART':
            return ({
                ...state,
                booksInCart: [...state.booksInCart, action.book]
            });
        default:
            return state;
    }
}

export default userReducer;
