/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.ask.skill.5b5e61cf-19bd-46c0-9243-6eee1888ad5c'; 

/**
 * Array containing MozFacts.
 */
var FACTS = [
    "Morrissey is a cousin of Robbie Keane, the Irish footballer. Speaking of Keane he said: 'To watch him on the pitch – pacing like a lion, as weightless as an astronaut, is pure therapy.'",
    "Morrissey is a lapsed Catholic.",
    "According to a 2015 interview with Larry King, Morrissey is a vegan.",
    "Morrissey is a vocal advocate on animal welfare and animal rights issues.",
    "After Margaret Thatcher's death in April 2013, Morrissey said she was a 'terror without an atom of humanity', and that 'every move she made was charged by negativity'.",
    "Morrissey supports the animal rights organisation Peeta: the People for the Ethical Treatment of Animals.",
    "All the McDonald's vendors at 'The Staples Center' in Los Angeles were closed down for Morrissey's performance in 2013.",
    "In 2006, Morrissey was voted the second greatest living British ikon by the BBC’s 'The Culture Show'. He was beaten to the top spot by David Attenborough, but was ahead of Paul McCartney and David Bowie.",
    "The Smiths released their debut self-titled album in 1984.",
    "'Meat Is Murder’, The Smiths’ second album, was released in February 1985.",
    "After Eric Cantona famously kung-fu kicked an abusive football fan in 1995, Morrissey became enchanted by the Manchester United forward. He told one interviewer, 'I find him very exciting.'",
    "As a boy, Morrissey was an athlete. He represented his school in both the one-hundred and four-hundred metres athletic events.",
    "Morrissey's full name is Stephen Patrick Morrissey.",
    "Morrissey was born in Davyhulme, which is a town in Greater Manchester in the northwest of England.",
    "Morrissey was born on May 22, 1959.",
    "Morrissey's first job was as a filing clerk at the UK Inland Revenue. He didn't like the job. He said: 'I would actually prefer prostitution.'",
    "Morrissey’s parents were both Irish Catholic immigrants who moved to Manchester the year before he was born.",
    "Morrissey’s father, Peter, worked as a hospital porter, while his mother Elizabeth was an assistant librarian.",
    "Morrissey attended his first concert in June 1972 when he was thirteen years old. It was T Rex, at the Belle Vue in Manchester.",
    "As he grew up, Morrissey’s favourite musicians included T Rex, David Bowie, Patti Smith, and the New York Dolls.",
    "Morrissey said that the band called themselves 'The Smiths' because 'it was the most ordinary name' that they could think of. He said: 'I think it's time the ordinary folk of the world showed their faces.'",
    "All of The Smiths come from Manchester England, but are of Irish descent. Morrissey once said that The Smiths were more Irish than U2.",
    "The Smiths' fourth and final studio album, 'Strangeways Here We Come', is named after Strangeways prison, which is located in Manchester. In 1987 Morrissey told an interviewer: 'If I ended up in Strangeways I wouldn't be at all surprised.'",
    "Morrissey is a fan of the football team Manchester United.",
    "Morrissey has been treated for cancer in his oesophagus.",
    "Morrissey was diagnosed with depression at a young age. He says: 'It’s usually the very first thing when you wake up, there is no cure, and I think it’s part of being a sensitive open human.'",
    "Morrissey's literary heroes include: Oscar Wilde, W.H. Auden, Robert Herrick, and A.E. Houseman."
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * MozFacts is a child of AlexaSkill.
 */

var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Moz-Fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Morrissey fact from the MozFacts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the MozFact skill.
    var fact = new Fact();
    fact.execute(event, context);
};

