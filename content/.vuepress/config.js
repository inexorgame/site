require('isomorphic-fetch')
const tailwindcss = require('tailwindcss')
const themeConfig = require('tailwindcss/defaultTheme')

const ogprefix = 'og: http://ogp.me/ns#'
const title = 'Inexor'
const description = 'Open Next Generation FPS Sandbox'
const color = themeConfig.colors.purple[500]
const author = 'Inexor'
const url = 'https://inexor.org/'
const logo = '/favicon.png'

module.exports = {
    title,
    description,
    base: '/',
    host: 'localhost',
    postcss: {
        plugins: [
            tailwindcss('content/.vuepress/tailwind.js'),
        ],
    },
    head: [
        ['link', { rel: 'icon', href: logo }],
        ['meta', { name: 'theme-color', content: color }],
        ['meta', { prefix: ogprefix, property: 'og:title', content: title }],
        ['meta', { prefix: ogprefix, property: 'twitter:title', content: title }],
        ['meta', { prefix: ogprefix, property: 'og:type', content: 'article' }],
        ['meta', { prefix: ogprefix, property: 'og:url', content: url }],
        ['meta', { prefix: ogprefix, property: 'og:description', content: description }],
        ['meta', { prefix: ogprefix, property: 'og:image', content: logo }],
        ['meta', { prefix: ogprefix, property: 'og:article:author', content: author }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        // ['link', { rel: 'apple-touch-icon', href: `/assets/apple-touch-icon.png` }],
        // ['link', { rel: 'mask-icon', href: '/assets/safari-pinned-tab.svg', color: color }],
        ['meta', { name: 'msapplication-TileImage', content: logo }],
        ['meta', { name: 'msapplication-TileColor', content: color }],
    ],
    markdown: {
        anchor: {
            permalink: true,
        },
        config: md => {
            // use more markdown-it plugins!
            md.use(require('markdown-it-decorate'))
            md.use(require('markdown-it-task-lists'), { enabled: true })
        }
    },
    themeConfig: {
        nav: [
            { text: 'Team', link: '/team.md' },
            { text: 'Blog', link: '/blog/' },
            { text: 'Wiki', link: '/wiki/' },
        ],
        sidebar: {
            '/wiki/': [
                {
                    title: '🚀 Getting Started',
                    collapsable: false,
                    children: [
                        '/wiki/',
                        '/wiki/Get-Involved',
                        '/wiki/Code-of-Conduct',
                        '/wiki/Contact',
                        '/wiki/Meetings',
                        '/wiki/License-Policy',
                        '/wiki/Other-Projects',
                        '/wiki/Frequently-Asked-Questions',
                        '/wiki/The-Main-Theme',
                    ],
                },
                {
                    title: '💡 Features',
                    includeFeatures: true,
                    children: [
                        '/wiki/features/',
                        '/wiki/features/Feature-Ideas',
                        '/wiki/features/Sauerbraten-Features',
                    ],
                },
                {
                    title: '🕹️ Run',
                    children: [
                        '/wiki/run/',
                        '/wiki/run/Command-Line-Options-And-Commands',
                        '/wiki/run/How-to-host-a-server',
                        '/wiki/run/Installing-inexor-as-an-end-user',
                        '/wiki/run/Run-Inexor',
                    ],
                },
                {
                    title: '👨‍💻 Development',
                    children: [
                        '/wiki/development/',
                        ['https://docs.inexor.org/core/master/', 'Generated Docs'],
                        '/wiki/development/How-To-Contribute-Code',
                        '/wiki/development/Build',
                        '/wiki/development/How-To-Debug',
                        '/wiki/development/Continous-Integration'
                    ],
                },
                {
                    title: '📦 Content',
                    children: [
                        '/wiki/content/',
                        '/wiki/content/Possible-Content-Sources',
                        '/wiki/content/Inclusion-Standard',
                        '/wiki/content/Supported-File-Formats'
                    ],
                },
            ],
        },
        // Assumes GitHub. Can also be a full GitLab url.
        repo: 'inexorgame/entity-system',
        // Customising the header label
        // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
        repoLabel: 'Github',

        // Optional options for generating "Edit this page" link

        // if your docs are in a different repo from your main project:
        docsRepo: 'inexorgame/site',
        // where is the documentation located
        docsDir: 'content',
        // defaults to false, set to true to enable
        editLinks: true,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: 'Improve this page!',
    },
}
