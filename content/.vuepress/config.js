const tailwindcss = require('tailwindcss')

module.exports = {
    title: 'Inexor',
    description: 'Next generation engine for your sandbox needs',
    base: '/',
    host: 'localhost',
    postcss: {
        plugins: [
            tailwindcss('content/.vuepress/tailwind.js')
        ]
    },
    themeConfig: {
        sidebar: {
            '/wiki/' : [
                {
                    collapsable: false,
                    title: 'Wiki',
                    children: [
                        // ['/wiki/index.md', 'Documentation'],
                        ['/wiki/Contact.md', 'Contact'],
                        '/wiki/3D-Visual-Scripting.md',
                        '/wiki/Ambient-Occlusion.md',
                        '/wiki/Audio-Engine.md',
                        '/wiki/Bezier-curve.md',
                        '/wiki/Build.md',
                        '/wiki/CMake-System.md',
                        '/wiki/Code-of-Conduct.md',
                        '/wiki/Coding-Standards.md',
                        '/wiki/Command-Line-Options-And-Commands.md',
                        '/wiki/Conan-best-practices.md',
                        '/wiki/Continuous-Integration.md',
                        '/wiki/Directory-Structure.md',
                        '/wiki/Distributing-Content-System.md',
                        '/wiki/Documentation.md',
                        '/wiki/Edit-Menu-UIs.md',
                        '/wiki/Entity-System-API.md',
                        '/wiki/Entity-System-Architecture.md',
                        '/wiki/Entity-System-Introduction.md',
                        '/wiki/Entity-System.md',
                        '/wiki/Entity-System-Type-System.md',
                        '/wiki/Extendable-Map-Format.md',
                        '/wiki/Feature-Ideas.md',
                        '/wiki/Features.md',
                        '/wiki/Free-Sources.md',
                        '/wiki/Frequently-Asked-Questions.md',
                        '/wiki/Game-Community.md',
                        '/wiki/Gamemodes.md',
                        '/wiki/Git-FAQ.md',
                        '/wiki/GitHub-Issues.md',
                        
                    ]
                }
            ]
        },
        // Assumes GitHub. Can also be a full GitLab url.
        repo: 'inexorgame/inexor-core',
        // Customising the header label
        // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
        repoLabel: 'Contribute',

        // Optional options for generating "Edit this page" link

        // if your docs are in a different repo from your main project:
        docsRepo: 'inexorgame/inexor-core/wiki',
        // defaults to false, set to true to enable
        editLinks: true,
        // custom text for edit link. Defaults to "Edit this page"
        editLinkText: 'Help us improve this page!'
    }
}