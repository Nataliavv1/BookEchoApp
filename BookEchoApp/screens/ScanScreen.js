import { useNavigation } from "@react-navigation/native";
import React , {useState, useEffect, useRef} from "react";
import { View, Text } from "react-native-web";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Toggle from "../components/buttons/toggle";

const ScanScreen = ({ route }) => {
      const navigation = useNavigation();
 {/*    const [hasCameraPermission, setHasCameraPermission] = useState(null)
const [image, setImage] = useState(null);
const [type, setType] = useState(Camera.Constants.Type.back);
const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
const cameraRef = useRef(null);

useEffect(() =>{
    (async () => {
        MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
    })();
}, [])*/}

return(
    <View>
        <Text>Escanejar Llibre</Text>
        
         <Toggle
  text1="Escanejar"
  text2="Escanejats(1)"
  icon1="camera-outline" 
  icon2="book-outline"
  color="#F8794A"  // Puedes cambiar este color si deseas
/>

       {/*   <Camera style={StyleSheet.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}>
            <Text>Hello</Text>
            <View>
                
            </View>
        </Camera>*/}
    </View>
);
};
{/*
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    }
})*/}

export default ScanScreen;