<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { Buffer } from 'buffer'
import draggable from 'vuedraggable'
import type { FormField } from '@/types'
import DividerFormFieldVue from '@/components/formFieldTypes/DividerFormField.vue'
import InputFormField from '@/components/formFieldTypes/InputFormField.vue'

type NewFormField = FormField & {
  actions: string[]
}

const fieldType = ref('divider')
const fieldId = ref('')
const fieldName = ref('')
const fieldDefault = ref('')
const fieldDefaultCheckbox = ref(false)
const fieldRequired = ref(false)
const formFields = ref<NewFormField[]>([])
const serializedForm = ref('')

const addField = () => {
  const newField: NewFormField = {
    type: fieldType.value,
    id: fieldId.value,
    name: fieldName.value,
    default: fieldType.value === 'checkbox' ? fieldDefaultCheckbox.value : fieldDefault.value,
    required: fieldRequired.value,
    actions: ['Reorder', 'Delete']
  }

  formFields.value.push(newField)
  updateSerializedForm()
}

const deleteField = (index: number) => {
  formFields.value.splice(index, 1)
  updateSerializedForm()
}

const updateSerializedForm = () => {
  const jsonString = JSON.stringify(formFields.value)
  const encodedString = Buffer.from(jsonString).toString('base64')
  serializedForm.value = encodedString
}

defineComponent({
  components: {
    draggable
  },
  setup() {
    return {
      fieldType,
      fieldId,
      fieldName,
      fieldDefault,
      fieldRequired,
      formFields,
      serializedForm,
      addField,
      deleteField,
      updateSerializedForm
    }
  }
})
</script>

<template>
  <div>
    <label
      >Type:
      <select v-model="fieldType">
        <option value="divider">Divider</option>
        <option value="number">Number</option>
        <option value="text">Text Input</option>
        <option value="checkbox">Checkbox</option>
      </select>
    </label>
    <br />
    <label>ID: <input type="text" v-model="fieldId" data-testid="fieldId" /></label>
    <br />
    <template v-if="fieldType !== 'divider'">
      <label>Name: <input type="text" v-model="fieldName" /></label>
      <br />
      <label
        >Default:
        <input v-if="fieldType === 'checkbox'" type="checkbox" v-model="fieldDefaultCheckbox" />
        <input v-else type="text" v-model="fieldDefault" />
      </label>
      <br />
      <label>Required: <input type="checkbox" v-model="fieldRequired" /></label>
      <br />
    </template>
    <button @click="addField">Add Field</button>
    <br />
    <draggable :itemKey="fieldId" v-model="formFields" @end="updateSerializedForm">
      <template #item="{ element, index }">
        <div>
          <div v-if="element.type === 'divider'">
            <DividerFormFieldVue :id="element.id" />
          </div>
          <div v-else>
            <InputFormField :field="element" />
            <!-- <label :for="element.id">{{ element.name }}:</label>
            <input v-if="element.type === 'number'" :type="element.type" :name="element.id" />
            <input v-else-if="element.type === 'text'" :type="element.type" :name="element.id" />
            <input
              v-else-if="element.type === 'checkbox'"
              :type="element.type"
              :name="element.id"
            /> -->
          </div>
          <button @click="deleteField(index)">Delete</button>
        </div>
      </template>
    </draggable>
    <br />
    <textarea v-model="serializedForm" readonly></textarea>
  </div>
</template>

<style>
/* Add your styles here if needed */
</style>
