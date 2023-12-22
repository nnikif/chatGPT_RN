import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const baseUrl = Constants.expoConfig?.extra?.baseUrl as string | undefined;

export const login = async (username: string, password: string): Promise<string> => {
    const loginUrl = `${baseUrl}/auth/login-token`
    // console.log(loginUrl);
    const response = await axios.post(loginUrl, { username, password });
    return response?.data?.accessToken;
};


// Store the token securely
export async function storeToken(token: string){
    try {
        await SecureStore.setItemAsync('userToken', token);
    } catch (error) {
        // There was an error on the native side
    }
};

// Retrieve the token
export async function retrieveToken() {
    try {
        return await SecureStore.getItemAsync('userToken');
    } catch (error) {
        console.log(error);
        // There was an error on the native side
        return null;
    }
};

// Remove the token
export async function removeToken ()  {
    try {
        await SecureStore.deleteItemAsync('userToken');
        console.log('Token removed');
    } catch (error) {
        // There was an error on the native side
    }
};
