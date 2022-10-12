import {Formik, Form, Field, ErrorMessage} from "formik"
import * as React from 'react';
import * as yup from "yup"

const SignUpForm = (props:any) => {
    
    const validationRegister = yup.object().shape({
        email: yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
        
        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este é um campo obrigatório"),

        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais")
    })

    const handleClickRegister = (values:any) => {
            console.log(values)
        }
    return(
        <div>
            <Formik 
                initialValues={{}} 
                onSubmit={handleClickRegister}
                validationSchema={validationRegister}
            >
                <Form className="login-form">
                    <div className="login-form-div">
                        <Field name="name" className="form-field inter-font" placeholder="Seu nome"></Field>

                        <ErrorMessage name="name" component="span" className="form-error"></ErrorMessage>
                    </div>
                    <div className="login-form-div">
                        <Field name="email" className="form-field inter-font" placeholder="Seu email"></Field>

                        <ErrorMessage name="email" component="span" className="form-error"></ErrorMessage>
                    </div>

                    <div className="login-form-div">
                        <Field name="password" className="form-field inter-font" placeholder="Sua senha"></Field>

                        <ErrorMessage name="password" component="span" className="form-error"></ErrorMessage>
                    </div> <div className="login-form-div">
                        <Field name="confirmPassword" className="form-field inter-font" placeholder="Confirme sua senha"></Field>

                        <ErrorMessage name="confirmPassword" component="span" className="form-error"></ErrorMessage>
                    </div>
                    <button className="button" type="submit">Inscrever-se</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm;