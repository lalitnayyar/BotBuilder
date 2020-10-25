var builder = require("botbuilder");
var restify = require("restify");

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function (session) {
  //session.send("You said: %s", session.message.text);
  session.send(
    " Hey there ! I am a virtual assistant. I can help you book an medical appointment with us . Please provide answer to the following questions "
  );
  session.beginDialog("setAppointment");
});

bot.dialog("setAppointment", [
  (session, arg, next) => {
    builder.Prompts.text(session, "Whats your name ?");
  },
  (session, results) => {
    //console.log(results.response);
    session.userData.name = results.response;
    builder.Prompts.number(session, "Great ! Whats your age?");
  },
  (session, results) => {
    //console.log(results.response);
    session.userData.age = results.response;
    builder.Prompts.choice(session, " Gender ?", [
      "Male",
      "Female",
      "Not to Discole",
    ]);
  },
  (session, results) => {
    //console.log(results.response);
    session.userData.gender = results.response.entity;
    builder.Prompts.time(
      session,
      "When would you like to book appointment? you can say 'tomorrow 10 am or date and time in m/d/yyyy hh:mm"
    );
  },
  (session, results) => {
    session.userData.datetime = builder.EntityRecognizer.resolveTime([results.response]);
var data = session.userData;
    session.send(
      "Thank you for your time. I have booked an appointment at : " +
        data.datetime
    );
    session.send("Appointment Details : \nName : " + data.name +"\nAge :" + data.age + "\nGender :"+data.gender);
  },
]);
