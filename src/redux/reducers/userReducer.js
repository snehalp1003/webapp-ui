const initialState = {
    email: "",
    firstname: "",
    lastname: "",
    password: ""
};

function userReducer(state = initialState, action) {
    console.log(action.type)
    switch(action.type) {
        case 'POST_USER_DETAILS':
            return {
                email: action.email,
                firstname: action.firstname,
                lastname: action.lastname,
                password: action.password
            };
        case 'LOGOUT_USER':
            return {
                initialState,
            }
        default:
            return state;
    }
}

export default userReducer;
