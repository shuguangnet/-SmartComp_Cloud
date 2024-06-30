<template>
 <div id="navigation">
    <div class="header">

    </div>
    <div class="contain">
        <ul style="align-items: end;
    display: flex;
    justify-content: center;">

            <li>
                <a href="/screen.html" target="_blank">
                    <img src="../../../public/images/chanye.png" alt="" style="margin-top: -40px;">
                    <span>数据可视化</span>
                </a>
            </li>
        </ul>
    </div>

</div>
</template>
<style>
#console{
  height: 100vh
}
</style>
<!-- <script>
export default {
  mounted() {
    window.location.href = "http://127.0.0.1:8080/screen.html";
  }
};
</script> -->
<style scoped>

#navigation{
    margin: 0;
    padding: 0;
    background: url('../../../public/images/bgg.png');
    background-repeat: no-repeat;
    background-attachment:fixed;
    filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
    -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='images/background.jpg', sizingMethod='scale');
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
}
li{
    list-style: none;
}
.header{
    width: 700px;
    margin: 0 auto;
}
.header p.p1{
    width: 60px;
    height: 60px;
    margin: 0 auto;
    margin-top: 110px;
}
.header p.p2{
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    margin-top: 10px;
    font-size: 20px;
    color: #fec468;
}
.header p.p3{
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    font-size: 28px;
    color: #bddde6;
}
.contain{
    width: 1210px;
    margin: 0 auto;
    margin-top: 80px;
    height: 400px;
}
.contain ul li img{
    display: inline-block;
    margin-left: -45px;
}
.contain ul li span{
    display: inline-block;
    vertical-align:16px;
    font-size: 30px;
    color: #57daff;
    margin-left: 20px;
}
.contain ul{
    width: 100%;
    height: 100%;
}
.contain ul li{
    width: 600px;
    height: 200px;
    line-height: 210px;
    float: left;
    background-image: url('../../../public/images/kuang.png');
    background-position: center center;
    background-repeat: no-repeat;
    margin-bottom: 50px;
    background-color:transparent;
}
.contain ul li:hover{
    background: url('../../../public/images/chooseKuang.png') center center no-repeat;

}
.contain ul li a{
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
}
.footer{
    width: 400px;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-200px);
    text-align: center;
    color: #6d95aa;
}
.footer span{
    vertical-align:top;
}



</style>
<!-- <template>
	<div class="body">
    <div class="head">
        <h1>竞赛管理大数据可视化平台</h1>
        <div class="weather"><span id="showTime">{{currentTime}}</span></div>
    </div>
    <div class="mainbox">
        <ul class="clearfix">
            <li>
                <div class="boxall" style="height: 4rem">
                    <div class="alltitle">系统状态</div>
                    <div class="sycm">
                        <ul class="clearfix" style="display: flex;flex-direction: row;justify-content: center;">
                            <li>
                                <h2 class="load-connect" style="color: green;">已连接</h2>
                                <span>在线状态(Online)</span></li>
                            <li>
                                <h2 class="load-delay">16(MS)</h2>
                                <span>网络延迟(Network)</span></li>
                        </ul>
                    </div>
                    <div class="sycm">
                        <div class="tit02"><span>实时数据</span></div>
                        <ul class="clearfix" style="display: flex;flex-direction: row;justify-content: center;">
                            <li>
                                <h2 id="today_amount">{{ totalrecord }}</h2><span>待审批 </span></li>

                            <li>
                                <h2 id="today2_amount">{{totalsuccess}}</h2><span> 待录入</span></li>
                        </ul>
                        <ul class="clearfix" style="display: flex;flex-direction: row;justify-content: center;padding-top: 0.12rem;">
                            <li>
                                <h2 id="yes_amount">{{totalday}}</h2><span>7日内获奖总数 </span></li>
                            <li>
                                <h2 id="yes2_amount">{{totaldays}}</h2><span> 7日内比赛总数</span></li>
                        </ul>
                    </div>
                    <!-- <div class="boxfoot"></div> -->
                </div>
                <div class="boxall" style="height: 4rem">
                    <div class="alltitle">系统状态</div>

                    <div class="sycm">
                        <ul class="clearfix" style="display: flex;flex-direction: row;justify-content: center;">
                            <li>
                                <h2 id="today_total_money">{{totalmatch}}</h2><span>比赛总数</span></li>
                            <li>
                                <h2 id="yesday_total_money">{{totalinfo}}</h2><span>文件总数</span></li>
                        </ul>
                    </div>
                    <div class="sycm">
                        <div class="tit02"><span>平台数据</span></div>
                        <ul class="clearfix">
                            <li>
                                <h2 id="today_total_alipay">{{totaluser}}</h2><span> 系统用户总量</span></li>
                            <li>
                                <h2 id="today_total_weixin">{{totalteacher}}</h2><span> 系统教师总量</span></li>
                            <li>
                                <h2>{{totalstudent}}</h2><span> 系统学生总数</span></li>
                        </ul>
                        <ul class="clearfix">
                            <li>
                                <h2>{{firstlevel}}</h2><span>一等奖人数 </span></li>
                            <li>
                                <h2>{{secondlevel}}</h2><span> 二等奖人数</span></li>
                            <li>
                                <h2>{{thirdlevel}}</h2><span> 三等奖人数</span></li>
                        </ul>
                    </div>

                </div>
            </li>
            <li>
                <div class="bar">
                    <div class="barbox ">
                        <ul class="clearfix">
                            <li class="pulll_left counter" id="total_order">
															<animate-number
																from="0"
																:to="totalreg"
																:key="totalreg"
                                 class="counter"
															></animate-number>
                            </li>

                            <li class="pulll_left counter" id="total_money">
															<animate-number
																from="0"
																:to="level"
																:key="level"
																class="counter"
															></animate-number>
															</li>
                        </ul>
                    </div>
                    <div class="barbox2">
                        <ul class="clearfix">
                            <li class="pulll_left">参赛总数</li>
                            <li class="pulll_left">获奖用户总数</li>
                        </ul>
                    </div>
                </div>
                <div class="map">
                    <div class="map1"><img src="https://screen.epay.quest/images/lbx.png"></div>
                    <div class="map2"><img src="https://screen.epay.quest/images/jt.png"></div>
                    <div class="map3"><img src="https://screen.epay.quest/images/map.png"></div>
                    <div class="map4" id="map_1"></div>
                </div>
            </li>
            <li>
							<div class="boxall" style="height: 8.0rem">
    <div class="alltitle">获奖监控</div>
    <div class="addnew">
      <div class="tit02"><span>最新赛事</span></div>
      <div class="adduser" style="height: auto; color: aliceblue;">

          <li v-for="item in orders" :key="item.registrationId">
            <p style="color: aliceblue;">
              <b :style="{
                color: item.awardLevel === '一等奖' ? '#7c7cff' : (item.awardLevel === '二等奖' ? 'green' : (item.awardLevel === '三等奖' ? 'orange' : '#399BF3'))
              }">
                {{ item.competitionName }}
              </b>
              - {{ item.studentName }} - {{ item.awardLevel ? item.awardLevel : "暂未获奖" }} -
              <b v-html="getLabel(item.competitionType)"></b> - {{ formatDateTime(item.registrationTime) }}
            </p>
          </li>

      </div>
    </div>
    <div class="boxfoot"></div>
  </div>
            </li>
        </ul>
    </div>
	</div>
</template>
<script>
export default{
	name:'console',
	data(){
		return{
		// 获奖用户总数
		 totalreg:'',
		//  用户总数
		 totaluser:'',
		//  教师总量
		totalteacher:'',
		// 学生总数
		totalstudent:'',
		// 一等奖人数
		firstlevel:'',
		// 二等奖
		secondlevel:'',
		// 三等奖
		thirdlevel:'',
		// 所有资料
		totalinfo:'',
		// 比赛数量
		totalmatch:'',
		// 成功报名
		totalsuccess:'',
		// 待审核数量
		totalday:'',
		interval1: null,
    interval2: null,
		totaldays:'',
		totalrecord:[],
		 currentTime:'',
		 timer:'',
		 orders:[],
		}

	},
	mounted() {
		// 获取参赛总数
		this.users()
    // 在组件挂载后开始定时更新时间
    this.initAnimation();
  },computed:{
	level(){
return this.firstlevel+this.secondlevel+this.thirdlevel
}
	},
	methods:{
	async	users(){
		// 获取用户总数
	 await this.$api.getCount().then(res=>{
		if(res.code==200){
			this.totaluser=res.data
		}
	})
	// 获取参赛总人数
	await this.$api.getCounts().then(res=>{
				if(res.code==200){
				this.totalreg=res.data
			 }
			})
		// 获取教师总人数
		await   this.$api.getTeacherCount().then(res=>{
				if(res.code==200){
				this.totalteacher=res.data
			 }
			})
	// 获取学生总人数
	await   this.$api.getStudentCount().then(res=>{
				if(res.code==200){
				this.totalstudent=res.data
			 }
			})
	// 一等奖人数
	await   this.$api.getWinCountByLevel({level:'一等奖'}).then(res=>{
		if(res.code==200){
			this.firstlevel=res.data
		}
	})
	// 二等奖人数
	await   this.$api.getWinCountByLevel({level:'二等奖'}).then(res=>{
		if(res.code==200){
			this.secondlevel=res.data
		}
	})
	// 三等奖
	await   this.$api.getWinCountByLevel({level:'三等奖'}).then(res=>{
		if(res.code==200){
			this.thirdlevel=res.data
		}
	})
	// 获取所有资料
	await   this.$api.Allinformation().then(res=>{
		if(res.code==200){
			this.totalinfo=res.data.length
		}
	})
	// 获取所有比赛数量
	await   this.$api.AllCompetition().then(res=>{
		if(res.code==200){
			this.totalmatch=res.data.length
		}
	})
		// 获取所有待审核数量
		await	this.$api.RegistrationAll().then(res=>{
		if(res.code==200){
			this.totalrecord=res.data.filter(
				 item=>item.registrationStatus=="等待学校审核"
			).length
		}
	})
	// 获取所有待审核数量
	await	this.$api.RegistrationAll().then(res=>{
		if(res.code==200){
			this.totalsuccess=res.data.filter(
				 item=>item.registrationStatus=="成功报名"
			).length
		}
	})

// 获取当前日期和时间
const currentDate = new Date();
// 计算七天前的日期
const sevenDaysAgo = new Date(currentDate);
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// 获取七天内成功报名的数量
await this.$api.RegistrationAll().then(res => {
    if (res.code == 200) {
        this.totalday = res.data.filter(item => {
            // 解析报名时间字符串为日期对象
            const registrationTime = new Date(item.registrationTime);
            // 检查报名时间是否在七天内
            return registrationTime >= sevenDaysAgo && registrationTime <= currentDate;
        }).length;
    }
});
// 获取七天内比赛的数量
await this.$api.AllCompetition().then(res => {
    if (res.code == 200) {
        this.totaldays = res.data.filter(item => {
            // 解析报名时间字符串为日期对象
            const registrationEndTime = new Date(item.registrationEndTime);
            // 检查报名时间是否在七天内
            return registrationEndTime >= sevenDaysAgo && registrationEndTime <= currentDate;
        }).length;
    }
});
		// 获取所有待审核数量
		await	this.$api.RegistrationAll().then(res=>{
		if(res.code==200){
			this.totalsuccess=res.data.filter(
				 item=>item.registrationStatus=="成功报名"
			).length
		}
	})
		}, initAnimation() {
      const wrapUl = document.querySelector(".addnew ul");
      const adduserUl = document.querySelector(".adduser ul");
      const html1 = wrapUl.innerHTML;
      const html2 = adduserUl.innerHTML;
      wrapUl.innerHTML += html1;
      adduserUl.innerHTML += html2;

      const ls1 = wrapUl.querySelectorAll("li").length / 2 + 1;
      const ls2 = adduserUl.querySelectorAll("li").length / 2 + 1;

      let i = 0;
      this.interval1 = setInterval(() => {
        i++;
        if (i === ls1) {
          i = 1;
          wrapUl.style.marginTop = "0";
        }
        wrapUl.style.marginTop = -0.52 * i + "rem";
      }, 2400);

      let a = 0;
      this.interval2 = setInterval(() => {
        a++;
        if (a === ls2) {
          a = 1;
          adduserUl.style.marginTop = "0";
        }
        adduserUl.style.marginTop = -0.4 * a + "rem";
      }, 4300);
    },
// 更新时间的方法
// 格式化日期时间的方法
formatDateTime(dateTime) {
      const dateObj = new Date(dateTime);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const seconds = String(dateObj.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
		// 获取参赛人员信息
		async getorder(){
			// 获取所有信息
			await	this.$api.RegistrationAll().then(res=>{
			if(res.code==200){
			this.orders=res.data.slice(0,15)
		}
	})

		},
		// 获取支付类型的标签
    getLabel(type) {
      if (type =='国家级') {
        return '<b style="color: #7c7cff;">国家级</b>';
      } else if (type =='省级') {
        return '<b style="color: green;">省级</b>';
      } else if (type =='市级') {
        return '<b style="color: #399BF3;">市级</b>';
      } else {
        return '<b style="color: white;">校级</b>';
      }
    }
  },created() {
    // 在组件创建时启动定时器
    this.getOrderInterval = setInterval(function(){
			this.getorder();
			this.users();
		}, 5000);
    // 首次加载数据
		this.users();
    this.getorder();

  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，防止内存泄漏
    clearInterval(this.getOrderInterval);
  },

}
</script>
<style scoped>
/*大屏*/
@charset "utf-8";

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
html {
	font-size: 326px;
}

@font-face {
	font-family: electronicFont;
	src: url(https://screen.epay.quest/css/DS-DIGIT.TTF)
}

*,
.body {
	padding: 0px;
	margin: 0px;

	font-family: "微软雅黑";
}

.body {
	background: #000d4a url(https://screen.epay.quest/images/bg.jpg) center top;
	background-size: cover;
	color: #666;
	padding-bottom: 30px;
	font-size: .1rem;
}

li {
	list-style-type: none;
}

table {}

i {
	margin: 0px;
	padding: 0px;
	text-indent: 0px;
}

img {
	border: none;
	max-width: 100%;
}

a {
	text-decoration: none;
	color: #399bff;
}

a.active,
a:focus {
	outline: none !important;
	text-decoration: none;
}

ol,
ul,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
	padding: 0;
	margin: 0
}

a:hover {
	color: #06c;
	text-decoration: none !important
}

/* 加载旋转动画 */
#load {
	width: 100%;
	height: 100%;
	position: absolute;
	background: url(https://screen.epay.quest/images/data08.png) no-repeat #061537;
	background-size: cover;
	top: 0;
	left: 0;
	z-index: 999
}

#load .load_img {
	position: absolute;
	left: calc(50% - 182px);
	top: calc(50% - 182px);
}

.load_img img {
	position: absolute;
	left: 0;
	top: 0;
}

.load_img .jzxz1 {
	animation: xz1 8s infinite linear;
}

@keyframes xz1 {
	from {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(180deg);
	}

	to {
		transform: rotate(360deg);
	}
}

.load_img .jzxz2 {
	animation: xz2 7s infinite linear;
}

@keyframes xz2 {
	from {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(-180deg);
	}

	to {
		transform: rotate(-360deg);
	}
}

.clearfix:after,
.clearfix:before {
	display: table;
	content: " "
}

.clearfix:after {
	clear: both
}




.pulll_left {
	float: left;
}

.pulll_right {
	float: right;
}

/*谷哥滚动条样式*/

::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	position: absolute
}

::-webkit-scrollbar-thumb {
	background-color: #5bc0de
}

::-webkit-scrollbar-track {
	background-color: #ddd
}

/***/

.loading {
	position: fixed;
	left: 0;
	top: 0;
	font-size: .3rem;
	z-index: 100000000;
	width: 100%;
	height: 100%;
	background: #1a1a1c;
	text-align: center;
}

.loadbox {
	position: absolute;
	width: 160px;
	height: 150px;
	color: #324e93;
	left: 50%;
	top: 50%;
	margin-top: -100px;
	margin-left: -75px;
}

.loadbox img {
	margin: 10px auto;
	display: block;
	width: 40px;
}

.copyright {
	background: rgba(19, 31, 64, .32);
	border: 1px solid rgba(255, 255, 255, .05);
	line-height: .5rem;
	text-align: center;
	padding-right: 15px;
	bottom: 0;
	color: rgba(255, 255, 255, .7);
	font-size: .16rem;
}

.head {
	height: 1.05rem;
	background: url(https://screen.epay.quest/images/head_bg.png) no-repeat center center;
	background-size: 100% 100%;
	position: relative
}

.head h1 {
	color: #fff;
	text-align: center;
	font-size: .42rem;
	line-height: .75rem;
}

.head h1 img {
	width: 1.5rem;
	display: inline-block;
	vertical-align: middle;
	margin-right: .2rem
}

.weather {
	position: absolute;
	right: .3rem;
	top: 0;
	line-height: .75rem;
}

.weather img {
	width: .37rem;
	display: inline-block;
	vertical-align: middle;
}

.weather span {
	color: rgba(255, 255, 255, .7);
	font-size: .18rem;
	padding-right: .1rem;
}

.mainbox {
	padding: 0rem .4rem 0rem .4rem;
}

.mainbox>ul {
	margin-left: -.4rem;
	margin-right: -.4rem;
}

.mainbox>ul>li {
	float: left;
	padding: 0 .4rem
}

.mainbox>ul>li {
	width: 30%
}

.mainbox>ul>li:nth-child(2) {
	width: 40%
}

.boxall {
	border: 1px solid rgba(25, 186, 139, .17);
	padding: 0 .3rem .3rem .3rem;
	background: rgba(255, 255, 255, .04) url(https://screen.epay.quest/images/line.png);
	background-size: 100% auto;
	position: relative;
	margin-bottom: .1rem;
	z-index: 20;
}

.boxall:before,
.boxall:after {
	position: absolute;
	width: .1rem;
	height: .1rem;
	content: "";
	border-top: 2px solid #02a6b5;
	top: 0;
}

.boxall:before,
.boxfoot:before {
	border-left: 2px solid #02a6b5;
	left: 0;
}

.boxall:after,
.boxfoot:after {
	border-right: 2px solid #02a6b5;
	right: 0;
}

.alltitle {
	font-size: .24rem;
	color: #fff;
	text-align: center;
	line-height: .6rem;
	border-bottom: 1px solid rgba(255, 255, 255, .2)
}

.boxfoot {
	position: absolute;
	bottom: 0;
	width: 100%;
	left: 0;
}

.boxfoot:before,
.boxfoot:after {
	position: absolute;
	width: .1rem;
	height: .1rem;
	content: "";
	border-bottom: 2px solid #02a6b5;
	bottom: 0;
}

.bar {
	background: rgba(101, 132, 226, .1);
	padding: .15rem;
}

.barbox li,
.barbox2 li {
	width: 50%;
	text-align: center;
	position: relative;
}

.barbox:before,
.barbox:after {
	position: absolute;
	width: .3rem;
	height: .1rem;
	content: "";
}

.barbox:before {
	border-left: 2px solid #02a6b5;
	left: 0;
	border-top: 2px solid #02a6b5;
}

.barbox:after {
	border-right: 2px solid #02a6b5;
	right: 0;
	bottom: 0;
	border-bottom: 2px solid #02a6b5;
}

.barbox li:first-child:before {
	position: absolute;
	content: "";
	height: 50%;
	width: 1px;
	background: rgba(255, 255, 255, .2);
	right: 0;
	top: 25%;
}

.barbox {
	border: 1px solid rgba(25, 186, 139, .17);
	position: relative;
}

.barbox li {
	font-size: .3rem;
	color: #ffeb7b;
	padding: .05rem 0;
	font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
	font-weight: bold;
}

.barbox2 li {
	font-size: .19rem;
	color: #637c9f;
	padding-top: .1rem;
}

.map {
	position: relative;
	height: 4.3rem;
	z-index: 9;
}

.map4 {
	width: 100%;
	height: 4.3rem;
	position: relative;
	left: -50%;
	top: 2%;
	margin-top: .2rem;
	z-index: 5;
}

.map1,
.map2,
.map3 {
	position: absolute;
}

.map1 {
	width: 3.93rem;
	z-index: 2;
	top: .1rem;
	left: 1.7rem;
	animation: myfirst2 15s infinite linear;
}

.map2 {
	width: 3.66rem;
	top: .15rem;
	left: 1.87rem;
	z-index: 3;
	opacity: 0.2;
	animation: myfirst 10s infinite linear;
}

.map3 {
	width: 3.18rem;
	top: .4rem;
	left: 2.13rem;
	z-index: 1;
}

#echarts1,
#echarts2,
#echarts3,
#echarts6,
#echarts7,
#echarts8 {
	position: relative;
}

#echarts1:before,
#echarts2:before,
#echarts3:before,
#echarts6:before,
#echarts7:before,
#echarts8:before {
	position: absolute;
	content: "23124";
	width: 100%;
	text-align: center;
	bottom: .15rem;
	color: #fff;
	opacity: .7;
	font-size: .18rem;
}

#echarts1:before {
	content: "平均单客价"
}

#echarts2:before {
	content: "男消费"
}

#echarts3:before {
	content: "女消费"
}

#echarts6:before {
	content: "新增会员"
}

#echarts7:before {
	content: "新增领卡会员"
}

#echarts8:before {
	content: "新增消费会员"
}

.adduser li {
            /*line-height:.42rem;*/
            font-size: .18rem;
            margin-bottom: .08rem;
        }

        .adduser li p {
            border: 1px solid rgba(25, 186, 139, .17);
            color: rgba(255, 255, 255, .6);
        }

        .grid {
            margin-top: 5%;
            width: 80%;
            height: 10px;
            display: grid;
            grid-template-columns: repeat(20, 1fr);
            grid-column-gap: 14px;
        }

        .line {
            position: relative;
            width: 90%;
            height: 7px;
        }

        .line::before,
        .line::after {
            content: '';
            position: absolute;
            width: 4.5rem;
            height: 100%;
            border-radius: 7px;
            background-color: #FF0000;
        }

        .line::before {
            animation: first-line ease-in-out 4s var(--delay) infinite alternate;
        }

        .line::after {
            bottom: 0;
            background-color: #B22222;
            width: calc(80% - 10px);
            animation: second-line ease-in-out 4s var(--delay) infinite alternate;
        }

        .line:nth-child(1) {
            --delay: calc(-0.1s);
        }

        @keyframes first-line {
            70% {
                width: calc(80% - 10px);
            }
            100% {
                background-color: #FF0000;
            }
        }

        .barbox li {
            font-size: .7rem;
            color: #ffeb7b;
            padding: 0.05rem 0;
            font-family: electronicFont, "sans-serif";
            font-weight: bold;
        }

.tabs {
	text-align: center;
	padding: .1rem 0 0 0;
}

.tabs a {
	position: relative;
	display: inline-block;
	margin-left: 1px;
	padding: .05rem .2rem;
	color: #898989;
	transition: all .3s ease-out 0s;
	font-size: 14px;
}

.tabs li {
	display: inline-block;
}

.tabs a:after {
	position: absolute;
	width: 1px;
	height: 10px;
	background-color: rgba(255, 255, 255, .1);
	content: '';
	margin-left: 0;
	right: -1px;
	margin-top: 7px;


}

.tabs li a.active {
	border: 1px solid rgba(25, 186, 139, .17);
	background: rgba(255, 255, 255, .05);
	color: #fff;
}

.tit02 {
	text-align: center;
	margin: .1rem 0;
	position: relative
}

.tit02 span {
	border: 1px solid rgba(25, 186, 139, .17);
	letter-spacing: 2px;
	padding: .01rem .2rem;
	background: rgba(255, 255, 255, .05);
	font-size: .18rem;
	color: #49bcf7;
}

.tit02:before,
.tit02:after {
	position: absolute;
	width: 26%;
	height: 1px;
	background: rgba(25, 186, 139, .2);
	content: "";
	top: .12rem;
}

.tit02:after {
	right: 0;
}

.tit02:before {
	left: 0;
}

.wrap {
	height: 2.54rem;
	overflow: hidden;
}

.wrap li {
	line-height: .42rem;
	height: .42rem;
	font-size: .18rem;
	text-indent: .24rem;
	margin-bottom: .1rem;
}

.wrap li p {
	border: 1px solid rgba(25, 186, 139, .17);
	color: rgba(255, 255, 255, .6);
}

.sy {
	float: left;
	width: 33%;
	height: 2.2rem;
	margin-top: -.25rem;
}


.adduser {
	height: 1.5rem;
	overflow: hidden;
}

.adduser li {
	height: .5rem;
	font-size: .17rem;
}

.adduser img {
	width: .40rem;
	border-radius: .5rem;
	margin-right: .1rem;
	display: inline-block;
	vertical-align: middle;
}

.adduser span {
	line-height: .5rem;
	font-size: .18rem;
	color: rgba(255, 255, 255, .6);
}

.sycm ul {
	margin-left: -.5rem;
	margin-right: -.5rem;
	padding: .08rem 0;
}

.sycm li {
	float: left;
	width: 33.33%;
	text-align: center;
	position: relative
}

.sycm li:before {
	position: absolute;
	content: "";
	height: 30%;
	width: 1px;
	background: rgba(255, 255, 255, .1);
	right: 0;
	top: 15%;
}

.sycm li:last-child:before {
	width: 0;
}

.sycm li h2 {
	font-size: .3rem;
	color: #c5ccff;
}

.sycm li span {
	font-size: .18rem;
	color: #fff;
	opacity: .5;
}

@keyframes myfirst2 {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(359deg);
	}
}

@keyframes myfirst {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(-359deg);
	}
}
</style> -->
