export function postUserData (email, firstname, lastname, password) {
    return function(dispatch) {
        dispatch({
            type: 'POST_USER_DETAILS',
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
        });
    }
}

export function logoutUser () {
    return function(dispatch) {
        dispatch({
            type: 'LOGOUT_USER'
        })
    }
}
