const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "idonor_db",
})

app.use(express.json())
app.use(cors())

var userData = [{}];

app.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
         if(err){
             res.send(err)
         }
         if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) =>{
                db.query("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [email, hash, name], (err, response) =>{
                    if(err){
                        res.send(err)
                    } else{
                        userData[0] = email;
                        userData[1] = name;
                        res.send({msg: "Cadastrado com sucesso", nameUser: name, userEmail: email})
                    }
                })
            })
         }else{
             res.send({msg: "Usuário já cadastrado"})
         }
     })
})

app.post("/signup2", (req, res) => {
    const bltype = req.body.bltype;
    const birthdate = req.body.birthdate;
    const state = req.body.state;
    const city = req.body.city;
    const cellphone = req.body.cellphone;
    
    db.query("UPDATE users SET bltype = ?, birthdate = ?, state = ?, city = ?, cellphone = ? WHERE email = ?", [bltype, birthdate, state, city, cellphone, userData[0]], (err, response) =>{
        if(err){
            res.send(err)
        } else{
            userData[2] = bltype;
            userData[3] = 
            res.send({msg: "Dados cadastrados com sucesso"})
        }
    })
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) =>{
        if(err){
            res.send(err);
        } 
        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (erro, result) => {
                if(result){
                    res.send("Usuário logado com sucesso");
                } else{
                    res.send("Senha está incorreta");
                }
            });
        } else{
            res.send({msg: "Email não encontrado"});
        }
    })
})

app.get("/getUser" , (req, res) =>{
    res.send()
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});