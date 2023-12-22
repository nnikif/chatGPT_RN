import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { login, storeToken } from '../services/AuthService';
import {useNavigation} from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RootStackParamList} from "../../routes";
import {KeyboardAvoidingView, Platform} from "react-native";


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            await storeToken(token); // Storing the token
            if (token) {
                navigation.navigate('ChatList');
            }
            console.log('Token stored');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername}/>
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    // ... other styles
});

export default LoginScreen;
