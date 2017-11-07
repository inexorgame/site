export default {
    data() {
        return {
            downloadLinks: {
                linux:
                    "https://github.com/inexorgame/snap-inexor-flex/releases/",
                windows:
                    "https://github.com/inexorgame/windows-installer/releases/",
                osx:
                    "https://github.com/inexorgame/inexor-core/issues/385"
            },
            loading: false
        }
    },
    created() {
        this.loading = true;

        let windowsDownload = this.$http.get(`https://api.github.com/repos/inexorgame/windows-installer/releases`).then((response) => {
            const { tag_name } = response.body[0];
            this.downloadLinks.windows = `https://github.com/inexorgame/windows-installer/releases/download/${tag_name}/Inexor_Setup.exe`;
            return new Promise((resolve) => resolve())
        }).catch(() => {
            return new Promise((resolve, reject) => reject())
        })

        let linuxDownload = this.$http.get('https://api.github.com/repos/inexorgame/snap-inexor-flex/releases').then((response) => {
            const { tag_name } = response.body[0];
            this.downloadLinks.linux = `https://github.com/inexorgame/snap-inexor-flex/releases/download/${tag_name}/inexor-flex_${tag_name}_amd64.snap`
            return new Promise((resolve) => resolve())
        }).catch(() => {
            return new Promise((resolve, reject) => reject())
        })

        Promise.all(windowsDownload, linuxDownload).then(() => {
            this.loading = false;
        })
    }
}