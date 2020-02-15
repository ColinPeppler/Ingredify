import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({base64: true}); // take a snap, and return base64 representation

            // construct
            let formData = new FormData();
            formData.append("image", photo.base64);

            const response = await fetch("http://35.245.191.120:8080/readtext", {
                method: "POST",
                headers: {
                },
                body: JSON.stringify({
                    img_b64: photo.base64,
                    type: 'mobile'
                }),
            });

            let response_body = await response.json(); // get the response body
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }}
                    ref={ref => {
                        this.camera = ref;
                    }}
                    type={type}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={takePicture}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white', alignSelf: 'center'}}> Take Picture </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
