<template>
  <div>
    <h1>a</h1>
  </div>
</template>
<script>
import http from '@/api/http';

export default {
  name: 'Test',
  created() {
    this.test();
  },
  methods: {
    test() {
      console.log("test");
      http.post('/codes/add', {
        data: {
          "column_name": "a",
          "code_name": "b",
          "description": "c",
        }
      });
    },
  }
}
</script>
