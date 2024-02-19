import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const Accounts = (props) => {

	const [account, setAccount] = useState([])
	const [client, setClient] = useState([])

	const [name, setName]= useState("")
	const [email, setEmail]= useState("")

	const[newAccount, setNewAccount] = useState({})

	const handleInputName = (event)=>{
		const name = event.target.value
		setName(name)
		setNewAccount({...newAccount, name: name})
	}
	const handleInputEmail = (event)=>{
		const email = event.target.value
		setEmail(email)
		setNewAccount({...newAccount, email: email})
	}

	function resetForm (){
		setName("")
		setEmail("")
	}

	const handleSubmit = (event => {
		event.preventDefault()
		if (name == "" || email == "") {
			alert("Fields are missing")
		} else {
			axios.post('http://localhost:8080/api/cards/', account, {
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

	useEffect(() => {
		axios("http://localhost:8080/api/clients/2")
			.then(res => {
				setAccount(res.data.accounts)
				setClient(res.data)
			})
			.catch(err => console.log(err))
	}, [])

	console.log(newAccount)
	return (
		<main className=' bg-blue-900 flex flex-col items-center py-8'>
			<h1 className='w-full text-2xl text-center text-white font-semibold'>Welcome, {client.name}!</h1>

			<article className='flex gap-16 py-14'>
				{account.map(account => (
					<div key={account.id} className='flex bg-neutral-100 p-5 rounded-xl'>
						<Link key={account.id} to={`/accountDetail/${account.id}`}>
							<div className="flex gap-10">
								<div className='flex flex-col justify-between gap-5 font-medium text-stone-600'>
									<p>Account number:</p>
									<p>Balance: </p>
									<p>Creation date:</p>
								</div>

								<div className='flex flex-col gap-5'>
									<span>{account.number}</span>
									<span className='text-[24px] font-semibold'>{account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
									<span>{account.creationDate}</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</article>

			<article className='w-full flex flex-col items-center'>
				<h1 className='bg-blue-900 w-full text-2xl text-center text-white font-semibold pb-6'>Apply for an account</h1>

				<form className='bg-stone-800 w-[350px] flex flex-col gap-5 items-center p-8 rounded-2xl' onSubmit={handleSubmit}>
					<div className='flex flex-col tex-center w-full'>
						<label className='text-white text-lg font-medium'>Name:</label>
						<input type="text" value={name} name="name" onInput={handleInputName} className='p-2 rounded-lg'/>
					</div>

					<div className='flex flex-col tex-center w-full'>
						<label className='text-white text-lg font-medium'>Email:</label>
						<input type="text" value={email} name="email" onInput={handleInputEmail} className='p-2 rounded-lg' />
					</div>

					<button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl' onSubmit={handleSubmit} >Request</button>
				</form>
			</article>

		</main>
	)
}

export default Accounts