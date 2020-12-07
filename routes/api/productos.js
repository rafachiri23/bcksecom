// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

let productosArray = [];

router.get('/all',(req, res)=>{
    res.status(200).json(productosArray);
});

router.post('/new', (req, res)=>{
    const { sku, name, price } = req.body;
    const id = productosArray.length + 1;
    productosArray.push({ id, sku, name, price });
    res.status(200).json({ id, sku, name, price });
});

router.put('/upd/:id',(req, res)=>{
    let { id } = req.params;
    id = parseInt(id);
    let {stock} = req.body;
    stock = parseInt(stock);

    const index = id - 1;
    let modified = false;
    let product = null;
    let newProductosArray = productosArray.map((o,i)=>{
        if(i === index){
            modified = true;
            o.stock = stock;
            product = o;
        }
        return o;
    });
    productosArray = newProductosArray;

    res.status(200).json({modified, product});
});

router.delete('/del/:id', (req, res)=>{
    let {id} = req.params;
    id = parseInt(id);
    let deleted = false;
    let productos = null;
    let newProductosArray = productosArray.find((o,i)=>{
        if(o.id !== id){
            return true;
        }else{
            deleted = true;
            product = o;
            return false;
        }
    });
    productosArray = newProductosArray;
    res.status(200).json({"delete":true})
});

router.get('/one/:id',(req, res)=>{
    let {id} = req.params;
    id = parseInt(id);
    let product = productosArray.find((o,i)=>{
        return o.id === id;
    });
    res.status(200).json(product);
});

module.exports = router;