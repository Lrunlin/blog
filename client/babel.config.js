//用于antd样式文件按需打包构建
//文章地址:https://segmentfault.com/a/1190000038819688


let config = {
    presets: [
        [
            "next/babel",
            {
                "styled-jsx": {
                    "plugins": [
                        "@styled-jsx/plugin-sass"
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

if (process.env.NEXT_PUBLIC_ENV === 'production') {
    config.plugins.push('transform-remove-console')
};


module.exports = config
