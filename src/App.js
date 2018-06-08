import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    const firebase = require("firebase");

  // Initialize Firebase
    var config = {
        apiKey: 'AIzaSyAbaXnb-egJTC_4u5dka0s5J9TGm3LfdA8',
        authDomain: 'auth-46fd0.firebaseapp.com',
        databaseURL: 'https://auth-46fd0.firebaseio.com',
        projectId: 'auth-46fd0',
        storageBucket: 'auth-46fd0.appspot.com',
        messagingSenderId: '980783031780'
    };
    firebase.initializeApp(config);

    //init firestore
    const firestore = require("firebase/firestore");
    db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
