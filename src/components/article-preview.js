import React from 'react';
import {Link} from 'react-router-dom';
import PT from 'prop-types'

function ArticlePreview ({article}) {
    
    function articlesBodyPreviewer (body) {
        const previewStart = body.slice(0, 140).split(' ')
        previewStart.pop()
        return `${previewStart.join(' ')}...`
    }

    return (
        <div className='article-preview'>
            <Link className="intra-article-link" to={`/articles/${article._id}`}><h3>{`${article.title}`}</h3></Link>
            <p>{`by ${article.created_by.username} (${article.created_by.name})`}</p>
            <br/>
            <p>{articlesBodyPreviewer(article.body)}</p>
            <br/>
            <p>Comments: {article.comment_count}</p>
            <p>Votes: {article.votes}</p>
            <Link className="intra-article-link" to={`/topics/${article.belongs_to.slug}`}>{article.belongs_to.title}</Link>
        </div>
    );

}

ArticlePreview.propTypes = {
    article: PT.object.isRequired
}

export default ArticlePreview;