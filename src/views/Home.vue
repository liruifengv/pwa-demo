<template>
  <div class="home">
    <button class="no-print" @click="sao">扫一扫</button>
    <button  class="no-print" @click="generate">生成</button>
    <img  class="no-print" :src="banner" />
    <video  class="no-print" ref="video" id="video" autoplay style="width:800px;height:800px;"></video>
    <!--startprint-->
    <canvas class="no-print" ref="canvas" id="canvas"  width="600" height="800"></canvas>
    <!--endprint-->
    <!-- <div ref="print" class="print-div">
    </div> -->
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
      visible: false,
      banner: require('../assets/logo.png'),
      WIDTH: 768,
      HEIGHT: 1168,
      names:[
        '李瑞丰', '王五', '赵四'
      ]
    }
  },
  components: {

  },
  mounted () {
    window.addEventListener('beforeprint', ()=> {
      console.log('正在打印...')
    });
    window.addEventListener('afterprint', ()=> {
      console.log('打印完成...')
      let printDiv = document.querySelector('.print-div')
      document.body.removeChild(printDiv)
    });
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
    console.log('qrcode:', qrcode)
    console.log('qrcode.decode', qrcode.decode)
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■')
  },
  methods: {
    createDom (name, key, value, display = 'none') {
      const $dom = document.createElement(name)
      $dom.setAttribute(key, value)
      $dom.style.display = display
      $dom.width = this.WIDTH
      return $dom
    },
    generate () {
      const that = this
      const image = new Image();
      image.src = this.banner;
      image.onload = function() {
        const $dom = document.createElement('div')
        $dom.setAttribute('class', 'print-div')
        document.body.appendChild($dom)
        that.names.map((name) => {
          const $canvas = that.$refs.canvas
          const ctx = $canvas.getContext('2d')
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 600, 800)
          ctx.drawImage(image, 0, 0, 600, 300);
          ctx.strokeStyle = 'rgba(122, 122, 122, 0.5)';
          ctx.fillStyle = '#000000'
          ctx.textBaseline = 'top'
          ctx.textAlign = 'center'
          ctx.fillText(`姓名：${name}`, 250, 350);
          ctx.stroke()
          const img = new Image();
          img.src = $canvas.toDataURL('image/png')
          document.querySelector('.print-div').appendChild(img)
        })
        // ctx.clearRect(0, 0, 600, 800)
        that.$nextTick(()=> {
          window.print()
        })
      }
    },
    sao () {
      this.visible = false
      console.log('点击扫一扫')
      console.log('新版')
      const self = this
      const option = {
        width: 800,
        height: 800
      }
      if (navigator.mediaDevices === undefined) {
        console.log('111')
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        console.log('222')
        navigator.mediaDevices.getUserMedia = function(constraints) {

          // 首先，如果有getUserMedia的话，就获得它
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            console.log('333')
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
      navigator.mediaDevices.getUserMedia({ video: option })
      .then(function(stream) {
            console.log('获取视频流1')
            // 将视频流实时播放在video
            self.$refs.video.srcObject = stream
            // 截取video内容
            setTimeout(() => {
              self.screenShot()
            }, 2000)
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        alert(err)
      });

      // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      //   navigator.mediaDevices.getUserMedia({
      //     video: option
      //   }).then(function (stream) {
      //     console.log('获取视频流1')
      //     // 将视频流实时播放在video
      //     self.$refs.video.srcObject = stream
      //     // 截取video内容
      //     setTimeout(() => {
      //       self.screenShot()
      //     }, 2000)
      //   }).catch(function (err) {
      //   })
      // } else if (navigator.getUserMedia) {
      //   console.log('获取视频流2')
      //   navigator.getUserMedia({
      //     video: true
      //   }).then(function (stream) {
      //     self.$refs.video.srcObject = stream
      //     setTimeout(() => {
      //       self.screenShot()
      //     }, 2000)
      //   }).catch(function (err) {
      //     alert(err)
      //   })
      // } else {
      //   alert('浏览器不支持getUserMedia')
      // }
    },
    screenShot () {
      console.log('截图1')
      const $canvas = this.$refs.canvas
      const $video = this.$refs.video
      const ctx = $canvas.getContext('2d')
      console.log('截图2')
      ctx.drawImage($video, 0, 0, 800, 800)
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
<style>
.print-div {
  /* display: none; */
}
 @media print{
  .no-print{
    display:none;
  }
  .print-div{
      width:600px!important;
  }
}
@page{
    size:600px 800px;
}
</style>
