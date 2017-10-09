import Vue from 'vue'
import Blog from '../src/Blog.vue'

describe('Blog', function() {
  describe('parseBlogArray', function() {
    it('should return 10 items on the test data set', function() {
      Blog.parseBlogArray(test_array.tree).then((posts) => {
        expect(posts).to.be.lengthOf(10)
      })
    });
  })
})
