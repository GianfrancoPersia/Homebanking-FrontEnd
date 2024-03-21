import { createReducer} from "@reduxjs/toolkit";
import authActions from '../actions/auth.actions'

const {login, current} = authActions

const initialState = {
    user: {
        name: "",
        email: "",
        loggedIn: null,
    },
    token:null,
    timestamps: null
}

const authReducer = createReducer (initialState, (builder) => {
    builder
        .addCase(login, (state, action) => {
            
            return {
                ...state,
                token: action.payload.token,            //porque el login me devuelve el token
                timestamps: action.payload.timestamps
            }
        })

        .addCase(current, (state, action) => {
            //el return en un case siempre es un nuevo state
            return {
                ...state,
                user: action.payload //el current me manda la data en el payload
            }
        })
})

export default authReducer