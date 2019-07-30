<template>
  <el-container>
    <el-header>
      <navMent></navMent>
    </el-header>
    <el-main>
      <div :class="{'content-collapse':collapse}">
        <div class="main">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </el-main>
    <el-footer><div class="txtCenter">2019 © 版权所有</div></el-footer>
  </el-container>
</template>
<script>
import navMent from './navMenu.vue'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    navMent
  },
}
</script>

<style scoped>
	.main{
		min-width: 1400px;
	}
 .lh60{
 	line-height: 60px;
 }
  .wrapper {
    padding: 0;
    overflow: auto;
  }

  .el-container {
    height: 100%;
  }

  .content-box {
    left: 0;
    background-color: #fff;
  }

  .el-header{
    background-color: #545c64;
    color: #333;
    text-align: center;
    padding: 0;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #f2edf3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
    height: 100%;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
