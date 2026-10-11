---
layout: home
---

<div class="break-out-full-width h-full bg-averas bg-cover">
    <div class="w-3/4 m-auto flex flex-wrap items-stretch">
        <div v-for="member in members" class="w-1/3 lg:w-1/4 xl:w-1/5 p-4 mb-8 relative">
            <div class="bg-gray-faded-800 p-4 h-full text-white flex flex-col items-center">
                <img :src="member.avatar_url" class="block w-1/2">
                <h3 class="mt-8">{{member.login}}</h3>
            </div>
        </div>
    </div>
</div>


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