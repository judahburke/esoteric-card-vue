import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PitchTrick from '../pitch/PitchTrick.vue'

describe('PitchTrick', () => {
  it('renders properly', () => {
    const wrapper = mount(PitchTrick, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
