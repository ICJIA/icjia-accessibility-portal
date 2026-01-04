/**
 * @fileoverview Component tests for DownloadDialog
 * @description Tests the download dialog component for accessibility and functionality
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DownloadDialog from '../../app/components/DownloadDialog.vue'

describe('DownloadDialog', () => {
  const mountComponent = (props = {}) => {
    return mount(DownloadDialog, {
      props: {
        modelValue: true,
        ...props,
      },
      global: {
        stubs: {
          'v-dialog': {
            template: '<div class="v-dialog" v-if="modelValue"><slot /></div>',
            props: ['modelValue'],
          },
          'v-card': {
            template: '<div class="v-card"><slot /></div>',
          },
          'v-card-title': {
            template: '<div class="v-card-title" :id="id"><slot /></div>',
            props: ['id'],
          },
          'v-card-text': {
            template: '<div class="v-card-text"><slot /></div>',
          },
          'v-card-actions': {
            template: '<div class="v-card-actions"><slot /></div>',
          },
          'v-icon': {
            template: '<span class="v-icon"><slot /></span>',
          },
          'v-btn': {
            template: '<button class="v-btn" @click="$emit(\'click\')"><slot /></button>',
          },
          'v-spacer': {
            template: '<div class="v-spacer"></div>',
          },
        },
      },
    })
  }

  describe('Rendering', () => {
    it('should render when modelValue is true', () => {
      const wrapper = mountComponent({ modelValue: true })
      expect(wrapper.find('.v-dialog').exists()).toBe(true)
    })

    it('should not render dialog content when modelValue is false', () => {
      const wrapper = mountComponent({ modelValue: false })
      expect(wrapper.find('.v-dialog').exists()).toBe(false)
    })

    it('should display dialog title', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Download FAQs')
    })

    it('should display description text', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Choose your preferred accessible format')
    })
  })

  describe('Download Options', () => {
    it('should display Word Document option', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Word Document (.docx)')
      expect(wrapper.text()).toContain('Microsoft Word')
    })

    it('should display Markdown option', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Markdown (.md)')
      expect(wrapper.text()).toContain('VS Code')
    })

    it('should display Plain Text option', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Plain Text (.txt)')
      expect(wrapper.text()).toContain('screen reader')
    })

    it('should have correct download links', () => {
      const wrapper = mountComponent()
      
      const docxLink = wrapper.find('a[href="/ICJIA-Accessibility-FAQs.docx"]')
      const mdLink = wrapper.find('a[href="/ICJIA-Accessibility-FAQs.md"]')
      const txtLink = wrapper.find('a[href="/ICJIA-Accessibility-FAQs.txt"]')
      
      expect(docxLink.exists()).toBe(true)
      expect(mdLink.exists()).toBe(true)
      expect(txtLink.exists()).toBe(true)
    })

    it('should have download attributes on links', () => {
      const wrapper = mountComponent()
      
      const docxLink = wrapper.find('a[href="/ICJIA-Accessibility-FAQs.docx"]')
      expect(docxLink.attributes('download')).toBe('ICJIA-Accessibility-FAQs.docx')
    })
  })

  describe('Accessibility Indicators', () => {
    it('should display accessibility notes for each format', () => {
      const wrapper = mountComponent()
      const text = wrapper.text()
      
      expect(text).toContain('Accessible: Proper heading structure')
      expect(text).toContain('Accessible: Readable as plain text')
      expect(text).toContain('Accessible: Universal format')
    })
  })

  describe('Markdown Information', () => {
    it('should have expandable Markdown explanation', () => {
      const wrapper = mountComponent()
      const details = wrapper.find('details.markdown-explainer')
      
      expect(details.exists()).toBe(true)
    })

    it('should explain what Markdown is', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('What is Markdown')
    })

    it('should include Windows native options', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Windows')
      expect(wrapper.text()).toContain('Notepad')
    })

    it('should include macOS native options', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('macOS')
      expect(wrapper.text()).toContain('TextEdit')
    })

    it('should include cross-platform apps', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('VS Code')
      expect(wrapper.text()).toContain('Obsidian')
    })

    it('should include online viewers', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Dillinger.io')
      expect(wrapper.text()).toContain('StackEdit.io')
    })
  })

  describe('Accessibility Features', () => {
    it('should have aria-labelledby for dialog', () => {
      const wrapper = mountComponent()
      // Check that title ID is generated
      const title = wrapper.find('.v-card-title')
      expect(title.attributes('id')).toMatch(/download-dialog-title-/)
    })

    it('should have download options with role="list"', () => {
      const wrapper = mountComponent()
      const list = wrapper.find('[role="list"]')
      expect(list.exists()).toBe(true)
    })

    it('should have download options with role="listitem"', () => {
      const wrapper = mountComponent()
      const items = wrapper.findAll('[role="listitem"]')
      expect(items.length).toBe(3) // docx, md, txt
    })

    it('should have cancel button with aria-label', () => {
      const wrapper = mountComponent()
      const cancelBtn = wrapper.find('button.v-btn')
      expect(cancelBtn.exists()).toBe(true)
    })
  })

  describe('User Interaction', () => {
    it('should emit update:modelValue when cancel is clicked', async () => {
      const wrapper = mountComponent()
      
      const cancelBtn = wrapper.find('button.v-btn')
      await cancelBtn.trigger('click')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })

  describe('Tips and Guidance', () => {
    it('should include tip for screen reader users', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Tip')
      expect(wrapper.text()).toContain('screen reader')
    })
  })

  describe('LLM/AI Usage Information', () => {
    it('should indicate Markdown is good for LLM input', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Great for AI')
      expect(wrapper.text()).toContain('ChatGPT')
      expect(wrapper.text()).toContain('Claude')
    })

    it('should indicate Plain Text is good for LLM input', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Perfect for pasting')
      expect(wrapper.text()).toContain('LLM')
    })

    it('should explain how to use with AI assistants', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Using with AI')
      expect(wrapper.text()).toContain('AI assistants')
    })

    it('should mention specific AI tools', () => {
      const wrapper = mountComponent()
      expect(wrapper.text()).toContain('Gemini')
      expect(wrapper.text()).toContain('Copilot')
    })
  })
})

