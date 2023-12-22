import {createNativeStackNavigator} from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    ChatList: undefined;
    IndividualChat: { chatId: string };
    // Add other routes here as needed
};

// Use the type with your stack navigator
export const Stack = createNativeStackNavigator<RootStackParamList>();
