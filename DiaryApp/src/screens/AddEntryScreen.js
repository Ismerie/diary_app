import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Importation de Firestore
import { useUser } from '../UserContext';
import { getAuth } from 'firebase/auth';
import { db } from '../config/firebaseConfig';

export default function AddDiaryEntry({ navigation }) {
    const [title, setTitle] = useState('');
    const [feeling, setFeeling] = useState('');
    const [content, setContent] = useState('');
    const { user, setUser } = useUser();
    const userEmail = user.email;

    const addEntry = async () => {
        try {
            if (!title || !feeling || !content) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }

            // Utiliser la nouvelle syntaxe modulaire de Firebase v9+
            const entriesCollection = collection(db, 'diaryEntries');
            await addDoc(entriesCollection, {
                email: userEmail,
                date: new Date().toISOString(),
                title,
                feeling,
                content,
            });

            Alert.alert('Success', 'Entry added!');
            setTitle('');
            setFeeling('');
            setContent('');
			navigation.navigate('ProfileScreen')
        } catch (error) {
            console.error('Error adding entry:', error);
            Alert.alert('Error', 'Could not add entry. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('ProfileScreen')}>
                <Text style={styles.fontButton}>Go Back</Text>
            </TouchableOpacity>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Feeling"
                    value={feeling}
                    onChangeText={setFeeling}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Content"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />
                <TouchableOpacity style={styles.buttonNewEntry} onPress={addEntry}>
                    <Text style={styles.fontButton}>New entry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 100,
        marginBottom: 10,
        color: 'black',
    },
    buttonNewEntry: {
        backgroundColor: 'pink',
    },
    fontButton: {
        fontSize: 20,
    },
});
