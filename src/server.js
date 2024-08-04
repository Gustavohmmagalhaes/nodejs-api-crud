import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// rotas são para : criar, listar, Editar, Deletar algo.
// Uma requisição HTTP é formada pelo metodo HTTP e a URL
// Metodo GET = Buscar algo, POST = criar algo, PUT = atualizar algo, DELETE = deletar algo; uma rota pode ter varios metodos diferentes
// para usar o import, eu tenho que ir no package.json e colocar a linha "type":module
// quando é um modulo interno do node, a gente diferencia ele colocando o node: na frente
// req = request, res = response
// atraves do req eu vou ter acesso aos dados que foram informados pelo usuario e estão vindo para o servidor, e com o res eu vou devolver uma resposta pra quem está chamando nosso servidor.
// colocar o "dev": "node --watch src/server.js" no script do package.json para o servivor atualizar uma mudança automaticamente, depois é só rodar o middlewaresnpm run dev no terminal
//quando retorna 201 é pq deu certo e foi criado algo, no metodo get não precisa mudar 200 já o padrão, o 404 não encontrou rota 


const server = http.createServer(async(req, res) => {
    const {method, url} = req;

    await json(req,res);
   
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        // console.log(extractQueryParams(routeParams.groups.query))

        const {query, ...params} = routeParams.groups
        req.params = params
        req.query = query ? extractQueryParams(query):{}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
    
})

server.listen(3333)