import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native'

import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import firebase from './../../firebaseConfig';

import styles from './styles';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            pushData: [],
            loggedIn: false
        };

        this.logar = this.logar.bind(this);
        this.sair = this.sair.bind(this);
        this.sair1 = this.sair.bind(this);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                alert("Fez login com sucesso!");
            }
        });
    }

    componentDidMount() {
        GoogleSignin.configure({
          webClientId: 'YOUR_WEB_CLIENT_ID_HERE', 
          offlineAccess: true, 
          hostedDomain: '', 
          forceConsentPrompt: true, 
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
        alert('Usuario desconectado')
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
    sair1() {
        LoginManager.logOut()
        alert('Usuario desconectado')
    }

    _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo: userInfo, loggedIn: true });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
           
          } else if (error.code === statusCodes.IN_PROGRESS) {
          
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            
          } else {
            
          }
        }
      };

      getCurrentUserInfo = async () => {
        try {
          const userInfo = await GoogleSignin.signInSilently();
          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            
            this.setState({ loggedIn: false });
          } else {
           
            this.setState({ loggedIn: false });
          }
        }
      };
    
      signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null, loggedIn: false }); 
        } catch (error) {
          console.error(error);
        }
      };
    

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.colortext} >E-mail:</Text>
                <TextInput onChangeText={(email) => this.setState({ email })} style={styles.input}></TextInput>

                <Text style={styles.colortext} fm>Senha:</Text>
                <TextInput secureTextEntry={true} onChangeText={(senha) => this.setState({ senha })} style={styles.input}><Text style={styles.b}></Text></TextInput>

                <TouchableOpacity onPress={this.cadastrar} style={styles.button}><Text style={styles.text}>Logar</Text></TouchableOpacity>

                <TouchableOpacity onPress={this.sair} style={styles.button}><Text style={styles.text}>SairFirebase</Text></TouchableOpacity>

                <TouchableOpacity onPress={this.sair1} style={styles.button}><Text style={styles.text}>SairFacebook</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')} style={styles.button}><Text style={styles.text}>Cadastrar</Text></TouchableOpacity>

                <TouchableOpacity onPress={this._fbAuth} style={styles.buttonfacebook}><Text style={styles.text}>Login Facebook</Text></TouchableOpacity>

                <GoogleSigninButton
                    style={{ height: 35,
                      backgroundColor: '#3b5998',
                      justifyContent: "center",
                      margin: 10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress} />

            </View>
        );
    }
};