# Meetings

Meetings take place regularely every 2 weeks (even calendar week numbers - 2,4,6 etc) usually at 21:00 CET.

We meet on [Mumble](https://github.com/mumble-voip/mumble) on "nooblounge.net", port 64738.

Meetings take place to discuss current progress and new problems. Meetings will be announced in the IRC channel (Riot/Matrix) and Telegram.

In advance to every meeting a team member will create a pad, with topics to be discussed.

## How to prepare a meeting?

You can use [this template](https://hackmd.io/kePoI6e2QuGQF__tZUJvkw) to prepare a meeting. 
Once filled in, <a :href="`https://hackmd.io/${hackpad}`">add it to the list of the meetings on HackMD.</a>
The note will then automatically appear below.

## History

<div class="flex flex-wrap">
    <div v-for="(notes, year) in meetings" class="w-1/2 md:w-1/3 xl:w-1/5">
        <h3>{{year}}</h3>
        <ul>
            <li v-for="note in notes">
                <a :href="note.link">
                    {{note.name}}
                </a>
            </li>
        </ul>
    </div>
</div>

<script>

export default {
    data: () => ({
        meetings: [],
        hackpad: '1EUrMWEVTOqzg65FDK2dAg'
    }),
    async mounted() {
        let response = await fetch(`https://hackmd.io/${this.hackpad}/download`)
        let markdown = await response.text()
        markdown = /(?:## Meetings)([\W\n\w]*?)(?:##)/gm
            .exec(markdown)[1]
            // turn lines into array items
            .split('\n')
            // remove empty lines
            .filter(String)
            // turn array of lines into a tree of year/notes pairings
            .reduce((acc, cur, index, array) => {
                let indent = cur.match(/\s+/)[0].length
                let year = cur.match(/\d{4}/g)[0]
                if (!acc[year]) acc[year] = []
                let [match, name, link] = cur.match(/(?:.*?)\[(.*?)\]\((.*?)\)/) || []
                if (indent > 1) acc[year].push({name, link})
                return acc
            }, {})
        this.meetings = markdown
    }
}
</script>