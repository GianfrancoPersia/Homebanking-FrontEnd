import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AccountDetail = () => {
    const [account, setAccount] = useState([])
    const [transaction, setTrasactions] = useState([])


    useEffect(() => {
        axios("http://localhost:8080/api/accounts/2")
            .then(res => {
                setAccount(res.data)
                setTrasactions(res.data.transactions)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <main className=' bg-blue-900 flex py-10 gap-10 justify-center min-h-dvh'>
            <article className='flex gap-16 h-[164px]'>
                <div className='flex bg-neutral-100 gap-10 p-5 rounded-xl'>
                    <div className='flex flex-col justify-between gap-5 font-medium text-stone-600'>
                        <p>Account number:</p>
                        <p>Balance: </p>
                        <p>Creation date:</p>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <span>{account.number}</span>
                        <span className='text-[24px] font-semibold'>{account.balance?.toLocaleString('en-US',{style:'currency', currency:'USD'})}</span>
                        <span>{account.creationDate}</span>
                    </div>
                </div>
            </article>


            <table className='bg-stone-800 w-[800px] h-[200px] flex flex-col p-4 rounded-lg'>
                <thead className='text-neutral-400 border-b-2 border-neutral-300'>
                    <tr className='flex pb-4 text-center'>
                        <th className='w-[15%]'>Type</th>
                        <th className='w-[15%]'>Amount</th>
                        <th className='w-[40%]'>Data</th>
                        <th className='w-[30%]'>Description</th>
                    </tr>
                </thead>
                <tbody className='text-white flex flex-col justify-center'>
                    {transaction.map(transaction => (
                        <tr key={transaction.id} className='flex py-4 text-center'>
                            <td className='w-[15%]'>{transaction.type}</td>
                            <td className='w-[15%]'>{transaction.amount.toLocaleString('en-US',{style:'currency', currency:'USD'})}</td>
                            <td className='w-[40%]'>{transaction.date}</td>
                            <td className='w-[30%]'>{transaction.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default AccountDetail