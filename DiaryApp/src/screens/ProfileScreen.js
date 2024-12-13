import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { FlatList } from 'react-native-gesture-handler';

import ListEntries from '../ListEntries';

export default function ProfileScreen({ navigation}) {
    const { user, setUser } = useUser();
//   const { token } = route.params; // Token ou données envoyées lors de la navigation
    console.log("ProfileScreen")
    console.log(user)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue !</Text>
            <ListEntries />
            <TouchableOpacity style={styles.buttonNewEntry} onPress={() => navigation.navigate("AddEntryScreen")}>
					<Text style={styles.fontButton}>New entry</Text>
			</TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    title: { 
        fontSize: 24, 
        marginBottom: 20 
    },
    buttonNewEntry: {
        backgroundColor: 'pink',
    }
});
