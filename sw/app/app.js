import React, { Component } from 'react';

import {
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Drawer from 'react-native-drawer';

import ControlPanel from './ControlPanel';
import Main from './Main';

export default class MainPage extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false,
  };
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <ControlPanel closeDrawer={this.closeDrawer} />
        }
        acceptDoubleTap
        styles={drawerStyles}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        captureGestures={false}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return 180
        }}
        closedDrawerOffset={() => 0}
        panOpenMask={0.2}
        negotiatePan
        >

        <Main />
        
      </Drawer>
      
    )
  }
}
const drawerStyles = {
      main: {shadowColor: '#008000', shadowOpacity: 0.3, shadowRadius: 15}
      };

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  }
})