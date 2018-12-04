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
    (session, results, next) => {
        if(session.userData.nome) {
            return next();
        }

        builder.Prompts.text(session, 'Olá! Qual é o seu nome?');
    },

    (session, results, next) => {
        if(results.response) {
            let msg = results.response;
            session.userData.nome = msg;
        }

        session.send(`Olá ${session.userData.nome}`)
    }
])