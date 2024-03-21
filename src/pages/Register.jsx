import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'



const Register = () => {

    const [userData, setUser] = useState({ firstName: "", lastName: "", email: "", password: "" })

    const [firstNameValidation, setFirstNameValidation] = useState(false)
    const [lastNameValidation, setLastNameValidation] = useState(false)
    const [emailValidation, setEmailValidation] = useState(false)
    const [passwordValidation, setPasswordValidation] = useState(false)

    const [passwordValidationLength, setPasswordLenght] = useState(false)
    const [emailIncomplete, setEmailIncomplete] = useState(false)
    const [emailExist, setEmailExist] = useState(false)

    const [registred, setRegistred] = useState(false)

    const handleInput = (event) => {
        setUser({ ...userData, [event.target.name]: event.target.value })

    }

    console.log(userData)

    function handleSubmit(event) {
        event.preventDefault()

        let isValid = true

        if (userData.firstName == "") {
            setFirstNameValidation(true)
            isValid = false
        }

        if (userData.lastName == "") {
            setLastNameValidation(true)
            isValid = false
        }

        if (userData.email == "") {
            setEmailValidation(true)
            isValid = false
        }

        if (userData.password == "") {
            setPasswordValidation(true)
            isValid = false
        }

        if (!userData.email.includes("@") && userData.email != "") {
            setEmailIncomplete(true)
            isValid = false
        }

        if (userData.password.length < 6 && userData.password != "") {
            setPasswordLenght(true)
            isValid = false
        }

        if (isValid) {
            axios.post("/api/auth/register", userData)
                .then(response => {
                    response.data
                    setRegistred(true)
                })
                .catch(err => {
                    if (err.response.data == "The email is already registered") {
                        setEmailExist(true)
                    }
                }
                )
        }
    }


    return (
        <main className=' bg-blue-900 flex flex-col items-center py-8'>
            <article className='w-full flex flex-col items-center'>
                <h1 className='bg-blue-900 w-full text-2xl text-center text-white font-semibold pb-6'></h1>

                <form className='bg-stone-800 w-[350px] flex flex-col gap-5 items-center p-8 rounded-2xl' onSubmit={handleSubmit}>
                    <div className='flex flex-col w-full'>
                        <label className='text-white'>First name:</label>
                        <input type="text" name="firstName" onInput={handleInput} className='p-2 rounded-lg' />
                        {firstNameValidation && <p className='text-red-500'>Incomplete first name field</p>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Last name:</label>
                        <input type="text" name="lastName" onInput={handleInput} className='p-2 rounded-lg' />
                        {lastNameValidation && <p className='text-red-500'>Incomplete last name field</p>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Email:</label>
                        <input type="text" name="email" onInput={handleInput} className='p-2 rounded-lg' />
                        {emailValidation && <p className='text-red-500'>Incomplete email field</p>}
                        {emailIncomplete && <p className='text-red-500'>The email does not contain @</p>}
                        {emailExist && <p className='text-red-500'>The email is already registered</p>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Password:</label>
                        <input type="password" name="password" onInput={handleInput} className='p-2 rounded-lg' />
                        {passwordValidation && <p className='text-red-500'>Incomplete password field</p>}
                        {passwordValidationLength && <p className='text-red-500'>Must contain at least 6 characters</p>}
                    </div>

                    {registred && <p className='text-green-500 text-center font-semibold text-lg'>Registred</p>}

                    <Link to={"/login"} className='text-white'>Are you already registered? <span className='font-semibold text-lg text-blue-500 hover:border-b-2 border-blue-500'> LOGIN</span></Link>


                    <Link to={'/login'}><button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl'>Register</button></Link>
                </form>
            </article>
        </main >
    )
}

export default Register