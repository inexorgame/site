const path = /post\/\d{4}\/?.+\.md/; // Test for path containing /post/YEAR/*.md
exports.path = path;

exports.parseBlogArray = function(arr) {
  return new Promise((resolve, reject) => {
    const date = /\d{2}-/;
    // PUHHH. We made up some uggly, fu**ed up syntax format for parsing.

    try {
      let tree = arr.filter(value => path.test(value.path));

      let posts = tree.map((value) => {
        let path = value.path.split('/')
        let path_ = path.slice(2)
        let date_ = date[Symbol.match](path_)
        let title_ = date[Symbol.split](path_)

        value.display_name = String(title_.slice(2)).replace('.md', ' ');
        value.year = String(path.slice(1, 2));
        value.month = date_.slice(0, 1).join()
        return value;
      })
      resolve(tree)
    } catch (e) {
      reject(e);
    }
  })
}
