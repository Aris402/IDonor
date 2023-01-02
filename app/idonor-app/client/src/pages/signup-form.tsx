import {Formik, Form, Field, ErrorMessage} from "formik"
import * as yup from "yup"
import '../styles/loginsignin.css'
import Axios from 'axios'
import { CgArrowLeft } from "react-icons/cg";
import { useEffect, useState } from "react";

const SignUpForm = (props:any) => {

    const [userName, setName] = useState(" ");
    const [userEmail, setEmail] = useState(" ");
    const [content, setContent] = useState(1);

    const validationRegister = yup.object().shape({
        name: yup.string().required("Este é um campo obrigatório"),

        email: yup.string().email("Não é um email válido").required("Este é um campo obrigatório"),
        
        password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres").required("Este é um campo obrigatório"),

        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais"),
        
    })

    const validationRegister2 = yup.object().shape({
        bltype: yup.string().required("Este é um campo obrigatório"),

        birthdate: yup.date().required("Este é um campo obrigatório"),
        
        state: yup.string().required("Este é um campo obrigatório"),

        city: yup.string().required("Este é um campo obrigatório"),

        cellphone: yup.string().max(11, "Número de celular muito grande").required("Este é um campo obrigatório"),
    })

    const handleClickRegister = (values:any) => {
            Axios.post("http://localhost:3001/signup", {
                email: values.email,
                password: values.password,
                name: values.name
            }).then((response) =>{
                console.log(response)
                if(response.data.msg == "Cadastrado com sucesso"){
                    setContent(2);
                    setName(response.data.nameUser)
                    setEmail(response.data.userEmail)
                }
            })
        }
    const handleClickRegister2 = (values:any) => {
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
        if(content == 1){
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
        else{
            return(
                <div className="inter-font container">
                    <div className="text">
                        <h2>Olá, {userName}!❣️</h2>
                        <br/><br/>
                        <p>Preencha os dados corretamente:</p>
                    </div>
                    <Formik 
                        initialValues={{}} 
                        onSubmit={handleClickRegister2}
                        validationSchema={validationRegister2}
                    >
                        <Form className="login-form">
                        <div className="login-form-div">
                            <label htmlFor="bltype">Tipo sanguíneo</label>

                            <Field name="bltype" id="bltype" className="form-field inter-font" placeholder="Seu tipo sanguíneo" type="text"></Field>

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
}

export default SignUpForm;