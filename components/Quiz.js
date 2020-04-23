import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,Text,StyleSheet,TouchableOpacity } from 'react-native'
import { clearLocalNotifications , setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
    state = {
        index: 0,
        showAnswer:false,
        toResult: false,
        correct : 0,
        incorrect:0
    }
    componentDidMount(){
        clearLocalNotifications()
            .then(setLocalNotification)
    }

    reset() {
        this.setState(()=>({
            index: 0,
        showAnswer:false,
        toResult: false,
        correct : 0,
        incorrect:0
        }));
    }
    correctBtn= () => {
        const { index, correct } = this.state
        const { card } = this.props
        
         this.setState(()=>({
             index:index+1,
             showAnswer:false,
             toResult:index+1 === card.length ? true:false,
             correct:correct+1
         }))
   
    
    }
    incorrectBtn= () => {
        const { index,incorrect } = this.state
        const { card } = this.props
        
         this.setState(()=>({
             index:index+1,
             showAnswer:false,
             toResult:index+1 === card.length ? true:false,
             incorrect:incorrect+1
         }))
    

    }

    answer = () =>{

        this.setState(()=>({
            showAnswer:true
        }))
    }
   
    render () {
        
       const { card } = this.props
       const {index, showAnswer,toResult,correct,incorrect} = this.state
      {
        if(toResult === true){
          
            this.props.navigation.navigate(
               'Result',
               {total:card.length, 
                correct:correct}
             )
             this.reset()
          }
      }
       console.log (index,card.length,toResult,correct,incorrect)
        return (
            <View style={styles.container}>
                {card.length === 0?
                <View style={styles.container}>
                    <Text style={[styles.center,
                        {fontWeight:'normal', color:'#757575'
                        ,marginTop:100, fontSize:25}]}>
                        You can not take a quiz because there is no cards in the deck, Please add cards first.
                    </Text>
                </View>:
                index < card.length?
                    <View style={styles.container}>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            marginRight:300,
                            marginTop:20
                        }}
                        >{index+1} / {card.length}
                        </Text>
                     {showAnswer === false?
                             <Text style={styles.center}>
                             {card[index].question}
                         </Text>
                         :<Text style={[styles.center,
                         {fontSize:25}]}>
                         {card[index].answer}
                          </Text>}
                     <TouchableOpacity
                     onPress={this.answer}>
                         <Text style={{ marginLeft:10,
                         color:'#b71845',
                         fontSize:20,
                         marginTop:20,
                         fontWeight:'bold'
                         }}>
                             Answer
                         </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.Btn}
                     onPress={ 
                         this.correctBtn
                         }
                         >
                       <Text style={{ marginLeft:50,
                         color:'#fff',
                         fontSize:20,
                         marginTop:10}}>
                          Correct </Text> 
                     </TouchableOpacity>
                     <TouchableOpacity style={[styles.Btn,
                         {marginTop:20,
                         backgroundColor:'#f26f28'}]}
                         onPress={this.incorrectBtn}>
                       <Text style={{ marginLeft:50,
                         color:'#fff',
                         fontSize:20,
                         marginTop:10}}>
                          Incorrect </Text> 
                     </TouchableOpacity>
                     
                     </View>:null}
               
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
        color:'#292477',
        fontSize:35,
        fontWeight:'bold',
        padding:20,
        textAlign:'center'
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
    const { card,id } = route.params
    return {
        decks,
        card
    }

}

export default connect(mapStateToProps)(Quiz)