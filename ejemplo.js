var restify = require('restify');//web server restify
var builder=require('botbuilder');
//crear servidor
var server= restify.createServer();
// se escucha en diferentes puertos , particularment en el puerto 3978
server.listen(process.env.port || process.env.PORT || 3978, function(){
  console.log('%s listening to %s', server.name,server.url);
});

var connector = new builder.ChatConnector({
    appId:'',
    appPassword:''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());
// dialogos
bot.dialog('/',[// primer dialogo se crea dentro del bot
    
        function(session){
            builder.Prompts.text(session,'¿ hola cual es tu nombre  ?');
        },
        function(session, results){
            session.dialogData.msj = results.response;
            //let msj = results.response;
            session.send(`Hola ${session.dialogData.msj}`);// este objeto es la manera de conectar con los usuarios
            session.beginDialog('/preguntarLugar',session.userData.msj);
            //session.endDialogWithResult(results);
        }

    
    ]);

    bot.dialog('/preguntarLugar',[// primer dialogo se crea dentro del bot
        
            function(session){
                builder.Prompts.text(session,'de donde eres?');
                //session.dialogData.lugar = results.response;
            },
            
            function(session, results){
                session.dialogData.lugar = results.response;
                //let lugar = results.response;
                session.endConversation(` que bien que eres de ${session.dialogData.lugar}`);// este objeto es la manera de conectar con los usuarios
                session.beginDialog('/preguntardireccion',session.userData.lugar);
                session.endDialogWithResult(results);
            }
        ]);
        

        bot.dialog('/preguntardireccion',[// primer dialogo se crea dentro del bot
            
                function(session){
                    builder.Prompts.text(session,'direccion de residencia?');
                },
                
                function(session, results){
                    session.dialogData.direccion  = results.response;
                    //let lugar = results.response;
                    //session.endConversation(`colombia  ${lugar}`);// este objeto es la manera de conectar con los usuarios
                    session.beginDialog('/preguntartelefono',session.userData.direccion);
                    //session.endDialogWithResult(results);
                }
            ]);
            bot.dialog('/preguntartelefono',[// primer dialogo se crea dentro del bot
                
                    function(session){
                        builder.Prompts.text(session,'cual es su numero telefonico ?');
                    },
                    
                    function(session, results){
                        session.dialogData.telefono = results.response;
                        //let lugar = results.response;
                        //session.endConversation(`colombia  ${lugar}`);// este objeto es la manera de conectar con los usuarios
                        session.beginDialog('/preguntaremail',session.userData.telefono);
                        //session.endDialogWithResult(results);
                    }
                ]);
                bot.dialog('/preguntaremail',[// primer dialogo se crea dentro del bot
                    
                        function(session){
                            builder.Prompts.text(session,'cual es su correo electronico?');
                        },
                        
                        function(session, results){
                            session.dialogData.email = results.response;
                            //let lugar = results.response;
                            //session.endConversation(`colombia  ${lugar}`);// este objeto es la manera de conectar con los usuarios
                            session.beginDialog('/preguntarcedula',session.userData.email);
                            //session.endDialogWithResult(results);
                        }
                    ]);
                    bot.dialog('/preguntarcedula',[// primer dialogo se crea dentro del bot
                        
                            function(session){
                                builder.Prompts.text(session,'numero de su cedula de ciudadania?');
                            },
                            
                            function(session, results){
                                session.dialogData.cedula = results.response;
                                //let lugar = results.response;
                                //session.endConversation(`colombia  ${lugar}`);// este objeto es la manera de conectar con los usuarios
                                session.beginDialog('/preguntareducacion',session.userData.cedula);
                                //session.endDialogWithResult(results);
                            }
                        ]);
                        bot.dialog('/preguntareducacion',[// primer dialogo se crea dentro del bot
                            
                                function(session){
                                    builder.Prompts.text(session,'que nivel de educacion ?');
                                },
                                
                                function(session, results){
                                    session.dialogData.educacion = results.response;
                                    //let lugar = results.response;
                                    //session.endConversation(`colombia  ${lugar}`);// este objeto es la manera de conectar con los usuarios
                                    session.beginDialog('/preguntarsalud',session.userData.educacion);
                                    //session.endDialogWithResult(results);
                                }
                            ]);
        bot.dialog('/preguntarsalud',[// primer dialogo se crea dentro del bot
            
                function(session){
                    builder.Prompts.text(session,'Como te encuentras de salud?');
                },
                function(session, results){
                    session.dialogData.salud = results.response;
                    //let salud = results.response;
                    //session.endConversation(`me encuentro muy bien   ${salud}`);// este objeto es la manera de conectar con los usuarios
                    session.beginDialog('/preguntartrabajo',session.userData.salud);
                    //session.endDialogWithResult(results);
                }
            ]);
            bot.dialog('/preguntartrabajo',[// primer dialogo se crea dentro del bot
                
                    function(session){
                        builder.Prompts.text(session,'en que trabajas?');
                    },
                    function(session, results){
                        session.dialogData.trabajo = results.response;
                        //let trabajo = results.response;
                        //session.endConversation(`no trabajo  ${trabajo}`);// este objeto es la manera de conectar con los usuarios
                       session.beginDialog('/preguntaredad',session.userData.trabajo);
                       //session.endDialogWithResult(results);
                    }
                ]);
        bot.dialog('/preguntaredad',[// primer dialogo se crea dentro del bot
            
                function(session){
                    builder.Prompts.text(session,'que edad tienes?');
                },
                function(session, results){
                    //session.dialogData.edad = results.response;
                    let edad = results.response;
                    if(edad>=18){
                        session.endDialog('parece que eres mayor de edad ');// este objeto es la manera de conectar con los usuarios
                    }else{
                        session.endDialog('parece que eres menor de edad');// este objeto es la manera de conectar con los usuarios
                        
                    }
                    
                    //session.beginDialog('/preguntarLugar');
                }
        ]);
          