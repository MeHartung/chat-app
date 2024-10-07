import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Start() {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const navigation = useNavigation();

    const handleStartChat = () => {
        navigation.navigate('Chat', { name, backgroundColor });
    };

    return (
        <ImageBackground
            source={require('../images/bgImage.png')}
            style={styles.backgroundImage}
            resizeMode="cover"  // исправляем, чтобы изображение правильно растягивалось
        >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <Text style={styles.title}>Welcome to the Chat App</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Text style={styles.colorText}>Choose Background Color:</Text>
                <View style={styles.colorContainer}>
                    <TouchableOpacity
                        style={[styles.colorOption, { backgroundColor: '#090C08' }]}
                        onPress={() => setBackgroundColor('#090C08')}
                    />
                    <TouchableOpacity
                        style={[styles.colorOption, { backgroundColor: '#474056' }]}
                        onPress={() => setBackgroundColor('#474056')}
                    />
                    <TouchableOpacity
                        style={[styles.colorOption, { backgroundColor: '#8A95A5' }]}
                        onPress={() => setBackgroundColor('#8A95A5')}
                    />
                    <TouchableOpacity
                        style={[styles.colorOption, { backgroundColor: '#B9C6AE' }]}
                        onPress={() => setBackgroundColor('#B9C6AE')}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleStartChat}>
                    <Text style={styles.buttonText}>Start Chatting</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',   // исправлено, чтобы фон покрывал весь экран
        height: '100%',  // исправлено, чтобы фон покрывал весь экран
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // прозрачный белый фон
        padding: 20,
        borderRadius: 10,
        width: '85%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#757083',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    colorText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#757083',
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        width: '100%',
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    button: {
        backgroundColor: '#757083',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});