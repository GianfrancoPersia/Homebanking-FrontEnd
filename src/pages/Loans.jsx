
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Loans = () => {
	const [loans, setLoans] = useState([])
	const [accounts, setAccounts] = useState([])
	const [selectedAccount, setSelectedAccount] = useState("")
	const [selectedTypeLoan, setSelectedTypeLoan] = useState("");
	const [selectedPayment, setSelectedPayment] = useState('');
	const [amountInput, setAmountInput] = useState("")
	const [saveSelection, setSaveSelection] = useState({})

	const filteredPayments = loans.find(loan => loan.name === selectedTypeLoan)?.payments || [];


	const handleSubmit = (event => {
		event.preventDefault()
		console.log("---------------------------------------")
		if (selectedAccount == "" || selectedPayment == "" || selectedPayment == "") {
			alert("Fields are missing")
		} else {
			axios.post('http://localhost:8080/api/loans/', loans, {
				headers:{
					Authorization: localStorage.getItem("token")
				}
			})
			.then(res =>{
				console.log("Successfully generated")
				resetForm();
			})
			.catch(err => console.log(err))


		}
	})

	const resetForm = () => {
		setSelectedAccount("");
		setSelectedTypeLoan("");
		setSelectedPayment("");
		setAmountInput("");
		setSaveSelection({});
	}


	const handleTypeChange = (event) => {
		const selectedTypeLoan = event.target.value
		setSelectedTypeLoan(selectedTypeLoan);
		setSelectedPayment("")
		setSelectedAccount("")
		setAmountInput("")
		setSaveSelection({ ...saveSelection, loanType: selectedTypeLoan })
	};


	const handlePaymentChange = (event) => {
		const selectedPayment = event.target.value
		setSelectedPayment(selectedPayment);
		setSelectedAccount("")
		setSaveSelection({ ...saveSelection, payments: selectedPayment })
	};


	const handleAccountChange = (event) => {
		const selectedAccount = event.target.value
		setSelectedAccount(selectedAccount)
		setSaveSelection({ ...saveSelection, account: selectedAccount })
	}

	function handleInput(event) {
		const amountInput = event.target.value
		setAmountInput(amountInput)
		const loanMaxAmount = loans.find(loan => loan.name === selectedTypeLoan)?.maxAmount || [];

		if (amountInput < loanMaxAmount && amountInput > 0)
			setSaveSelection({ ...saveSelection, amount: amountInput })
		else {
			alert(`El monto máximo para este tipo de préstamo es ${loanMaxAmount}`)
		}
	}



	useEffect(() => {

		axios('http://localhost:8080/api/loans/')
			.then(res => {
				setLoans(res.data)
			})
			.catch(err => console.log(err))
	}, [])


	useEffect(() => {
		axios('http://localhost:8080/api/clients/1')
			.then(res => {
				setAccounts(res.data.accounts)
			})
			.catch(err => console.log(err))
	}, [])



	console.log(saveSelection)

	return (
		<main className='bg-[url(/img/banco.png)] flex flex-col items-center min-h-dvh'>
			<h1 className='bg-blue-900 w-full text-2xl text-center py-6 text-white font-semibold'>Apply for a loan</h1>
				<form className='bg-stone-800 w-[400px] h-[500px] flex flex-col gap-5 items-center justify-center p-8 rounded-2xl mt-14' onSubmit={handleSubmit}>
					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Loan</label>
						<select value={selectedTypeLoan} onChange={handleTypeChange} className='p-2 rounded-lg'>
							<option value="" disabled>Select a loan</option>
							{loans.map(loans => (
								<option key={loans.id} value={loans.name} className=''>{loans.name}</option>
							))}
						</select>
					</div>
					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Payments</label>
						<select value={selectedPayment} onChange={handlePaymentChange} disabled={!selectedTypeLoan} className='p-2 rounded-lg'>
							<option value="" disabled>Select a payments</option>
							{filteredPayments.map((payments, index) => (
								<option key={index} value={payments} className=''>{payments}</option>
							))}
						</select>
					</div>

					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Account</label>
						<select value={selectedAccount} onChange={handleAccountChange} disabled={!selectedTypeLoan} className='p-2 rounded-lg'>
							<option value="" disabled>Select account</option>
							{accounts.map(accounts => (
								<option key={accounts.id} value={accounts.number}>{accounts.number}</option>
							))}
						</select>
					</div>

					<div className='flex flex-col text-center w-full'>
						<label className='text-white text-lg font-medium'>Amount</label>
						<input value={amountInput} type="number" name="amount" onInput={handleInput} placeholder="Enter amount" className='p-2 rounded-lg [appearance:textfield] 
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' disabled={!selectedTypeLoan}/>
					</div>

					<button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl my-4' onSubmit={handleSubmit} >Request</button>
				</form>

		</main>
	)
}

export default Loans