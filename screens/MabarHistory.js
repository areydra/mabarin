import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, StyleSheet } from 'react-native'

import Card from '../components/Card'

const MabarHistory = () => {
    return (
        <SafeAreaView style={styles.mabarHistoryContainer}>
            <View style={styles.header}>
                <Image source={require('../assets/icons/left-arrow.png')} style={styles.icon} />
                <Text style={styles.headerTitle}>Mabar History</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Card />
                    <Card />
                    <Card />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mabarHistoryContainer: {
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
    }
})

export default MabarHistory;