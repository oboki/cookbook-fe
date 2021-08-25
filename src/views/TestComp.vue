<template>
  <div>
    <h1>Hello</h1>
    {{ columnName }}
  </div>
</template>
<script>
export default {
  name: 'TestComp',
  props: {
    columnName: {
      type: String,
      default: null
    },
    test: {
      type: String,
      default: null
    },
    codes: {
      type: Object,
      default: null
    }
  }
}
</script>
