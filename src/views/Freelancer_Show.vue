<template>
  <v-container fluid class="pa-0">
    <!-- Header.vue -->
    <header-bar></header-bar>
    <div class="mx-auto" style="background-color:white;margin-top:5vh;height:15vh;">
      <div class="mx-auto" style="width:950px;">
        <div class="mb-2 display-1 font-weight-bold ml-12">필터</div>
        <v-card flat style="background-color:#cccccc;">
          <v-card-text class="d-flex flex-row align-center" style="height:100px">
            <v-row class="d-flex justify-center">
              <v-col cols="9" class="d-flex flex-row align-center justify-center" >
                <!--업무 내용-->
                <div class="font-weight-bold text--black filterTitle title pa-1">업무 </div>

                <!-- 업무 메뉴-->
                <v-menu
                  :close-on-content-click="false"
                  v-model="menuJob"
                  bottom
                  offsetY
                >
                  <template v-slot:activator="{ on }">
                    <div
                      class="font-weight-bold text--black d-flex flex-row filtertitle filterBox mt-0"
                      v-on="on"
                    >
                      <div class="title font-weight-bold ml-3">
                        {{ selectionJob }}
                      </div>
                      <div class="flex-grow-1"></div>
                      <div class="my-auto">
                        <v-icon class="ml-auto mr-1">fas fa-caret-down</v-icon>
                      </div>
                    </div>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-checkbox
                        v-model="selectionJob"
                        value="통역"
                        color="primary"
                        hide-details
                        class="ma-0"
                      ></v-checkbox>

                      <v-list-item-title style="height:34px;line-height:38px;"
                        @click="clickJob('통역')"
                      >
                        통역
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-checkbox
                        v-model="selectionJob"
                        value="번역"
                        color="primary"
                        hide-details
                        class="ma-0"
                      ></v-checkbox>

                      <v-list-item-title style="height:34px;line-height:38px;"
                        @click="clickJob('번역')"
                      >
                        번역
                      </v-list-item-title>
                      </v-list-item>
                    <v-list-item>
                      <v-checkbox
                        v-model="selectionJob"
                        value="단체강의"
                        color="primary"
                        hide-details
                        class="ma-0"
                      ></v-checkbox>

                      <v-list-item-title style="height:34px;line-height:38px;"
                        @click="clickJob('단체강의')"
                      >
                        단체강의
                      </v-list-item-title>
                      </v-list-item>
                    <v-list-item>
                      <v-checkbox
                        v-model="selectionJob"
                        value="개인과외"
                        color="primary"
                        hide-details
                        class="ma-0"
                      ></v-checkbox>

                      <v-list-item-title style="height:34px;line-height:38px;"
                        @click="clickJob('개인과외')"
                      >
                        개인과외
                      </v-list-item-title>
                    </v-list-item>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        text
                        @click="menuJob = false"
                      >
                        확인
                      </v-btn>
                    </v-card-actions>
                  </v-list>
                </v-menu>

                <!--학력 제목-->
                <div class="font-weight-bold text--black filterTitle title ml-12 pa-1">학력</div>

                <!--학력 메뉴-->
                <v-menu
                  :close-on-content-click="false"
                  v-model="menuEdu"
                  bottom
                  offsetY
                >
                  <template v-slot:activator="{ on }">
                    <div
                      class="font-weight-bold text--black d-flex flex-row filtertitle filterBox mt-0"
                      v-on="on"
                    >
                      <div class="title font-weight-bold ml-3">
                        {{selectionEdu}}
                      </div>
                      <div class="flex-grow-1"></div>
                      <div class="my-auto">
                        <v-icon class="ml-auto mr-1">fas fa-caret-down</v-icon>
                      </div>
                    </div>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-checkbox
                        v-model="selectionEdu"
                        value="대학교"
                        color="primary"
                        hide-details
                        class="ma-0"
                      ></v-checkbox>

                      <v-list-item-title style="height:34px;line-height:38px;"
                        @click="clickEdu('대학교')"
                      >
                        대학교
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-checkbox
                        v-model="selectionEdu"
                        value="대학원"
                        color="primary"
                        hide-details
                        class="ma-0"
                      ></v-checkbox>

                      <v-list-item-title style="height:34px;line-height:38px;"
                        @click="clickEdu('대학원')"
                      >
                        대학원
                      </v-list-item-title>
                      </v-list-item>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn
                        text
                        @click="menuEdu = false"
                      >
                        확인
                      </v-btn>
                    </v-card-actions>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

      <!-- 카드 부분-->
      <v-row no-gutters class="d-flex mx-auto mt-4" style="width:1024px;">
        <div
          v-for="item in sortedList"
          :key="item.num"
          class="ml-8 my-1"
          style="width:455px;height:170px;"
        >
          <freelancer :freelancer="item" @click.native="showDetail(item)" style="height:170px;"></freelancer>
        </div>
      </v-row>

      <div class="d-flex mt-3" v-if="isMore" style="z-index:20;">
        <p class="mx-auto font-weight-bold title" @click="getListMore" style="cursor:pointer"><v-icon style="font-size:2em">fas fa-angle-double-down</v-icon></p>
      </div>
    </div>
  </v-container>
</template>

<script>
import Header from '@/components/Header_Footer/Header'
import FreelancerCard from '@/components/Freelancer/Freelancer_Card'

export default {
  data () {
    return {
      selectionJob: '',
      selectionEdu: '',
      menuJob: false,
      menuEdu: false,
      sortedList: [],
      isMore: false,
      cardCounter: 0
    }
  },
  components: {
    'header-bar': Header,
    'freelancer': FreelancerCard
  },
  created () {
    this.defaultDataFetching()
  },
  watch: {
    selectionJob: function (newVal) {
      if(newVal === null){
        this.selectionJob = ""
      }
      this.orderingSearch()
    },
    selectionEdu: function (newVal) {
      if(newVal === null){
        this.selectionEdu = ""
      }
      this.orderingSearch()
    }
  },
  methods: {
    clickJob (job) {
      this.selectionJob = job
      return false
    },
    clickEdu (edu) {
      this.selectionEdu = edu
      return false
    },
    getListMore () {
      this.cardCounter = this.cardCounter + 1
      this.orderingSearch()
    },
    showDetail (item) {
      this.$router.push({ name: 'freelancer', params: { freelancerId: item.freelancerId } })
    },
    defaultDataFetching () {
      axios({
        method: 'GET',
        url: '/public/getFreelancerCards' + '/'+ this.cardCounter,
      })
        .then(response => {
          if (response.data.data === null) {
            this.sortedList = []
            this.isMore = false
            this.cardCounter = 0
          } else {
            if (this.cardCounter === 0) {
              this.sortedList = response.data.data.info
            } else {
              this.sortedList = this.sortedList.concat(response.data.data.info)
            }
          }
          if (response.data.data.final === null) {
            this.isMore = false
          } else {
            if (response.data.data.final === true) {
              this.isMore = false
            } else {
              this.isMore = true
            }
          }
        })
    },
    orderingSearch () {
      if (this.selectionJob !== '' && this.selectionEdu !== '' && this.selectionEdu !== null && this.selectionJob !== null) {
        axios({
          method: 'GET',
          url: '/public/getFreelancerCards'+ '/' + encodeURIComponent(this.selectionJob) + '/' + encodeURIComponent(this.selectionEdu) + '/' + this.cardCounter,
        })
          .then(response => {
            if (response.data.data === null) {
              this.sortedList = []
              this.isMore = false
              this.cardCounter = 0
            } else {
              if (this.cardCounter === 0) {
                this.sortedList = response.data.data.info
              } else {
                this.sortedList = this.sortedList.concat(response.data.data.info)
              }
            }
            if (response.data.data.final === null) {
              this.isMore = false
            } else {
              if (response.data.data.final === true) {
                this.isMore = false
              } else {
                this.isMore = true
              }
            }
          })
      } else if (this.selectionJob === '' && this.selectionEdu !== '') {
        axios({
          method: 'GET',
          url: '/public/getFreelancerCards' + '/' + encodeURIComponent(this.selectionEdu) + '/' + this.cardCounter,
        })
          .then(response => {
            if (response.data.data === null) {
              this.sortedList = []
              this.isMore = false
              this.cardCounter = 0
            } else {
              if (this.cardCounter === 0) {
                this.sortedList = response.data.data.info
              } else {
                this.sortedList = this.sortedList.concat(response.data.data.info)
              }
            }
            if (response.data.data.final === null) {
              this.isMore = false
            } else {
              if (response.data.data.final === true) {
                this.isMore = false
              } else {
                this.isMore = true
              }
            }
          })
      } else if (this.selectionEdu === '' && this.selectionJob !== '' ) {
        axios({
          method: 'GET',
          url: '/public/getFreelancerCards' + '/' + encodeURIComponent(this.selectionJob) + '/' + this.cardCounter,
        })
          .then(response => {
            if (response.data.data === null) {
              this.sortedList = []
              this.isMore = false
              this.cardCounter = 0
            } else {
              if (this.cardCounter === 0) {
                this.sortedList = response.data.data.info
              } else {
                this.sortedList = this.sortedList.concat(response.data.data.info)
              }
            }
            if (response.data.data.final === null) {
              this.isMore = false
            } else {
              if (response.data.data.final === true) {
                this.isMore = false
              } else {
                this.isMore = true
              }
            }
          })
      } else {
        this.defaultDataFetching()
      }
    }
  }
}
</script>

<style scoped>
  .filterTitle {
    background-color:white;
    border-right: 2px solid #cccccc;
    width:80px;
    text-align: center;
    color:black;
  }
  .filterBox {
    width:300px;
    background-color:white;
    height:40.2px;
    color:black;
    margin-top:auto;
  }
  .filterBtn {
    width:100px;
  }
</style>
