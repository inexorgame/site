# Meetings

They are [maintained on HackMD](https://hackmd.io/CYFhFYCYCMGYEYC0A2e9yJAYwKYENE4AOWRPHCABiz2AE5hLIg==?both)

<pre><code>
{{meetings}}
</code></pre>
<script>
const HACKPAD = '1EUrMWEVTOqzg65FDK2dAg'

export default {
    data: () => ({
        meetings: [],
    }),
    async mounted() {
        let response = await fetch(`https://hackmd.io/${HACKPAD}/download`)
        let markdown = await response.text()
        markdown = /(?:## Meetings)([\W\n\w]*?)(?:##)/gm
            .exec(markdown)[1]
            .split('\n')
            .filter(String)
            .reduce((acc, cur, index, array) => {
                let indent = cur.match(/\s+/)[0].length
                let year = cur.match(/\d{4}/g)[0]
                if (!acc[year]) acc[year] = []
                if (indent > 1) acc[year].push(cur)
                return acc
            }, {})
        this.meetings = markdown
    }
}
</script>