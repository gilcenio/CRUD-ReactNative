import React from 'react';

import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
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
    buttonfacebook: {
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