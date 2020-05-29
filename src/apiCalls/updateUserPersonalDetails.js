export default function updateUserPersonalDetails(email,firstname,lastname) {
    return function(getState) {
        let targetUrl = `/v1/updatePersonalDetails/userEmailAddress/${email}/userFirstName/${firstname}/userLastName/${lastname}`

        return fetch(targetUrl , {method: 'PUT'})
                .then(resp => {
                    if (resp.status === 200)
                        alert("User Details updated successfully !");
                        return resp.json()
                })
                .catch(er => console.log(er))
    };
}
