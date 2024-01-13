<script setup lang="ts">
import type { FormField } from '@/types'

defineProps<{
  field: FormField
}>()
</script>

<template>
  <label :for="field.id">{{ field.name }}</label>
  <input
    v-if="field.type === 'checkbox'"
    :type="field.type"
    :name="field.id"
    :checked="Boolean(field.default)"
    :required="field.required"
    data-testid="field.id"
  />
  <input
    v-else
    :type="field.type"
    :name="field.id"
    :value="field.default"
    :required="field.required"
    data-testid="field.id"
  />
</template>
