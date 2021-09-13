<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  }),
};
</script>
<style>
/* noto-sans-kr-regular - latin_korean */
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url('./assets/fonts/noto-sans-kr-v13-latin_korean-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/noto-sans-kr-v13-latin_korean-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* noto-sans-kr-500 - latin_korean */
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  src: local(''),
       url('./assets/fonts/noto-sans-kr-v13-latin_korean-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/noto-sans-kr-v13-latin_korean-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* noto-sans-kr-700 - latin_korean */
@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  src: local(''),
       url('./assets/fonts/noto-sans-kr-v13-latin_korean-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/noto-sans-kr-v13-latin_korean-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
</style>
