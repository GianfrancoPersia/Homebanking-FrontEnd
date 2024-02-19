import { useState } from 'react'
import './App.css'
import MainLayout from './layouts/MainLayout'
import Accounts from './pages/Accounts'
import AccountDetail from './pages/AccountDetail'
import Cards from './pages/Cards'
import Loans from './pages/Loans'
import Transactions from './pages/Transactions'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path='/' element={<Accounts />}/>
					<Route path='/accounts' element={<Accounts />}/>
					<Route path='/cards' element={<Cards />}/>
					<Route path='/loans' element={<Loans />}/>
					<Route path='/accountDetail/:id' element={<AccountDetail/>}/>
					<Route path='/transactions' element={<Transactions/>}/>
				</Routes>
			</MainLayout>
		</BrowserRouter>

	)
}

export default App
