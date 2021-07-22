import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet  } from "react-native";
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async()=>{
        const{status} = await Permissions.askAsync(Permissions, CAMERA);
        this.setState({
            hasCameraPermission: status === "granted",
            buttonState: 'clicked',
            scanned: false
        })
    }

    handleBarCodeScanner = async()=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render(){
        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const scannedData = this.state.scannedData
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked"){
            return(
                <BarCodeScanner
                    onBarScanned={scanned? undefined: handleBarCodeScanner}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <Text style = {styles.displayText}>
                        {hasCameraPermission === true? scannedData: "Request Camera Permission"}
                    </Text>
                    
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
                        <Text style = {styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>

                    <Image
                        source = {{
                            uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg"
                        }}
                    />
                </View>
            )
        }
        
    }
}