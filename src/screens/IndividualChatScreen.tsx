import React, {useState, useEffect, useRef} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FullChat, getChatById, postMessage} from '../services/ChatService';
import Markdown from 'react-native-markdown-display';
import * as Clipboard from 'expo-clipboard';
import {RootStackParamList} from "../../routes";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";


type IndividualChatScreenProps = {
    route: RouteProp<RootStackParamList, 'IndividualChat'>;
};

const copyToClipboard = (messageContent: string) => {
    Clipboard.setStringAsync(messageContent);
    // Optionally, add user feedback here.
};

const IndividualChatScreen:React.FC<IndividualChatScreenProps> = ({ route }) => {
    const { chatId } = route.params;
    const [chat, setChat] = useState<FullChat | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'IndividualChat'>>();

    useEffect(() => {
        const dynamicTitle = route.params.chatTitle || 'Individual Chat';
        navigation.setOptions({ title: dynamicTitle });
    }, [navigation, route.params.chatTitle]);

    useEffect(() => {


        fetchChat();
    }, [chatId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100); // Adjust delay as needed

        return () => clearTimeout(timer);
    }, [chat?.messages]);

    const fetchChat = async () => {
        try {
            const chatData = await getChatById(chatId);
            setChat(chatData);
        } catch (error) {
            console.error('Error loading chat:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            setIsLoading(true);
            const updatedChat = await postMessage(chatId, newMessage);
            setChat(updatedChat);
            setNewMessage('');
            setIsLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setIsLoading(false);
        }
    };


    if (!chat) {
        // Render some placeholder or loading indicator
        return <Text>Loading...</Text>;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 124 : 120} // Adjust based on your layout
            style={styles.container}
        >
        <ScrollView
            ref={scrollViewRef}
            style={styles.chatContainer}>
            <Text style={styles.title}>{chat?.title}</Text>
            {chat?.messages.map((message, index) => (
                <View key={index} style={[styles.messageContainer, message.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
                    <Text style={styles.messageTitle}>{message.role === 'user' ? 'You' : 'GPT'}</Text>
                    {message.role === 'assistant' ? (
                        <>
                            <Markdown style={markdownStyles}>{message.content}</Markdown>
                            <Icon name="content-copy" size={20} color="grey" onPress={() => copyToClipboard(message.content)} />
                        </>
                    ) : (
                        <Text style={styles.messageContent}>{message.content}</Text>
                    )}
                </View>
            ))}
        </ScrollView>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type your message"
                    editable={!isLoading}
                />
                <Icon name="send" size={24} color="blue" onPress={handleSendMessage} disabled={isLoading} />
            </View>
        </KeyboardAvoidingView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        // paddingBottom:25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: '#e7e7e7',
        alignSelf: 'flex-end',
    },
    assistantMessage: {
        backgroundColor: '#d1e0e0',
        alignSelf: 'flex-start',
    },
    messageTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageContent: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    chatContainer: {
        paddingBottom: 30, // Extra padding at the bottom
    },
    // ... other styles
});

const markdownStyles = StyleSheet.create({
    // Define styles for different Markdown elements
    paragraph: {
        fontSize: 16,
        color: '#333',
    },
    strong: {
        fontWeight: 'bold',
    },
    // Add other element styles as needed
});

export default IndividualChatScreen;
