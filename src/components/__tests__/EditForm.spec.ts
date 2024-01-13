import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import EditForm from '../EditForm.vue'

describe('EditForm', () => {
  it('renders properly fieldId input', async () => {
    const wrapper = mount(EditForm);
    const fieldIdInput = '[data-testid="fieldId"]';

    expect(wrapper.find(fieldIdInput).isVisible()).toBe(true)
  })
})
