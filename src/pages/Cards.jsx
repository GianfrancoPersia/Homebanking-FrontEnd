import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import authActions from '../redux/actions/auth.actions'

const Cards = () => {

	// const [card, setCard] = useState([])
	
	const [selectedCardType, setCardType] = useState("")
	const [selectedCardColor, setCardColor] = useState("")
	const [saveNewCard, setNewCard] = useState({type: "", color:""})

	const cardModel = {
		type:["DEBIT","CREDIT"],
		color:["GOLD","SILVER","TITANIUM"]
	}

	const user = useSelector( store => store.authReducer.user)

	const {login,current} = authActions
    const dispatch = useDispatch()

	const handleCardType = (event) => {
		const selectedCardType = event.target.value;
		setCardType(selectedCardType)
		setCardColor("")
		setNewCard({...saveNewCard, type: selectedCardType})
	}

	const handleCardColor = (event) => {
		const selectedCardColor = event.target.value;
		setCardColor(selectedCardColor)
		setNewCard({...saveNewCard, color: selectedCardColor})
	}

	const resetForm = () => {
		setCardType("")
		setCardColor("")
		setNewCard({})
	}

	const handleSubmit = (event => {
		event.preventDefault()
		console.log("---------------------------------------")
		if (selectedCardType == "" || selectedCardColor == "") {
			alert("Fields are missing")
		} else {
			axios.post('/api/clients/current/cards', saveNewCard , 
			{ headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}})
			.then(response => {
				console.log(response.data)
				resetForm()
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
	})
	
	useEffect(() => {
		if(!user.loggedIn && localStorage.getItem("token")){
			axios.get("/api/clients/current", { headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}})
			.then(res => {
				dispatch(current(res.data))
				dispatch(login(localStorage.getItem("token")))
			})
			.catch(err => console.log(err))
		}

	}, [])

	return (
		<main className=' bg-blue-900 flex flex-col justify-center gap-10'>
			<h1 className='w-full text-2xl text-center text-white font-semibold pt-4'>Your cards</h1>
			<article className='flex flex-col gap-10 mx-3 md:flex-row flex-wrap justify-center'>
				{user.cards?.map(card => (
					<div key={card.id} style={{ background: `url(/img/${card.color}.png)`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} className={`p-4 text-xl h-[250px] w-[400px] rounded-lg gap-2 flex flex-col font-semibold bg-cover ${card.color === 'TITANIUM' ? 'text-white' : 'text-black'}`}>
						<p className='flex justify-end pb-10 mr-2'>{card.type}</p>
						<p>{card.number}</p>
						<p>{card.cvv}</p>
						<p>{card.fromDate}  /  {card.thruDate}</p>
						<p>{card.cardHolder}</p>
					</div>
				))}
			</article>

			<article className='bg-[url(/img/bannerCards.png)] flex flex-col items-center gap-5 py-6'>
				<h1 className='w-full text-2xl text-center text-white font-semibold'>Apply for a card</h1>

				<form className='bg-stone-800 flex flex-col gap-5 items-center p-8 rounded-2xl'  onSubmit={handleSubmit}>
					<select value={selectedCardType} name= "type" onChange={handleCardType} className='w-[200px] p-2 rounded-lg'>
						<option value="" disabled>Select a card type</option>
						{cardModel.type.map((type, index) => (
							<option key={index} value={type} >{type}</option>
						))}
					</select>

					<select value={selectedCardColor} name="color" onChange={handleCardColor} disabled={!selectedCardType} className='w-[200px] p-2 rounded-lg'>
						<option value="" disabled>Select a card color</option>
						{cardModel.color.map((color, index) => (
							<option key={index} value={color}>{color}</option>
						))}
					</select>

					<button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl'>Request</button>
				</form>
			</article>
		</main>
	)
}

export default Cards