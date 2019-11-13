import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import FBSDK, { LoginManager } from 'react-native-fbsdk'

import firebase from './firebaseConfig';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: ''
        };

        this.logar = this.logar.bind(this);
        this.sair = this.sair.bind(this);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                alert("Fez login com sucesso!");
            }
        });
    }

    logar() {
        firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.senha
        ).catch((error) => {
            if (error.code == 'auth/wrong-password') {
                alert("Senha errada!");
            } else {
                alert("Tente novamente mais tarde!");
            }
        })
    }

    sair() {
        firebase.auth().signOut();
    }

    _fbAuth() {
        LoginManager.logInWithPermissions(['public_profile']).then(function (result) {
            if (result.isCancelled) {
                alert('loguin cancelado')
            } else {
                alert('Loguin sucess:' + result.grantedPermissions);
            } 
        }, function (error) {
            alert('An error ocurred' + error);
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.colortext} >E-mail:</Text>
                <TextInput onChangeText={(email) => this.setState({ email })} style={styles.input}></TextInput>

                <Text style={styles.colortext} fm>Senha:</Text>
                <TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({ senha })} style={styles.input}><Text style={styles.b}></Text></TextInput>

                <TouchableOpacity onPress={this.cadastrar} style={styles.button}><Text style={styles.text}>Logar</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')} style={styles.button}><Text style={styles.text}>Cadastrar</Text></TouchableOpacity>

                <TouchableOpacity onPress={this._fbAuth} style={styles.buttonfacebook}><Text style={styles.text}>Login Facebook</Text></TouchableOpacity>

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
        borderRadius: 5,
        padding: 20,
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
    },
    buttonfacebook:{
        height: 35,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#3b5998",
        backgroundColor: '#3b5998',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        margin: 10
    }
});