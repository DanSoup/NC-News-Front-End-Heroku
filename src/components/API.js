import axios from 'axios'

const domain = 'https://dan-soup-nc-news.herokuapp.com/api'

export function getAllArticles () {

    return axios
        .get('https://dan-soup-nc-news.herokuapp.com/api/articles')
        .then(res => res.data.articles)
        .catch(console.log)

}

export function getArticleById (article_id) {

    return axios
        .get(`https://dan-soup-nc-news.herokuapp.com/api/articles/${article_id}`)
        .then(res => {
            return res.data.article;
        })
        .catch(console.log)

}

export function getCommentsForArticle (article_id) {

    return axios
        .get(`https://dan-soup-nc-news.herokuapp.com/api/articles/${article_id}/comments`)
        .then(res => res.data.comments)
        .catch(console.log)

}

export function voteOnArticle (article_id, direction) {

    return axios
        .put(`https://dan-soup-nc-news.herokuapp.com/api/articles/${article_id}?vote=${direction}`)
        .then(res => res.data.article)
        .catch(console.log)

}

export function voteOnComment (comment_id, direction) {

    return axios
        .put(`https://dan-soup-nc-news.herokuapp.com/api/comments/${comment_id}?vote=${direction}`)
        .catch(console.log)
}

export function deleteComment (comment_id) {

    return axios
        .delete(`${domain}/comments/${comment_id}`)
        .catch(console.log)

}

export function getUserInfo (username) {

    return axios
        .get(`${domain}/users/${username}`)
        .then(res => res.data.user)
        .catch(console.log)

}

export function postComment (articleId, commentBody) {

    return axios
        .post(`${domain}/articles/${articleId}/comments`, {comment: commentBody})
        .then(res => res.data.comment[0])
        .catch(console.log)

}