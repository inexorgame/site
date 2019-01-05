<template>
    <span class="status-bubble text-sm transition" :class="getStatusClass">{{type}}</span>
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
    computed: {
        getStatusClass() {
            let color = (STATUS_TYPE_COLORS[this.type] || 'blue')
            if (this.inverted) return ['bg-white', `text-${color}`, `border-${color}` ]
            return ['bg-' + color]
        }
    }
}
</script>
