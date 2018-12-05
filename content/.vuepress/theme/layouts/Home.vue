<template>
	<div class="container">
		<Content custom/>
	</div>
</template>

<script>

export default {
	computed: {
		data() {
			return this.$page.frontmatter
		},
	}
}
</script>
