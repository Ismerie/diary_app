import React from 'react';
import { useEffect, useState } from "react";

import { auth, google_client } from "../config/firebaseConfig"

import { StyleSheet, SafeAreaView, Platform, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();


export default function LoginScreen() {
	const [user, setUser] = useState(null);
	const navigation = useNavigation();

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId: google_client.android,
		webClientId: google_client.web,
	});

	useEffect(() => {
		console.log(request)
		if (response?.type == 'success') {
			getUserData(response.authentication?.accessToken)
		}
	}, [response]);

	const getUserData = async (token) => {
		axios.get("https://www.googleapis.com/userinfo/v2/me", {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then((res) => {
			if (res.status != 200)
                throw new Error('error');
			console.log(res.data)
			setUser(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
	}
	

	return (
        <>
			<Text style={styles.title}>Open your <Text style={{color: '#f7a072'}}>Diary</Text></Text>
			<TouchableOpacity style={styles.buttonLogin} onPress={() => {promptAsync();}} >
				<Text style={styles.fontButton}>Login</Text>
			</TouchableOpacity>
        </>
		
				
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
		width: '100%'

	},
	fontButton: {
		fontSize: 30,
		textAlign: 'center'
	},
	backgroundImage: {
        flex: 1,
    }
});

