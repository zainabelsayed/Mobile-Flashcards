import { AsyncStorage } from 'react-native'
import { decks } from './_Data'

const DECKS_KEY = 'UdaciFlashCards'

    export function getDecks () {
        return{
            decks
        }
        
    }

    export const saveDecks = async () => {
        try{
        const value = await AsyncStorage.getItem(DECKS_KEY)
        if (value === null){
            await AsyncStorage.setItem(DECKS_KEY,JSON.stringify(decks))
        }
        return value === null ? decks : JSON.parse(value)
    } catch (err){
        console.log(alert('failed to load decks'),err)
    }

    }

    export const getDeck = async (id) => {
        try {
           const value= await AsyncStorage.getItem(DECKS_KEY)

           return JSON.parse(value)[id]           
        } catch(err){
            console.log(alert(`failed to load ${id} deck`,err))
        }
    }
    export async function saveDeckTitle (title) {
        try {
        return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
            [title]:{
                title,
                questions:[]
            }
        }))
        }catch(err){
            console.log(alert(err))
        }
    }
    
    export async function saveCard (title,card){
        try {
            const deck = await getDeck(title)
            console.log(deck)
            return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
                [title]:{
                    questions:[...deck.questions].concat(card)
                }
            }))
        }catch(err){
            console.log(alert(err))
        }
    }
    export async function deleteDeck (title) {
        try {
            return AsyncStorage.getItem(DECKS_KEY)
                .then((results)=>{
                    const data = JSON.parse(results)
                    data[title] = undefined
                    delete data[title]
                    AsyncStorage.setItem(DECKS_KEY,JSON.stringify(data))
                })
        }catch(err){
            console.log(alert(err))
        }
    }