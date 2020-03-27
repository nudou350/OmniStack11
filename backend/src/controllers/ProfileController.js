//arquivo pra acessar uma determinada ONG e nao complicar o controller principal
const connection = require('../database/connection');
module.exports = {
    async index(request,response) {
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
        .where('ong_id',ong_id)
        .select("*");

        return response.json(incidents);

    }
}