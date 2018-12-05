
<div v-for="page in $site.pages">
    <router-link :to="page.path" class="block">
        {{page.title}}
    </router-link>
</div>