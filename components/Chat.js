import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, backgroundColor = "#fff", userID } = route.params;
    const [messages, setMessages] = useState([]);

    // Load cached messages when offline
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
        setMessages(JSON.parse(cachedMessages));
    };

    // Cache messages locally
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: name });

        if (isConnected) {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const unsubMessages = onSnapshot(q, (snapshot) => {
                const messagesFirestore = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        _id: doc.id,
                        ...data,
                        createdAt: data.createdAt.toDate(),
                    };
                });
                setMessages(messagesFirestore);
                cacheMessages(messagesFirestore); // Cache when online
            });

            return () => unsubMessages();
        } else {
            loadCachedMessages(); // Load cached messages when offline
        }
    }, [isConnected]);

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    // Render the InputToolbar based on connection status
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        return null; // Hide toolbar when offline
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: { backgroundColor: "#000" },
                    left: { backgroundColor: "#FFF" },
                }}
                textStyle={{
                    right: { color: '#fff' },
                    left: { color: '#000' },
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? -170 : 0}
            >
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar} // Use our custom function
                    onSend={newMessages => onSend(newMessages)}
                    user={{
                        _id: userID,
                        name: name,
                    }}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;