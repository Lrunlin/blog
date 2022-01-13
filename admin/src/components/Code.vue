<template>
  <!-- https://segmentfault.com/a/1190000021282712 -->
  <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
</template>
<script>
export default {
  name: "SIdentify",
  props: {
    // 图片验证码
    identifyCode: {
      type: String,
      default: "1234",
    },
    // 字体最小值
    fontSizeMin: {
      type: Number,
      default: 28,
    },
    // 字体最大值
    fontSizeMax: {
      type: Number,
      default: 34,
    },
    // 背景颜色色值最小值，最小为0
    backgroundColorMin: {
      type: Number,
      default: 200,
    },
    // 背景颜色色值最大值，最大为255
    backgroundColorMax: {
      type: Number,
      default: 240,
    },
    // 字体颜色色值最小值，最小为0
    colorMin: {
      type: Number,
      default: 0,
    },
    // 字体颜色色值最大值，最大为255
    colorMax: {
      type: Number,
      default: 180,
    },
    // 干扰线颜色色值最小值，最小为0
    lineColorMin: {
      type: Number,
      default: 150,
    },
    // 干扰线颜色色值最大值，最大为255
    lineColorMax: {
      type: Number,
      default: 200,
    },
    // 干扰点颜色色值最小值，最小为0
    dotColorMin: {
      type: Number,
      default: 100,
    },
    // 干扰点颜色色值最大值，最大为255
    dotColorMax: {
      type: Number,
      default: 250,
    },
    // 画布宽度
    contentWidth: {
      type: Number,
      default: 100,
    },
    // 画布高度
    contentHeight: {
      type: Number,
      default: 40,
    },
  },
  mounted() {
    this.drawPic();
  },
  methods: {
    /**
     * 生成一个随机数
     * @param {number} min 随机数最小值
     * @param {number} max 随机数最大值
     */
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * 生成一个随机的颜色
     * @param {number} min 随机数最小值
     * @param {number} max 随机数最大值
     */
    randomColor(min, max) {
      const r = this.randomNum(min, max);
      const g = this.randomNum(min, max);
      const b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },

    /**
     * 绘制图片验证码
     */
    drawPic() {
      let canvas = document.querySelector("#s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制干扰点
      this.drawDot(ctx);
      // 绘制验证码
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      // 绘制干扰线
      this.drawLine(ctx);
    },

    /**
     * 绘制文本单个验证码
     * @param {object} ctx canvas上下文对象
     * @param {string} txt 单个验证码
     * @param {number} i 单个验证码序号
     */
    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
      ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei";
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
      let deg = this.randomNum(-45, 45);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },

    /**
     * 绘制干扰线
     * @param {object} ctx canvas上下文对象
     */
    drawLine(ctx) {
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
        ctx.stroke();
      }
    },

    /**
     * 绘制干扰点
     * @param {object} ctx canvas上下文对象
     */
    drawDot(ctx) {
      for (let i = 0; i < 60; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
  },
  watch: {
    identifyCode() {
      this.drawPic();
    },
  },
};
</script>
