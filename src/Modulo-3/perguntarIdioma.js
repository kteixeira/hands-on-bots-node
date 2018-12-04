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
        builder.Prompts.text(session, 'Olá, qual o seu nome?')
    },

    (session, results) => {
        session.userData.nome = results.response;
        session.send(`Olá ${session.userData.nome}!`);

        session.beginDialog('/perguntarIdioma');
    },
]);

bot.dialog('/perguntarIdioma', [
    session => {
        builder.Prompts.text(session, 'Qual é o idioma que vocẽ sabe falar?');
    },

    (session, results) => {
        session.dialogData.idioma = results.response;

        session.endDialog(`Ótimo **${session.userData.nome}**, você sabe falar: **${session.dialogData.idioma}**`);
    }
])