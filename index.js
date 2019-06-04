// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
const axios = require('axios');
 

const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  function rhymingWordHandler(agent){
    const word = agent.parameters.word;
    agent.add(word);
    return axios.get('https://api.datamuse.com/words?rel_rhy=${word}')
    .then((result)=>{
      result.data.map(wordObj => {
        agent.add(wordObj.word);
      });
    });
  
  }

  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('RhymingWord',rhymingWordHandler);
  agent.handleRequest(intentMap);
});
