export default function postUserDetails(email,password,firstname,lastname) {
    return function(getState) {
        let targetUrl = `/v1/add/userEmailAddress/${email}/userPassword/${password}/userFirstName/${firstname}/userLastName/${lastname}`

        return fetch(targetUrl , {method: 'POST'})
                .then(resp => {
                    if (resp.status === 200) {
                        alert("User created successfully !");
                        return resp.json()
                    }
                    else if(resp.status === 400) {
                        alert("Email Address or Password in incorrect format")
                    }
                })
                .catch(er => console.log(er))
    };
}
