<template>
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
    <div class="picker-toolbar">
      <div class="select-action" @click="cancel">
        取消
      </div>
      <div class="select-action" @click="ok">
        确定
      </div>
    </div>
    <mt-picker id="areaPicker" :slots="citySlots" @change="onCityChange" :visible-item-count="5"></mt-picker>
  </mt-popup>
</template>

<script>
import { proData } from './pro.js'
import { cityData } from './city.js'
import { countryData } from './country.js'

export default {
  props: ['pickerVisible', 'inputId'],
  data () {
    return {
      popupVisible: false,
      addressProvince: '',
      addressCity: '',
      addressDist: '',
      addressText: '',
      areaPicker: '',
      localization: '',
      citySlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ]
    }
  },
  watch: {
    pickerVisible: function (val) {
      if (this.popupVisible !== val) {
        this.popupVisible = val
      }
      if (this.popupVisible) {
        // 设置默认选中
        if (this.addressProvince !== '' && this.addressCity !== '' && this.addressDist !== '') {
          this.areaPicker.setSlotValue(0, this.addressProvince)
          this.areaPicker.setSlotValue(1, this.addressCity)
          this.areaPicker.setSlotValue(2, this.addressDist)
        }
      }
    },
    popupVisible: function (val) {
      // 点击空白popup消失，会执行这个方法，popup会改变pickerVisible的值
      if (this.pickerVisible !== val) {
        // 发送消息让父组件同步修改pickerVisible
        this.$emit('finishSelect', this.addressText)
      }
    }
  },
  mounted: function () {
    this.loadAreaList()
    // 设置popup的高度
    document.getElementById('areaPicker').style.height = 200 + 'px'
  },
  methods: {
    getProvinveNames () {
      // 通过省份名数组
      var names = []
      for (var index in proData) {
        if (proData[index].pv) {
          names.push(proData[index].pv)
        }
      }
      return names
    },
    getProvinveId (provinceName) {
      // 通过省份名称返回省份ID
      for (var index in proData) {
        if (proData[index].pv === provinceName) {
          return proData[index].pk
        }
      }
    },
    getCityNames (provinveId) {
      // 通过省份ID返回市区名数组
      var names = []
      for (var index in cityData) {
        if (cityData[index].pk === provinveId) {
          names.push(cityData[index].cv)
        }
      }
      return names
    },
    getCityId (cityName) {
      // 通过城市名称返回城市ID
      for (var index in cityData) {
        if (cityData[index].cv === cityName) {
          return cityData[index].ck
        }
      }
    },
    getDistNames (cityId) {
      // 通过城市ID返回地区名数组
      var names = []
      for (var index in countryData) {
        if (countryData[index].ck === cityId) {
          names.push(countryData[index].cyv)
        }
      }
      return names
    },
    cancel: function () {
      // 取消选择
      this.areaPicker.setSlotValue(0, this.addressProvince)
      this.areaPicker.setSlotValue(1, this.addressCity)
      this.areaPicker.setSlotValue(2, this.addressDist)
      // 发送事件让父控件修改pickerVisible，并同步选中
      this.$emit('finishSelect', this.addressText)
    },
    ok: function () {
      // 清空替换文字
      var input = document.getElementById(this.inputId)
      if (input) {
        input.placeholder = ''
      }
      // 确定选择
      this.addressText = this.addressProvince + this.addressCity + this.addressDist
      // 发送事件让父控件修改pickerVisible，并同步选中
      this.$emit('finishSelect', this.addressText)
    },
    loadAreaList: function () {
      // 省
      this.citySlots[0].values = this.getProvinveNames()
      // 市
      var provId = proData[0].pk
      this.citySlots[1].values = this.getCityNames(provId)
      // 区
      var cityId = cityData[0].ck
      this.citySlots[2].values = this.getDistNames(cityId)
    },
    onCityChange: function (picker, values) {
      // 选择改变和初次加载来到这个方法
      var provinceId = this.getProvinveId(values[0])
      var cityId = this.getCityId(values[1])
      picker.setSlotValues(1, this.getCityNames(provinceId))
      if (cityId) {
        picker.setSlotValues(2, this.getDistNames(cityId))
      }
      this.addressProvince = values[0]
      this.addressCity = values[1]
      this.addressDist = values[2]
      this.areaPicker = picker
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-popup-4 {
  width: 100%;
}
.mint-popup-4 .picker-slot-wrapper, .page-popup .mint-popup-4 .picker-item {
  -webkit-backface-visibility: hidden; /* 隐藏被旋转的元素背面  */
  backface-visibility: hidden;/* Chrome 和 Safari */
  -moz-backface-visibility:hidden; 	/* Firefox */
  -ms-backface-visibility:hidden; 	/* Internet Explorer */
}
.picker-toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
              -ms-flex-pack: justify;
                  justify-content: space-between;
  height: 44px;
  background-color: #ededed;
}
.select-action {
	width: 80px;
	text-align: center;
	line-height: 44px;
	font-size: 15px;
	color: #666;
  /*background-color: rgb(250, 195, 170);*/
}
</style>
