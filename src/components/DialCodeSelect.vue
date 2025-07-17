<!-- src\components\DialCodeSelect.vue -->
<template>
  <div class="relative w-full">
    <button
      type="button"
      class="dial-code-btn border border-gray-300 p-2 rounded w-full text-left bg-white"
      @click="open = !open"
    >
      {{ selected?.dial_code || 'Pick code' }}
      <span class="float-right">&#9662;</span>
    </button>
    <Teleport to="body">
      <ul
        v-if="open"
        :style="dropdownStyle"
        class="dial-code-dropdown fixed z-50 bg-white border border-gray-300 rounded shadow max-h-96 overflow-auto min-w-[240px] max-w-[400px]"
      >
        <li class="px-4 py-2 text-gray-400 cursor-not-allowed" aria-disabled="true">Pick code</li>
        <li
          v-for="c in codes"
          :key="c.dial_code"
          @click="select(c)"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
          <span class="font-bold">{{ c.dial_code }}</span>
          <span class="text-gray-500"> - {{ c.name }}</span>
        </li>
      </ul>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  codes: Array<{ dial_code: string; name: string }>
}>()
const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const selected = computed(() => props.codes.find((c) => c.dial_code === props.modelValue))
const dropdownStyle = ref({})

function select(code: { dial_code: string; name: string }) {
  if (!code.dial_code) return // Prevent selecting the default
  emit('update:modelValue', code.dial_code)
  open.value = false
}

function updateDropdownPosition() {
  const btn = document.querySelector('.dial-code-btn') as HTMLElement
  if (btn) {
    const rect = btn.getBoundingClientRect()
    dropdownStyle.value = {
      left: rect.left + 'px',
      top: rect.bottom + 'px',
      minWidth: Math.max(rect.width, 240) + 'px',
    }
  }
}

function handleClickOutside(event: MouseEvent) {
  const btn = document.querySelector('.dial-code-btn')
  const dropdown = document.querySelector('.dial-code-dropdown')
  if (
    btn &&
    dropdown &&
    !btn.contains(event.target as Node) &&
    !dropdown.contains(event.target as Node)
  ) {
    open.value = false
  }
}
watch(open, (val) => {
  if (val) {
    updateDropdownPosition()
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>
