import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';  // Импортируем MapView для отображения карты
import { ref, getStorage } from 'firebase/storage';

const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, backgroundColor = "#fff", userID } = route.params;
    const [messages, setMessages] = useState([]);
    const storage = getStorage();

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || '[]';
        setMessages(JSON.parse(cachedMessages));
    };

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
                cacheMessages(messagesFirestore);
            });

            return () => unsubMessages();
        } else {
            loadCachedMessages();
        }
    }, [isConnected]);

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        return null;
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

    // Добавляем renderCustomView для отображения карты, если в сообщении есть координаты
    const renderCustomView = (props) => {
        const { currentMessage } = props;

        if (currentMessage.location) {
            return (
                <MapView
                    style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    };

    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} onSend={onSend} user={{ _id: userID, name }} {...props} />;
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
                    renderInputToolbar={renderInputToolbar}
                    onSend={newMessages => onSend(newMessages)}
                    renderActions={renderCustomActions}
                    renderCustomView={renderCustomView}  // Рендеринг карты в сообщении
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