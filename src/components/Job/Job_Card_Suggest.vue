<template>
  <v-card
    height="170px"
    :hover="true"
  >
    <v-chip class="ml-3" :color="getColor(item.jobType)" small>{{item.jobType}}</v-chip>
    <v-chip class="ml-3" :color="getDayColor(getDay)" small dark style="float:right;">{{ getDay }}</v-chip>
    <v-card-text class="pb-1">
      <div
        class="mb-2 font-weight-bold textTitleOverFlow"
        :class="headerText"
        style="color:#004D40;"
      >
        {{ item.title }}
      </div>
      <div class="mb-2" :class="contentText" style="color:#424242">
        <span class="font-weight-bold" style="color:#3E2723;">{{ item.startDate }}</span><span style="color:#3E2723;"> ~ </span><span style="color:#3E2723;">{{ item.endDate}}</span>&nbsp;&nbsp;&nbsp;
        <span class="title font-weight-bold">모집 인원 : {{item.recruitNum}} 명</span>
      </div>
      <div class="body-2 textContentOverFlow" style="height:40px">{{ item.contents }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['jobInfo'],
  computed: {
    item () {
      return {
        num: this.jobInfo.num,
        recruiting: new Date(this.jobInfo.recruiting) > new Date(),
        title: this.jobInfo.title,
        startDate: this.jobInfo.startDate,
        endDate: this.jobInfo.endDate,
        recruitNum: this.jobInfo.recruitNum,
        createdAt: this.jobInfo.createdAt,
        contents: this.textareaBack(this.jobInfo.contents),
        jobType: this.jobInfo.jobType,
        salary: this.jobInfo.salary,
        amount: this.jobInfo.amount,
        isNego: this.jobInfo.isNego
      }
    },
    headerText: {
      get: function () {
        if (this.windowXSize < 600) {
          return 'title'
        } else if (this.windowXSize < 960) {
          return 'title'
        } else {
          return 'headline'
        }
      }
    },
    contentText: {
      get: function () {
        if (this.windowXSize < 600) {
          return 'body-2'
        } else if (this.windowXSize < 960) {
          return 'body-1'
        } else {
          return 'title'
        }
      }
    },
    getDay () {
      return Math.ceil(new Date(this.jobInfo.recruiting).getTime() - new Date().getTime()) <= 0
        ? '마감'
        : 'D-' + Math.ceil(new Date(new Date(this.jobInfo.recruiting).getTime() - new Date().getTime()).getTime() / 1000 / 60 / 60 / 24)
    }
  },
  methods: {
    getColor (job) {
      if (job === '통역') return 'primary'
      else if (job === '번역') return 'info'
      else if (job === '단체강의') return 'success'
      else if (job === '개인과외') return 'secondary'
    },
    getDayColor (getDay) {
      if (getDay === '마감') {
        return 'black'
      } else {
        let restTime = getDay.substring(2)
        if (restTime < 5) return 'red'
        else if (restTime < 10) return 'blue'
        else return 'green'
      }
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
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
    display: inline-block;
    width: inherit;
    height: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .blackMenu{
    text-decoration: none;
    color: inherit;
  }
</style>
