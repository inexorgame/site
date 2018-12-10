const tailwindcss = require('tailwindcss')

module.exports = {
    title: 'Inexor',
    description: 'Next generation engine for your sandbox needs',
    base: '/',
    host: 'localhost',
    postcss: {
        plugins: [tailwindcss('content/.vuepress/tailwind.js')],
    },
    themeConfig: {
        nav: [{ text: 'Team', link: '/team.md' }],
        sidebar: {
            '/wiki/': [
                {
                    title: 'Wiki',
                    children: [
                        '/wiki/',
                        '/wiki/Code-of-Conduct',
                        '/wiki/Contact',
                        '/wiki/License-Policy',
                        '/wiki/Other-Projects',
                        '/wiki/Frequently-Asked-Questions',
                        '/wiki/The-Main-Theme',
                    ],
                },
                {
                    title: 'Content',
                    children: [
                        '/wiki/content/',
                        '/wiki/content/Directory-Structure',
                        '/wiki/content/Free-Sources',
                        '/wiki/content/Inclusion-Standard',
                        '/wiki/content/JSON-Configuration',
                        '/wiki/content/Media-Repositories',
                        '/wiki/content/Supported-File-Formats',
                    ],
                },
                {
                    title: 'Development',
                    children: [
                        '/wiki/development/',
                        '/wiki/development/Build',
                        '/wiki/development/CMake-System',
                        '/wiki/development/Coding-Standards',
                        '/wiki/development/Git-FAQ',
                        '/wiki/development/GitHub-Issues',
                        '/wiki/development/How-To-Contribute-Code',
                        '/wiki/development/How-to-Contribute-Content',
                        '/wiki/development/How-To-Debug',
                        '/wiki/development/Platform-Support',
                        '/wiki/development/Refactoring-The-Server',
                        '/wiki/development/Travis-in-debug-mode',
                        '/wiki/development/[Windows]-add--windows_exe--to-PATH',
                    ],
                },
                {
                    title: 'Features',
                    children: [
                        '/wiki/features/',
                        '/wiki/features/Feature-Ideas',
                        '/wiki/features/',
                        '/wiki/features/Make-anything-more-dynamic',
                        '/wiki/features/Sauerbraten-Features',
                        '/wiki/features/Template-Feature',
                    ],
                },
                {
                    title: 'Get Involved',
                    children: [
                        '/wiki/get-involved/',
                        '/wiki/get-involved/Features',
                        '/wiki/get-involved/Recruiting',
                    ],
                },
                {
                    title: 'Run',
                    children: [
                        '/wiki/run/',
                        '/wiki/run/Command-Line-Options-And-Commands',
                        '/wiki/run/How-to-host-a-server',
                        '/wiki/run/Installing-inexor-as-an-end-user',
                        '/wiki/run/Run-Inexor',
                    ],
                },
                {
                    title: 'Work Groups',
                    collapsable: false,
                    children: ['/wiki/work-groups/'],
                },
                {
                    title: 'Community',
                    children: ['/wiki/work-groups/community/', '/wiki/work-groups/community/Game-Community'],
                },
                {
                    title: 'Engine',
                    children: [
                        '/wiki/work-groups/engine/',
                        '/wiki/work-groups/engine/Ambient-Occlusion',
                        '/wiki/work-groups/engine/Audio-Engine',
                        '/wiki/work-groups/engine/Decentralized-server-list',
                        '/wiki/work-groups/engine/Distributing-Content-System',
                        '/wiki/work-groups/engine/Extendable-Map-Format',
                        '/wiki/work-groups/engine/Improved-Selection',
                        '/wiki/work-groups/engine/Logging',
                        '/wiki/work-groups/engine/Mappers-Toolset',
                        '/wiki/work-groups/engine/New-Sound-system-(refactoring)',
                        '/wiki/work-groups/engine/Particle-System',
                        '/wiki/work-groups/engine/Prefabs-and-Hiearchical-Instancing',
                        '/wiki/work-groups/engine/Self-regulating-distributed-network',
                        '/wiki/work-groups/engine/Shader-System',
                        '/wiki/work-groups/engine/Version-Control-System',
                        '/wiki/work-groups/engine/Weapon-System',
                    ],
                },
                {
                    title: 'Entities',
                    children: [
                        '/wiki/work-groups/entity/',
                        '/wiki/work-groups/entity/3D-Visual-Scripting',
                        '/wiki/work-groups/entity/Bezier-curve',
                        '/wiki/work-groups/entity/Entity-System-API',
                        '/wiki/work-groups/entity/Entity-System-Architecture',
                        '/wiki/work-groups/entity/Entity-System-Introduction',
                        '/wiki/work-groups/entity/Entity-System-Type-System',
                        '/wiki/work-groups/entity/Gamemodes',
                    ],
                },
                {
                    title: 'Flex',
                    children: [
                        '/wiki/work-groups/flex/',
                    ]
                },
                {
                    title: 'Package',
                    children: [
                        '/wiki/work-groups/package/',
                        '/wiki/work-groups/package/Conan-best-practices',
                        '/wiki/work-groups/package/Continuous-Integration',
                        '/wiki/work-groups/package/Packaging',
                        '/wiki/work-groups/package/Release-and-build-strategy',
                    ]
                },
                {
                    title: 'Synchronization',
                    children: [
                        '/wiki/work-groups/synchro/',
                        '/wiki/work-groups/synchro/Inexor-Tree-API',
                        '/wiki/work-groups/synchro/Inexor-Tree-C---API',
                        '/wiki/work-groups/synchro/RPC-Node.js',
                    ]
                },
                {
                    title: 'User Interface',
                    children: [
                        '/wiki/work-groups/ui/',
                        '/wiki/work-groups/ui/Edit-Menu-UIs',
                        '/wiki/work-groups/ui/Head-Up-Display-(HUD)',
                        '/wiki/work-groups/ui/HTML5-User-Interface',
                        '/wiki/work-groups/ui/Keyboard-and-mouse-input-handling',
                        '/wiki/work-groups/ui/Main-Menu-UI',
                        '/wiki/work-groups/ui/Serverbrowser',
                        '/wiki/work-groups/ui/UI-Components',
                        '/wiki/work-groups/ui/User-interface-Menu',
                        '/wiki/work-groups/ui/User-Interfaces',
                    ],
                },
                // '/wiki/work-groups/website/',
            ],
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
        editLinkText: 'Help us improve this page!',
    },
}