const express = require('express');
const app = express();
const port = 3600;

const vendorCData = [
    {
        id: 501,
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
        id: 502,
        details: {
            name: "Nasi Bakar",
            category: "Food"
        },
        pricing: {
            base_price: 12000,
            tax: 1200
        },
        stock: 23
    },
    {
        id: 503,
        details: {
            name: "Dimsum Mentai",
            category: "Food"
        },
        pricing: {
            base_price: 25000,
            tax: 2500
        },
        stock: 35
    },
    {
        id: 504,
        details: {
            name: "Tomyum Seafood",
            category: "Food"
        },
        pricing: {
            base_price: 30000,
            tax: 3000
        },
        stock: 28
    },
    {
        id: 505,
        details: {
            name: "Dimsum Keju",
            category: "Food"
        },
        pricing: {
            base_price: 15000,
            tax: 1500
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

app.get('/', (req, res) => {
    res.redirect("/api/resto");
});

// Jika endpoint ini masih ada, maka normalizeVendorC harus didefinisikan.
app.get('/api/resto', (req, res) => {
    const normalizedData = vendorCData.map(product => normalizeVendorC(product));
    res.json(normalizedData);
});

app.listen(port, () => {
    console.log(`Vendor C server running at http://localhost:${port}`);
});