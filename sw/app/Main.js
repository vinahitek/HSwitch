import React, { PropTypes, Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  AsyncStorage
} from 'react-native'

import styles from './styles';
import Button from './Button';
import { MqttClient } from 'react-native-mqtt';


var mqtt = require('react-native-mqtt');
var client_mqtt = undefined;

async function __mqttconnect() {
  let clientret = undefined;
  if (client_mqtt != undefined) {
    return;
  }
  var clientid = "web_" + parseInt(Math.random() * 100, 10);
  console.log(clientid);
  /* create mqtt client */
  var optionconnect = {
    host: 'm12.cloudmqtt.com',
    port: 17935,
    clientId: clientid,
    user: "lzwrnmwu",
    pass: "qODam8loOrFl",
    auth: true,

  };


  return new Promise((resolve, reject) => {
    setTimeout(resolve, 10000)
  })




  return new Promise((resolve, reject) => {
    mqtt.createClient(optionconnect).then(function (client) {

      client.on('closed', function () {
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
        clientret=client;
        console.log('connected');
        client.subscribe('/data', 0);
        client.publish('/data', "test", 0, false);
      });

      client.connect();
      resolve()
    }).catch(function (err) {
      console.log(err);
      reject(err)
    });

  })


}
async function mqttconnect() {
  //let isconnect = false;
  try {
    let clientconnected = await __mqttconnect();
  }
  catch(error) {

  }
  
  if (
    clientconnected != undefined
  )
    isconnect = true;
  else
    isconnect = false;

  return isconnect;
}

function led1config(value) {
  
  client_mqtt.publish(client_mqtt.options.user+'/hungvotests/onoff', "13 "+  (value == true ? "1" : "0"), 3, false);
}

function led2config(value) {
  client_mqtt.publish(client_mqtt.options.user+'/hungvotests/onoff', "14 "+(value == true ? "1" : "0"), 3, false);
}

function led3config(value) {
  client_mqtt.publish(client_mqtt.options.user+'/hungvotests/onoff', "16 "+(value == true ? "1" : "0"), 3, false);
}

const drawerTypes = ['overlay', 'displace', 'static'];

export default class ControlPanel extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

    state =
      {
        state_switch1: false,
        state_switch2: false,
        state_switch3: false,
        serverisconnected: false
      }
  


  render() {

    let connectedtext = this.state.serverisconnected ? "Disconnect" : "Connected";

    return (
      <ScrollView pointerEvents="box-none"
        style={styles.scrollView}
        scrollEventThrottle={200}
        contentInset={{ top: 0 }}
        >
        <View style={styles.container}>
          <Text style={styles.welcome}>MAIN</Text>

          <Button onPress={() => {

            mqttconnect().then((isconnect) =>{
              this.setState({ serverisconnected: isconnect })
              console.log("server is connected ",this.state.serverisconnected);
            })

          } }

            text={connectedtext}

            />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Led1</Text>
          <Switch
            onValueChange={(value) => {
              led1config(value)
              this.setState({ state_switch1: value })
            } }
            style={styles.rowInput}
            value={this.state.state_switch1}
            />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Led2</Text>
          <Switch
            onValueChange={(value) => {
              led2config(value)
              this.setState({ state_switch2: value })
            } }
            style={styles.rowInput}
            value={this.state.state_switch2}
            />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Led2</Text>
          <Switch
            onValueChange={(value) => {
              led3config(value)
              this.setState({ state_switch3: value })
            } }
            style={styles.rowInput}
            value={this.state.state_switch3}
            />
        </View>
      </ScrollView>
    )
  }
}


// iOS Styles
var iosStyles = StyleSheet.create({
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.75,
  }
});

// Android styles
const androidStyles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    borderRadius: 4 / 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  }
});


const sliderStyles = (Platform.OS === 'ios') ? iosStyles : androidStyles;