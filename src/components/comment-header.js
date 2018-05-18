import React from 'react';
import PT from 'prop-types';

function CommentHeader ({handleCommentSort}) {
    return (
        <div className="comment-header">
            <h3>Comments</h3>
            <div className="comments-sort-control">
                <p>Sort by: </p>
                <button onClick={handleCommentSort} value="created_at" className="sort-button">Posted At</button>
                <button onClick={handleCommentSort} value="votes" className="sort-button">Votes</button>
            </div>
        </div>
    );
}

CommentHeader.propTypes = {
    handleCommentSort: PT.func.isRequired
}

export default CommentHeader;