export default {
    data() {
        return {
            downloadLinks: {
                linux:
                    "https://github.com/inexorgame/inexor-core/releases/",
                windows:
                    "https://github.com/inexorgame/inexor-core/releases/",
                osx:
                    "https://github.com/inexorgame/inexor-core/issues/385"
            },
            loading: false
        }
    },
    created() {
        this.loading = true;
        this.$http.get(`https://api.github.com/repos/inexorgame/inexor-core/releases`).then((response) => {
            const { tag_name } = response.body[0];
            this.downloadLinks.windows = `https://github.com/inexorgame/inexor-core/releases/download/${tag_name}/Inexor-${tag_name}-win64.zip`;
            this.downloadLinks.linux = `https://github.com/inexorgame/inexor-core/releases/download/${tag_name}/Inexor-${tag_name}-Linux.zip`;
            this.loading = false;
        })
    }
}