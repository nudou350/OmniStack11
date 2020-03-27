const express = require('express');
const routes = require('./routes');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json()); //no corpo converte json em algo compreensivel
app.use(routes);

app.listen(3333);

/*metodos http: 
GET: usado quando queremos buscar uma info
POST: Criar uma info
PUT : alterar uma info
DELETE: Deleta uma info
*/

/* 
Tipos de parametros:
Query params: parametros nomeados na rota após o simbolo "?"(filtros, paginacao)
Route params: parametros pra identificar recursos 
Request Body: Corpo da requisicao p criar ou alterar
*/

