const Vue = require('vue')
const Blog = require('../src/Blog.vue')

const test_array = require('./blog_array_test.json') // Test data

describe('Blog.vue', function() {
  describe('parseBlogArray', function() {
    it('should return 10 items on the test data set', function(done) {
      Blog.methods.parseBlogArray(test_array.tree).then((posts) => {
        expect(posts.length).toBe(10)
        done()
      })
    });
  });
});
