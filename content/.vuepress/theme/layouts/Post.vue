<template>
    <div class="page">
		<div class="container px-10 py-4">
			<h1 class="subtitle">{{$page.title}}</h1>
            <small class="font-semibold text-lg mb-2 text-gray-dark">{{$page.frontmatter.date | formatDate}}</small>
            <p class="text-gray-darkest text-xl">{{$page.frontmatter.summary}}</p>
            <div>Author: <span class="font-normal text-gray-darkest">{{$page.frontmatter.author}}</span></div>
		</div>
        <Content :custom="false"/>

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
    </div>
</template>

<script>
import { createEditLink } from "../util";

export default {
    props: ["sidebarItems"],

    computed: {
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
            color: var(--color-text-light);
            margin-right: 0.25rem;
        }
    }

    .last-updated {
        float: right;
        font-size: 0.9em;

        .prefix {
            font-weight: 500;
            color: var(--color-text-light);
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
