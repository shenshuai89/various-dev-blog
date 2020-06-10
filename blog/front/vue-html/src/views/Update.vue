<template>
  <div class="update">
    <van-field v-model="blog.title" label="博客标题" />
    <van-field v-model="blog.content" label="博客内容" />
    <van-button type="info" @click="save">确定修改</van-button>
  </div>
</template>

<script>
import blogService from "@/service/blogHttp";
import { Toast } from "vant";
export default {
  data() {
    return {
      blog: {
        title: "",
        content: ""
      }
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      let detailObj = await blogService.getDetail({
        id: this.$route.query.id
      });
      if (detailObj && detailObj.errno == 0) {
        // console.log(detailObj);
        this.blog = detailObj.data;
      }
    },
    async save() {
      let updateRes = await blogService.update({
        ...this.blog
      });
      if (updateRes.errno == 0) {
        Toast({
          message: "更新成功",
          onClose:()=>this.$router.push({ path: "/admin" })
        });
      }else{
          Toast.fail("更新失败")
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>