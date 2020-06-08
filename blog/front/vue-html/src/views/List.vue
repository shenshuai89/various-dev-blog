<template>
  <div class="list">
    <h2>博客列表</h2>
    <ul>
      <li v-for="item in lists" :key="item.id" style="margin-bottom:15px;">
        <div style="display:flex;justify-content:space-between;border-bottom:1px solid #ccc;">
          <h4 style="padding:10px;margin:0;" @click="goDetail(item.id)">标题是{{item.title}}</h4>
          <span style="padding:10px;">作者是：{{item.author}}</span>
        </div>
        <div>内容是{{item.content}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import blogService from "@/service/blogHttp";
export default {
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      let lists = await blogService.getLists();
      if(lists&&lists.errno == "0"){
        this.lists = lists.data
        console.log(lists.data);
      }
    },
    goDetail(id){
      this.$router.push({
        name:"detail",  // 只能是name传参
        params:{
          id:id
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
.list{
  text-align: left;
}
</style>