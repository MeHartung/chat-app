import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Start() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the Chat App</Text>
            <TextInput style={styles.input} placeholder="Enter your name" />
            <Button title="Start Chatting" onPress={() => { }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '80%',
        paddingLeft: 10,
    },
});