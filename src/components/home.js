import React from 'react';
import PT from 'prop-types';
import './home.css';
import './articles.css';
import * as API from './API';
import LoadingIcon from './loading-icon';
import ArticlePreview from './article-preview';

class Home extends React.Component {
    
    state = {
        articles: [],
        sortBy: 'votes',
        sortOrder: 'forwards'
    }

    componentDidMount() {
        console.log('Home has mountted')
        API.getAllArticles()
            .then(articles => {
                console.log('Fetching articles for Home')
                this.setState({
                    articles: articles
                }, () => console.log('Articles for Home recieved'))
            })
            .catch(console.log)
    }

    render() {
        const {articles} = this.state;
        const {topic_slug} = this.props.match.params;
        return (
            <div className="Home">
                {articles.length > 0
                ? <div className="articles-preview-container">
                    <div className="articles-preview-header">
                        <h3>Articles</h3>
                        <div className="articles-sort-control">
                            <p>Sort by:</p>
                            <button onClick={this.handleArticleSort} value="title" className="sort-button">Title</button>
                            <button onClick={this.handleArticleSort} value="votes" className="sort-button">Votes</button>
                        </div>
                    </div>
                    {articles.sort(this.articleSortFunction).reduce((acc, article) => {
                        if (!topic_slug || topic_slug === article.belongs_to.slug || topic_slug === 'all') {
                            acc.push(<ArticlePreview key={article._id} article={article}/>)
                        }
                        return acc;
                    }, [])}
                </div>
                : <LoadingIcon/>
                }
            </div>
        );
    }
    
    articleSortFunction = (a, b) => {
        const sortArr = this.state.sortOrder === 'forwards' ? [-1, 1] : [1, -1]
        if (this.state.sortBy === 'votes') sortArr.reverse();
        return a[this.state.sortBy] < b[this.state.sortBy]
        ? sortArr[0]
        : a[this.state.sortBy] > b[this.state.sortBy]
            ? sortArr[1]
            : a._id < b._id ? sortArr[0] : sortArr[1];
    }

    handleArticleSort = e => {
        const sortBy = e.target.value;
        const sortOrder = sortBy === this.state.sortBy
            ? this.state.sortOrder === 'forwards' ? 'backwards' : 'forwards'
            : 'forwards';
        this.setState({sortBy, sortOrder})
    }

    static propTypes = {
        match: PT.object.isRequired
    }

}

export default Home;