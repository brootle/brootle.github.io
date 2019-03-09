import { SAVE_COMMENT, FETCH_COMMENTS } from 'actions/types';

export default function (state = [], action){
    switch (action.type){
        case SAVE_COMMENT:
            return [...state, action.payload]; // return array with existing comments and add to new array and add new comment from reducer
        case FETCH_COMMENTS:
            //console.log(action.payload);
            const comments = action.payload.data.map(comment => comment.body);
            return [...state, ...comments]; // basically we combine array of comments in state with new comments 
        default:
            return state;
    }
}