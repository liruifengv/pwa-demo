<template>
  <div class="home">
    <div>
      <label>学生姓名：</label>
      <input id="name" v-model="name" type="text" style="width:50%" /><br />
    </div>
    <div>
      <label>学校：</label>
      <input id="school" v-model="school" type="text" style="width:50%" /><br />
    </div>
    <div>
      <label>性别：</label>
      <input id="sex" v-model="sex" type="text" style="width:50%" /><br />
    </div>
    <div>
      <label>小组名称：</label>
      <input id="group" v-model="group" type="text" style="width:50%" /><br />
    </div>
    <button @click="makeCode">生成二维码</button>
    <div id="qrcode"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import QRCode from 'qrcodejs2'
export default {
  name: 'Home',
  data () {
    return {
      qrcode: null,
      name: '',
      school: '',
      sex: '',
      group: ''
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
    makeCode () {
      const info = `http://localhost:8080/#/qrcode?name=${this.name}&school=${this.school}&sex=${this.sex}&group=${this.group}`
      this.qrcode.makeCode(info)
    }
  }
}
</script>
