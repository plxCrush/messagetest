import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import {ConversationList, Chat, NewChat} from '../screens'
import Home from '../screens/home'

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