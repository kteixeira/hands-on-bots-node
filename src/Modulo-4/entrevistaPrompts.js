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
        builder.Prompts.text(session, 'Olá! Qual é o seu nome?');
    },

    (session, results) => {
        session.dialogData.nome = results.response;
        builder.Prompts.text(session, `Oi ${session.dialogData.nome}. Qual é a sua profissão?`);
    },

    (session, results) => {
        session.dialogData.profissao = results.response;
        builder.Prompts.number(session, `${session.dialogData.nome} quantos anos você tem?`);
    },

    (session, results) => {
        session.dialogData.idade = results.response;
        builder.Prompts.time(session, 'Você pode informar que horas são agora?')
    },

    (session, results) => {
        session.dialogData.horaAtual = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.confirm(session, `Você deseja ver o seu questionário?`, { listStyle: builder.ListStyle.button });
    },

    (session, results) => {
        if(!results.response) {
            return session.endDialog('Até a próxima! Tchau');
        }

        return session.endDialog(`Os detalhes do seu questionario foram: 
            <br>Nome: **${session.dialogData.nome}**
            <br>Profissão: **${session.dialogData.profissao}**
            <br>Idade: **${session.dialogData.idade}**
            <br>Hora atual: **${session.dialogData.horaAtual}**
        `);
    }
])