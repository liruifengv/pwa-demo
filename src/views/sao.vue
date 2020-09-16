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
  name: 'sao',
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
      if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia) {
        this.getUserMedia({ video: { width: 480, height: 320 } }, this.success, this.error)
      } else {
        console.log('you bower id not getUserMedia')
      }
    },
    getUserMedia (constrains, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error)
      } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(constrains, success.error)
      } else if (navigator.mozGetUserMedia) {
        navigator.mozkitGetUserMedia(constrains, success.error)
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia(constrains, success, error)
      }
    },
    success (stream) {
      const CompatibleUrl = window.URL || window.webkitURL
      this.$resf.video.src = CompatibleUrl.createObjectURL(stream)
      this.$resf.video.play()
      setTimeout(() => {
        this.screenShot()
      }, 2000)
    },
    error (error) {
      console.log(error.name, error.message)
    },
    screenShot () {
      const $canvas = this.$resf.canvas
      const $video = this.$resf.video
      const ctx = $canvas[0].getContext('2d')
      ctx.drawImage($video[0], 0, 0, 480, 320)
      const base64 = $canvas[0].toDataURL('images/png')
      // 截图成功对图片进行识别
      this.decodeQrcode(base64)
    },
    decodeQrcode (base64) {
      const self = this
      // $('#screenshot_img').attr('src', base64)
      this.qrcode.decode(base64)
      this.qrcode.callback = function (imgMsg) {
        if (!self.visible) {
          return
        }
        if (imgMsg === 'error decoding QR Code') {
          setTimeout(function () {
            // 截图重新识别
            self.screenShot()
          }, 2000)
        } else {
          alert(imgMsg)
          window.location.href = imgMsg
        }
      }
    }
  }
}
</script>
