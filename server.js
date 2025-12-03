const express = require('express');
const app = express();
const port = 3600;

const vendorCData = [
    {
        id: 1,
        details: {
            name: "Nasi Tempong",
            category: "Food"
        },
        pricing: {
            base_price: 20000,
            tax: 2000
        },
        stock: 26
    },
    {
        id: 2,
        details: {
            name: "Nasi Bakar",
            category: "Food"
        },
        pricing: {
            base_price: 12000,
            tax: 2000
        },
        stock: 23
    },
    {
        id: 3,
        details: {
            name: "Dimsum Mentai",
            category: "Food"
        },
        pricing: {
            base_price: 25000,
            tax: 2000
        },
        stock: 35
    },
    {
        id: 4,
        details: {
            name: "Tomyum Seafood",
            category: "Food"
        },
        pricing: {
            base_price: 30000,
            tax: 2000
        },
        stock: 28
    },
    {
        id: 5,
        details: {
            name: "Dimsum Keju",
            category: "Food"
        },
        pricing: {
            base_price: 15000,
            tax: 2000
        },
        stock: 0
    },
];

function normalizeVendorC(data) {
    const totalPrice = data.pricing.base_price + data.pricing.tax;
    
    return {
        id: data.id.toString(),
        name: data.details.name,
        price: totalPrice,
        stock: data.stock,
        available: data.stock > 0
    };
}

// Endpoint 1: Data mentah Vendor C (semua produk)
app.get('/api/resto/raw', (req, res) => {
    res.json(vendorCData);
});

// Endpoint 2: Data yang sudah dinormalisasi (semua produk)
app.get('/api/resto/normalized', (req, res) => {
    const normalizedData = vendorCData.map(product => normalizeVendorC(product));
    res.json(normalizedData);
});

// Endpoint 3: Normalisasi produk berdasarkan ID
app.get('/api/resto/normalized/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = vendorCData.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ 
            error: "Product not found",
        });
    }
    
    const normalizedData = normalizeVendorC(product);
    res.json(normalizedData);
});

// Endpoint utama
app.get('/', (req, res) => {
    res.json({ 
        message: "Vendor C Resto & Kuliner API",
        endpoints: {
            raw_data_all: "/api/resto/raw",
            normalized_all: "/api/resto/normalized",
            normalized_by_id: "/api/resto/normalized/:id"
        }
    });
});

app.listen(port, () => {
    console.log(`Vendor C server running at http://localhost:${port}`);
});