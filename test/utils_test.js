var expect = require('chai').expect;
const utils = require(__dirname + '/utils.js');
const test_array = require(__dirname + '/blog_array_test.json')

describe('util', function() {
  describe('parseBlogArray', function() {
    it('should return 10 items on the test data set', function() {
      utils.parseBlogArray(test_array.tree).then((posts) => {
        expect(posts).to.be.lengthOf(10)
      })
    });
  })

  describe('path', function() {
    it('should return true on a well-formated path', function() {
      expect(utils.path.test('post/2017/07-04-somepost.md')).to.be.true;
    });

    it('should return false on a random number', function() {
      expect(utils.path.test(Math.random())).to.be.false;
    })
  })
})
