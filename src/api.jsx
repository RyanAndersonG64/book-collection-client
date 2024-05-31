import axios from 'axios'
import { useState } from 'react'

const baseUrl = 'http://127.0.0.1:8000'

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

export const createAuthor = ({ name }) => {
    axios ({
        method: 'post',
        url: `${baseUrl}/create-author/`,
        data: {
            name
        }
    }).then(response => {
        console.log(response)
    }).catch(error => console.log('create author:', error))
}

export const createBook = ({ auth, title, published = 1969, author, readers }) => {
    console.log(auth.accessToken)
    return axios ({
        method: 'post',
        url: `${baseUrl}/create-book/`,
        data: {
            title: title,
            published: published,
            author: author,
            readers: readers,
        },
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response => {
        console.log(response)
    }).catch(error => console.log('create book:', error))
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
    .catch(error => {
        console.log('get token: ILLEGAL')
        alert('Invalid username and/or password')
    })
}
export const fetchUser = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
    .then(response => {
        console.log(response)
        return response
    }
    ).catch(error => console.log('ILLEGAL'))
}

export const fetchBookList = ({ auth }) => {
    return axios({
        method: 'get',
        url: `${baseUrl}/books/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
    .then(response => {
        console.log(response)
        return response
    }
    ).catch(error => console.log('ILLEGAL'))
}

export const addReader = ({ auth, bookId, userId }) => {
    return axios({
        method: 'PUT',
        url: `${baseUrl}/add-reader/`,
        data: {
            bookId,
            readers: userId
        },
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
    .then(response => {
        
        return response
    }
    ).catch(error => console.log('Add reader:', error))
}

export const removeReader = ({ bookId, userId }) => {
    return axios({
        method: 'PUT',
        url: `${baseUrl}/remove-reader/`,
        data: {
            bookId,
            readers: userId
        },
    })
    .then(response => {
        
        return response
    }
    ).catch(error => console.log('Remove reader:', error))
}

export const deleteBookData = ({ auth, bookId }) => {
    console.log(bookId)
    return axios ({
        method: 'DELETE',
        url: `${baseUrl}/delete-book/`,
        data: {
            bookId
        },
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    })
    .then(response => {
        
        return response
    }
    ).catch(error => console.log('Delete book:', error))
}