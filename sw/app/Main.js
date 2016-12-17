'use strict';
import React, {PropTypes, Component} from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import { Container, Content, List, ListItem,Button, Text, CheckBox } from 'native-base';

var Spinner = require('react-native-spinkit');
//import styles from './styles';
//import ButtonTEst from './Button';
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
     <Container>
     <Content>
     <Text>MAIN</Text>
     <List>

<ListItem>
       
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

          
        
            </ListItem>
</List>
        </Content>

 <Content>
 <ListItem>
          <Text>Led1</Text>
         <CheckBox onPress={()=>{
           this.setState({state_switch1:!this.state.state_switch1});
            mqtt.ledcontrol(1,this.state.state_switch1);}}
            checked={this.state.state_switch1}
         />
        </ListItem>

          <ListItem>
          <Text>Led2</Text>
         <CheckBox onPress={()=>{
           this.setState({state_switch2:!this.state.state_switch2});
            mqtt.ledcontrol(2,this.state.state_switch2);}}
            checked={this.state.state_switch2}
         />
        </ListItem>

  <ListItem>
          <Text>Led3</Text>
         <CheckBox onPress={()=>{
           this.setState({state_switch3:!this.state.state_switch3});
            mqtt.ledcontrol(3,this.state.state_switch3);}}
            checked={this.state.state_switch3}
         />
        </ListItem>

         </Content>
    </Container>

    )
  }
}