import React, { Component } from 'react';
import { Navigator, NativeModules } from 'react-native';
 
import { COLOR, ThemeProvider } from 'react-native-material-ui';
 
// you can set your style right here, it'll be propagated to application 
const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};
 
class Main extends Component {
    render() {
        return (
            <ThemeProvider uiTheme={uiTheme}>
                <App />
            </ThemeProvider>
        );
    }
}

AppRegistry.registerComponent('sw', () => Main);
