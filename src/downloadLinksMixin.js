export default {
    data() {
        return {
            downloadLinks: {
                linux:
                    "https://github.com/inexorgame/snap-inexor-flex",
                windows:
                    "https://github.com/inexorgame/windows-installer/releases/tag/0.1",
                osx:
                    "https://github.com/inexorgame/inexor-core/issues/385"
            },
            loading: false
        }
    },
    created() {
        this.loading = true;
        /*
        // This should be updated to individual releases of snap-inexor-flex and windows-installer
        this.$http.get(`https://api.github.com/repos/inexorgame/inexor-core/releases`).then((response) => {
            const { tag_name } = response.body[0];
            this.downloadLinks.windows = `https://github.com/inexorgame/inexor-core/releases/download/${tag_name}/Inexor-${tag_name}-win64.zip`;
            this.downloadLinks.linux = `https://github.com/inexorgame/inexor-core/releases/download/${tag_name}/Inexor-${tag_name}-Linux.zip`;
            this.loading = false;
        })*/
    }
}