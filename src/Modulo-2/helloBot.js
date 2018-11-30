/**
 * 
 */

const builder = require('botbuilder');

//criando um conector
const connector = new builder.ConsoleConnector().listen();
const bot = new builder.UniversalBot(connector);

//criando um diálogo

bot.dialog('/',  [
    function(session){
        session.send('E ai mulecote!');
    }
]);