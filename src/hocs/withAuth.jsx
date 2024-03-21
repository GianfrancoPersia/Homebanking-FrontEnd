import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'


export const withAuth = (Component) => {

    const Auth = (props) => {
        
        if (!localStorage.getItem("token")) {
            return <Navigate to={'/login'}/>
        }
        return <Component {...props} />
    }

    return Auth
}