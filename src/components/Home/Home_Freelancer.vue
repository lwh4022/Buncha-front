<template>
  <div>
    <!-- 프리랜서 관련 글 -->
    <v-row no-gutters justify="center">
      <p class="my-12 d-block font-weight-bold display-1" style="text-align:center;">프리랜서의 지원을 받아보세요</p>
    </v-row>
    <v-row no-gutters class="d-flex mx-auto mt-4" style="width:1024px;">
      <div
        v-for="item in dataList"
        :key="item.num"
        class="ml-8 my-1"
        style="width:455px"
      >
        <freelancer-card :freelancer="item" @click.native="showDetail(item)" style="height:170px;"></freelancer-card>
      </div>
    </v-row>
    <div class="d-flex">
      <v-btn color="info" class="font-weight-bold mx-auto subtitle-1 my-4 px-12" outlined @click="goFreelancerShow">더 보기</v-btn>
    </div>
  </div>
</template>

<script>
import FreelancerCard from '../../components/Freelancer/Freelancer_Card'

export default {
  data () {
    return {
      loading: false,
      selection: 1,
      dataList: []
    }
  },
  components: {
    'freelancer-card': FreelancerCard
  },
  created () {
    axios({
      url: '/public/getFreelancerCards/0',
      method: 'get'
    })
      .then(response => {
        if (response.data.data === null || response.data.data.info === null) {
          console.log('데이터를 받지 못했습니다.')
        } else if (response.data.data.info.length < 4) {
          this.dataList = response.data.data.info
        } else {
          this.dataList = response.data.data.info.slice(0, 4)
        }
      })
  },
  methods: {
    reverse () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    showDetail (item) {
      this.$router.push({
        name: 'freelancer',
        params: { freelancerId: item.eduList[0].freelancerId }
      })
    },
    goFreelancerShow () {
      this.$router.push({ name: 'freelancerShow' })
    }
  }
}
</script>

<style scoped>
  .enrollFreelancer{
    background-color:#cccccc;
    display:flex;
    flex-direction:row;
    justify-content:center;
  }
  .textContentOverFlow{
    width: inherit;
    height: inherit;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
  .blackMenu{
    text-decoration: none;
    color: inherit;
  }
</style>
