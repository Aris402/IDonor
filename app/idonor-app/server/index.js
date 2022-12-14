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

    res.send({msg: "Ok"});
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
         if(err){
             res.send(err)
         }
         if(result.length == 0){
            bcrypt.hash(password, saltRounds, (err, hash) =>{

            })
             db.query("INSERT INTO users (email, password, name) VALUES (?, ?, ?)", [email, hash, name], (err, response) =>{
                 if(err){
                     res.send(err)
                 }

                 res.send({msg: "Cadastrado com sucesso"})
             })
         }else{
             res.send({msg: "Usuário já cadastrado"})
         }
     })
})

app.get("/", (req, res) =>{
    res.send("Hello world")
    db.query(
        "INSERT INTO users (email, password) VALUES ('pocha@hotmail.com', '1234567')", (err, result) => {
            if(err){
                console.log(err)
            }
        }
        )
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], (err, result) =>{
        if(err){
            res.send(err);
        } if(result.length > 0){
            res.send({msg: "Usuário logado com sucesso"});
        } else{
            res.send({msg: "Usuário não encontrado"});
        }

    })
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});