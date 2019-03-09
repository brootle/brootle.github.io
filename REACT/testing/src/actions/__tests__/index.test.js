import { saveComment } from 'actions';
import { SAVE_COMMENT } from 'actions/types';

// we group tests by action creators
describe('saveComment', () => {
    it('has the correct type', () => {
        const action = saveComment();

        expect(action.type).toEqual(SAVE_COMMENT);
    });

    it('has the correct payload', () => {
        const action = saveComment('some comment');

        expect(action.payload).toEqual('some comment');
    });    
});