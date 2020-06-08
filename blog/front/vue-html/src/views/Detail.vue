<template>
  <div class="detail">
    <h1>{{detail&&detail.title}}</h1>
    <p>作者：{{detail&&detail.author}}</p>
    <div>{{detail&&detail.content}}</div>

  </div>
</template>
<script>
import blogService from "@/service/blogHttp";
export default {
  name:"detail",
  data(){
    return{
      detail : null
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async getDetail(){
      let detailObj = await blogService.getDetail({id:this.$route.params.id});
      if(detailObj&&detailObj.errno == 0){
        this.detail = detailObj.data
      }
    }
  },
}
</script>
