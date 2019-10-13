import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const BuyPremium = () => {
    return (
        <SafeAreaView style={styles.buyPremiumContainer}>
            <View style={styles.header}>
                <Image source={require('../assets/icons/left-arrow.png')} style={styles.icon} />
                <Text style={styles.headerTitle}>Buy Premium</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={require('../assets/image/events.jpg')} style={styles.image} />
                    <View style={styles.textPremiumContainer}>
                        <Text style={styles.textPremium}>Premium</Text>
                    </View>
                    <View style={styles.textDescriptionContainer}>
                        <Text style={styles.textDescription}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat sed lectus vestibulum mattis. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Non sodales neque sodales ut. Volutpat ac tincidunt vitae semper quis lectus nulla. Scelerisque felis imperdiet proin fermentum leo vel orci. Amet mattis vulputate enim nulla aliquet porttitor lacus. Parturient montes nascetur ridiculus mus mauris. Et ligula ullamcorper malesuada proin libero.
                        </Text>
                    </View>
                    <Text style={styles.price}>$25</Text>
                    <View style={styles.buttonBuy}>
                        <Text style={styles.buttonText}>Buy Premium</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buyPremiumContainer: {
        flex: 1,
        backgroundColor: '#1C1C1C'
    },
    header: {
        height: 50,
        backgroundColor: '#373737',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 5,
        marginRight: 15
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    container: {
        flex: 1,
        paddingBottom: 20,
        marginHorizontal: width / 15
    },
    image: {
        height: 150,
        width: '100%',
        marginTop: width / 20
    },
    textPremiumContainer: {
        marginTop: width / 20,
        borderColor: '#DDC535',
        borderWidth: 1,
        width: 85,
        borderRadius: 5
    },
    textPremium: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
        color: '#DDC535'
    },
    textDescriptionContainer: {
        marginTop: 10
    },
    textDescription: {
        color: 'white'
    },
    price: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 25,
        marginVertical: 10
    },
    buttonBuy: {
        backgroundColor: 'green',
        width: 120,
        height: 35,
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default BuyPremium;