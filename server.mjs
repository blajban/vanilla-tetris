import express from 'express';
const app = express();

app.use('/', express.static('./'));


app.listen(12500);
console.log('Server running at http://localhost:12500/');