<template>
  <div class="home">
    <button @click="sao">扫一扫</button>
    <video ref="video" id="video" v-show="!visible" autoplay style="width:1280px;height:720px;"></video>
    <canvas ref="canvas" id="canvas" v-show="visible" width="1280" height="720"></canvas>
  </div>
</template>
<script>
/* eslint-disable */
import { qrcode } from '@/assets/reqrcode.js'

// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      visible: false
    }
  },
  components: {

  },
  mounted () {
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
    console.log('qrcode:', qrcode)
    console.log('qrcode.decode', qrcode.decode)
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
  },
  methods: {
    sao () {
      this.visible = false
      console.log('点击扫一扫')
      const self = this
      const option = {
        width: 1280,
        height: 720
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
          video: option
        }).then(function (stream) {
          console.log('获取视频流1')
          // 将视频流实时播放在video
          self.$refs.video.srcObject = stream
          // 截取video内容
          setTimeout(() => {
            self.screenShot()
          }, 2000)
        }).catch(function (err) {
          alert(err)
        })
      } else if (navigator.getUserMedia) {
        console.log('获取视频流2')
        navigator.getUserMedia({
          video: true
        }).then(function (stream) {
          self.$refs.video.srcObject = stream
          setTimeout(() => {
            self.screenShot()
          }, 2000)
        }).catch(function (err) {
          alert(err)
        })
      } else {
        alert('浏览器不支持getUserMedia')
      }
    },
    screenShot () {
      console.log('截图1')
      const $canvas = this.$refs.canvas
      const $video = this.$refs.video
      const ctx = $canvas.getContext('2d')
      console.log('截图2')
      ctx.drawImage($video, 0, 0, 480, 320)
      console.log('drawImage')
      const base64 = $canvas.toDataURL('images/png')
      // 截图成功对图片进行识别
      this.decodeQrcode(base64)
    },
    decodeQrcode (base64) {
      const self = this
      // $('#screenshot_img').attr('src', base64)
      qrcode.decode(base64)
      qrcode.callback = function (imgMsg) {
        if (imgMsg === 'error decoding QR Code') {
          console.log('decodeQrcode failed', imgMsg)
          setTimeout(function () {
            // 截图重新识别
            self.screenShot()
          }, 2000)
        } else {
          self.visible = true
          console.log('decodeQrcode Complete', imgMsg)
          alert(imgMsg)
          window.location.href = imgMsg
        }
      }
    }
  }
}
</script>
