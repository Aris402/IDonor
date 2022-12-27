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
                        res.send({msg: "Cadastrado com sucesso"})
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

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
         if(err){
             res.send(err)
         }
         db.query("INSERT INTO users (bltype, birthdate, state, city, cellphone) VALUES (?, ?, ?, ?, ?)", [bltype, birthdate, state, city, cellphone], (err, response) =>{
            if(err){
                res.send(err)
            } else{
                res.send({msg: "Dados cadastrados com sucesso"})
            }
        })
     })
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

app.get("/getName", (req, res) =>{
    db.query("SELECT name FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("Rodando na porta 3001");
});