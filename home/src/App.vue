<template>
  <router-view />
</template>
<style>
* {
  margin: 0px;
  padding: 0px;
}
body {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
body::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
<script>
// 如果不是生产环境就打印小广告
if (process.env.NODE_ENV != "development") {
  let style = ["color:red", "font-size:30px"].join(";");
  console.log(
    "%c页面是vue3组合式api 使用scriptsetup提案写的，至于为啥devtools不亮，我也不知道",
    style
  );
}
</script>
