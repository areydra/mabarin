import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const More = () => {
    return (
        <SafeAreaView style={styles.moreContainer}>
            <View style={styles.header}>
                <Image source={require('../assets/icons/left-arrow.png')} style={styles.icon} />
                <Text style={styles.headerTitle}>More</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => alert('hello')} activeOpacity={0.5}>
                        <View style={styles.menu}>
                            <Text style={styles.menuText}>Settings</Text>
                            <Image source={require('../assets/icons/right-arrow.png')} style={styles.menuIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('hello')} activeOpacity={0.5}>
                        <View style={styles.menu}>
                            <Text style={styles.menuText}>Contact Us</Text>
                            <Image source={require('../assets/icons/right-arrow.png')} style={styles.menuIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('hello')} activeOpacity={0.5}>
                        <View style={styles.menu}>
                            <Text style={styles.menuText}>About Mabarin</Text>
                            <Image source={require('../assets/icons/right-arrow.png')} style={styles.menuIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('hello')} activeOpacity={0.5}>
                        <View style={styles.menu}>
                            <Text style={styles.menuText}>Others</Text>
                            <Image source={require('../assets/icons/right-arrow.png')} style={styles.menuIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('hello')} activeOpacity={0.5}>
                        <View style={styles.menu}>
                            <Text style={styles.menuTextLogout}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    moreContainer: {
        flex: 1,
        backgroundColor: 'white'
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
    menu: {
        flex: 1,
        height: 55,
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    menuText: {
        fontSize: 20,
        color: '#474747'
    },
    menuIcon: {
        width: 20,
        height: 20
    },
    menuTextLogout: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#DC0808'
    }
})

export default More;