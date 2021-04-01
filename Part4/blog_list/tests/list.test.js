
const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const emptyBlogs = []
    const oneBlog = [{
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
      }]
    const multiBlogs = [{
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 210
      },
      {
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 8
      }]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyBlogs)

        expect(result).toBe(0)
    })

    test('of list with one item is the total likes of that item', () => {
        const result = listHelper.totalLikes(oneBlog)

        expect(result).toBe(200)
    })
    test('of list with more than one item is calculated correctly', () => {
        const result = listHelper.totalLikes(multiBlogs)

        expect(result).toBe(218)
    })

})

describe('favorite blog', () => {
    const emptyBlogs = []
    const oneBlog = [{
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
      }]
    const multiBlogs = [{
        "title": "myBlogtest",
        "author": "koboltz123",
        "url": "myblogtest.test.com",
        "likes": 200
      }, 
      {
        "title": "myBlogtest2",
        "author": "koboltz456",
        "url": "myblogtest.test.com",
        "likes": 123
      },
      {
        "title": "myBlogtest3",
        "author": "koboltz789",
        "url": "myblogtest.test.com",
        "likes": 400
      }]

    test('of empty list is an empty object', () => {
        const result = listHelper.favoriteBlog(emptyBlogs)

        expect(result).toEqual({})
    })

    test('of list with one item returns the item', () => {
        const result = listHelper.favoriteBlog(oneBlog)

        expect(result).toEqual({
            "title": "myBlogtest",
            "author": "koboltz546",
            "likes": 200
          })
    })

    test('of list returns object with the highest likes', () => {
        const result = listHelper.favoriteBlog(multiBlogs)

        expect(result).toEqual({
            "title": "myBlogtest3",
            "author": "koboltz789",
            "likes": 400
          })
    })
})

describe('most blogs', () => {
    const emptyBlogs = [];
    const oneBlog = [{
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
    }]
    const multiBlogs = [{
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
      }, 
      {
        "title": "myBlogtest2",
        "author": "koboltz456",
        "url": "myblogtest.test.com",
        "likes": 123
      },
      {
        "title": "myBlogtest3",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 400
    }]
    const multiBlogs2 = [ {
        "title": "myBlogtest3",
        "author": "koboltz456",
        "url": "myblogtest.test.com",
        "likes": 400
      }, 
      {
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
      }, 
      {
        "title": "myBlogtest2",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 123
      },
     {
        "title": "myBlogtest",
        "author": "koboltz546",
        "url": "myblogtest.test.com",
        "likes": 200
      }, 
      {
        "title": "myBlogtest2",
        "author": "koboltz456",
        "url": "myblogtest.test.com",
        "likes": 123
      },
      {
        "title": "myBlogtest3",
        "author": "koboltz123",
        "url": "myblogtest.test.com",
        "likes": 400
    }]

    test('of an empty array returns an empty object', () => {
        const result = listHelper.mostBlogs(emptyBlogs)
          expect(result).toEqual({})
    })

    test('of an array wih one item returns the author name and count 1', () => {
        const result = listHelper.mostBlogs(oneBlog)

        expect(result).toEqual({ author: "koboltz546", count: 1})
    })

    test('of an array with some items returns the author name and count of the most frequent author', () => {
        const result = listHelper.mostBlogs(multiBlogs)

        expect(result).toEqual({ author: "koboltz546", count: 2 })
    })

    test('of an array with lots of items returns the author name and count of the most frequent author', () => {
        const result = listHelper.mostBlogs(multiBlogs2)

        expect(result).toEqual({ author: "koboltz546", count: 3 })
    })
    
    
})

describe('most likes', () => {
  const emptyBlogs = [];
  const oneBlog = [{
      "title": "myBlogtest",
      "author": "koboltz546",
      "url": "myblogtest.test.com",
      "likes": 200
  }]
  const multiBlogs = [{
      "title": "myBlogtest",
      "author": "koboltz546",
      "url": "myblogtest.test.com",
      "likes": 200
    }, 
    {
      "title": "myBlogtest2",
      "author": "koboltz456",
      "url": "myblogtest.test.com",
      "likes": 123
    },
    {
      "title": "myBlogtest3",
      "author": "koboltz546",
      "url": "myblogtest.test.com",
      "likes": 400
  }]
  const multiBlogs2 = [ {
      "title": "myBlogtest3",
      "author": "koboltz456",
      "url": "myblogtest.test.com",
      "likes": 400
    }, 
    {
      "title": "myBlogtest",
      "author": "koboltz546",
      "url": "myblogtest.test.com",
      "likes": 200
    }, 
    {
      "title": "myBlogtest2",
      "author": "koboltz546",
      "url": "myblogtest.test.com",
      "likes": 123
    },
   {
      "title": "myBlogtest",
      "author": "koboltz546",
      "url": "myblogtest.test.com",
      "likes": 200
    }, 
    {
      "title": "myBlogtest2",
      "author": "koboltz456",
      "url": "myblogtest.test.com",
      "likes": 122
    },
    {
      "title": "myBlogtest3",
      "author": "koboltz123",
      "url": "myblogtest.test.com",
      "likes": 400
  }]

  test('of an empty array returns an empty object', () => {
      const result = listHelper.mostLikes(emptyBlogs)
        expect(result).toEqual({})
  })

  test('of an array wih one item returns the author name and likes', () => {
      const result = listHelper.mostLikes(oneBlog)

      expect(result).toEqual({ author: "koboltz546", likes: 200})
  })

  test('of an array with some items returns the author name and count of the most frequent author', () => {
      const result = listHelper.mostLikes(multiBlogs)

      expect(result).toEqual({ author: "koboltz546", likes: 600})
  })

  test('of an array with lots of items returns the author name and count of the most frequent author', () => {
      const result = listHelper.mostLikes(multiBlogs2)

      expect(result).toEqual({ author: "koboltz546", likes: 523 })
  })
  
  
})