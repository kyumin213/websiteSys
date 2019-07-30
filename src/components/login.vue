<template>
  <div class="login_page fillcontain">
    <div class="login-container">
      <transition name="form-fade" mode="in-out">
        <section class="form_contianer">
          <div class="manage_tip">
            <h1>Buy System</h1>
          </div>
          <el-form :model="loginForm" ref="loginForm">
            <el-form-item>
              <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="submit_btn" @click="loginIn">登陆</el-button>
            </el-form-item>
          </el-form>
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginIn () {
      let role = 'l4ccy33k'
      sessionStorage.setItem('token', role)
      this.$router.push('/proManage')
    }
  }
}
</script>

<style scoped>
  .login-container{
    width: 400px;
    margin: 0 auto;
  }
  .manage_tip h1{
    font-weight: normal;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .login_page {
    background-color: #324057;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* align-content: center; */
    justify-content: center;
  }
  .form_contianer {
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
  }
  .tip {
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active,
  .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter,
  .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
