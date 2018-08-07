import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import Home from '../screens/home'
import NewChat from '../screens/newChat'
import ConversationList from '../screens/conversationList'
import Chat from '../screens/chat'

let ChatStack = createStackNavigator({
    ConversationList: {
        screen: ConversationList
    },
    Chat: {
        screen: Chat
    },
});

let TabNav = createBottomTabNavigator({
    Home: {
        screen: Home
    },
    Conversations: {
        screen: ChatStack
    },
    NewChat: {
        screen: NewChat
    },
});

export default TabNav;