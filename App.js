import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import Constants from 'expo-constants'
import { StyleSheet, StatusBar, View} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import Quiz from './components/Quiz'
import Result from './components/Result'
import AddCard from './components/AddCard'
import { setLocalNotification } from './utils/helpers'

function FlashCardsStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={styles.statusBar}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}
const DecksStack = createStackNavigator()
const AddDeckStack=createStackNavigator()
const Tab = createBottomTabNavigator()
function DecksStackScreen () {
  return (
    <DecksStack.Navigator screenOptions={{
      title:'',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#292477',
      
    }}
    >
      <DecksStack.Screen name='Decks' component={Decks}/>
      <DecksStack.Screen name='DeckDetail' component={DeckDetail}
      options={({ route }) =>{ 
        const{ id} = route.params
        
         return{ title: id }}}/>
      <DecksStack.Screen name='Quiz' component={Quiz} options={({ route }) =>{ 
        const{ title} = route.params
        
         return{ title: `${title} Quiz`}}}/>
      <DecksStack.Screen name='AddCard' component={AddCard} options={{title:'Add Card'}}/>
      <DecksStack.Screen name='Result' component={Result} options={{title:'Quiz Results'}}/>
    </DecksStack.Navigator>
  )
}

function AddDeckStackScreen (){
  return (
  <AddDeckStack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#292477',
    
  }}>
    <AddDeckStack.Screen name='Add Deck' component={AddDeck}/>
    <AddDeckStack.Screen name='Deck Detail' component={DeckDetail}/>
  </AddDeckStack.Navigator>)
}

class App extends Component {
  componentDidMount (){
    setLocalNotification
  }
 
  render () {
  
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex:1}}>
        <FlashCardsStatusBar backgroundColor={'#292477'} barStyle="light-content"/>
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'AddDeck') {
                iconName = focused
                  ? 'ios-add-circle'
                  : 'ios-add-circle';
              } else if (route.name === 'Decks') {
                iconName = focused ? 'ios-paper' : 'ios-paper';
              }
    
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={30} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#292477',
            inactiveTintColor: 'gray',
          }}>
            <Tab.Screen name='Decks' component={DecksStackScreen}/>
            <Tab.Screen name='AddDeck' component={AddDeckStackScreen}/>
          </Tab.Navigator>
        </NavigationContainer>
        </View>
        
    </Provider>
    
  )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar:{
    backgroundColor:'#292477', 
    height: Constants.statusBarHeight
  }
});

export default App