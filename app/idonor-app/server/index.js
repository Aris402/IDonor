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

app.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const page = req.body.page

    res.send({msg: "Ok"});
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
         if(err){
             res.send(err)
         }
         if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) =>{
                db.query("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [email, hash, name], (err, response) =>{
                    if(err){
                        res.send(err)
                    }
                    page = 3;
                    res.send({msg: "Cadastrado com sucesso"})
                })
            })
         }else{
             res.send({msg: "Usuário já cadastrado"})
         }
     })
})

app.get("/", (req, res) =>{
    
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

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

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});