const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes'); 

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', routes); 

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
// console.log(`Servidor rodando na porta ${PORT} - acesse em http://localhost:${PORT}/api`);
//});

module.exports = app; // Exporta o app para o Vercel