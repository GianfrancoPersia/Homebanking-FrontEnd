import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Cards = () => {

	const [card, setCard] = useState([])
	
	const [selectedCardType, setCardType] = useState("")
	const [selectedCardColor, setCardColor] = useState("")
	const [saveNewCard, setNewCard] = useState({})

	const handleCardType = (event) => {
		const selectedCardType = event.target.value;
		setCardType(selectedCardType)
		setCardColor("")
		setNewCard({...saveNewCard, cardType: selectedCardType})
		console.log(saveNewCard)
	}

	const handleCardColor = (event) => {
		const selectedCardColor = event.target.value;
		setCardColor(selectedCardColor)
		setNewCard({...saveNewCard, cardColor: selectedCardColor})
		console.log(saveNewCard)
	}

	const handleSubmit = (event => {
		event.preventDefault()
		console.log("---------------------------------------")
		if (selectedCardType == "" || selectedCardColor == "") {
			alert("Fields are missing")
		} else {
			axios.post('http://localhost:8080/api/cards/', card, {
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
		setCardType("")
		setCardColor("")
		setNewCard({})
	}

	useEffect(() => {
		axios("http://localhost:8080/api/clients/1")
			.then(res => {
				setCard(res.data.cards)
				console.log(card)
			})
			.catch(err => console.log(err))

	}, [])

	console.log(saveNewCard)

	return (
		<main className=' bg-blue-900 flex flex-col justify-center gap-10'>
			<h1 className='w-full text-2xl text-center text-white font-semibold pt-4'>Your cards</h1>
			<article className='flex gap-10 justify-center'>
				{card.map(card => (
					<div key={card.id} style={{ background: `url(/img/${card.color}.png)`, backgroundSize: 'cover' }} className='p-4 w-[400px] h-[250px] text-gray-500 rounded-lg gap-2 flex flex-col font-semibold'>
						<p className='flex justify-end pb-10'>{card.color}</p>
						<p>{card.type}</p>
						<p>{card.number}</p>
						<p>{card.cvv}</p>
						<p>{card.fromDate}  /  {card.thruDate}</p>
						<p>{card.cardHolder}</p>
					</div>
				))}
			</article>

			<article className='bg-[url(/img/bannerCards.png)] flex flex-col items-center gap-5 h-[500px]'>
				<h1 className='w-full text-2xl text-center text-white font-semibold py-6'>Apply for a card</h1>

				<form className='bg-stone-800 w-[400px] flex flex-col gap-5 items-center p-8 rounded-2xl'  onSubmit={handleSubmit}>
					<select value={selectedCardType} onChange={handleCardType} className='w-full p-2 rounded-lg'>
						<option value="" disabled>Select a card type</option>
						{card.map((card, index) => (
							<option key={index} value={card.type} >{card.type}</option>
						))}
					</select>

					<select value={selectedCardColor} onChange={handleCardColor} disabled={!selectedCardType} className='w-full p-2 rounded-lg'>
						<option value="" disabled>Select a card color</option>
						{card.map((card, index) => (
							<option key={index} value={card.color}>{card.color}</option>
						))}
					</select>

					<button className='bg-blue-800 w-[150px] p-4 text-xl text-white rounded-3xl' onSubmit={handleSubmit} >Request</button>
				</form>
			</article>
		</main>
	)
}

export default Cards