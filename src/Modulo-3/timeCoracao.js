/**
 * 
 * 
 * 
 * 
 */

const restify = require('restify');
const builder = require('botbuilder');

// Configuração do server via Restify
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação executando na porta %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector);

//Bloco de Dialogs
bot.dialog('/', [
    session => {
        builder.Prompts.text(session, 'Qual é o seu nome?');
    },

    (session, results) => {
        let nome = results.response;
        session.send(`Oi! ${nome}`);

        session.beginDialog('/perguntarTimeCoracao')
    }
])

bot.dialog('/perguntarTimeCoracao', [
    session.Prompts.text(session, 'Qual é o seu time de futebol do coração?')
])