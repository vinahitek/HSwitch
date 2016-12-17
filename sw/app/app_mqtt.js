'use strict';

import {MqttClient} from 'react-native-mqtt';
var mqtt = require('react-native-mqtt');
var client_mqtt = undefined;

async function mqttconnect(IsConnected) {
  
  var clientid = "web_" + parseInt(Math.random() * 100, 10);
  console.log(clientid);
  /* create mqtt client */
  var optionconnect = {
    host: 'm12.cloudmqtt.com',
    port: 17935,
    clientId: clientid,
    user: "lzwrnmwu",
    pass: "qODam8loOrFl",
    auth: true
  };
  
  let connectedstatus=false;
  return new Promise((resolve, reject) => {
     if(IsConnected)
     {
       resolve(true);
       }
       else
       {
     mqtt.createClient(optionconnect)
      .then(function (client) {
        client
          .on('closed', function () {
            console.log('mqtt.event.closed');

          });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);

        });

        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg);
        });

        client.on('connect', function () {
          client_mqtt = client;
          //clientret = client;
          console.log('connected');
          //client.subscribe('/data', 0);
          //client.publish('/data', "test", 0, false);
          connectedstatus=true;
          resolve(connectedstatus);
        });

        client.connect();
        
      })
      .catch(function (err) {
        console.log(err);
        reject(err)
      });
       }
  })
}


function led1config(value) {

  client_mqtt.publish(client_mqtt.options.user + '/hungvotests/onoff', "13 " + (value == true
    ? "1"
    : "0"), 3, false);
}

function led2config(value) {
  client_mqtt.publish(client_mqtt.options.user + '/hungvotests/onoff', "14 " + (value == true
    ? "1"
    : "0"), 3, false);
}

function led3config(value) {
  client_mqtt.publish(client_mqtt.options.user + '/hungvotests/onoff', "16 " + (value == true
    ? "1"
    : "0"), 3, false);
}

module.exports ={

    ledcontrol : function(ledid,value)
    {
        if(client_mqtt == undefined)
            return;

        switch(ledid)
        {
            case 1:led1config(value);
            break;
            case 2:led2config(value);
            break;
            case 3:led3config(value);
            break;
            default:
            break;
        }
        
    },

    connecttocloud:mqttconnect
} 