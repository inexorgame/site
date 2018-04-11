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
    async created() {
        this.loading = true;
        const [windows, linux] = await Promise.all([
            await (async () => {
                const response = await fetch(`https://api.github.com/repos/inexorgame/windows-installer/releases`);
                let tag = await response.json();
                return `https://github.com/inexorgame/windows-installer/releases/download/${tag[0].tag_name}/Inexor_Setup.exe`
            })(),
            await (async () => {
                const response = await fetch(`https://api.github.com/repos/inexorgame/snap-inexor-flex/releases`);
                let tag = await response.json();
                return `https://github.com/inexorgame/snap-inexor-flex/releases/download/${tag[0].tag_name}/inexor-flex_${tag[0].tag_name}_amd64.snap`
            })(),
        ])
        console.log(windows)

        this.downloadLinks = Object.assign({}, this.downloadLinks, {
            windows,
            linux,
        })
        this.loading = false;
    }
}