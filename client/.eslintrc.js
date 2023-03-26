module.exports = {
  extends: "next/babel",
  rules: {
    // 一定要使用next/image
    "@next/next/no-img-element": "off",
    // 使用_blank一定要使用noreffer
    "react/jsx-no-target-blank": "off",
    // 不能将children作为props
    "react/no-children-prop": "off",
    // 使用到的依赖一定要写到useEffect中
    "react-hooks/exhaustive-deps": "off",
    // memo函数中需要写组件名称
    "react/display-name": "off",
    // 不允许使用head
    "@next/next/no-head-element": "off",
  },
};
