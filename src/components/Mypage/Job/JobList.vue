<template>
  <v-container fluid class="pa-2">
    <div class="headline font-weight-bold my-5"><v-icon style="color:black;">fas fa-folder</v-icon>&nbsp;&nbsp;&nbsp;등록한 업무</div>
    <v-text-field
      v-model="searchText"
      class="mt-1 mb-4"
      hide-details
      outlined
    >
      <template v-slot:prepend-inner>
        <v-icon  style="font-size:1.2em">fas fa-search</v-icon>&nbsp;&nbsp;&nbsp;
      </template>
      <template v-slot:append>
        <v-icon style="font-size:1.2em" @click="deleteSearchBox">fas fa-times</v-icon>
      </template>
    </v-text-field>

    <div v-if="isNull" class="d-flex">
        <div style="height:300px;"></div>
        <div class="my-auto mx-auto headline font-weight-bold">등록한 업무가 없습니다.</div>
      </div>

    <div v-if="!isNull">
      <v-card
        class="pa-1 mb-3"

        v-for="item in pageList"
        :key="item.num"
      >
        <v-row>
          <v-col cols="11" class="pa-1">
            <v-card-text class="pb-1 pt-1">
              <div class="mb-1 caption" style="display:inline-block;float:left;"><span>{{ formatter(item.enrolledAt) }}</span> 등록</div>
              <div class="mb-0 font-weight-bold textTitleOverFlow title" style="color:#004D40;">{{ item.title }}</div>
              <div class="font-weight-bold mb-2 body-2" style="color:#424242">
                <span style="color:#3E2723;">{{ item.startDate }}</span><span style="color:#3E2723;"> ~ </span><span style="color:#3E2723;">{{ item.endDate }}</span>&nbsp;&nbsp;&nbsp;
                <span class="font-weight-bold">모집 인원 : </span><span>{{ item.recruitNum }}</span><span>명</span>
              </div>
            </v-card-text>
          </v-col>
          <v-col cols="1" class="d-flex pa-0">
            <div class="my-auto mr-auto" @click="sendJobNum(item)"><v-icon style="font-size:2em;text-align:center;cursor:pointer">fas fa-caret-right</v-icon></div>
          </v-col>
        </v-row>
        <div class="d-flex">
          <p class="mx-auto font-weight-bold body-2" text @click="showDetail(item)" style="cursor:pointer">수정하기</p>
        </div>
      </v-card>
    </div>

    <div class="text-center">
      <v-pagination
        v-if="length >1"
        class="JobList"
        color="info"
        v-model="page"
        :length="length"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ['jobInfo'],
  data () {
    return {
      page: 1,
      searchText: '',
      isNull: true
    }
  },
  computed: {
    length () {
      if (this.sortedList === null) {
        return 1
      } else {
        return Math.ceil(this.sortedList.length / 4)
      }
    },
    pageList () {
      if (this.sortedList === null) {
        return null
      } else {
        if (this.sortedList.length / this.page >= 1) {
          return this.sortedList.slice((this.page - 1) * 4, (this.page - 1) * 4 + 4)
        } else if (this.sortedList.length / this.page > 0) {
          return this.sortedList.slice((this.page - 1) * 4)
        } else {
          return null
        }
      }
    },
    sortedList () {
      let tempList = new Array()
      if (this.jobInfo.isNull) {
        this.isNull = true
        return null
      } else {
        this.isNull = false
        let originalList = this.jobInfo.enrolledJobsList
        if (this.searchText === '') {
          return originalList
        } else {
          const re = new RegExp(this.searchText + '+')
          originalList.map(item => {
            if (re.test(item.title) || re.test(item.contents)) {
              tempList.push(item)
            }
          })
          return tempList
        }
      }
    }
  },
  methods: {
    sendJobNum (item) {
      this.$emit('getApplicants', item)
    },
    showDetail (item) {
      this.$emit('getDetail', item)
    },
    deleteSearchBox () {
      this.searchText = ''
    },
    formatter (item) {
      const year = new Date(item).getFullYear()
      const month = new Date(item).getMonth() + 1
      const date = new Date(item).getDate()
      return year + '.' + month + '.' + date + '.'
    }
  }
}
</script>

<style>
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
  .v-pagination__navigation .v-icon{
    font-size: 1em;
  }
  .JobList.theme--light.v-pagination .v-pagination__item{
    min-width:25px;
    height:25px;
    border-radius: 50%;
  }
  .JobList.theme--light.v-pagination .v-pagination__navigation{
    background-color:#fafafa;
    box-shadow: 0px 0px 0px 0px;
  }
  .JobList.theme--light.v-data-table tbody tr:not(:last-child) td:last-child, .theme--light.v-data-table tbody tr td{
    border-bottom: 1px solid rgba(0,0,0,.12);
  }
</style>
