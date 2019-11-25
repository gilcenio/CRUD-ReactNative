import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import firebase from './firebaseConfig'

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.cadastrar = this.cadastrar.bind(this);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        firebase.database().ref('usuarios').child(user.uid).set({
          nome:this.state.nome
        });

        alert("Usuario criado com sucesso!")
      }
    })
    

  }

  cadastrar() {
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.senha
    ).catch((error) => {

      if (error.code == 'auth/weak-password') {
        alert("Sua senha deve ter pelo menos 6 caracteres!")
      } else if (error.code == 'auth/email-already-in-use') {
        alert("Este e-mail ja tem conta.");
      } else {
        alert("Ocorreu um erro!");
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.colortext} >Nome:</Text>
        <TextInput onChangeText={(nome) => this.setState({ nome })} style={styles.input}></TextInput>

        <Text style={styles.colortext} >E-mail:</Text>
        <TextInput onChangeText={(email) => this.setState({ email })} style={styles.input}></TextInput>

        <Text style={styles.colortext} >Senha:</Text>
        <TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({ senha })} style={styles.input}></TextInput>

        <TouchableOpacity onPress={this.cadastrar} style={styles.button}><Text style={styles.text}>Cadastrar</Text></TouchableOpacity>

      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    padding: 40,
    justifyContent: "center"
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#DA552F',
    margin: 10,
  },
  button: {
    height: 35,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: '#DA552F',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    margin: 10
  },
  text: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  colortext: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold"
  }

});

