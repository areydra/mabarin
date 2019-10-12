import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native'

const SplashScreen = props => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('NavigationStack')
        }, 2000)
    },[])

    return ( 
        <SafeAreaView style={ styles.container }>
            <Image source={require('../assets/image/splash.jpg')} style={ styles.splashImage } />
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    splashImage : {
        width: '100%',
        height: '100%'
    }
})

export default SplashScreen;