<template>
  <div class="demo">
    <div class="title">
      TYAreaPicker
    </div>
    <div class="tip">
      基于Mint-UI的popup、picker封装，使用前需要先引入他们；如果有用到ESLint，同时也需要忽略对city.js、
      country.js、pro.js的代码审查
    </div>
    <input id='areaInput' class="area-input" type="text" readonly="readonly" unselectable="true"
    placeholder="请选择" v-model="areaInputText" @click="pickerVisible1 = !pickerVisible1">
    <!-- 绑定inputId -->
    <area-picker :pickerVisible="pickerVisible1" :inputId="'areaInput'" @finishSelect="finishSelect1"></area-picker>
    <div class="button" @click="pickerVisible2 = !pickerVisible2">
      {{buttonTitle}}
    </div>
    <!-- 不绑定inputId -->
    <area-picker :pickerVisible="pickerVisible2" @finishSelect="finishSelect2"></area-picker>
  </div>
</template>

<script>
import AreaPicker from './areaPicker/AreaPicker.vue'
export default {
  name: 'Demo',
  data () {
    return {
      areaInputText: '',
      buttonTitle: '请选择',
      pickerVisible1: false,
      pickerVisible2: false
    }
  },
  components: {
    'area-picker': AreaPicker
  },
  methods: {
    // 设置areaInput的值
    finishSelect1: function (val) {
      this.areaInputText = val
      this.pickerVisible1 = !this.pickerVisible1
    },
    // 设置button的值
    finishSelect2: function (val) {
      if (val && val.length) {
        this.buttonTitle = val
      } else {
        this.buttonTitle = '请选择'
      }
      this.pickerVisible2 = !this.pickerVisible2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  background-color: rgb(215, 215, 215);
}
.tip {
  background-color: rgb(215, 215, 215);
}
.area-input {
  margin-top: 20px;
  font-size: 15px;
  width: 100%;
  height: 30px;
  text-align: center;
}
.button {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: rgb(94, 108, 232);
  border: 1px solid rgb(246, 205, 124);
  cursor: pointer;
}
</style>
