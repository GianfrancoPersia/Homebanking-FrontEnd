import './App.css'
import MainLayout from './layouts/MainLayout'
import Accounts from './pages/Accounts'
import AccountDetail from './pages/AccountDetail'
import Cards from './pages/Cards'
import Loans from './pages/Loans'
import Transactions from './pages/Transactions'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { withAuth } from './hocs/withAuth.jsx'
import Home from './pages/Home.jsx'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import authActions from './redux/actions/auth.actions'
import axios from 'axios'

function App() {

	const AccountWithAuth = withAuth(Accounts)
	const CardstWithAuth = withAuth(Cards)
	const LoansWithAuth = withAuth(Loans)
	const TransactionsWithAuth = withAuth(Transactions)
	const AccountDetailWithAuth = withAuth(AccountDetail)

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


	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path='/' element={<Home/>}/>
					<Route path='/login' element={<Login/>}/>
					<Route path='/register' element={<Register/>}/>
					<Route path='/accounts' element={<AccountWithAuth/>}/>
					<Route path='/cards' element={<CardstWithAuth/>}/>
					<Route path='/loans' element={<LoansWithAuth />}/>
					<Route path='/accountDetail/:id' element={<AccountDetailWithAuth/>}/>
					<Route path='/transactions' element={<TransactionsWithAuth/>}/>
					<Route path='*' element={<Login/>}/>
				</Routes>
			</MainLayout>
		</BrowserRouter>

	)
}

export default App
