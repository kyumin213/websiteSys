<template>
  <div class="navCon">
    <div class="navHead">
      <div class="line"></div>
      <!--<div class="navImg">-->
        <!--<div class="imgBox">-->
          <img src="../../assets/image/logo.png" class="img-log"/>
        <!--</div>-->
      <!--</div>-->
      <div class="navs">
        <el-menu :default-active="onRoutes" background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b" class="el-menu-demo navBox" mode="horizontal" @select="handleSelect"
                 unique-opened router>
          <!--<el-menu-item index="loginHome"><i class="el-icon-house"></i>首页</el-menu-item>-->
          <el-menu-item index="proManage"><i class="el-icon-notebook-1"></i>产品管理</el-menu-item>
          <el-menu-item index="countryManage"><i class="el-icon-price-tag"></i>国家管理</el-menu-item>
          <el-menu-item index="classification"><i class="el-icon-collection-tag"></i>分类管理</el-menu-item>
          <el-menu-item index="2" class='userInfoBox'><i class="el-icon-s-custom"></i>kyumin</el-menu-item>
          <!--<el-submenu index="5" class="userInfoBox">
            <template slot="title"><i class="el-icon-s-custom"></i>kyumin</template>
            <el-menu-item index="userInfo">基本信息</el-menu-item>
            <el-menu-item index="updatePwd">修改密码</el-menu-item>
            <el-menu-item index="securitySet">安全设置</el-menu-item>
          </el-submenu>-->
          <el-menu-item index="7" class="loginOut" @click="loginOut"><i class="el-icon-setting"></i>退出
          </el-menu-item>
        </el-menu>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    loginOut () {
      this.$router.push('/login')
      sessionStorage.clear()
    }
  }
}
</script>

<style scoped>
.navs {
	width: 80%;
	margin: 0 auto;
}

.navHead {
	width: 80%;
	background-color: #545c64;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0 auto;
	height: 60px;
}
.img-log {
	height: 40px;
	cursor: pointer;
}
  .imgBox {
    width: 225px;
    display: inline-block;
  }

  .navBox {
    position: relative;
    right:0;
    height: 60px;
  }
.loginIn{
  position: absolute;
  right: 100px;
}
.userInfoBox {
	position: absolute;
	right: 100px;
}
.loginOut {
	position: absolute;
	right: 0;
}
</style>
