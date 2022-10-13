import { useState } from 'react'
import LoginForm from './pages/login-form'
import SignUpForm from './pages/signup-form'
import WelcomePage from './pages/welcome'
import './styles/main.css'

const Navigation = (props:any) => {
    const [page, setPage] = useState(0)

    const pages = [
        <WelcomePage changePage={setPage}/>,
        <LoginForm/>,
        <SignUpForm/>
    ]

    return(
        <div>
            {pages[page]}
        </div>
    )
}

export default Navigation;