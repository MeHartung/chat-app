import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const { name, backgroundColor = "#fff", userID } = route.params;

    const [messages, setMessages] = useState([]);

    // Function to send new messages to Firestore
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    // Fetch messages in real-time from Firestore
    useEffect(() => {
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
        });

        return () => {
            unsubMessages();
        };
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
                        color: '#fff',
                    },
                    left: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
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