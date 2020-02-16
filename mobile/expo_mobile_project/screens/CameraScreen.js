import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {Ionicons} from '@expo/vector-icons';

export default function App({navigation, route}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [imageTaken, setImageTaken] = useState(false)
    const [isEditingImage, setIsEditingImage] = useState(false)
    // const [confirmImage, setConfirmImage] = useState(true)
    const [imageb64, setImageB64] = useState('')
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (this.camera) {
            // Tell user we took an image

            let photo = await this.camera.takePictureAsync({base64: true}); // take a snap, and return base64 representation

            // construct
            let formData = new FormData();
            formData.append("image", photo.base64);

            setImageB64(photo.base64)
            setImageTaken(true)
        }
    }

    const sendImage = async () => {
        // setConfirmImage(false);

        const response = await fetch("http://35.245.191.120:8080/readtext", {
            method: "POST",
            headers: {},
            body: JSON.stringify({
                img_b64: imageb64,
                type: 'mobile'
            }),
        });

        let response_body = await response.json()
            .then((response) => {
                navigation.navigate('Links', {data: response})
            })
            .catch((error) => {
                console.log(error);
        })
    }

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex: 1}}>
            {imageTaken ?
                <View>
                    <Image
                        style={{width: '100%', height: '100%'}}
                        source={{uri: 'data:image/png;base64,' + imageb64}}
                    />
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                width: '50%',
                                flex: 1,
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                                   <Ionicons name="md-refresh" size={48} color="white"
                                              onPress={() => setImageTaken(false)}
                                   />
                                   <Ionicons name="md-checkmark-circle" size={48} color="white" onPress={() => sendImage()}/>
                            {/*We use onPress={() => func()} because if we do onPress={func()} then the func() will run immediately*/}

                        </TouchableOpacity>
                    </View>
                </View>
                :
                <Camera style={{flex: 1}}
                        ref={ref => {
                            this.camera = ref;
                        }}
                        type={type}>

                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.2,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => takePicture()}
                        >
                            <Ionicons name="md-camera" size={48} color="white"/>
                        </TouchableOpacity>
                    </View>
                </Camera>
            }
        </View>
    );
}
