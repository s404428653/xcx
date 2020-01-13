// components/selecTime/selecTime.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    multiIndex: [0, 0, 0, 0, 0, 0], // 选中后的索引
    index: 0,
    multiArray: [], //  所有的日期在里面 
    year: "",   //  选中后的  年月日
    month: "",
    day: "",
    startHour: "",  // 时间段
    endHour: "",    // 剩余时间段
    orderData: "选择预约时间",   //  选择泽好的
    showdays : 3,        // 显示几天
    limitstarthour : 7,  // 起始时间
    limitendhour : 19,   // 结束时间
    starttime:"",
    endtime:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // timeResult(e) {
    //   console.log(e)
      // var eventDetail = {index:this.data.index }
      // this.triggerEvent('minusEvent', eventDetail, {}) // 触发minusEvent事件
    // },


    onLoad: function (options) {
      if(options.showdays){
        this.data.showdays = options.showdays
      }
      if (options.limitstarthour) {
        this.data.limitstarthour = options.limitstarthour
      }
      if (options.limitendhour) {
        this.data.limitendhour = options.limitendhour
      }
      var date = new Date();
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var surplusYear = this.surplusYear();
      var surplusMonth = this.surplusMonth(year);
      var surplusDay = this.surplusDay(year, month, day);
      var surplusHour = this.surplusHour(year, month, day, hour)
      this.setData({
        multiArray: [
          surplusYear,
          surplusMonth,
          surplusDay,
          surplusHour[0],
          ['~'],
          surplusHour[1]
        ],
        year: year,
        month: month,
        day: day,
        startHour: surplusHour[0][0],
        endHour: surplusHour[1][0],
      })
      
    },


    surplusYear: function () { 
      var yearDatas = [];
      var dd = new Date();
      if (dd.getHours() >= this.data.limitendhour){
        dd.setDate(dd.getDate() + 1);
      }
      var startyear = dd.getFullYear();
      dd.setDate(dd.getDate() + this.data.showdays);
      var endyear = dd.getFullYear();
      if (startyear == endyear){
        yearDatas.push(startyear+"年");
      }else{
        yearDatas.push(startyear + "年");
        yearDatas.push(endyear + "年");
      }
      return yearDatas;
    },
    //月份计算
    surplusMonth: function (year) {
      var monthDatas = [];
      var dd = new Date();
      if (dd.getHours() >= this.data.limitendhour) {
        dd.setDate(dd.getDate() + 1);
      }
      var startmon = dd.getMonth() + 1;
      dd.setDate(dd.getDate() + this.data.showdays);
      var endmon = dd.getMonth() + 1;
      console.log("月份：",startmon, endmon)
      if (startmon == endmon){
        if (startmon < 10){
          monthDatas.push('0'+startmon + "月") 
        }else{
          monthDatas.push(startmon + "月") 
        }
        
      }else{
        if (startmon < 10) {
          monthDatas.push('0' + startmon + "月")
        } else {
          monthDatas.push(startmon + "月")
        }
        if (endmon < 10) {
          monthDatas.push('0' + endmon + "月")
        } else {
          monthDatas.push(endmon + "月")
        }
      }
     
      return monthDatas;

    },

    //天数计算
    surplusDay: function (year, month, day) {
      var dayDatas = [];
      var dd = new Date();
      var tmpdays = 0;
      if (dd.getHours() >= this.data.limitendhour) {
        tmpdays = 1;
      }
      for (var i = 0; i < (this.data.showdays + tmpdays); i++) {
        var tmpdate = new Date();
        tmpdate.setDate(tmpdate.getDate() + i + tmpdays);
        if (tmpdate.getFullYear() == year && tmpdate.getMonth() + 1 == month) {
          if (tmpdate.getDate() < 10){
            dayDatas.push('0'+tmpdate.getDate() + "日");
          }else{
            dayDatas.push(tmpdate.getDate() + "日");
          }
        }
      }
      return dayDatas;            //  剩余天数
    },

    //时间计算

    surplusHour: function (year, month, day, hour) {

      var date = new Date();

      var curyear = date.getFullYear()

      var curmonth = date.getMonth() + 1

      var curday = date.getDate();

      var curhour = date.getHours();

      var hourStart = [];
      var hourEnd = [];
      
      var tmpstarhour = this.data.limitstarthour;
      
      if (curyear == year && curmonth == month && curday == day) {
        if (tmpstarhour < curhour){
          tmpstarhour = curhour;
        }
      }
      if (tmpstarhour < hour) {
        tmpstarhour = parseInt(hour);
      }

      var hour_dif = this.data.limitendhour - tmpstarhour;

      for (var i = 0; i <= hour_dif; i++){
        var tmpstarhour = tmpstarhour + i;
        var tmpz = '';
        if (i < hour_dif){
          if (tmpstarhour < 10){
            tmpz = '0';
          }
          hourStart[i] = tmpz + tmpstarhour + "时";
        }
        if(i > 0){
          if (tmpstarhour < 10) {
            tmpz = '0';
          }
          hourEnd[i - 1] = tmpz + tmpstarhour + "时";
        }
      }
      
      var hours = [
        hourStart,
        hourEnd
      ];
      console.log("时间：", hourStart, hourEnd);
      return hours;
    },

    /**
    
    * 生命周期函数--监听页面加载
    
    */

    
 
    //某一列的值改变时触发

    bindMultiPickerColumnChange: function (e) {

      var date = new Date();

      var year1 = date.getFullYear()

      var month1 = date.getMonth() + 1

      var day1 = date.getDate()

      var hour1 = date.getHours()

      console.log("当前年份" + this.data.month + '修改的列为', e.detail.column, '，值为', e.detail.value);

      var data = {

        multiArray: this.data.multiArray,

        multiIndex: this.data.multiIndex,

        year: this.data.year,

        month: this.data.month,

        day: this.data.day,

        startHour: this.data.startHour,

        endHour: this.data.startHour,

      };

      data.multiIndex[e.detail.column] = e.detail.value;

      switch (e.detail.column) {

        case 0:

          var yearStr = data.multiArray[e.detail.column][e.detail.value];

          var year = yearStr.substring(0, yearStr.length - 1)

          data.year = parseInt(year);

          var surplusMonth = this.surplusMonth(year);

          data.multiArray[1] = surplusMonth;

          if (data.year == year1) {

            data.month = month1;

          } else {

            data.month = 1;

          }

          if (data.year == year1 && month1 == data.month) {

            data.day = day1;

          } else {

            data.day = 1;

          }

          var surplusDay = this.surplusDay(data.year, data.month, data.day);

          data.multiArray[2] = surplusDay;

          var surplusHour;

          if (data.year == year1 && month1 == data.month && data.day == day1) {

            surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)

          } else {

            surplusHour = this.surplusHour(data.year, data.month, data.day, 1)

          }


          data.multiArray[3] = surplusHour[0];

          data.multiArray[5] = surplusHour[1];

          data.startHour = surplusHour[0];

          data.endHour = surplusHour[1];


          data.multiIndex[1] = 0;

          data.multiIndex[2] = 0;

          data.multiIndex[3] = 0;

          data.multiIndex[5] = 0;

          break;

        case 1:

          console.log('选择月份' + data.multiArray[e.detail.column][e.detail.value]);



          var monthStr = data.multiArray[e.detail.column][e.detail.value];

          var month = monthStr.substring(0, monthStr.length - 1);

          data.month = month;

          data.day = 1;

          if (data.year == year1 && month1 == data.month) {

            data.day = day1;

          } else {

            data.day = 1;

          }



          var surplusDay = this.surplusDay(data.year, data.month, data.day);

          data.multiArray[2] = surplusDay;



          var surplusHour;

          if (data.year == year1 && month1 == data.month && data.day == day1) {

            surplusHour = this.surplusHour(data.year, data.month, data.day, hour1)

          } else {

            surplusHour = this.surplusHour(data.year, data.month, data.day, 1)

          }



          data.multiArray[3] = surplusHour[0];

          data.multiArray[5] = surplusHour[1];

          data.startHour = surplusHour[0];

          data.endHour = surplusHour[1];

          data.multiIndex[2] = 0;

          data.multiIndex[3] = 0;

          data.multiIndex[5] = 0;

          break;

        case 2:

          console.log('选择日' + data.multiArray[e.detail.column][e.detail.value]);

          var dayStr = data.multiArray[e.detail.column][e.detail.value];

          var day = dayStr.substring(0, dayStr.length - 1);

          data.day = day;

          var surplusHour = this.surplusHour(data.year, data.month, data.day,0);

          data.multiArray[3] = surplusHour[0];

          data.multiArray[5] = surplusHour[1];

          data.startHour = surplusHour[0];

          data.endHour = surplusHour[1];

          data.multiIndex[3] = 0;

          data.multiIndex[5] = 0;

          break;

        case 3:

          var hourStr = data.multiArray[e.detail.column][e.detail.value];

          var hour = hourStr.substring(0, hourStr.length - 1);

          data.startHour = hour;
          var endhours2 = [];
          var surplusHour = this.surplusHour(data.year, data.month, data.day, hour);
          endhours2 = surplusHour[1];
          data.multiArray[5] = endhours2;
          data.multiIndex[5] = 0;
          break;

        case 5:
          var hourStr = data.multiArray[e.detail.column][e.detail.value];
          var hour = hourStr.substring(0, hourStr.length - 1);
          data.endHour = hour;
          break;

      }

      this.setData(data)



    },

    //value 改变时触发 change 事件
                                    //  拼接  时间段   year + m + data + + ... 2019年12月3日04时~12时
    bindMultiPickerChange: function (e) {
      
      var checkyear = this.data.multiArray[0][this.data.multiIndex[0]].replace('年','');
      var checkmonth = this.data.multiArray[1][this.data.multiIndex[1]].replace('月', '');
      var checkday = this.data.multiArray[2][this.data.multiIndex[2]].replace('日', '');
      var checkshour = this.data.multiArray[3][this.data.multiIndex[3]].replace('时', '');
      var checkehour = this.data.multiArray[5][this.data.multiIndex[5]].replace('时', '');
      var dateStr =
                    this.data.multiArray[0][this.data.multiIndex[0]] +
                    this.data.multiArray[1][this.data.multiIndex[1]] +
                    this.data.multiArray[2][this.data.multiIndex[2]] +
                    this.data.multiArray[3][this.data.multiIndex[3]] +
                    this.data.multiArray[4][this.data.multiIndex[4]] +
                    this.data.multiArray[5][this.data.multiIndex[5]];

      // console.log('picker发送选择改变，携带值为', dateStr)
     
      var starttime = checkyear + '-' + checkmonth + '-' + checkday + ' ' + checkshour + ':00:00';
      var endtime = checkyear + '-' + checkmonth + '-' + checkday + ' ' + checkehour + ':00:00';

      console.log(starttime, endtime)

      this.setData({

        orderData: dateStr,                                //   2019年12月3日04时~12时
        starttime: starttime,
        endtime: endtime
      })

      let yy = this.data.year
      let mm = this.data.month
      let dd = this.data.day
      let sts = this.data.startHour.toString() //09时
      let ets = this.data.endHour.toString()
      let st = sts.replace('时',"")
      let et = ets.replace('时','')
      let time = yy +'-' +mm+'-' + dd + ' '+ st + '~' + et
      // this.setData({
      //   VisitStartTime:time,
      //   'formChose.startTime' : false
      // })

    }
  }
})