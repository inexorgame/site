
<div v-for="page in $site.pages">
    <a style="display: block" :href="page.path">{{page.title}}</a>
</div>

<pre><code>
{{$site.pages}}
</code></pre>