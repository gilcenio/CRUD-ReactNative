import React, { Component } from 'react';
import index from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native'

import firebase from 'firebase'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email:'',
        senha:''
    };

    this.logar = this.logar.bind(this);
    this.sair = this.sair.bind(this);

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

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            alert("Fez login com sucesso!");
        }
    });
  }

  logar(){
    faribase.auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.senha
    ).catch((error)=>{
        if(error.code == 'auth/wrong-password'){
            alert("Senha errada!");
        }else{
            alert("Tente novamente mais tarde!");
        }
    })
  }

  sair(){
    firebase.auth().signOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>E-mail:</Text>
        <TextInput onChangeText={(email)=>this.setState({email})} style={styles.input}></TextInput>

        <Text>Senha:</Text>
        <TextInput secureTextEntry={true} onChangeText={(senha)=>this.setState({senha})} style={styles.input}></TextInput>

        <Button title="Logar" onPress={this.cadastrar} style={styles.button}/>
        <Button title="Cadastrar" onPress={() => navigation.navigate('cadastro') } style={styles.button}/>

        <Button title="Sair" onPress={this.sair} style={styles.button}/>

      </View>
    );
  }
};

index.navigationOptions = {
    title: 'cadastro',
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input:{
    height: 40,
    borderWidth: 1,
    borderColor: 'red',
    margin: 10,
  },
  button:{
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  }
});