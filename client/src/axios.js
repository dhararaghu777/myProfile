import React from "react";
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: '/api',
    
})

export default instance;