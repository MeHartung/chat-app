import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Chat({ route }) {
    const { name, backgroundColor } = route.params;

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.chatTitle}>Chat Screen</Text>
            <Text style={styles.userName}>Hello, {name}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userName: {
        fontSize: 18,
    },
});