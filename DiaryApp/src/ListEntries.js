import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { db, auth } from './config/firebaseConfig';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useUser } from "./UserContext"
import { useNavigation } from '@react-navigation/native';

export default function ListEntries() {
	const [entries, setEntries] = useState([]);
	const { user } = useUser()
	const userEmail = user.email;

	const navigation = useNavigation();

	console.log(entries)
	console.log(userEmail)
	// Récupérer les entrées de Firestore
	useEffect(() => {
		const fetchEntries = async () => {
			if (!userEmail) return; // Ne pas exécuter si l'utilisateur n'est pas connecté

			try {
				// Créer la requête Firestore
				const entriesQuery = query(
					collection(db, "diaryEntries"),
					where("email", "==", userEmail),
					orderBy("date", "desc")
				);

				// Exécuter la requête
				const querySnapshot = await getDocs(entriesQuery);
				console.log(querySnapshot);
				// Mapper les documents dans un tableau
				const fetchedEntries = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));

				setEntries(fetchedEntries);
			} catch (error) {
				console.error('Error fetching entries:', error);
			}
		};

		fetchEntries();
	}, [userEmail]);

	// Supprimer une entrée
	const deleteEntry = async (id) => {
		try {
			await deleteDoc(doc(db, "diaryEntries", id)); // Supprimer l'entrée
			setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id)); // Mettre à jour l'état local
			Alert.alert('Success', 'Entry deleted successfully!');
		} catch (error) {
			console.error('Error deleting entry:', error);
			Alert.alert('Error', 'Could not delete entry. Please try again.');
		}
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={entries}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.entry}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
						<Button
							title="View"
							onPress={() => navigation.navigate('ViewEntryScreen', { entry: item })}
						/>
						<Button
							title="Delete"
							color="red"
							onPress={() => deleteEntry(item.id)}
						/>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	entry: {
		marginBottom: 20,
		padding: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	date: {
		fontSize: 14,
		color: '#888',
	},
});
