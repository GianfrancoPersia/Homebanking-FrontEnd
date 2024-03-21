import { createReducer} from "@reduxjs/toolkit";
import authActions from '../actions/auth.actions'

const {login, current, logout} = authActions

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

        .addCase(logout, (state, action) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    loggedIn: action.payload.loggedIn // Actualizar loggedIn al desloguear
                },
                token: null,
                timestamps: null
            };
        })
        
})

export default authReducer