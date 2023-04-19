import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

const GET_ALL_USERS = 'GET_ALL_USERS'
const TOKEN = 'token'

const gotAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
};


export const fetchAllUsers = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem(TOKEN);
            if(token) {
                const { data } = await axios.get('/api/users', {
                    headers: {
                        Authorization: token,
                    },
                })
                dispatch(gotAllUsers(data))
            }
        }catch (error) {
            console.error('Error, unable to fetch user');
        }
    }
};


export default (state = [], action) => {
    switch(action.type) {
        case GET_ALL_USERS:
            return action.users
        default:
            return state
    }
};