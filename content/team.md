{{members}}

<script>
export default {
    data: () => ({
        members: []
    }),
    async created() {
        let response = await fetch('https://api.github.com/orgs/inexorgame/members')
        this.members = await response.json()
    }
}
</script>

s