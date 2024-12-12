import React from 'react';
import { useEffect, useState } from "react";


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import AppNavigator from './AppNavigator';

export default function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (Platform.OS != 'web') {
			NavigationBar.setVisibilityAsync('hidden');
			NavigationBar.setBackgroundColorAsync('transparent');
			NavigationBar.setBehaviorAsync('overlay-swipe');
		}
	}, []);

	return (
		<ImageBackground
			source={require('../assets/background.jpeg')}
			style={styles.background}
			resizeMode="cover"
		>
			<SafeAreaView style={styles.container}>
				<AppNavigator/>
				<StatusBar hidden={true} />
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	background: {
		flex: 1,
	},
});
