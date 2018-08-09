import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import {ApolloHoc} from '../apollo/hoc'
import Home from '../screens/home'
import NewConversation from '../screens/newConversation'
import ConversationList from '../screens/conversationList'
import Conversation from '../screens/conversation'
import AddUser from '../screens/addUser'
import Test from '../screens/test'

let ChatStack = createStackNavigator({
    ConversationList: {
        screen: ApolloHoc(ConversationList)
    },
    Conversation: {
        screen: ApolloHoc(Conversation)
    },
    AddUser: {
        screen: ApolloHoc(AddUser)
    }
});

let TabNav = createBottomTabNavigator({
    Home: {
        screen: ApolloHoc(Home)
    },
    Conversations: {
        screen: ChatStack
    },
    NewConversation: {
        screen: ApolloHoc(NewConversation)
    },
});

export default TabNav;