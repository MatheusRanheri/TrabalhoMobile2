import { View,StyleSheet, Text, Image } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

export default function Sucesso() {


    const [temPermissao, setTemPermissao] = useState(false);
    const [gpsLocation, setGpsLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão negada');
                return;
            }
            setTemPermissao(true);

            let location = await Location.getCurrentPositionAsync({});
            setGpsLocation(location);
        })();
    }, []);

    return (
        <View style={styles.container}>

            <Image style={styles.imagem} source={require('../../assets/gon.webp')}></Image>

            <Text style={styles.texto}>BAITAAAA</Text>

            {temPermissao && gpsLocation && (
                <Text style={styles.texto}>
                    Latitude: {gpsLocation.coords.latitude.toFixed(6)}{'\n'}
                    Longitude: {gpsLocation.coords.longitude.toFixed(6)}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebf0f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    texto: {
        fontSize: 18,
        alignSelf: 'center',
    },
    imagem:{
        alignSelf: 'center',
        width: 300,
        height: 300
    }

});
