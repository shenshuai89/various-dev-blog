<template>
  <div class="login">登录界面</div>
</template>

<script>
import userService from "@/service/userHttp";
export default {
  data() {
    return {
      username: "zhangsan",
      password: 123
    };
  },
  components: {},
  mounted() {
    this.login();
  },
  methods: {
    async login() {
      let res = await userService.login({
        "username": this.username,
        "password": this.password
      });
      console.log(res);
    }
  }
};
</script>

<style scoped lang="scss">
</style>