
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions'
import Swal from 'sweetalert';


const Loans = () => {
	const [loans, setLoans] = useState([])
	const [accounts, setAccounts] = useState([])
	const [selectedAccount, setSelectedAccount] = useState("")
	const [selectedTypeLoan, setSelectedTypeLoan] = useState("");
	const [selectedPayment, setSelectedPayment] = useState('');
	const [amountInput, setAmountInput] = useState("")
	const [maxAmount, setMaxAmountLoan] = useState("")

	const [saveSelection, setSaveSelection] = useState({ id: "", amount: "", payments: "", number: "" })

	const user = useSelector(store => store.authReducer.user)
	console.log(user)

	const { login, current } = authActions
	const dispatch = useDispatch()

	const filteredPayments = loans.find(loan => loan.name === selectedTypeLoan)?.payments || [];



	const resetForm = () => {
		setSelectedAccount("");
		setSelectedTypeLoan("");
		setSelectedPayment("");
		setAmountInput("");
		setSaveSelection({});
	}


	const handleTypeChange = (event) => {
		const selectedTypeLoan = loans.find(loan => loan.id == event.target.value)
		setMaxAmountLoan(selectedTypeLoan.maxAmount);
		setSelectedTypeLoan(selectedTypeLoan);
		setSelectedPayment("")
		setSelectedAccount("")
		setAmountInput("")
		setSaveSelection({ ...saveSelection, id: selectedTypeLoan.id })
	};

	function handleInput(event) {
		const amountInput = event.target.value
		setAmountInput(amountInput)
		const loanMaxAmount = loans.find(loan => loan.name === selectedTypeLoan)?.maxAmount || [];

		if (amountInput < maxAmount && amountInput > 0)
			setSaveSelection({ ...saveSelection, amount: amountInput })
		else {
			alert(`El monto máximo para este tipo de préstamo es ${maxAmount}`)
		}
	}


	const handlePaymentChange = (event) => {
		const selectedPayment = event.target.value
		setSelectedPayment(selectedPayment);
		setSelectedAccount("")
		setSaveSelection({ ...saveSelection, payments: selectedPayment })
	};


	const handleAccountChange = (event) => {
		const selectedAccount = event.target.value
		setSelectedAccount(selectedAccount)
		setSaveSelection({ ...saveSelection, number: selectedAccount })
	}


	const handleSubmit = (event => {
		event.preventDefault()
		console.log("---------------------------------------")
		if (!selectedAccount || !selectedPayment || !selectedPayment) {
			Swal({
                title: 'Error',
                text: 'Please fill in all fields.',
                icon: 'error',
                button: 'OK',
            });
		} else {
			axios.post('/api/clients/current/loans', saveSelection,
				{
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
				})
				.then(response => {
                    console.log(response.data);
                    Swal({
                        title: 'Successful application!',
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
				.catch(err => console.log(err))
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

	useEffect(() => {
		axios.get("/api/loans/")
			.then(res => {
				res.data
				console.log(res.data)
				setLoans(res.data)
			})
			.catch(err => console.log(err))
	}, [])


	console.log(selectedTypeLoan)
	console.log(saveSelection)

	return (
		<main className='flex flex-col min-h-dvh w-full bg-blue-900'>
			<article className='flex flex-col md:items-center '>
				<h1 className='bg-blue-900 w-full text-xl text-center py-4 text-white font-semibold'>Your loans</h1>

				<table className='bg-stone-800 flex flex-col p-4 rounded-lg mx-3 md:w-[650px]'>
					<thead className='text-neutral-400 border-b-2 border-neutral-300'>
						<tr className='flex pb-4 text-center'>
							<th className='w-[33%]'>Loan</th>
							<th className='w-[33%]'>Amount</th>
							<th className='w-[33%]'>Payments</th>
						</tr>
					</thead>
					<tbody className='text-white flex flex-col justify-center'>
						{user.clientLoans?.map(loan => (
							<tr className='flex py-4 text-center text-sm'>
								<td className='w-[33%]'>{loan.name}</td>
								<td className='w-[33%]'>{loan.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
								<td className='w-[33%]'>{loan.payments}</td>
							</tr>
						))}
					</tbody>
				</table>
			</article>

			<article className='flex flex-col items-center bg-[url(/img/banco.png)]'>
				<h1 className='bg-blue-900 w-full text-xl text-center py-6 text-white font-semibold'>Apply for a loan</h1>

				<form className='bg-stone-800 w-[400px] h-[500px] flex flex-col gap-5 items-center justify-center p-8 rounded-2xl my-6' onSubmit={handleSubmit}>
					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Loan</label>
						<select value={selectedTypeLoan} onChange={handleTypeChange} className='p-2 rounded-lg'>
							<option value="" disabled>Select a loan</option>
							{loans.map(loans => (
								<option key={loans.id} value={loans.id} className=''>{loans.name}</option>
							))}
						</select>
					</div>
					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Payments</label>
						<select value={selectedPayment} onChange={handlePaymentChange} disabled={!selectedTypeLoan} className='p-2 rounded-lg'>
							<option value="" disabled>Select a payments</option>
							{selectedTypeLoan.payments?.map((payments, index) => (
								<option key={index} value={payments} className=''>{payments}</option>
							))}
						</select>
					</div>

					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Account</label>
						<select value={selectedAccount} onChange={handleAccountChange} disabled={!selectedTypeLoan} className='p-2 rounded-lg'>
							<option value="" disabled>Select account</option>
							{user.accounts?.map(accounts => (
								<option key={accounts.id} value={accounts.number}>{accounts.number}</option>
							))}
						</select>
					</div>

					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Amount</label>
						<input value={amountInput} type="number" name="amount" onInput={handleInput} placeholder="Enter amount" className='p-2 rounded-lg [appearance:textfield] 
						[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' disabled={!selectedTypeLoan} />
					</div>

					<button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl my-4'>Request</button>
				</form>
			</article>

		</main>
	)
}

export default Loans