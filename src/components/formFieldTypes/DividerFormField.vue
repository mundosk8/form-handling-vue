<script setup lang="ts">
interface Props {
  id: string
}

defineProps<Props>()
</script>

<template>
  <h2>{{ id }}</h2>
</template>
