<template>
    <div class="page">
        <slot name="top"/>

        <div class="container">
            <div class="bg-purple-lightest border-l-4 border-purple mt-16 mx-10 p-4"> 
                <div class="text-xl mb-2 font-semibold">Feature</div>
                <p>This page is a feature - something someone had thought of and wants to implement into Inexor. You can help with your knowledge and skills to make this happen!</p>
                <p class="font-semibold">
                    Status:
                    <StatusBubble :type="$page.frontmatter.status" />
                </p>
                <div v-if="relatedPages.length && $page.frontmatter.status != 'template'">
                    <p class="font-semibold">Related Pages:</p>
                    <ul>
                        <li v-for="page in relatedPages">
                            <NavLink :item="page" />
                        </li>
                    </ul>
                </div>
            </div>
            <Content :custom="false"/>
        </div>

        <div class="page-edit">
            <div class="edit-link" v-if="editLink">
                <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
                <OutboundLink/>
            </div>

            <div class="last-updated" v-if="lastUpdated">
                <span class="prefix">{{ lastUpdatedText }}:</span>
                <span class="time">{{ lastUpdated }}</span>
            </div>
        </div>

        <div class="page-nav" v-if="prev || next">
            <p class="inner">
                <span v-if="prev" class="prev">←
                    <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
                </span>
                
                <span v-if="next" class="next">
                    <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>→
                </span>
            </p>
        </div>

        <slot name="bottom"/>
    </div>
</template>

<script>
import { resolvePage, createEditLink } from "../util"
import NavLink from '../NavLink'

export default {
    components: {NavLink},
    props: ["sidebarItems"],

    computed: {
        relatedPages() {
            return this.$site.pages
                .filter(page => {
                    const pageRelatedPath = page.path.split('/').slice(0, -1).join('/')
                    const hereRelatedPath = this.$page.path.split('/').slice(0, -1).join('/')
                    if (page.path == this.$page.path) return false
                    return hereRelatedPath == pageRelatedPath
                })
                .map(({path, title}) => ({
                    link: path,
                    text: title,
                }))
        },
        lastUpdated() {
            if (this.$page.lastUpdated) {
                return new Date(this.$page.lastUpdated).toLocaleString(this.$lang);
            }
        },

        lastUpdatedText() {
            if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
                return this.$themeLocaleConfig.lastUpdated;
            }
            if (typeof this.$site.themeConfig.lastUpdated === "string") {
                return this.$site.themeConfig.lastUpdated;
            }
            return "Last Updated";
        },

        prev() {
            const prev = this.$page.frontmatter.prev;
            if (prev === false) {
                return;
            } else if (prev) {
                return resolvePage(this.$site.pages, prev, this.$route.path);
            } else {
                return resolvePrev(this.$page, this.sidebarItems);
            }
        },

        next() {
            const next = this.$page.frontmatter.next;
            if (next === false) {
                return;
            } else if (next) {
                return resolvePage(this.$site.pages, next, this.$route.path);
            } else {
                return resolveNext(this.$page, this.sidebarItems);
            }
        },

        editLink() {
            if (this.$page.frontmatter.editLink === false) {
                return;
            }
            const {
                repo,
                editLinks,
                docsDir = "",
                docsBranch = "master",
                docsRepo = repo
            } = this.$site.themeConfig;

            if (docsRepo && editLinks) {
                return createEditLink(repo, docsRepo, docsDir, docsBranch, this.$page.path);
            }
        },

        editLinkText() {
            return (
                this.$themeLocaleConfig.editLinkText ||
                this.$site.themeConfig.editLinkText ||
                `Edit this page`
            );
        }
    },
};

function resolvePrev(page, items) {
    return find(page, items, -1);
}

function resolveNext(page, items) {
    return find(page, items, 1);
}

function find(page, items, offset) {
    const res = [];
    items.forEach(item => {
        if (item.type === "group") {
            res.push(...(item.children || []));
        } else {
            res.push(item);
        }
    });
    for (let i = 0; i < res.length; i++) {
        const cur = res[i];
        if (cur.type === "page" && cur.path === page.path) {
            return res[i + offset];
        }
    }
}
</script>

<style lang="stylus">
@import '../styles/config.styl';
@require '../styles/wrapper.styl';

.page {
    padding-bottom: 2rem;
}

.page-edit {
    @extend $wrapper;
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: auto;

    .edit-link {
        display: inline-block;

        a {
            color: lighten($textColor, 25%);
            margin-right: 0.25rem;
        }
    }

    .last-updated {
        float: right;
        font-size: 0.9em;

        .prefix {
            font-weight: 500;
            color: lighten($textColor, 25%);
        }

        .time {
            font-weight: 400;
            color: #aaa;
        }
    }
}

.page-nav {
    @extend $wrapper;
    padding-top: 1rem;
    padding-bottom: 0;

    .inner {
        min-height: 2rem;
        margin-top: 0;
        border-top: 1px solid $borderColor;
        padding-top: 1rem;
        overflow: auto; // clear float
    }

    .next {
        float: right;
    }
}

@media (max-width: $MQMobile) {
    .page-edit {
        .edit-link {
            margin-bottom: 0.5rem;
        }

        .last-updated {
            font-size: 0.8em;
            float: none;
            text-align: left;
        }
    }
}
</style>
