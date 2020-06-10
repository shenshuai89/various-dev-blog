<template>
  <div class="new">
    <van-field v-model="title" label="博客标题" />
    <van-field v-model="content" label="博客内容" />
    <van-button type="info" @click="create">新建博客</van-button>
  </div>
</template>

<script>
import blogService from "@/service/blogHttp";
import { Toast } from "vant";
export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    async create() {
      let res = await blogService.create({
        title: this.title,
        content: this.content
      });
      if (res.errno == 0) {
        Toast({
          message: "新建成功",
          onClose: () => this.$router.push({ path: "/admin" })
        });
      } else {
        Toast.fail("创建失败");
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>