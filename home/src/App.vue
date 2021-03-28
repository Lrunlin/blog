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
    "%c本人有偿代写：html,css,js,jQuery，vue，node,mysql,毕业设计，作业，公司小项目，可添加QQ：1974109227，微信：webzhizuo",
    style
  );
}
</script>
