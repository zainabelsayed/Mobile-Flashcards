import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet,TouchableOpacity,TextInput } from 'react-native'
import { saveCard } from '../utils/api'
import { addCard } from '../actions/index'
import {CommonActions} from '@react-navigation/native'

class AddCard extends Component {
    state={
        question:'',
        answer: ''
    }

    handelQuestion = (text) => {
        this.setState({question:text})
    }
    handelAnswer = (text) => {
        this.setState({answer:text})
    }
    submit= () =>{
        const {dispatch, title, deck} = this.props
        const { question, answer} = this.state
        const card = {
            question: question,
            answer: answer,
        }
        dispatch(addCard({
            [title]:{
                questions:[...deck.questions].concat(card)
            }
        }))
        saveCard(title,card)
        this.setState({
            question:'',
            answer:''
        })
        this.toDeck()    
    }
    toDeck = () => {
        this.props.navigation.dispatch(CommonActions.goBack({
            key:'DeckDetail',
        }))
    }
    
    render () {
       
        const { question , answer } = this.state
        const { title } = this.props
        console.log(question,answer,title)
        return (
            <View style={styles.container}>
                <Text style={styles.center}>
                    Add a question
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type here the question"
                    onChangeText={this.handelQuestion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type here the answer"
                    onChangeText={this.handelAnswer}
                />
                <TouchableOpacity style={styles.Btn}
                onPress={this.submit}>
                  <Text style={{ textAlign:'center',
                    color:'#fff',
                    fontSize:20,
                    marginTop:10}}>
                     Add Card </Text> 
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
    center : {
        fontSize:35,
        padding:20,
        marginTop:15
    },
    Btn:{
        marginTop:30,
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
        margin:15

    }
})

function mapStateToProps (decks,{route}) {
    const { title } = route.params
    const deck = decks[title]
    return {
        title,
        deck
    }

}


export default connect(mapStateToProps)( AddCard)