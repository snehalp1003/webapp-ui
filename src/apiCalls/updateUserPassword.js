export default function updateUserPassword(email, oldPassword, newPassword, confirmPassword) {
        return function(getState) {
            if(newPassword !== confirmPassword) {
                alert("Passwords don't match !");
            } else {
                let targetUrl = `/v1/updatePassword/userEmailAddress/${email}/oldPassword/${oldPassword}/newPassword/${newPassword}`

                return fetch(targetUrl , {method: 'PUT'})
                        .then(resp => {
                            if (resp.status === 200)
                                alert("Password updated successfully !");
                                return resp.json()
                        })
                        .catch(er => console.log(er))
            }
        };
}
