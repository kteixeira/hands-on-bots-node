/**
 * 
 */

const restify = require('restify');
const builder = require('botbuilder');

//Criação de servidor via Restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || function () {
    console.log('%s Aplicação está executando na porta %s', server.name, server.url)
});

//Criação do chat connector para comunicar com o serviço do bot framework
const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

//Endpoint para executar as mensagens para os usuários via bot emulator
server.post("/api/messages", connector.listen());

//Aqui entra os nossos diálogos
const bot = new builder.UniversalBot(connector, function (session) {
    session.send("Você disse: %s", session.message.text)
});
