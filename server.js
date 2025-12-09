const express = require('express');
const app = express();
const port = 3000;

const products = [
    {
        id: 501,
        details: {
            name: "Sego Tempong",
            category: 'Food'
        },
        pricing: {
            base_price: 25000,
            tax: 2500
        },
        stock: 50
    },
    {
        id: 502,
        details: {
            name: "Rujak Soto",
            category: 'Food'
        },
        pricing: {
            base_price: 20000,
            tax: 2000
        },
        stock: 35
    },
    {
        id: 503,
        details: {
            name: "Pecel Rawon",
            category: 'Food'
        },
        pricing: {
            base_price: 22000,
            tax: 2200
        },
        stock: 25
    },
    {
        id: 504,
        details: {
            name: "Kopi Osing",
            category: 'Drink'
        },
        pricing: {
            base_price: 10000,
            tax: 1000
        },
        stock: 60
    }
];

app.get('/', (req, res) => {
    res.json({
        message: 'Vendor C API - Resto & Kuliner',
        status: 'Running',
        endpoints: {
            all_products: `GET http://localhost:${port}/api/products`,
            product_by_id: `GET http://localhost:${port}/api/products/:id`
        }
    });
});

app.get('/api/products', (req, res) => {
    console.log(`[Vendor C] GET /api/products - ${new Date().toLocaleTimeString()}`);
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = products.find(p => p.id === id);
    
    if (!item) {
        return res.status(404).json({
            success: false,
            message: `Produk dengan ID ${id} tidak ditemukan`
        });
    }
    
    res.json(item);
});

app.listen(port, () => {
    console.log(`Vendor C API berjalan di: http://localhost:${port}`);
    console.log(`Total produk: ${products.length}`);
});

module.exports = app;