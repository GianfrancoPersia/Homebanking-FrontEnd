import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [userData, setUser] = useState({email: "", password:""})
    const [errorLogin, setErrorLogin] = useState("")

    const navigate = useNavigate()

    const {login} = authActions
    const dispatch = useDispatch()

    const handleInput = (event) => {
        setUser({...userData,[event.target.name]: event.target.value})
    } 

    const handleLogin = (event) =>{
        event.preventDefault()
        axios.post("/api/auth/login", userData)
        .then(response => {response.data 
            console.log(response.data)
            dispatch(login(response.data))
            navigate("/accounts")
        })
        .catch(err => setErrorLogin(err.response.data))
    }


    return (
        <main className=' bg-blue-900 flex flex-col items-center py-8 min-h-dvh'>
            <article className='w-full flex flex-col items-center'>
                <h1 className='bg-blue-900 w-full text-2xl text-center text-white font-semibold pb-6'></h1>

                <form className='bg-stone-800 w-[350px] flex flex-col gap-5 items-center p-8 rounded-2xl' onSubmit={handleLogin}>
                    <div className='flex flex-col tex-center w-full'>
                        <label className='text-white text-lg font-medium'>Email:</label>
                        <input type="email" name="email" onInput={handleInput} className='p-2 rounded-lg' />
                    </div>

                    <div className='flex flex-col tex-center w-full'>
                        <label className='text-white text-lg font-medium'>Password:</label>
                        <input type="password" name="password" onInput={handleInput} className='p-2 rounded-lg' />
                    </div>

                    <p className='text-red-600 text-lg'>{errorLogin}</p>

                    <Link to={"/register"} className='text-white'>Don't have an account? <span className='font-semibold text-lg text-blue-500 hover:border-b-2 border-blue-500'> REGISTER</span></Link>

                    <button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl'>Login</button>
                </form>
            </article>
        </main >

    )
}

export default Login