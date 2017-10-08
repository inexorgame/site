# site

> The inexor-website

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Testing
We use [karma](https://karma-runner.github.io/1.0/index.html) and [jasmine](https://jasmine.github.io/)
By default the `karma-chrome-launcher` is used. You can use a variety of other browser, please consider [karma docs](http://karma-runner.github.io/1.0/config/browsers.html) for this.

You can run the test via `npm test`

## Deploying to a web server
To deploy to a web server one must follow these simple steps:

- `npm install`
- `npm run build` which will invoke `NODE_ENV=production` and enable HTML5 history mode
- serve the `site` directory statically

Consider the [vue-router docs](https://router.vuejs.org/en/essentials/history-mode.html) for more information.
These first 2 steps are recommended to be done after each `git pull` (new deployment)
Since these are all static files there should be no concerns when hosting the `.git` or `node_modules` folders publicly.
