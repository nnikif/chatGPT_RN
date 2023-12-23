import axios from 'axios';
import {retrieveToken} from "./AuthService";
import Constants from "expo-constants";

const API_URL= Constants.expoConfig?.extra?.baseUrl as string | undefined;

export interface Chat {
    id: string;
    title: string;
}

export interface FullChat {
    id: string;
    title: string;
    messages: Message[];
}

export interface Message {
    role: string;
    content: string;
}

export const getChatTitles = async () => {
    try {
        const token = await retrieveToken();
        const response = await axios.get(`${API_URL}/chat/titles`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data as Chat[];
    } catch (error) {
        console.error('Error fetching chat titles:', error);
        throw error;
    }
};

export const getChatById = async (chatId: string) => {
    try {
        const token = await retrieveToken();
        const response = await axios.get(`${API_URL}/chat/titles/${chatId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat details:', error);
        throw error;
    }
};

export const postMessage = async (chatId: string, content: string) => {
    try {
        const token =  await retrieveToken();
        const response = await axios.post(`${API_URL}/chat/titles/${chatId}`, {
            role: "user",
            content: content
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting message:', error);
        throw error;
    }
};

export const createChat = async (title: string) => {
    try {
        const token = await retrieveToken();
        const response = await axios.post(`${API_URL}/chat/create`, {
            title: title
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Assuming the response contains an object with an '_id' field
        return response?.data;
    } catch (error) {
        console.error('Error creating chat:', error);
        throw error;
    }
};
