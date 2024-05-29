import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

const displayUser = ({ username }) => {
    return (
        <h2>{ username }</h2>
    )
}

export const createUser = ({ username, password, firstName, lastName }) => {
    axios ({
        method: 'post',
        url: `${baseUrl}/create-user/`,
        data: {
            username,
            password,
            first_name: firstName,
            last_name: lastName
        }
    }).then(response => {
        console.log(response)
    }).catch(error => console.log('create user: ILLEGAL'))
}


export const getToken = ({ auth, username, password }) => {
    axios.post(`${baseUrl}/token/`, {
        username,
        password
    })
    .then(response => {
        console.log(response)
        auth.setAccessToken(response.data.access)
    })
    .catch(error => console.log('get token: ILLEGAL'))
}

export const fetchUser = ({ auth }) => {
    axios({
        method: 'get',
        url: `${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
    .then(response => 
        console.log(response.data.first_name)
    ).catch(error => console.log('ILLEGAL'))
}