import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'

class Result extends Component {
    
    
    render () {
        const { total , correct } = this.props
        console.log(total,correct)

        return (
            <View style={styles.container}>
                <Text style={styles.center}>
                   {correct} / {total} Correct
                </Text>
                <Text style={{
                    fontSize:18,
                    fontWeight:'bold'
                }}>
                    Percentage Correct
                </Text>
                <Text style={[styles.center,{fontSize:50,
                marginTop:0}]}>
                    {((correct/total)*100).toFixed(0)}%
                </Text>
                <TouchableOpacity style={styles.Btn} >
                  <Text style={{ marginLeft:30,
                    color:'#fff',
                    fontSize:20,
                    marginTop:10}}
                    onPress={()=>{
                        this.props.navigation.navigate(
                            'Quiz')
                    }}>
                     Restart Quiz </Text> 
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn,
                    {marginTop:20,
                    backgroundColor:'#f26f28'}]}
                    onPress={()=>{
                        this.props.navigation.navigate(
                            'DeckDetail')
                    }}>
                  <Text style={{ marginLeft:25,
                    color:'#fff',
                    fontSize:20,
                    marginTop:10}}>
                     Back To Deck </Text> 
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
        color:'green',
        fontSize:35,
        fontWeight:'bold',
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
    }
})


function mapStateToProps (decks,{route}) {
    const { total , correct } = route.params
    return {
        total,
        correct
    }

}


export default connect(mapStateToProps)(Result)