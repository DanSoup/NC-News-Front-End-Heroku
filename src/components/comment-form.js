import React from 'react';
import PT from 'prop-types';

class CommentForm extends React.Component {

    state = {
        commentBody: '',
    }

    render() {
        const {commentBody} = this.state;
        return (
            <form onSubmit={this.postComment} className="CommentForm">
                <button className="comment-submit-button">Post Comment</button>
                <input className="comment-form-body" onChange={this.handleCommentBodyChange} value={commentBody}/>
            </form>
        )
    }

    handleCommentBodyChange = e => {
        this.setState({commentBody: e.target.value})
    }

    handleUsernameChange = e => {
        this.setState({username: e.target.value})
    }

    postComment = e => {
        e.preventDefault()
        const {commentBody} = this.state;
        this.props.postComment(commentBody, 'northcoders')
        this.setState({commentBody: ''})
        return false;
    }

    static propTypes = {
        postComment: PT.func.isRequired
    }

}


export default CommentForm;