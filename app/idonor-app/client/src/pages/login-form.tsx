import {Formik, Form, Field, ErrorMessage} from "formik"
import * as React from 'react';
import * as yup from "yup"
import Arrow from '../images/left-arrow.png'
import '../styles/loginsignin.css'
import Axios from 'axios'

const LoginForm = (props:any) => {
    
    const validationLogin = yup.object().shape({
        email: yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este é um campo obrigatório")
    })

    const handleClickLogin = (values:any) => {
            console.log(values)
        }
    return(
        <div className="inter-font container">
            <img src={Arrow} onClick={() => props.changePage(0)} className="arrowButton" alt="voltar" title="voltar"/>
            <div className="text">
                <h2>Seja<br/>bem-vindo 🖐️</h2>
                <p>Entre na sua conta</p>
            </div>
            <Formik 
                initialValues={{}} 
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
            >
                <Form className="login-form">
                    <div className="login-form-div">
                        <label htmlFor="email">Email</label>

                        <Field name="email" className="form-field inter-font" id="email" placeholder="Seu email"></Field>

                        <ErrorMessage name="email" component="span" className="form-error"></ErrorMessage>
                    </div>

                    <div className="login-form-div">
                        <label htmlFor="senha">Senha</label>

                        <Field name="password" className="form-field inter-font" id="senha" placeholder="Sua senha"></Field>

                        <ErrorMessage name="password" component="span" className="form-error"></ErrorMessage>
                    </div>
                    <a className="link">Esqueceu a senha?</a>
                    <button className="red-Button" type="submit">Login</button>
                </Form>
            </Formik>
            <p className="align-text-center">Não possui uma conta? <a className="red-Color inter-semibold-font" onClick={() => props.changePage(2)}>Inscreva-se</a></p>
        </div>
    )
}

export default LoginForm;