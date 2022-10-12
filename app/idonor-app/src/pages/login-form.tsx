import {Formik, Form, Field, ErrorMessage} from "formik"
import * as React from 'react';
import * as yup from "yup"
import './styles.css'

const LoginForm = (props:any) => {
    
    const validationLogin = yup.object().shape({
        email: yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este é um campo obrigatório")
    })

    const handleClickLogin = (values:any) => {
            console.log(values)
        }
    return(
        <div className="inter-font">
            <Formik 
                initialValues={{}} 
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
            >
                <Form className="login-form">
                    <div className="login-form-div">
                        <Field name="email" className="form-field inter-font" placeHolder="Seu email"></Field>

                        <ErrorMessage name="email" component="span" className="form-error"></ErrorMessage>
                    </div>

                    <div className="login-form-div">
                        <Field name="password" className="form-field inter-font" placeHolder="Sua senha"></Field>

                        <ErrorMessage name="password" component="span" className="form-error"></ErrorMessage>
                    </div>
                    <button className="button" type="submit">Login</button>
                </Form>
            </Formik>
            <p>Não possui uma conta? <a className="red-Color inter-semibold-font" onClick={() => props.changePage(2)}>Inscreva-se</a></p>
        </div>
    )
}

export default LoginForm;