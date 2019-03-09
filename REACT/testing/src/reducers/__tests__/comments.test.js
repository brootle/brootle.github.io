import commentsReducers from 'reducers/comments';
import { SAVE_COMMENT } from 'actions/types';

it('handles action of type SAVE_COMMENT', () => {
    const action = {
        type: SAVE_COMMENT,
        payload: 'New comment'
    }

    const newState = commentsReducers([], action);

    expect(newState).toEqual(['New comment']);
});


it('handles action of unknown type', () => {

    const newState = commentsReducers([], {});

    expect(newState).toEqual([]);
});