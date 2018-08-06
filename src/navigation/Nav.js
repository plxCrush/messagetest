import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import {Home, ConversationList, Chat, NewChat} from '../screens'

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