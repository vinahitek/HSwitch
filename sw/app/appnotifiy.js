'use strict'; 
import React, { Component } from 'react'; 
import { ActivityIndicator, 
    StyleSheet, 
    View 
    } from 'react-native'; /**
 * Optional Flowtype state and timer types definition
 */
type State = { animating: boolean; }; type Timer = number;

class ToggleAnimatingActivityIndicator extends Component { /**
   * Optional Flowtype state and timer types
   */
   state: State; 
   _timer: Timer; 
   constructor(props) 
   { super(props); 
       this.state =
        { animating: true, 
            }; 
        } 
        componentDidMount() 
        { this.setToggleTimeout(); 
            } 
            componentWillUnmount() 
            { clearTimeout(this._timer); 
                } 
                setToggleTimeout()
                 { this._timer = setTimeout(() => { this.setState({ animating: !this.state.animating }); this.setToggleTimeout(); }, 2000); } render() { return (<ActivityIndicator animating={this.state.animating} style={[styles.centering, { height: 80 }]} size="large" />); }
}