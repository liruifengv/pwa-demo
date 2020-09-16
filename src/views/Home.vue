<template>
  <div class="home">
    <button @click="sao">扫一扫</button>
    <div id="qrcode"></div>
    <video ref="video" id="video" autoplay style="width:480px;height:320px;"></video>
    <canvas ref="canvas" id="canvas" width="480" height="320"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'

// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      qrcode: null
    }
  },
  components: {

  },
  mounted () {
    this.qrcode = new QRCode(document.getElementById('qrcode'), {
      width: 100,
      height: 100
    })
  },
  methods: {
    sao () {
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
      const ctx = $canvas[0].getContext('2d')
      console.log('截图2')
      ctx.drawImage($video[0], 0, 0, 480, 320)
      console.log('drawImage')
      const base64 = $canvas[0].toDataURL('images/png')
      console.log('base64', base64)
      // 截图成功对图片进行识别
      this.decodeQrcode(base64)
    },
    decodeQrcode (base64) {
      console.log('decodeQrcode', base64)
      const self = this
      // $('#screenshot_img').attr('src', base64)
      this.qrcode.decode(base64)
      this.qrcode.callback = function (imgMsg) {
        if (imgMsg === 'error decoding QR Code') {
          console.log('decodeQrcode failed', imgMsg)
          setTimeout(function () {
            // 截图重新识别
            self.screenShot()
          }, 2000)
        } else {
          console.log('decodeQrcode Complete', imgMsg)
          alert(imgMsg)
          window.location.href = imgMsg
        }
      }
    }
  }
}
</script>
