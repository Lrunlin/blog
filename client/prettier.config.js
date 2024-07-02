module.exports = {
    printWidth: 80,
    tabWidth: 2,
    trailingComma: 'all',
    singleQuote: false,//是否使用单引号
    jsxBracketSameLine: true,
    semi: true,
    plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
    importOrder: [
        "^react$",                     // React
        "^next$",                      // Next.js
        "^next/(.*)$",                 // Next.js 插件，例如 next/head 等等
        "^antd$",                      // Ant Design
        "<THIRD_PARTY_MODULES>",       // 其他未明确排序的第三方模块
        "^@types/(.*)$",               // 类型声明
        "^@app/(.*)$",                 // 应用内的 @app 模块
        "^@/common/(.*)$",             // 公共模块
        "^@/layout/(.*)$",             // 布局相关模块
        "^@/components/(.*)$",         // 组件
        "^@/plugin/(.*)$",             // 插件
        "^@/store/(.*)$",              // 状态管理
        "^@/request/(.*)$",            // 请求相关模块
        "^@/styles/(.*)$",             // 样式相关模块
        "^[./]",                       // 当前目录及更深层的相对路径
        "^[../]",                      // 父目录及更深层的相对路径
    ],
    importOrderSeparation: false, //是否进行换行
    importOrderSortSpecifiers: true,
    importOrderParserPlugins: ["typescript", "jsx"],
    // tailwind css
    tailwindFunctions: ["className", 'classNames'],
    tailwindConfig: "./tailwind.config.js"
};