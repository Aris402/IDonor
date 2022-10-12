import { useState } from 'react'
import LoginForm from './pages/login-form'
import SignUpForm from './pages/signup-form'

const Navigation = (props:any) => {
    const [page, setPage] = useState(1)

    const navDisplay = () => {
        if(page == 1){
            return (
            <div className="App">
                <LoginForm changePage={setPage}/>
            </div>
            )
        }
        else if(page == 2){
            return(
                <div className="App">
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