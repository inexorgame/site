<template>
    <nav
        class="nav-links"
        v-if="userLinks.length || repoLink"
    >
        <!-- user links -->
        <div
            class="nav-item"
            v-for="item in userLinks"
            :key="item.link"
        >
            <DropdownLink
                v-if="item.type === 'links'"
                :item="item"
            />
            <NavLink
                v-else
                :item="item"
            />
        </div>
        <!-- repo link -->
        <a
            v-if="repoLink"
            :href="repoLink"
            class="repo-link"
            target="_blank"
            rel="noopener noreferrer"
        >
            {{ repoLabel }}
            <OutboundLink/>
        </a>
        <div class="color-mode-switch ml-4" @click="toggleDarkMode" />
    </nav>
</template>

<script>
import * as R from 'ramda'
import DropdownLink from './DropdownLink.vue'
import { resolveNavLinkItem } from './util'
import NavLink from './NavLink.vue'

export default {
    components: { NavLink, DropdownLink },
    computed: {
        userNav () {
            return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
        },

        nav () {
            const { locales } = this.$site
            if (locales && Object.keys(locales).length > 1) {
                const currentLink = this.$page.path
                const routes = this.$router.options.routes
                const themeLocales = this.$site.themeConfig.locales || {}
                const languageDropdown = {
                    text: this.$themeLocaleConfig.selectText || 'Languages',
                    items: Object.keys(locales).map(path => {
                        const locale = locales[path]
                        const text = themeLocales[path] && themeLocales[path].label || locale.lang
                        let link
                        // Stay on the current page
                        if (locale.lang === this.$lang) {
                            link = currentLink
                        } else {
                            // Try to stay on the same page
                            link = currentLink.replace(this.$localeConfig.path, path)
                            // fallback to homepage
                            if (!routes.some(route => route.path === link)) {
                                link = path
                            }
                        }
                        return { text, link }
                    })
                }
                return [...this.userNav, languageDropdown]
            }
            return this.userNav
        },

        userLinks () {
            return (this.nav || []).map(link => {
                return Object.assign(resolveNavLinkItem(link), {
                    items: (link.items || []).map(resolveNavLinkItem)
                })
            })
        },

        repoLink () {
            const { repo } = this.$site.themeConfig
            if (repo) {
                return /^https?:/.test(repo)
                    ? repo
                    : `https://github.com/${repo}`
            }
        },

        repoLabel () {
            if (!this.repoLink) return
            if (this.$site.themeConfig.repoLabel) {
                return this.$site.themeConfig.repoLabel
            }

            const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
            const platforms = ['GitHub', 'GitLab', 'Bitbucket']
            for (let i = 0; i < platforms.length; i++) {
                const platform = platforms[i]
                if (new RegExp(platform, 'i').test(repoHost)) {
                    return platform
                }
            }

            return 'Source'
        }
    },
    methods: {
        toggleDarkMode() {
            const styles = getComputedStyle(document.documentElement)
            const foregroundColors = [
                '--color-text-base',
                '--color-text-light',
            ]
            const backgroundColors = [
                '--color-background-base',
                '--color-background-light',
            ]
            const getColor = name => styles.getPropertyValue(name)
            const setColor = R.curry((name, value) => document.documentElement.style.setProperty(name, value))
            const fgs = R.map(getColor, foregroundColors)
            const bgs = R.map(getColor, backgroundColors)
            setColor(foregroundColors[0], bgs[0])
            setColor(foregroundColors[1], bgs[1])
            setColor(backgroundColors[0], fgs[0])
            setColor(backgroundColors[1], fgs[1])
        }
    }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.nav-links
    @apply flex items-center
    a
        line-height 1.4rem
        color inherit
        &:hover, &.router-link-active
            color $accentColor
    .nav-item
        position relative
        margin-left 1.5rem
        &:first-child
            margin-left 0
    .repo-link
        margin-left 1.5rem

@media (max-width: $MQMobile)
    .nav-links
        .nav-item, .repo-link
            margin-left 0

@media (min-width: $MQMobile)
    .nav-links a
        &:hover, &.router-link-active
            color var(--color-text-base)
    .nav-item > a:not(.external)
        &:hover, &.router-link-active
            margin-bottom -2px
            border-bottom 2px solid lighten($accentColor, 8%)
</style>
