import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo"; // Import for tracking network status

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrEQZ3AFZoN6kVydDoa9rWXrtti4DBidM",
  authDomain: "chatapp9308.firebaseapp.com",
  projectId: "chatapp9308",
  storageBucket: "chatapp9308.appspot.com",
  messagingSenderId: "768838133192",
  appId: "1:768838133192:web:6bb5c6d3784c8b1d270cfd",
  measurementId: "G-PDZ62MTFVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

export default function App() {
  const netInfo = useNetInfo(); // Track network status

  // Enable/disable Firestore based on connection status
  useEffect(() => {
    if (netInfo.isConnected === false) {
      disableNetwork(db);
    } else {
      enableNetwork(db);
    }
  }, [netInfo.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} isConnected={netInfo.isConnected} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}