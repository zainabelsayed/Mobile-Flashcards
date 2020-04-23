import React, { Component } from 'react'
import { saveDecks } from '../utils/api'
import { receiveDecks } from '../actions/index'
import { View,Text,StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import { connect } from 'react-redux'


class Decks extends Component {
    
    componentDidMount () {
        const { dispatch } = this.props
        saveDecks()
          .then((decks)=> dispatch(receiveDecks(decks)))
          
      }
     
    render () {
        const { decks } = this.props
      
        return (
            <ScrollView style={styles.container}> 
                <View style={[styles.container,{ alignItems:"center"}]}>
                {Object.keys(decks).map((deck)=>(
                    <TouchableOpacity style={styles.decks}  key={deck}
                    onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        { id: deck}
                      )}
                    >
                    <Text style={styles.center}>{deck}</Text>
                    <Text 
                    style={[styles.center,
                    {fontSize:15,marginTop:0
                    ,color:'#d3d3d3'}]}>
                        {decks[deck]?decks[deck].questions.length:null} cards</Text>
                    </TouchableOpacity>
                ))}
                {console.log(decks)}   
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#fff'
    },
    decks : {
        backgroundColor:'#292477',
        width:250,
        height:150,
        borderRadius:10,
        margin:20,
        
    },
    center : {
        justifyContent:"center",
        alignItems:"center",
        marginLeft:80,
        color:'#fff',
        fontSize:20,
        marginTop:40

    }
})

function mapStateToProps (decks) {
    return {
        decks
    }
}


export default connect(mapStateToProps)( Decks)