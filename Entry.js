import express from 'express';
import cors from 'cors';
import fs from 'fs';

// Syntax Import untuk Version NodeJs ke bawah
// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');

// URL Server Hosting di Cyclic.app
// https://calm-jade-anemone-cape.cyclic.app/

const entry = express();
const port = process.env.PORT || 3001;

entry.use(cors())

entry.get('/', (req, res) => {
    res.send(' Connected...')
})

entry.get('/banner', (req, res) => {
    const data = getData('./Data/Banner.json');
    res.json(data)
})

entry.get('/category', (req, res) => {
    const data = getData('./Data/Category.json');
    res.json(data)
})

entry.get('/product', (req, res) => {
    const data = getData('./Data/Product.json');
    res.json(data)
})

entry.get('/product/:id', (req, res) => {
    const data = findData(req.params.id)
    res.json(data)
})

entry.listen(port, () => {
    console.log(`Server sudah berjalan di localhost port: ${port}`)
})

const getData = (path) => {
    const data = fs.readFileSync(path, 'utf-8', (err, data) => data)
    return JSON.parse(data)
}

const findData = (id) => {
    const dataProduct = getData('./Data/Product.json')
    const findProduct = dataProduct.find((data) => data.id === parseInt(id))
    if(!findProduct) {
        let dummy = [{
            'brand': 'PRODUK TIDAK DITEMUKAN'
        }]
        return dummy
    }
    return findProduct
}