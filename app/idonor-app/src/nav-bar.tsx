import { useState } from 'react'
import LoginForm from './pages/login-form'
import SignUpForm from './pages/signup-form'
import WelcomePage from './pages/welcome'

const Navigation = (props:any) => {
    const [page, setPage] = useState(0)

    const navDisplay = () => {
        
        if(page == 0){
            return(
                <div>
                    <WelcomePage/>
                </div>
            )
        }
        else if(page == 1){
            return (
            <div>
                <LoginForm changePage={setPage}/>
            </div>
            )
        }
        else if(page == 2){
            return(
                <div>
                    <SignUpForm/>
                </div>
            )
        }
    }
    return(
        <div>
            {navDisplay()}
        </div>
    )
}

export default Navigation;