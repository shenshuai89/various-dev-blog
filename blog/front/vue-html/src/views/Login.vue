<template>
  <div class="login">
    <van-cell-group>
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
      <van-field v-model="password" type="password" label="密码" />
    </van-cell-group>
    <van-button type="info" @click="login">点击登录</van-button>
  </div>
</template>

<script>
import userService from "@/service/userHttp";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: null
    };
  },
  components: {},
  mounted() {
    // this.login();
  },
  methods: {
    async login() {
      let res = await userService.login({
        username: this.username,
        password: this.password
      });
      if (res.errno == 0) {
        Toast.success("登录成功");
        this.setCookie("username",this.username, 24)
        this.$router.push("/admin")
      } else {
        Toast.fail(res.message);
      }
    },
    setCookie(name, value, hours) {
      var str = name + "=" + escape(value);
      if (hours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + hours * 3600 * 1000);
        str += "; expires=" + date.toGMTString(); // toGMTstring将时间转换成字符串
      }
      //写入Cookie
      document.cookie = str;
    }
  }
};
</script>

<style scoped lang="scss">
</style>