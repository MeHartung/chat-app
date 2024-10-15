import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CustomActions = ({ onSend, storage, user }) => {
    const { showActionSheetWithOptions } = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                        return;
                }
            }
        );
    };

    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/").pop();
        return `${user._id}-${timeStamp}-${imageName}`;
    };

    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const imageRef = ref(storage, uniqueRefString);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        uploadBytes(imageRef, blob).then(async (snapshot) => {
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend({ image: imageURL });
        });
    };

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else {
            Alert.alert("Permission to access gallery is required!");
        }
    };

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) {
                await uploadAndSendImage(result.assets[0].uri);
            }
        } else {
            Alert.alert("Permission to access camera is required!");
        }
    };

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            }
        } else {
            Alert.alert("Permission to access location is required!");
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={styles.wrapper}>
                <Text style={styles.iconText}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CustomActions;