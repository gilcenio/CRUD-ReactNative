import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Button,

} from 'react-native'

import firebase from 'firebase'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      nomeInput: '',
      idadeInput: ''
    };

    let firebaseConfig = {
      apiKey: "AIzaSyAt9R2D_1ewoRtB3G7nTOepwWHAyhR8JjI",
      authDomain: "projeto-teste-6635a.firebaseapp.com",
      databaseURL: "https://projeto-teste-6635a.firebaseio.com",
      projectId: "projeto-teste-6635a",
      storageBucket: "projeto-teste-6635a.appspot.com",
      messagingSenderId: "769566899904",
      appId: "1:769566899904:web:5a41b7030e67940ce37725"
    };
    firebase.initializeApp(firebaseConfig);

    /*firebase.database().ref("usuarios/1/nome").on('value').then((snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val();
      this.setState(state);*/

      /*firebase.database().ref("usuarios/1/nome").on('value', (snapshot)=>{
        let state = this.state;
        state.nome = snapshot.val();
        this.setState(state);
      });*/
      this.inserirUsuario = this.inserirUsuario.bind(this);

    }

    inserirUsuario(){
      if(this.state.nomeInput.length > 0){
        let usuarios = firebase.database().ref('usuarios');

        let chave = usuarios.push().key;

        usuarios.child(chave).set({
          nome:this.state.nomeInput,
          idade:this.state.idadeInput
        })

        alert("Usuario Inserido!");
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Nome do Usuarios</Text>
        <TextInput style={styles.Input} onChangeText={(nomeInput) => this.setState({nomeInput})} />
        
        <Text>Idade do Usuarios</Text>
        <TextInput style={styles.Input} onChangeText={(idadeInput) => this.setState({idadeInput})}/>

        <Button title="Iserir Uruario" onPress={this.inserirUsuario}/>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  Input:{
    height: 40,
    borderWidth: 1,
    borderColor: '#FF0000'
  }
});

