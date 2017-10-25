<template>
    <div>
        <ul v-for="item in items">
            <li>
                <h4>{{item.title}}</h4>
                {{item.description}}
                <a :href="item.url">Written on {{item.created}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            items: []
        }
    },
    apollo: {
        items: gql`{items { title, created, description, url }}`
    }
}
</script>