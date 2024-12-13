import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Text, ImageBackground, View } from 'react-native';
import { auth, google_client } from "../config/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { useUser } from "../UserContext"
import { Ionicons } from '@expo/vector-icons';



WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({navigation}) {
	const { user, setUser } = useUser();
	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: google_client.android,
		webClientId: google_client.web,
	});

	useEffect(() => {
		if (response?.type === 'success') {
			getUserData(response.authentication?.accessToken);
		}
	}, [response]);

	useEffect(() => {
		// Si un utilisateur est authentifié, on navigue vers ProfileScreen
		if (user) {
			navigation.replace('ProfileScreen');
		}
	}, [user]);
	

	const getUserData = async (token) => {
		try {
			const res = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			if (res.status === 200) {
				setUser(res.data);
			} else {
				throw new Error('Error fetching user data');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<ImageBackground
            source={require('../../assets/background.jpeg')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>Open your <Text style={{color: '#f7a072'}}>Diary</Text></Text>
				{/* Bouton Google */}
				<TouchableOpacity style={styles.buttonLogin} onPress={() => promptAsync()}>
					<View style={styles.buttonContent}>
						<Text style={styles.fontButton}>Login with </Text>
						<Ionicons name="logo-google" size={30} color="black" style={styles.icon} />
					</View>	
				</TouchableOpacity>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 50,
		textAlign: 'start',
		marginBottom: 20,
	},
	buttonLogin: {
		position: 'absolute',
		bottom: 30,
		backgroundColor: '#eddea4',
		padding: 15,
		borderRadius: 10,
		width: '100%',
	},
	buttonLoginGit: {
		position: 'absolute',
		bottom: 120,
		backgroundColor: '#eddea4',
		padding: 15,
		borderRadius: 10,
		width: '100%',
	},
	fontButton: {
		flex: 2,
		fontSize: 30,
		textAlign: 'right',
	},
	backgroundImage: {
        flex: 1,
    },
	icon: {
		flex: 1,
		textAlign: 'start',
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
},
});
