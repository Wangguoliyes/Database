// components/navigator/navigator.js
Component({
options:{
  multipleSlots:true
},
  /**
   * 组件的属性列表
   */
  properties: {
  imageSrc:{
    type:String,
    value:"../../image/icon/icon.png"
  },
   colorImage:{
     type:String,
     value:"rgb(179, 138, 27)"
   },
   colorText:{
    type:String,
    value:"rgb(221, 176, 51)"
  }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})