import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK} from '../actions/index'

function decks (state={},action) {
    switch (action.type){
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK :
            return {
                ...state,
                ...action.deck
            }
        case ADD_CARD :
            return {
                ...state,
                ...action.card
            }
        case REMOVE_DECK :
            const {id} = action
            const {[id]:value,...decks} = state
            return decks
        default:
            return state
    }
}

export default decks