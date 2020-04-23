import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteDeck } from '../utils/api'
import { removeAdeck } from '../actions/index'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import { CommonActions } from '@react-navigation/native'

class DeckDetail extends Component {
    removeDeck= (id) => {
        const { dispatch } = this.props
        dispatch(removeAdeck(id))
        deleteDeck(id)
        this.toDecks()
    }
    toDecks = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key:'Decks',
        }))
    }
    render () {
        const { deck, id } = this.props
        {console.log(deck,id)}
        return (
            <View style={[styles.center,{flex:1}]}>
                <Text style={{fontSize:40}}>{id}</Text>
                <Text style={{fontSize:20, color:'gray'}}>{deck?deck.questions.length:null} Cards</Text>
                <TouchableOpacity style={styles.Btn}
                onPress={() => this.props.navigation.navigate(
                    'AddCard',
                    {title:id}
                  )}>
                  <Text style={{ marginLeft:50,
                    color:'#fff',
                    fontSize:20,
                    marginTop:10}}>
                     Add Card </Text> 
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn,
                    {marginTop:20,
                    backgroundColor:'#f26f28'}]}
                    onPress={() => this.props.navigation.navigate(
                        'Quiz',
                        { card: deck?deck.questions:null, title:id}
                      )}>
                  <Text style={{ marginLeft:50,
                    color:'#fff',
                    fontSize:20,
                    marginTop:10}}>
                     Start Quiz </Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.removeDeck(id)}>
                  <Text style={{ marginLeft:10,
                    color:'#b71845',
                    fontSize:20,
                    marginTop:20}}>
                     Delete Deck </Text> 
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    center : {
        marginTop:40,
        alignItems:"center",
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
    }
})

function mapStateToProps (decks,{route}) {
    const { id } = route.params
    return {
        deck:decks[id],
        decks,
        id
    }
}


export default connect(mapStateToProps)(DeckDetail)