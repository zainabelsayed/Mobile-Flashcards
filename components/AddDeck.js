import React, { Component } from 'react'
import { connect } from 'react-redux'
import {CommonActions} from '@react-navigation/native'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions/index'
import { View,Text,StyleSheet,TouchableOpacity, TextInput } from 'react-native'

class AddDeck extends Component {
    state={
        title:''
    }

    handelTitle = (text) => {
        this.setState({title:text})

    }
    sumbit = () => {
        const { title } = this.state
        const { dispatch } = this.props
        saveDeckTitle(title)
        dispatch(addDeck({
            [title]:{
                title,
                questions:[]
            }
        }))
        this.setState({title:''})
        this.toDecks()
    }
    toDecks = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key:'Decks',
        }))
    }
    render () {
        const { title } = this.state
        console.log(title)
        return (
            <View style={styles.container}>  
                <TextInput
                    style={styles.input}
                    placeholder="Type here the deck title"
                    onChangeText={this.handelTitle}
                />
                <TouchableOpacity style={styles.Btn}
                onPress={this.sumbit}>
                  <Text style={{ textAlign:'center',
                    color:'#fff',
                    fontSize:20,
                    marginTop:10}}>
                     Create Deck </Text> 
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#fff',
        alignItems:"center"
    },
    Btn:{
        marginTop:100,
        backgroundColor:'#292477',
        padding:10,
        borderRadius:7,
        height:70,
        width:200,
        marginLeft:40,
        marginRight:40,
    },
    input:{
        height:40,
        borderRadius:2,
        borderColor:'#7c53c3',
        borderWidth:1,
        width:300,
        textAlign:'center',
        marginTop:100

    }
})
export default connect()( AddDeck)