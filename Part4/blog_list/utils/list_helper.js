const { result } = require('lodash');
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = [];

    blogs.forEach(blog => {
        likes.push(Number(blog.likes))
    })

    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.length === 0 ? 0 : likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return {}
    } else {

        let favorite = blogs[0]

        blogs.forEach(blog => {
            if (blog.likes > favorite.likes) {
                favorite = blog
            } else
            if (blog.likes === favorite.likes) {
                return
            } else {

            }

        })
        return {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    
    
  


    let countArr = _(blogs)
    .groupBy('author')
    .map(author => {
        let count = _.countBy(author, 'author')
        return {
            author: author[0].author,
            count: Object.values(count)[0]
        }
    })
    .orderBy(['count'], ['desc'])
    .value()
  
  return countArr[0]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    

    let countArr = _(blogs)
    .groupBy('author')
    .map(author => {
        let likes = []
      //  console.log('author', author)
       author.map(blog => {
           likes.push(blog.likes)
       })
        return {
            author: Object.values(author)[0]['author'],
            likes: likes.reduce((acc, sum) => acc + sum)
        }
    })
    .orderBy(['likes'], ['desc'])
    .value()

 // console.log(countArr)
  
  return countArr[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}