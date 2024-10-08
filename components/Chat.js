import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params; // Получаем цвет фона из параметров маршрута

    // State to hold messages
    const [messages, setMessages] = useState([]);

    // Function to send new messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }

    // useEffect to load initial messages
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'You have entered the chat',
                createdAt: new Date(),
                system: true, // System message
            },
        ]);
    }, []);

    // Set the chat screen title with the user's name
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name]);

    // Function to customize the appearance of message bubbles
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000", // Sender's bubble color (black)
                    },
                    left: {
                        backgroundColor: "#FFF", // Receiver's bubble color (white)
                    },
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor }]}> {/* Применяем цвет фона */}
            {/* Using the GiftedChat component for chat functionality */}
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble} // Customizing message bubbles
                onSend={newMessages => onSend(newMessages)} // Sending new messages
                user={{
                    _id: 1, // Current user ID
                }}
            />
            {/* Handle keyboard appearance for different platforms */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

// Styles for the chat component
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;