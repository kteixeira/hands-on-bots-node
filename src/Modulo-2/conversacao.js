/**
 * 
 * 
 * 
 * 
 */

const builder = require('botbuilder');
const restify = require('restify');

//Configurações do server via restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação executando na porta %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
})

const bot = new builder.UniversalBot(connector, [
    (session) => {
        builder.Prompts.text(session, 'Olá! Tudo bem?')
    },

    (session) => {
        builder.Prompts.text(session, 'Como você se chama?')
    },

    (session, results) => {
        let msg = results.response;
        session.send(`Oi ${msg}! Em que posso ajudar?`)
    }
]);

//Endpoint para executar as mensagens para o usuário
server.post('/ api/messages', connector.listen());