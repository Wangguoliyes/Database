// components/itemTable/itemTable.js
Component({
options:{
  multipleSlots:true
},
  /**
   * 组件的属性列表
   */
  properties: {
color:{
  type:String,
  value:"rgb(226, 191, 95)"
},
change:{
  type:Boolean,
  value:false
},
changedColor:{
  type:String,
  value:"rgb(253, 69, 69)"
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
    Click:function(){
      console.log("Click is triggered with click")
      this.triggerEvent('click')
    }
  }
})