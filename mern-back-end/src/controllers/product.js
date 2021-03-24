const express = require('express')
const slugify = require('slugify')
const Product = require('../models/products')
exports.createProduct = (req, res) => {
    //res.status(201).json({file: req.files, body: req.body})

    const {name, price, description, category, quantity, } = req.body
    let productPictures = []
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return {img: file.filename}
        })
    }
    const product = new Product({
        name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createBy: req.user._id
    })
    product.save(((error, product) => {
        if (error) return res.status(400).json({error})
        if (product) {
            return res.status(201).json({product})
        }
    }))
}
