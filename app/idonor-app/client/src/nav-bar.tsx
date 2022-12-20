import { useState } from 'react'
import LoginForm from './pages/login-form'
import SignUpForm from './pages/signup-form'
import WelcomePage from './pages/welcome'
import SignUpForm2 from './pages/signup-form2'
import './styles/main.css'

const Navigation = (props:any) => {
    const [page, setPage] = useState(0)

    const pages = [
        <WelcomePage changePage={setPage}/>,
        <LoginForm changePage={setPage}/>,
        <SignUpForm changePage={setPage}/>,
        <SignUpForm2 changePage={setPage}/>
    ]

    return(
        <div>
            {pages[page]}
        </div>
    )
}

export default Navigation;