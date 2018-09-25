const Blog = require('../../src/Blog.vue')

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

  describe('sorting', function() {
      let october_16, january_17, february_17, times, sorted_asc, sorted_desc;

      beforeEach(function() {
          class Time { // mock class
              constructor(year, month, day) {
                  this.year = year;
                  this.month = month;
                  this.day = day;
              }
          }

          october_16 = new Time(2016, 10, 7);
          january_17 = new Time(2017, 1, 8);
          february_17 = new Time(2017, 2, 9);

          times = [january_17, october_16, february_17]
          sorted_asc = [october_16, january_17, february_17]
          sorted_desc = [february_17, january_17, october_16]
      });

      it('should sort the blog in ascending order', function() {
          times = times.sort(Blog.methods.compare_asc);
          expect(times[0]).toBe(october_16)
          expect(times).toEqual(sorted_asc)
      })

      it('should sort the blog in descending order', function() {
          times = times.sort(Blog.methods.compare_desc);
          expect(times[0]).toBe(february_17)
          expect(times).toEqual(sorted_desc)
      })

      afterEach(function() {
          times = [january_17, october_16, february_17]
      })
  })

});
