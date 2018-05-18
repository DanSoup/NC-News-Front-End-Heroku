import React from 'react';
import PT from 'prop-types';
import * as API from './API';
import LoadingIcon from './loading-icon';
import Comment from './comment';
import CommentForm from './comment-form';
import FullArticle from './full-article';
import CommentHeader from './comment-header';

class Article extends React.Component {

    state = {
        article: {
            belongs_to: {},
            created_by: {}
        },
        comments: [],
        sortBy: 'created_at',
        sortOrder: 'forwards'
    }

    componentDidMount() {
        console.log('Article component is mounting')
        let article;
        API.getArticleById(this.props.match.params.article_id)
            .then(newArticle => {
                article = newArticle;
                return API.getCommentsForArticle(this.props.match.params.article_id);
            })
            .then(comments => this.setState({article, comments}));
    }
    
    componentDidUpdate() {
        console.log('Article component is updating')
        let article;
        API.getArticleById(this.props.match.params.article_id)
            .then(newArticle => {
                article = newArticle
                return API.getCommentsForArticle(this.props.match.params.article_id)
            })
            .then(comments => {
                if (JSON.stringify(article) !== JSON.stringify(this.state.article) ||
                    JSON.stringify(comments.sort(this.commentSortFunction)) !== JSON.stringify(this.state.comments.sort(this.commentSortFunction))) {
                    this.setState({article, comments})
                }
            })
    }

    render() {
        const {article} = this.state 
        return (
            <div className="Article">
                {article.title 
                ? <div>
                    <FullArticle handleVote={this.handleVote} article={article}/>
                    <div className='comments-container'>
                        <CommentHeader handleCommentSort={this.handleCommentSort}/>
                        {this.state.comments.sort(this.commentSortFunction).map(comment => {
                            return <Comment key={comment._id} handleDelete={this.handleCommentDelete} handleVote={this.handleCommentVote} comment={comment}/>
                        })}
                        <CommentForm postComment={this.handlePostingComment} />
                    </div>
                </div>
                : <LoadingIcon/>
                }
            </div>
        );
    }

    commentSortFunction = (a, b) => {
        const sortArr = this.state.sortOrder === 'forwards' ? [-1, 1] : [1, -1]
        return a[this.state.sortBy] > b[this.state.sortBy]
        ? sortArr[0]
        : a[this.state.sortBy] < b[this.state.sortBy]
            ? sortArr[1]
            : a._id < b._id ? sortArr[0] : sortArr[1];
    }

    handleCommentSort = e => {
        const sortBy = e.target.value;
        const sortOrder = sortBy === this.state.sortBy
            ? this.state.sortOrder === 'forwards' ? 'backwards' : 'forwards'
            : 'forwards';
        this.setState({sortBy, sortOrder})
    }

    handlePostingComment = (body, username) => {
        API.getUserInfo(username)
            .then(user => {
                if (user) {
                    API.postComment(this.state.article._id, body)
                        .then(comment => {
                            comment.created_by = user;
                            this.setState({comments: [...this.state.comments, comment]})
                        })               
                }
            })
    }


    handleCommentDelete = (commentId) => {
        API.deleteComment(commentId)
        .then(() => {
            const newComments = this.state.comments.filter(comment => {
                return comment._id !== commentId;
            })
            this.setState({comments: newComments})
        })
    }

    alreadyVoted = false;

    handleVote = e => {
        const voteMod = e.target.value === 'UP' ? 1 : -1;
        if (!this.alreadyVoted) {
            API.voteOnArticle(this.state.article._id, e.target.value)
                .then(() => {
                    const updatedArticle = this.state.article
                    updatedArticle.votes += voteMod
                    this.setState({article: updatedArticle})    
                })
            this.alreadyVoted = true;
        }
    }

    handleCommentVote = (commentId, direction) => {
        const voteMod = direction === 'UP' ? 1 : -1;
        console.log(`changing "${commentId}" vote by ${voteMod}`)
        API.voteOnComment(commentId, direction)
            .then(() => {
                const newComments = this.state.comments.map(comment => {
                    if (comment._id === commentId) {
                        comment.votes += voteMod
                        return comment;
                    } else {
                        return comment;
                    }
                })
                this.setState({comments: newComments})
            })
    }

    static propTypes = {
        match: PT.object.isRequired,
    }

}


export default Article;