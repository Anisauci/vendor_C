const express = require('express');
const app = express();
const port = 3000;

const products = [
    {
        id: 501,
        details: {
            name: "Nasi Goreng Jawa",
            category: 'Food'
        },
        pricing: {
            base_price: 30000,
            tax: 3000
        },
        stock: 12
    },
    {
        id: 502,
        details: {
            name: "Dimsum Mentai",
            category: 'Food'
        },
        pricing: {
            base_price: 21000,
            tax: 2100
        },
        stock: 0
    },
    {
        id: 503,
        details: {
            name: "Sate Lilit Bali",
            category: 'Food'
        },
        pricing: {
            base_price: 35000,
            tax: 3500
        },
        stock: 20
    },
    {
        id: 504,
        details: {
            name: "Jus Alpukat",
            category: 'Drink'
        },
        pricing: {
            base_price: 15000,
            tax: 1500
        },
        stock: 34
    },
    {
        id: 505,
        details: {
            name: "Waffle Coklat",
            category: 'Food'
        },
        pricing: {
            base_price: 17000,
            tax: 1700
        },
        stock: 23
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