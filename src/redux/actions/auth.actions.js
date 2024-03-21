import { createAction } from "@reduxjs/toolkit";



const current = createAction("CURRENT", (data)=> {
    return {
        payload: {
            ...data,
            loggedIn: true,
        }
    }
})

const login = createAction("LOGIN", (token)=> {

    localStorage.setItem("token",token)
    return {
        payload: {
            token,
            timestamps: Date.now()
        }
    }
})

const actions = {
    current,
    login
}

export default actions