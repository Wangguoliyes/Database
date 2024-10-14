// components/table/table.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    deleteable:{
      type:String,
      value:"true"
    },
   editable:{
    type:String,
    value:"true"
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatData:{},
    editableArray:[]
  },
  lifetimes:{
  
  },

  /**
   * 组件的方法列表
   */
  methods: {

    addCol: function () {
 
      const table = this.data.formatData.table;
      const widthArray=this.data.formatData.widthArray;
      widthArray.push(60);
  
      const newRow = new Array(table[0].length).fill("");  // 创建与列数相同的新行
      table.push(newRow);
      this.setData({
        formatData:{
          ...this.data.formatData,
          col:this.data.formatData.col+1,
          table: table,
          widthArray:widthArray
        }
      })
     
    },

    addRow: function () {
  
      const table = this.data.formatData.table;
  
      for (let i = 0; i < table.length; i++) {
        table[i].push("");  // 每一行添加一个空的单元格
      }
      this.setData({
        formatData:{
          ...this.data.formatData,
          table: table,
          row:this.data.formatData.row+1
        }
       
      })
     
    },

    removeCol: function () {

      const table = this.data.formatData.table;
      const widthArray=this.data.formatData.widthArray;
    
      if (table.length > 1) {
        widthArray.pop();
        table.pop();  // 删除最后一行
        this.setData({
          formatData:{
            ...this.data.formatData,
            table: table,
            col:this.data.formatData.col-1,
            widthArray:widthArray
          }
        
        });
      } else {
        wx.showToast({
          title: '至少保留一列',
          icon: 'none'
        });
      }
    
    },

    removeRow: function () {

      const table = this.data.formatData.table;
  
      if (table[0].length > 1) {
        for (let i = 0; i < table.length; i++) {
          table[i].pop();  // 每一行删除最后一列
        }
        this.setData({
          formatData:{
            ...this.data.formatData,
            row:this.data.formatData.row-1,
            table: table
          }
        
        });
      } else {
        wx.showToast({
          title: '至少保留一行',
          icon: 'none'
        });
      }
      
    },

    deleteTapUp:function(col){

      const myCol= col.currentTarget.dataset.col;
      console.log("the col is ",this.data.formatData.col)
      if(this.data.formatData.col<=1){
        wx.showToast({
          title: '至少保留一列',
          icon: 'none'
        });
        return 
      }
      else{
      this.data.formatData.table.splice(myCol,1)
      this.data.formatData.widthArray.splice(myCol,1)
      this.setData({
        formatData:{
          ...this.data.formatData,
          table:this.data.formatData.table,
          widthArray:this.data.formatData.widthArray,
          col:this.data.formatData.col-1
        }
       
      })
    }
      },

    LengthOfCol:function(value){
     
        const baseWidth = 40; // 假设每个字符的宽度
        const padding =20 ; // 内边距
        return baseWidth  + padding* value; 
    },
   
      onInputChange: function (e) {
        console.log(this.data.editableArray)
        const widthArray=this.data.formatData.widthArray
        const temprow= e.currentTarget.dataset.row
        const tempcol = e.currentTarget.dataset.col
        const value = e.detail.value
        const table = this.data.formatData.table
        table[tempcol][temprow]=value
        console.log(tempcol,temprow)

        let maxLengthOfCol=this.LengthOfCol(table[tempcol][0].length)
      
        for(let i=1;i<this.data.formatData.row;i++){
          let temp = this.LengthOfCol(table[tempcol][i].length)

          console.log(tempcol,i)
     
          if(maxLengthOfCol<temp){
            maxLengthOfCol=temp
          }

        }
        widthArray[tempcol]= maxLengthOfCol
      
        this.setData({
          formatData:{
            ...this.data.formatData,
            table:table,
            widthArray:widthArray
          }
         
        })
      },

      deleteTapLeft:function(row){

        const myRow= row.currentTarget.dataset.row;

        if( this.data.formatData.row<=1){
          wx.showToast({
            title: '至少保留一行',
            icon: 'none'
          });
          return 
        }
        else{
        for(let i =0;i<this.data.formatData.col;i++){
          this.data.formatData.table[i].splice(myRow,1)
        }
       
       
        this.setData({
          formatData:{
            ...this.data.formatData,
            table:this.data.formatData.table,
            row:this.data.formatData.row-1
          }
         
        })
      
      const tempCol=this.data.formatData.col
      const tempRow=this.data.formatData.row
      const tempWidthArray=this.data.formatData.widthArray
      for(let i =0;i< tempCol;i++){
        let tempMaxLength=0
        for(let j=0;j<tempRow;j++){
          if(tempMaxLength<this.data.formatData.table[i][j].length){
            tempMaxLength=this.data.formatData.table[i][j].length
          }
          tempWidthArray[i]=this.LengthOfCol(tempMaxLength)
        }
      
      }
      this.setData({
        formatData:{
          ...this.data.formatData,
          widthArray:tempWidthArray
        }
         
         
        })
      }
      },


  }
})