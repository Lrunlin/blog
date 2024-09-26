module.exports = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  singleQuote: false,
  semi: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^./app$",//配置要第一行引入
    "^module-alias$", // Ensure module-alias is imported first
    'moduleAlias.addAlias("@", __dirname);', // Ensure any submodules of module-alias are imported next
    "^node$", // Node.js 模块
    "^koa$", // Koa
    "^@koa/(.*)$", // Koa 相关模块
    "<THIRD_PARTY_MODULES>", // 其他第三方模块
    "^sequelize$", // Sequelize
    "^@/db/(.*)$", // @/db 模块
    "^@types/(.*)$", // 类型声明
    "^@/common/(.*)$", // @/common 模块
    "^[./]", // 当前目录及更深层的相对路径
    "^[../]", // 父目录及更深层的相对路径
  ],
  importOrderSeparation: false, // 不进行换行
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ["typescript"],
};
