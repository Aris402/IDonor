import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"
import "../styles/loginsignin.css"
import Axios from 'axios'
import { useEffect, useState } from "react";

const SignUpForm2 = (pros:any) => {
    const [userName, setName] = useState();


    useEffect(() => {
        Axios.get("http://localhost:3001/getName").then((response) => {
            setName(response.data);
        })
    })

    const validationRegister = yup.object().shape({
        bltype: yup.string().required("Este é um campo obrigatório"),

        birthdate: yup.date().required("Este é um campo obrigatório"),
        
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
                <h2>Olá, {userName}!❣️</h2>
                <br/><br/>
                <p>Preencha os dados corretamente:</p>
            </div>
            <Formik 
                initialValues={{}} 
                onSubmit={handleClickRegister}
                validationSchema={validationRegister}

                
            >
                <Form className="login-form">
                <div className="login-form-div">
                    <label htmlFor="bltype">Tipo sanguíneo</label>

                    <Field name="bltype" id="bltype" className="form-field inter-font" placeholder="Seu tipo sanguíneo" type="time"></Field>

                    <ErrorMessage name="bltype" component="span" className="form-error"></ErrorMessage>
                </div>
                <div className="login-form-div">
                    <label htmlFor="birthdate">Data de nascimento</label>

                    <Field name="birthdate" id="birthdate" className="form-field inter-font" placeholder="Sua data de nascimento" type="date"></Field>

                    <ErrorMessage name="birthdate" component="span" className="form-error"></ErrorMessage>
                </div>
                <div className="login-form-div">
                    <label htmlFor="state">Estado</label>

                    <Field name="state" id="state" className="form-field inter-font" placeholder="Seu estado (exemplo: Rio Grande do Norte)" type="text"></Field>

                    <ErrorMessage name="state" component="span" className="form-error"></ErrorMessage>
                </div>
                <div className="login-form-div">
                    <label htmlFor="city">Cidade</label>

                    <Field name="city" id="city" className="form-field inter-font" placeholder="Sua cidade (exemplo: São Paulo)" type="text"></Field>

                    <ErrorMessage name="city" component="span" className="form-error"></ErrorMessage>
                </div>
                <div className="login-form-div">
                    <label htmlFor="cellphone">Celular</label>

                    <Field name="cellphone" id="cellphone" className="form-field inter-font" placeholder="(84) 9999-99999" type="text"></Field>

                    <ErrorMessage name="cellphone" component="span" className="form-error"></ErrorMessage>
                </div>
                <button className="red-Button" type="submit">Concluir</button>
                </Form>

            </Formik>
        </div>
    )
}

export default SignUpForm2;