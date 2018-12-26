<template>
    <div class="status-bubble text-sm" :class="getStatusClass()">{{type}}</div>
</template>

<script>

import { STATUS_TYPE_COLORS, STATUS_TYPES } from '../constants'

export default {
    props: {
        inverted: {
            type: Boolean,
            default: false,
        },
        type: String,
    },
    methods: {
        getStatusClass() {
            let color = (STATUS_TYPE_COLORS[this.type] || 'blue')
            if (this.inverted) return ['bg-white', `text-${color}`, `border-${color}` ]
            return ['bg-' + color]
        }
    }
}
</script>
