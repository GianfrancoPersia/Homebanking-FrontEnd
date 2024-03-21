import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions'


const Accounts = (props) => {

	// const [account, setAccount] = useState([])
	// const [client, setClient] = useState([])

	// const [name, setName] = useState("")
	// const [email, setEmail] = useState("")

	// const [newAccount, setNewAccount] = useState({})

	const user = useSelector(store => store.authReducer.user)
	console.log(user)

	const { login, current } = authActions
	const dispatch = useDispatch()



	
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

	const handleSubmit = async (event) =>{
		event.preventDefault()

		axios.post("/api/clients/current/accounts", {} , { headers: {
			Authorization: "Bearer " + localStorage.getItem("token")
		}
		})
			.then(response => { response.data
				console.log("Successfully generated")
				axios.get("/api/clients/current",
				{ headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}})
				.then(res => {
					dispatch(current(res.data))
					console.log(res.data)
					console.log(user)
				})
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
	}

	console.log(user)

	return (
		<main className=' bg-blue-900 flex flex-col items-center py-8 min-h-dvh'>
			<h1 className='w-full text-2xl text-center text-white font-semibold'>Welcome, {user.name}!</h1>

			<article className='flex flex-col gap-8 py-8 md:flex-row'>
				{user.accounts?.map(account => (

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
				<form className='bg-stone-800 w-[350px] flex flex-col gap-5 items-center p-8 rounded-2xl' onSubmit={handleSubmit}>
					<h1 className='w-full text-xl text-center text-white font-semibold'>Apply for an account</h1>
					<button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl'>Request</button>
				</form>
			</article>

		</main>
	)
}

export default Accounts