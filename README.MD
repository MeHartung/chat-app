Chat App with React Native

A mobile chat application built using React Native and Expo. This app allows users to enter their name, choose a background color for the chat screen, and participate in a conversation. The app supports both image and location sharing, and is cross-platform, working on both iOS and Android devices.

Features:

    •	User Authentication: Anonymous sign-in using Firebase.
    •	Start Screen: Users can enter their name and choose a background color.
    •	Chat Screen: Displays conversations with input fields for text, image, and location sharing.
    •	Offline Functionality: Messages are stored locally when the user is offline and synced when reconnected.
    •	Image and Location Sharing: Users can share images (from the library or taken with the camera) and their current location in the chat.
    •	Firebase Storage: Images are uploaded to Firebase Storage, and chat messages are stored in Firestore.

Technologies Used:

    •	React Native: For building the mobile app.
    •	Expo: To simplify app development and testing.
    •	React Native Gifted Chat: For an out-of-the-box chat UI.
    •	Firebase Firestore: For real-time messaging.
    •	Firebase Storage: For storing and accessing images.
    •	AsyncStorage: For storing messages offline.
    •	Expo ImagePicker: For selecting and uploading images.
    •	Expo Location: For sharing the user’s location.

Dependencies:

"dependencies": {
"@react-navigation/native": "^6.1.17",
"@react-navigation/native-stack": "^6.9.26",
"expo": "~51.0.0",
"expo-status-bar": "~1.5.0",
"react": "18.2.0",
"react-native": "0.71.14",
"react-native-gifted-chat": "^2.4.0",
"react-native-safe-area-context": "4.5.0",
"react-native-screens": "~3.20.0",
"@react-native-async-storage/async-storage": "1.17.11",
"expo-image-picker": "~15.0.7",
"expo-location": "~17.0.1",
"firebase": "^10.0.0"
}

Prerequisites:

Before running the app, ensure the following are installed on your machine:

    •	Node.js: Recommended version v16.19.0 or newer.
    •	Expo CLI: Run npm install -g expo-cli to install globally.
    •	Android Studio: Required for running the Android emulator.
    •	Xcode (macOS only): Required for running the iOS simulator.

Firebase Configuration

    1.	Create a Firebase project via the Firebase console.
    2.	Add a web app and copy your Firebase configuration.
    3.	Update the firebaseConfig object in App.js with your Firebase credentials:

// Firebase configuration
const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT_ID.appspot.com",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID",
};

    4.	In Firebase Console, enable Firestore and Storage in your project.

Firebase Storage Security Rules:

Update your Firebase Storage rules as follows for development:

rules_version = '2';
service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=\*\*} {
allow read, write: if request.time < timestamp.date(2024, 11, 18); // Adjust as needed
}
}
}

Installation:

    1.	Clone the repository:

    git clone https://github.com/MeHartung/chat-app.git

    2.	Navigate into the project directory:

    cd chat-app

    	3.	Install dependencies:

        npm install

4. Install necessary Expo libraries:

expo install expo-image-picker expo-location firebase

    5.	Start the Expo project:

    npm start

    	6.	Run the app on your device:
    •	Press a to run on an Android emulator.
    •	Press i to run on an iOS simulator (macOS only).
    •	Alternatively, scan the QR code with Expo Go on your mobile device.

Structure:

    •	Start Screen: Users enter their name and select a background color for the chat screen.
    •	Chat Screen: Displays the conversation, with support for text, images, and location sharing.

Testing:

    •	Use Expo Go on your physical device to preview the app.
    •	Test on Android using Android Studio.
    •	Test on iOS using Xcode.

Troubleshooting:

    •	If any issues arise while setting up or running the app, double-check the steps above, especially Firebase configuration.
    •	Ensure that your mobile device has access to the required permissions (gallery, camera, location) when testing the app.

License:

This project is licensed under the MIT License.
