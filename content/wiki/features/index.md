# Feature Overview

This is an overview of all features, from ideation to implementation.

<div class="break-out-page-width">
    <div class="flex justify-between items-start w-full p-4">
        <div>
            <div>
                Filter:
                <StatusBubble type="idea" />
                <div class="flex">
                    <div v-for="filter in availableFilters" class="status-bubble text-sm cursor-pointer mr-2" :class="getStatusFilterClass(filter)" @click="toggleFilter(filter)">{{filter}}</div>
                </div>
            </div>
            <div class="my-2">
                Sort:
                <button class="p-2 border border-blue rounded">Name</button>
                <button class="p-2 border border-blue rounded">Status</button>
                <button class="p-2 border border-blue rounded">Updated</button>
            </div>
        </div>
        <router-link to="Template-Feature.html" class="button my-4">Add new feature ➕</router-link>
    </div>
    <h3 class="m-2">
        Listing {{filteredFeatures.length}} features
    </h3>
    <transition-group name="list" tag="div" class="flex flex-wrap w-full">
        <article v-for="(feature, index) in filteredFeatures" :key="index" class="w-1/3 p-2 list-item">
            <div class="bg-purple-lightest-faded border border-purple rounded p-4 h-full">
                <h3 class="mb-4">
                    <router-link :to="feature.path">
                        {{feature.title}}
                    </router-link>
                </h3>
                <small>{{feature.lastUpdated}}</small>
                <b class="mr-2">Status:</b> <span class="status-bubble text-xs" :class="getStatusClass(feature.frontmatter.status)">{{feature.frontmatter.status}}</span><br>
                <div v-if="getAuthors(feature).length">
                    <b class="mr-2">Authors:</b>
                    <span v-for="author in getAuthors(feature)" class="author">
                        <a :href="`https://github.com/${author}/`">{{author}}</a>
                    </span>
                </div>
            </div>
        </article>
    </transition-group>
</div>

<script>
import { STATUS_TYPE_COLORS, STATUS_TYPES } from '../../.vuepress/theme/constants'


export default {
    data: () => ({
        filters: Object.assign([], STATUS_TYPES),
        sort: 'Name',
        sortDirection: 'ASC',
        availableFilters: Object.assign([], STATUS_TYPES),
        availableSorters: ['Name', 'Status', 'Updated']
    }),
    computed: {
        features() {
            return this.$site.pages
                .filter(page => page.frontmatter && page.frontmatter.layout == 'feature')
                .filter(page => page.frontmatter && page.frontmatter.status != 'template')
        },
        filteredFeatures() {
            return this.features
                .filter(feature => this.filters.includes(feature.frontmatter.status))
        },
    },
    methods: {
        getAuthors(feature) {
            return (feature.frontmatter.authors || '')
                .split(', ')
                // filter all non-string or empty strings ('' gets removed)
                .filter(String)
        },
        getStatusClass(status) {
            return ['bg-' + (STATUS_TYPE_COLORS[status] || 'blue')]
        },
        getStatusFilterClass(status) {
            let color = (STATUS_TYPE_COLORS[status] || 'blue')
            if (!this.filters.includes(status)) return ['bg-white', `text-${color}`, `border-${color}` ]
            return this.getStatusClass(status)
        },
        toggleFilter(filter) {
            if (this.filters.includes(filter)) return this.filters.splice(this.filters.indexOf(filter), 1)
            this.filters.push(filter)
        }
    }
}
</script>

<style lang="stylus">
    .author + .author::before
        content ','
        margin-right .25em

    .list-enter-active, .list-leave-active
        transition all 1s
    .list-enter, .list-leave-to
        opacity 0
        transform translateY(30px)


.list
    position relative
    &-item
        position relative

    &-move 
        transition all 600ms ease-in-out 50ms
    &-enter-active
        transition all 300ms ease-out

    &-leave-active
        transition all 200ms ease-in
        position absolute
        z-index 0

    &-enter,
    &-leave-to
        opacity 0
    &-enter
        transform scale(0.9)
</style>