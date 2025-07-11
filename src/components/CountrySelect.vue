<!--
  CountrySelect.vue
  ------------------
  A reusable dropdown component for selecting countries.

  Props:
  - modelValue: The selected country (v-model)
  - label: The label text (optional)
  - labelClass: Tailwind classes for label styling
  - selectClass: Tailwind classes for select styling
  - wrapperClass: Tailwind classes for outer wrapper
  - placeholder: Text shown when no country is selected
  - placeholderClass: Class to use in the placeholder
  - optionClass: Class to use on the select options
  - aliases: Countries in select use "official" names. This is an array that can be used to allow aliases for those names.
             Example: {'United Kingdom': 'UK', ...} will accept "UK" as an alias for "United Kingdom".

  Emits:
  - update:modelValue: emitted when selection changes

  Fetches country list from the API in restcountries.com on mount.
-->
<template>
  <div :class="wrapperClass">
    <label v-if="label" :class="labelClass">{{ label }}</label>
    <select
      :class="[selectClass, selected === '' ? placeholderClass : optionClass]"
      v-model="selected"
      @change="$emit('update:modelValue', normalizeValue(selected))"
    >
      <option value="">
        {{ placeholder }}
      </option>
      <option
        v-for="country in countries"
        :key="country.code"
        :value="countryValue === 'code' ? country.cca2 : country.name"
        class="text-gray-700"
      >
        {{ country.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  label: {
    type: String,
    default: '',
  },
  labelClass: {
    type: String,
    default: 'block mb-1 font-medium text-gray-700',
  },
  selectClass: {
    type: String,
    default: 'w-full px-4 py-3 border-2 rounded-md text-gray-700',
  },
  wrapperClass: {
    type: String,
    default: 'block',
  },
  placeholder: {
    type: String,
    default: 'Select a country',
  },
  countryValue: {
    type: String,
    default: 'name', // or 'code' for cca2
  },
  aliases: {
    type: Object,
    default: () => ({}),
  },
  placeholderClass: {
    type: String,
    default: 'text-gray-400',
  },
  optionClass: {
    type: String,
    default: 'text-gray-900',
  },
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue || '')
const countries = ref([])

// Helper: normalize alias to official value
function normalizeValue(val) {
  if (val == null) return ''
  return props.aliases[val] || val
}

onMounted(async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
  const data = await res.json()
  countries.value = data
    .map((c) => ({
      name: c.name.common,
      code: c.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
})

// Only needed if we need extra behavior when the selection changes.
watch(selected, (newVal) => {
  const normalized = normalizeValue(newVal)
  emit('update:modelValue', normalized)
})
</script>
