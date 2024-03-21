import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions'
import Swal from 'sweetalert';


const Transactions = () => {

    const [transactions, setTransactions] = useState([])

    const [selectedAccount, setSelectedAccount] = useState('')
    const [amountInput, setAmountInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [destinationInput, setDestinationInput] = useState('')
    const [newTransaction, setNewTransaction] = useState({ amount: "", description: "", numberCredit: "", numberDebit: "" })


    const [amountValidation, setAmountValidation] = useState(false)
    const [detinationValidation, setDetinationValidation] = useState(false)
    const [amountValidationNegative, setAmountValidationNegative] = useState(false)


    const user = useSelector(store => store.authReducer.user)
    console.log(user)


    const { login, current } = authActions
    const dispatch = useDispatch()


    const handleAccountChange = (event) => {
        const selectedAccount = event.target.value
        setSelectedAccount(selectedAccount)
        setNewTransaction({ ...newTransaction, numberDebit: selectedAccount })
    }

    function handleInputAmount(event) {
        const amountInput = event.target.value
        setAmountInput(amountInput)
        setNewTransaction({ ...newTransaction, amount: amountInput })
    }

    function handleInputDescription(event) {
        const descriptionInput = event.target.value
        setDescriptionInput(descriptionInput)
        setNewTransaction({ ...newTransaction, description: descriptionInput })
    }

    function handleDestinationInput(event) {
        const selectedDestination = event.target.value
        setDestinationInput(selectedDestination)
        setNewTransaction({ ...newTransaction, numberCredit: selectedDestination })

    }



    const handleSubmit = (event => {
        event.preventDefault()
        const selectedAccountObj = user.accounts.find(account => account.number === selectedAccount);

        console.log("---------------------------------------")
        if (!amountInput || !descriptionInput || !destinationInput || !selectedAccount) {
            // Mostrar un mensaje de error si algún campo está vacío
            Swal({
                title: 'Error',
                text: 'Please fill in all fields.',
                icon: 'error',
                button: 'OK',
            });
            return; // Salir de la función para evitar que se ejecute el resto del código
        } else if (amountInput <= 0) {
            setAmountValidationNegative(true)
        } else if (destinationInput == selectedAccount) {
            setDetinationValidation(true)
        } else if (selectedAccountObj.balance < amountInput) {
            setAmountValidation(true)
        }
        else {
            axios.post('/api/clients/current/transactions', newTransaction,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(response => {
                    console.log(response.data);
                    Swal({
                        title: 'Successful transaction!',
                        icon: 'success',
                        button: 'Accept'
                    }).then(() => {
                        axios.get("/api/clients/current", {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                            .then(res => {
                                dispatch(current(res.data));
                            })
                            .catch(err => console.log(err));
                    });

                })
                .catch(err => {
                    console.log(err.response.data)
                    if (err.response.data == "Target account does not exist")
                        alert("Target account does not exist")
                })
        }
    })

    useEffect(() => {
        if (!user.loggedIn && localStorage.getItem("token")) {
            axios.get("/api/clients/current", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
                .then(res => {
                    dispatch(current(res.data))
                    dispatch(login(localStorage.getItem("token")))
                })
                .catch(err => console.log(err))
        }

    }, [])

    console.log(newTransaction)

    return (
        <main className=' bg-blue-900 flex flex-col items-center py-8 min-h-dvh'>
            <article className='w-full flex flex-col items-center'>
                <h1 className='bg-blue-900 w-full text-2xl text-center text-white font-semibold pb-6'></h1>

                <form className='bg-stone-800 w-[350px] flex flex-col gap-5 items-center p-8 rounded-2xl' onSubmit={handleSubmit}>
                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Amount:</label>
                        <input value={amountInput} type="text" name="amount" onInput={handleInputAmount} className='p-2 rounded-lg' />
                        {amountValidation && <p className='text-red-500'>Insufficient balance</p>}
                        {amountValidationNegative && <p className='text-red-500'>Amount must be positive</p>}
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Description:</label>
                        <input value={descriptionInput} type="text" name="description" onInput={handleInputDescription} className='p-2 rounded-lg' />
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Destination account number:</label>
                        <input value={destinationInput} type="text" name="numberCredit" onInput={handleDestinationInput} className='p-2 rounded-lg' />
                        {detinationValidation && <p className='text-red-500'>You cannot transfer money to the same account</p>}

                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-white'>Account number of origin:</label>
                        <select value={selectedAccount} onChange={handleAccountChange} className='p-2 rounded-lg'>
                            <option value="" disabled>Select account</option>
                            {user.accounts?.map(accounts => (
                                <option key={accounts.id} value={accounts.number}>{accounts.number}</option>
                            ))}
                        </select>
                        {/* {accountOriginValidation && <p className='text-red-500'>Source account field incomplete</p>} */}
                    </div>


                    <button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl'>Transfer</button>
                </form>
            </article>
        </main >
    )
}

export default Transactions