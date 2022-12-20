import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"
import "./styles/loginsignin.css"
import Axios from 'axios'
import { CgArrowLeft } from "react-icons/cg";

const SignUpForm2 = (pros:any) => {

    const validationRegister = yup.object().shape({
        bltype: yup.string().required("Este é um campo obrigatório"),

        birthdate: yup.string().required("Este é um campo obrigatório"),
        
        state: yup.string().required("Este é um campo obrigatório"),

        city: yup.string().required("Este é um campo obrigatório"),

        cellphone: yup.string().max(10, "Número de celular muito grande").required("Este é um campo obrigatório"),

    })

    const handleClickRegister = (values:any) => {
        Axios.post("http://localhost:3001/signup2", {
            bltype: values.bltype,
            birthdate: values.birthdate,
            state: values.state,
            city: values.city,
            cellphone: values.cellphone
        }).then((response) =>{
            console.log(response)
        })
    }

    return(
        <div className="inter-font container">
            <div className="text">
                <h2>Olá, </h2>
            </div>
        </div>
    )
}

export default SignUpForm2;