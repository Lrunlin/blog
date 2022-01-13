//用于antd样式文件按需打包构建
//文章地址:https://segmentfault.com/a/1190000038819688

//取消使用styled-jsx-sass的原因：与自带的babel取消前缀插件冲突（禁止前缀禁止嵌套）
//https://github.com/vercel/styled-jsx




let config = {
    presets: [
        [
            "next/babel",
            {
                "styled-jsx": {
                    "plugins": [
                        "styled-jsx-plugin-sass"
                    ],
                    "vendorPrefixes": false
                }
            }
        ]
    ],
    plugins: [
        [
            "import",
            {
                libraryName: "antd",
                libraryDirectory: "lib",
                style: function (name) {
                    return `${name}/style/index.css`;
                },
            },
        ],
        [
            "import",
            {
                libraryName: "@ant-design/icons",
                libraryDirectory: "lib/icons",
                camel2DashComponentName: false,
            },
            "@ant-design/icons",
        ],
        // ["styled-jsx/babel", {
        //     vendorPrefixes: false
        // }]
    ],
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push('transform-remove-console')
}


module.exports = config