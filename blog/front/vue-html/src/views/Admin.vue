<template>
  <div class="admin">
    <p>后台管理</p>
    <van-button type="info" size="small" @click="create">新建博客</van-button>
    <van-divider>搜索</van-divider>
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-button type="primary" size="small">搜索</van-button>
    <van-divider>博客列表</van-divider>
    <ul v-if="lists.length >0" style="padding:20px;">
      <li v-for="item in lists" :key="item.id" style="display:flex;justify-content:space-between;">
        <p>{{item.title}}</p>
        <div>
          <van-button type="primary" size="small" @click="update(item.id)">编辑</van-button>
          <van-button type="danger" size="small" @click="del(item.id)">删除</van-button>
        </div>
      </li>
    </ul>
    <van-divider v-else dashed>暂无数据</van-divider>
  </div>
</template>

<script>
import blogService from "@/service/blogHttp";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      lists: [],
      author: "",
      keyword: ""
    };
  },
  components: {},
  mounted() {
    // this.login();
    if (this.getCookie("username")) {
      this.author = this.getCookie("username");
      this.goAuthorList(this.author);
    } else {
      Dialog.alert({
        message: "用户未进行登录"
      }).then(() => {
        this.$router.push("/login");
      });
    }
    // console.log(this.author);
  },
  methods: {
    async update(id) {
      this.$router.push({
        path: "/update",
        query: {
          id: id
        }
      });
    },
    async del(id) {
      let res = await blogService.del({ id: id });
      Toast(res.message);
      this.goAuthorList(this.author);
    },
    async goAuthorList(author) {
      let lists = await blogService.getLists({ author: author });
      if (lists && lists.errno == "0") {
        this.lists = lists.data;
      }
    },
    async onSearch() {
      let lists = await blogService.getLists({
        author: this.author,
        keyword: this.keyword
      });
      if (lists && lists.errno == "0") {
        this.lists = lists.data;
      }
    },
    async onCancel() {
      let lists = await blogService.getLists({
        author: this.author
      });
      if (lists && lists.errno == "0") {
        this.lists = lists.data;
      }
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    create() {
      this.$router.push({
        path: "/new"
      });
    }
  }
};
</script>

<style scoped lang="scss">
</style>