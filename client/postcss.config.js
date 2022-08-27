module.exports = {
  plugins: {
    tailwindcss: {},
    // autoprefixer: {},//自动前缀
      ...(process.env.NODE_ENV === 'production' ? {
        cssnano: {}
      } : {})
  },
}
