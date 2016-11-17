/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
var APP_ID = amzn1.ask.skill.5b5e61cf-19bd-46c0-9243-6eee1888ad5c; 

/**
 * Array containing Morrissey facts.
 */
var FACTS = [
    "Morrissey is a cousin of Robbie Keane, the Irish footballer. He has said of Keane, 'To watch him on the pitch – pacing like a lion, as weightless as an astronaut, is pure therapy.'",
    "Morrissey is a lapsed Catholic.",
    "A vegetarian since the age of eleven, according to a 2015 interview with Larry King, Morrissey is now a vegan.",
    "Morrissey is a vocal advocate on animal welfare and animal rights issues.",
    "After Margaret Thatcher's death in April 2013, Morrissey called her 'a terror without an atom of humanity' and that 'every move she made was charged by negativity'.",
    "Morrissey is an advocate for animal rights and a supporter of Peeta: the People for the Ethical Treatment of Animals.",
    "In February 2013, it was reported that the Staples Center had agreed for the first time ever to make every food vendor one-hundred-percent vegetarian for Morrissey's performance on March first; contractually having all McDonald's vendors close down.",
    "In 2006, Morrissey was voted the second greatest living British icon by BBC’s 'The Culture Show'. He was beaten to the top spot by David Attenborough, but was ahead of Paul McCartney and David Bowie.",
    "The Smiths released their debut, self-titled album in 1984.",
    "'Meat Is Murder’, The Smiths’ second album, was released in February 1985.",
    "After Eric Cantona famously kung-fu kicked an abusive football fan in 1995, Morrissey became enchanted by the Manchester United forward. He told one interviewer, 'I find him very exciting.'",
    "As a boy, Morrissey represented his school in both the one-hundred and four-hundred metres athletic events.",
    "Morrissey's full name is Stephen Patrick Morrissey.",
    "Morrissey was born in Davyhulme, Lancashire in the northwest of England.",
    "Morrissey was born on May 22, 1959.",
    "Morrissey's first job was as a filing clerk at the Inland Revenue. Of the job, he said, 'I would actually prefer prostitution.'",
    "Morrissey’s parents were both Irish Catholic immigrants who moved to Manchester the year before he was born.",
    "Morrissey’s father, Peter, worked as a hospital porter while his mother Elizabeth was an assistant librarian.",
    "The first gig Morrissey went to was T-Rex at the Belle Vue in 1972.",
    "Growing up, Morrissey’s favourite musicians included T-Rex, David Bowie, Patti Smith and the New York Dolls.",
    "Morrissey's literary heroes include Oscar Wilde, W.H. Auden, Robert Herrick and A.E. Houseman."
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Morrissey Facts is a child of AlexaSkill.
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
        response.ask("You can say tell me a Morrissey fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    // Get a random Morrissey fact from the Morrissey facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Morrisey Fact skill.
    var fact = new Fact();
    fact.execute(event, context);
};

