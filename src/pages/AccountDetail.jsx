import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions'


const AccountDetail = () => {
    const params = useParams()

    const user = useSelector(store => store.authReducer.user)
	console.log(user)

	const { login, current } = authActions
	const dispatch = useDispatch()

    const accounts = user.accounts?.find(account => account.id == params.id)

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



    return (
        <main className=' bg-blue-900 flex flex-col py-6 gap-10 min-h-dvh'>
            <h1 className='bg-blue-900 w-full text-xl text-center text-white font-semibold'>Account detail</h1>
            <article className='flex gap-16 h-[164px] justify-center'>
                <div className='flex bg-neutral-100 gap-10 p-5 rounded-xl'>
                    <div className='flex flex-col justify-between gap-5 font-medium text-stone-600'>
                        <p>Account number:</p>
                        <p>Balance: </p>
                        <p>Creation date:</p>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <span>{accounts?.number}</span>
                        <span className='text-[24px] font-semibold'>{accounts?.balance?.toLocaleString('en-US',{style:'currency', currency:'USD'})}</span>
                        <span>{accounts?.creationDate}</span>
                    </div>
                </div>
            </article>

            

            <table className='bg-stone-800 flex flex-col p-4 rounded-lg mx-3'>
                <thead className='text-neutral-400 border-b-2 border-neutral-300'>
                    <tr className='flex pb-4 text-center'>
                        <th className='w-[20%]'>Type</th>
                        <th className='w-[20%]'>Amount</th>
                        <th className='w-[30%]'>Data</th>
                        <th className='w-[30%]'>Description</th>
                    </tr>
                </thead>
                <tbody className='text-white flex flex-col justify-center'>
                    {accounts?.transactions?.map(transaction => (
                        <tr key={transaction.id} className='flex py-4 text-center text-sm'>
                            <td className={`w-[20%] ${transaction.type == "CREDIT" ? "text-green-500" : "text-red-500"} `}>{transaction.type}</td>
                            <td className='w-[20%]'>{transaction.amount.toLocaleString('en-US',{style:'currency', currency:'USD'})}</td>
                            <td className='w-[30%]'>{transaction.date.split('T')[0]}</td>
                            <td className='w-[30%]'>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default AccountDetail