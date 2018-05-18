import React from 'react';
import PT from 'prop-types';
import './comment.css';
import moment from 'moment';

class Comment extends React.Component {

    state = {
        deleteCommentMenu: false,
        user: 'northcoders'
    }

    render () {
        const {comment} = this.props;
        return (
            <div className="Comment">
                <br/>
                <p>{`${comment.body} - ${comment.created_by.name}`}</p>
                <br/>
                <div className="voting-container">
                    <button onClick={this.handleVote} value="DOWN" className="vote-down">-</button>
                    <p>Votes: {comment.votes}</p>
                    <button onClick={this.handleVote} value="UP" className="vote-up">+</button>
                </div>
                {comment.created_by.username === this.state.user &&
                <div className="comment-delete-menu">
                    {this.state.deleteCommentMenu 
                    ? <div>
                        <button onClick={this.deleteCommentMenuToggle} className="delete-comment-cancel">Cancel</button>
                        <button onClick={this.deleteComment} className="delete-comment-confirm">Confirm Delete Comment</button>
                    </div>
                    : <button onClick={this.deleteCommentMenuToggle} className="delete-comment">Delete Comment</button>
                }
                <p>{`${moment(comment.created_at).fromNow()}`}</p>
                </div>
                }
            </div>
        );
    }

    deleteCommentMenuToggle = () => {
        this.setState({deleteCommentMenu: !this.state.deleteCommentMenu})
    }

    deleteComment = () => {
        this.props.handleDelete(this.props.comment._id);
    }

    handleVote = e => {
        this.props.handleVote(this.props.comment._id, e.target.value)
    }

    static propTypes = {
        comment: PT.object.isRequired,
    }

}

export default Comment;