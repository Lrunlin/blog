module.exports = {
  extends: "next",
  rules: {
    // 一定要使用next/image
    "@next/next/no-img-element": "off",
    // 使用_blank移动要使用noreffer
    "react/jsx-no-target-blank": "off",
    // 不能将children作为props
    "react/no-children-prop": "off",
    // 使用到的依赖移动要写到useEffect中
    "react-hooks/exhaustive-deps": "off",
  },
};
