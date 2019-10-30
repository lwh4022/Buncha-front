<template>
  <div>
    <!-- 제목 관련 글 -->
    <v-row no-gutters justify="center">
      <p class="mt-12 mb-9 d-block font-weight-bold display-1" style="text-align:center;">현재 등록된 업무</p>
    </v-row>

    <v-row no-gutters class="d-flex mx-auto mt-4" style="width:1024px;">
      <div
        v-for="item in dataList"
        :key="item.num"
        class="ml-8 my-2"
        style="width:455px"
      >
        <job-card :jobInfo="item" @click.native="showDetail(item)" style="height:220px;"></job-card>
      </div>
    </v-row>

    <div class="d-flex">
      <v-btn color="info" class="font-weight-bold mx-auto subtitle-1 my-4 px-12" outlined @click="goJobShow">더 보기</v-btn>
    </div>
  </div>
</template>

<script>
import JobCard from '../Job/Job_Card'

export default {
  data () {
    return {
      dataList: []
    }
  },
  components: {
    'job-card': JobCard
  },

  created () {
    axios({
      url: '/public/getJobs/0',
      method: 'get'
    })
      .then(response => {
        if (response.data.data === null || response.data.data.info.info === null) {
          console.log('데이터를 받지 못했습니다.')
        } else if (response.data.data.info.info.length < 4) {
          this.dataList = response.data.data.info.info
        } else {
          this.dataList = response.data.data.info.info.slice(0, 4)
        }
      })
  },
  methods: {
    goJobShow () {
      this.$router.push({ name: 'jobShow' })
    },
    showDetail (item) {
      this.$router.push({ name: 'job', params: { num: item.num } })
    }
  }
}
</script>

<style scoped>

  .textTitleOverFlow{
    display: inline-block;
    width: inherit;
    height: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .textContentOverFlow{
    width: inherit;
    height: inherit;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;    
  }
  .blackMenu{
    text-decoration: none;
    color: inherit;
  }
</style>
