import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ViewEntryScreen({ navigation, route }) {
	const { entry } = route.params;

return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('ProfileScreen')}>
				<Text style={styles.fontButton}>Go Back</Text>
			</TouchableOpacity>
			<View>
				<Text style={styles.title}>{entry.title}</Text>
				<Text style={styles.date}>{new Date(entry.date).toLocaleDateString()}</Text>
				<Text style={styles.feeling}>Feeling: {entry.feeling}</Text>
				<Text style={styles.content}>{entry.content}</Text>
			</View>
		</View>
);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	date: {
	fontSize: 14,
	color: '#888',
	marginBottom: 20,
	},
	feeling: {
		fontSize: 16,
		marginBottom: 20,
	},
	content: {
	fontSize: 18,
	},
});
