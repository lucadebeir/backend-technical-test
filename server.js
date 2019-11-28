const express = require('express');
const path = require('path');
const { log } = console;
const app = express();
const bodyParser = require('body-parser')


const PORT = 8080;


// Data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));



// email, subject, text
app.post('/form/result', (req, res) => {
    log('Data: ', req.body);
    res.render("result.ejs", req.body);
});


// Render home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Error page
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});


// Start server
app.listen(PORT, () => log('Server is starting on PORT, ', 8080));