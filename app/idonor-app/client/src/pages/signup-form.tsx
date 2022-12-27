import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"
import '../styles/loginsignin.css'
import Axios from 'axios'
import { CgArrowLeft } from "react-icons/cg";


const SignUpForm = (props:any) => {
    
    const validationRegister = yup.object().shape({
        name: yup.string().required("Este é um campo obrigatório"),

        email: yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
        
        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este é um campo obrigatório"),

        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais")
    })

    const handleClickRegister = (values:any) => {
            Axios.post("http://localhost:3001/signup", {
                email: values.email,
                password: values.password,
                name: values.name
            }).then((response) =>{
                console.log(response)
                if(response.data.msg == "Cadastrado com sucesso"){
                    props.changePage(3);
                }
            })
        }
    return(
        <div className="inter-font container">
            <CgArrowLeft onClick={() => props.changePage(0)} className="arrowButton" title="voltar" size={30}/>
            <div className="text">
                <h2>Inscreva-se</h2>
                <p>Crie sua conta e salve vidas</p>
            </div>
            <Formik 
                initialValues={{}} 
                onSubmit={handleClickRegister}
                validationSchema={validationRegister}
            >
                <Form className="login-form">
                    <div className="login-form-div">
                        <label htmlFor="nome">Nome</label>

                        <Field name="name" id="nome" className="form-field inter-font" placeholder="Seu nome"></Field>

                        <ErrorMessage name="name" component="span" className="form-error"></ErrorMessage>
                    </div>
                    <div className="login-form-div">
                        <label htmlFor="email">Email</label>

                        <Field name="email" id="email" className="form-field inter-font" placeholder="Seu email"></Field>

                        <ErrorMessage name="email" component="span" className="form-error"></ErrorMessage>
                    </div>

                    <div className="login-form-div">
                        <label htmlFor="senha">Senha</label>

                        <Field name="password" id="senha" className="form-field inter-font" placeholder="Sua senha" type="password"></Field>

                        <ErrorMessage name="password" component="span" className="form-error"></ErrorMessage>
                    </div> <div className="login-form-div">
                        <Field name="confirmPassword" className="form-field inter-font" placeholder="Confirme sua senha" type="password"></Field>

                        <ErrorMessage name="confirmPassword" component="span" className="form-error"></ErrorMessage>
                    </div>
                    <button className="red-Button" type="submit">Inscreva-se</button>
                    <br/><br/>
                    <p className="align-text-center">Já possui uma conta? <a className="red-Color inter-semibold-font" onClick={() => props.changePage(1)}>Faça Login</a></p>
                </Form>
            </Formik>
        </div>
    )
}

export default SignUpForm;