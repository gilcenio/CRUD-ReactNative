import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import Cadastro from './cadastro';
import Login from './login';

export const SignOutRoutes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: () => ({
                header: null
            })
        },
        Cadastro: {
            screen: Cadastro,
            navigationOptions: () => ({
                header: null
            })
        }
    })
)