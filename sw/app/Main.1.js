'use strict';
import React, {PropTypes, Component} from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import { Container, Content, Button } from 'native-base';

var Spinner = require('react-native-spinkit');
import styles from './styles';
import ButtonTEst from './Button';
var mqtt = require('./app_mqtt')

const drawerTypes = ['overlay', 'displace', 'static'];

export default class ControlPanel extends Component {

  static contextTypes = {
    drawer: PropTypes.object.isRequired
  };

  state = {
    state_switch1: false,
    state_switch2: false,
    state_switch3: false,
    serverisconnected: false,
    isVisible:false
  }
//<View style={styles.container}>
  render() {

    let connectedtext = this.state.serverisconnected
      ? "Disconnect"
      : "Connected";

    return (
      <ScrollView
        pointerEvents="box-none"
        style={styles.scrollView}
        scrollEventThrottle={200}
        contentInset={{
        top: 0
      }}>
        <View style ={styles.titlePanel}>
         <Text style ={styles.title}>MAIN</Text>
        </View>

        <View style={styles.connectioncontrol}>
          <Button
            onPress={() => {
               this.setState({isVisible:true});
              mqtt.connecttocloud(this.state.serverisconnected).then((resolve)=>
              {
                  console.log(resolve);
                  this.setState({serverisconnected: resolve,
                    isVisible:!resolve});
                  
              });
          }}
          >{connectedtext}</Button>


        <Button
            onPress={() => {
                  this.setState({isVisible:!this.state.isVisible});
          }}>
            Toggle Spinner</Button>

            <Spinner isVisible={this.state.isVisible} size={50} type={'Circle'} color={"blue"}/>

          
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Led1</Text>
          <Switch
            onValueChange={(value) => {
            mqtt.ledcontrol(1,value);
            this.setState({state_switch1: value})
          }}
            style={styles.rowInput}
            value={this.state.state_switch1}/>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Led2</Text>
          <Switch
            onValueChange={(value) => {
            mqtt.ledcontrol(2,value);
            this.setState({state_switch2: value})
          }}
            style={styles.rowInput}
            value={this.state.state_switch2}/>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Led2</Text>
          <Switch
            onValueChange={(value) => {
            mqtt.ledcontrol(3,value);
            this.setState({state_switch3: value})
          }}
            style={styles.rowInput}
            value={this.state.state_switch3}/>
        </View>
      </ScrollView>
    )
  }
}
