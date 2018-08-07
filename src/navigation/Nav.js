import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import Home from '../screens/home'
import NewConversation from '../screens/newConversation'
import ConversationList from '../screens/conversationList'
import Chat from '../screens/chat'
import AddUser from '../screens/addUser'

let ChatStack = createStackNavigator({
    ConversationList: {
        screen: ConversationList
    },
    Chat: {
        screen: Chat
    },
    AddUser: {
        screen: AddUser
    }
});

let TabNav = createBottomTabNavigator({
    Home: {
        screen: Home
    },
    Conversations: {
        screen: ChatStack
    },
    NewConversation: {
        screen: NewConversation
    },
});

export default TabNav;