<template>
    <Intersection @enter="visible = true">
        <div class="fade-in-section" :class="visible && 'fade-in-section--visible'">
            <slot />
        </div>
    </Intersection>
</template>

<script>
import Intersection from 'vue-intersect'
export default {
    components: { Intersection },
    data: () => ({
        visible: false
    })
}
</script>

<style lang="stylus">
.fade-in-section
    opacity 0
    transform translateY(10vh)
    visibility hidden
    transition opacity 1s ease-out, transform 1s ease-out
    will-change opacity, visibility
    &--visible
        opacity 1
        transform none
        visibility visible
</style>
