<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
if(process.env.NODE_ENV == "production"){
  console.log = ()=>{}
}
</script>
