import React from 'react';
import PT from 'prop-types';

function FullArticle ({article, handleVote}) {
    return (
        <div className='article-full'>
            <p>{article.belongs_to.title}</p>
            <p>{article.title} by {article.created_by.name}</p>
            <div className="main-text-body">{article.body}</div>
            <div className="voting-container">
                <button onClick={handleVote} value="DOWN" className="vote-down">-</button>                        
                <p>Votes: {article.votes}</p>
                <button onClick={handleVote} value="UP" className="vote-up">+</button>
            </div>
        </div>
    );
}

FullArticle.propTypes = {
    article: PT.object.isRequired,
    handleVote: PT.func.isRequired,
}

export default FullArticle;