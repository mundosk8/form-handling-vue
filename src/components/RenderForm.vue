<script setup lang="ts">
import { ref } from 'vue'
import { Buffer } from 'buffer'
import DividerFormFieldVue from '@/components/formFieldTypes/DividerFormField.vue'
import InputFormField from '@/components/formFieldTypes/InputFormField.vue'
import type { FormField } from '@/types/index'

const base64Form = ref('')
const renderedForm = ref<FormField[]>([])

const renderForm = () => {
  try {
    const decodedForm = JSON.parse(Buffer.from(base64Form.value, 'base64').toString('utf-8'))
    renderedForm.value = decodedForm
  } catch (error) {
    console.error('Error decoding or parsing the base64 form:', error)
  }
}
</script>

<template>
  <div>
    <label>Paste Base64 Encoded Form:</label>
    <textarea v-model="base64Form" rows="5"></textarea>
    <button @click="renderForm">Render Form</button>

    <div v-if="renderedForm">
      <h2>Rendered Form:</h2>
      <div v-for="(field, index) in renderedForm" :key="index">
        <template v-if="field.type === 'divider'">
          <DividerFormFieldVue :id="field.id" />
        </template>
        <template v-else>
          <InputFormField :field="field" />
        </template>
        <!-- <template v-else>
          <label :for="field.id">{{ field.name }}</label>
          <input v-if="field.type === 'number'" :type="field.type" :name="field.id" />
          <input v-else-if="field.type === 'text'" :type="field.type" :name="field.id" />
          <input v-else-if="field.type === 'checkbox'" :type="field.type" :name="field.id" />
        </template> -->
      </div>
    </div>
  </div>
</template>

<style>
/* Add your styles here if needed */
</style>
