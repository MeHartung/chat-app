Chat App with React Native

A mobile chat application built using React Native and Expo. This app allows users to enter their name, choose a background color for the chat screen, and then participate in a conversation. The app is cross-platform and works on both iOS and Android devices.

Features:

    •	A start screen where users can enter their name and choose a background color.
    •	A chat screen that displays the conversation, along with an input field and button to send messages.
    •	The app stores messages and settings online and provides offline functionality.
    •	The user interface is simple and intuitive, ensuring a smooth user experience.

Technologies Used:

    •	React Native
    •	Expo
    •	React Navigation (for navigating between screens)
    •	React Native Gifted Chat
    •	AsyncStorage (for offline data storage)
    •	Expo Image Picker (for adding background image)
    •	Expo Location (optional for location features)

Dependencies:

    •	@react-navigation/native: ^6.1.17
    •	@react-navigation/native-stack: ^6.9.26
    •	expo: ~51.0.0
    •	expo-status-bar: ~1.5.0
    •	react: 18.2.0
    •	react-native: 0.71.14
    •	react-native-gifted-chat: ^2.4.0
    •	react-native-safe-area-context: 4.5.0
    •	react-native-screens: ~3.20.0
    •	@react-native-async-storage/async-storage: 1.17.11
    •	expo-image-picker: ~15.0.7
    •	expo-location: ~17.0.1

Prerequisites:

    •	Node.js (v16.19.0)
    •	Expo CLI installed globally
    •	Android Studio (for Android emulator)
    •	Xcode (for iOS simulator)

Installation:

    1.	Clone the repository:

    git clone https://github.com/MeHartung/chat-app.git

    	2.	Navigate into the project directory:

    	cd chat-app

    		3.	Install dependencies:

    		npm install


    		Start the Expo Project:

    			1.	Run the application:

    			npm start

    				2.	Use a QR code scanner (Expo Go) on your mobile device or run the app in an Android/iOS emulator:
    •	Press a to run on an Android device/emulator.
    •	Press i to run on an iOS simulator (macOS only).

Structure:

    •	Start Screen: A screen where users enter their name and select a background color.
    •	Chat Screen: A screen where users can chat, with the name and background color they chose displayed.

Testing Options:

    •	Use Expo Go on your mobile device to preview the app.
    •	Use Android Studio for testing on Android.
    •	Use Xcode for testing on iOS.
