import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import {Chat, createChat, getChatTitles} from '../services/ChatService';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../routes";

const ChatListScreen = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [newChatTitle, setNewChatTitle] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ChatList'>>();


    const fetchChats = async () => {
        try {
            const chatTitles = await getChatTitles();
            setChats(chatTitles);
        } catch (error) {
            console.error('Error loading chats:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            // Fetch data when the screen is focused
            fetchChats();

        }, [])
    );

    // useEffect(() => {
    //
    //
    //     fetchChats();
    // }, []);



    const handleCreateChat = async () => {
        try {
            const { _id: chatId, title: chatTitle} = await createChat(newChatTitle);
            navigation.navigate('IndividualChat', { chatId, chatTitle });
        } catch (error) {
            console.error('Error creating new chat:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter chat title"
                    value={newChatTitle}
                    onChangeText={setNewChatTitle}
                />
                <Button title="Create Chat" onPress={handleCreateChat} />
            </View>
        <FlatList
            data={chats}
    keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('IndividualChat', { chatId: item.id, chatTitle: item.title })}>
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            )}
    />
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    chatItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingLeft: 20, // Added padding to the left
        // You can also add margin if needed
    },
    chatTitle: {
        fontSize: 22, // Increased font size
        fontWeight: 'bold', // Optional: making the text bold
        color: '#333', // Optional: setting a distinct text color
        // Add other styling properties as needed
    },
    formContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default ChatListScreen;
