import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from 'actions';

class CommentBox extends Component{

    state = {
        comment: ''
    };

    handleChange = event => {
        this.setState({ comment: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        // TODO call action creator
        // TODO save the comment
        this.props.saveComment(this.state.comment);

        // clear comment box
        this.setState({ comment: '' });
    }    

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add comment</h4>
                    <textarea onChange={this.handleChange} value={this.state.comment} />
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
                <button id="fetchComments" onClick={this.props.fetchComments}>Fetch comments</button>
            </div>
        );
    };
}

export default connect(null, actions)(CommentBox);