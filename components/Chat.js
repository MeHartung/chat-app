import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor = "#fff" } = route.params; // Set default background color if not provided

    const [messages, setMessages] = useState([]);

    // Function to send new messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer', // Ensure that this text renders correctly
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'You have entered the chat', // System message text
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, [name]);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000",
                    },
                    left: {
                        backgroundColor: "#FFF",
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff', // Ensure right bubble text is white
                    },
                    left: {
                        color: '#000', // Ensure left bubble text is black
                    },
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble} // Customize message bubbles
                onSend={newMessages => onSend(newMessages)} // Send new messages
                user={{
                    _id: 1, // Current user ID
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;