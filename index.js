// ESM (ES6 Module, Ecma Script Module)     import, export
// CommonJS Module : require, module.exports 또는 exports

// const express = require('express')

import express from "express";

const app = express()

app.get('/', function (req, res) {
  res.send('GET 요청!')
});

app.post('/', function(req, res){
    res.send('POST 요청!')
});

app.put('/', function(req, res){
    res.send('PUT 요청!')
});

app.delete('/', function(req, res){
    res.send('DELETE 요청!')
});


app.listen(3000)

// ORM 이해하기, 시퀄라이즈

// 옛날 방식
// import http from "http"

// http.createServer((req, res) => {
//     res.write("Hello World!")
// }).listen(3000, () => {
//     console.log('server is running on 3000 port!');
// })