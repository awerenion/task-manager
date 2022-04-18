<template>
  <input
    :type="inputType"
    :placeholder="placeholder"
    :value="value"
    @input="handleInput"
  >
</template>

<script>
export default {
  name: 'VInput',
  props: {
    inputType: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>
