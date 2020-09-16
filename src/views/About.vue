<template>
  <div class="home">
    <div>
      <label>学生姓名：</label>
      <div>{{name}}</div>
    </div>
    <div>
      <label>学校：</label>
      <div>{{school}}</div>
    </div>
    <div>
      <label>性别：</label>
      <div>{{sex}}</div>
    </div>
    <div>
      <label>小组名称：</label>
      <div>{{group}}</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'qrcode',
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
  },
  methods: {
  }
}
</script>
