const express = require('express');
const qr = require('qrcode');
const path = require('path');

const app = express();
const port = 3000;

// Handlebars Middleware

app.set('view engine', 'hbs');

// Body Parser Middlewarecb c vc 
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// QR Code Generator Route

app.post("/generate",(req, res) => {
    const url = req.body.url;
    qr.toDataURL(url,(err, data) => {
        if(err){
            res.send("Error occurred generating QR code.");
        }else{
            res.render("index",{qrImage:data,url});
        }
    })
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
