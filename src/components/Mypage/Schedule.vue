<template>
  <v-container class="pa-0" fluid style="background-color:grey">
    <div v-if="!isFreelancer" class="d-flex" style="background-color:white;height:calc(100vh - 64px)">
      <div class="mx-auto my-auto">
        <div class="display-1 font-weight-bold">프리랜서로 가입 후 가능합니다</div>
        <div style="height:100px"></div>
        <div class="d-flex">
          <v-btn class="mx-auto headline" color="info" style="height:50px" @click="goEnrollFreelancer">프리랜서 등록하기</v-btn>
        </div>
      </div>
    </div>
    <div v-if="isFreelancer" style="height:calc(100vh - 64px)">
      <v-row class="fill-height mx-auto">
        <v-col class="my-auto mx-auto">
          <!-- 캘린더 헤드부분 -->
          <v-sheet height="80px">
            <v-toolbar flat color="white">
              <div style="width:80px"></div>
              <div class="flex-grow-1"></div>
              <div class="d-flex flex-row">
                <v-btn fab text small @click="prev">
                  <v-icon small>fa-chevron-left</v-icon>
                </v-btn>
                <v-toolbar-title style="line-height:40px;font-weight:bold">{{ title }}</v-toolbar-title>
                <v-btn fab text small @click="next">
                  <v-icon small>fa-chevron-right</v-icon>
                </v-btn>
              </div>
              <div class="flex-grow-1"></div>
              <v-btn width="80px" outlined class="ml-auto" @click="setToday">
                Today
              </v-btn>
            </v-toolbar>
          </v-sheet>

          <!-- 캘린더 내용부분 -->
          <v-sheet height="80vh">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="eventList"
              :event-color="getEventColor"
              :event-margin-bottom="3"
              :now="today"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"

            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              full-width
              offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.color"
                  dark
                >
                  <v-toolbar-title class="font-weight-bold d-flex flex-column" style="width:100%">
                    <div class="mx-auto ma-0 pa-0"><span>- </span><span v-html="selectedEvent.category"></span><span> -</span></div>
                    <div class="mx-auto ma-0 pa-0">
                      <span>(</span><span v-html="selectedEvent.type"></span><span>)&nbsp;</span>
                      <span v-html="selectedEvent.name"></span>
                    </div>
                  </v-toolbar-title>
                </v-toolbar>
                <v-card-text class="text--black pb-0">
                  <div class="font-weight-bold mb-2 body-2" style="color:#424242">
                    <p class="mb-2"><span>업무&nbsp;일정&nbsp;:&nbsp;</span><span style="color:#3E2723;" v-html="selectedEvent.start"></span><span style="color:#3E2723;"> ~ </span><span v-html="selectedEvent.end" style="color:#3E2723;"></span></p>
                    <p class="mb-2"><span>업무&nbsp;장소&nbsp;:&nbsp;</span><span style="color:#3E2723;" v-html="selectedEvent.location"></span></p>
                    <p class="mb-2"><span class="font-weight-bold">모집&nbsp;인원&nbsp;:&nbsp;</span><span v-html="selectedEvent.recruitNum"></span><span>명</span></p>
                    <p><span class="font-weight-bold">업무&nbsp;급여&nbsp;:&nbsp;</span><span v-html="selectedEvent.salary"></span><span>만원</span></p>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    text
                    @click.native="getDetail(selectedEvent)"
                  >
                    상세보기
                  </v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    취소
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    appliedList: [],
    suggestedList: [],
    today: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getDate().toString(),
    focus: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getDate().toString(),
    type: 'month',
    start: new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getDate().toString(),
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  computed: {
    isFreelancer (){
      return this.$store.state.loginInfo.role === 'FREELANCER' ? true : false
    },
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const month = this.monthFormatter(start)
      const year = start.year
      return `${year}년 ${month}`
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long'
      })
    },
    eventList () {
      let result = []
      if (this.suggestedList !== null && this.suggestedList !== undefined) {
        this.suggestedList.map(item => {
          let tempSuggestedItem = {
            num: item.num,
            type: item.jobType,
            name: item.title,
            details: this.textareaBack(item.contents),
            start: item.startDate,
            end: item.endDate,
            salary: item.salary + ' ' + item.amount,
            recruitNum: item.recruitNum,
            location: this.location(item.jobLocation),
            category: '요청받은 업무',
            color: 'teal'
          }
          result.push(tempSuggestedItem)
        })
      }
      if (this.appliedList !== null && this.appliedList !== undefined) {
        this.appliedList.map(item => {
          let tempAppliedItem = {
            num: item.num,
            type: item.jobType,
            name: item.title,
            details: this.textareaBack(item.contents),
            start: item.startDate,
            end: item.endDate,
            salary: item.salary + ' ' + item.amount,
            recruitNum: item.recruitNum,
            location: this.location(item.jobLocation),
            category: '지원한 업무',
            color: 'blue'
          }
          result.push(tempAppliedItem)
        })
      }
      return result
    }
  },
  mounted () {
    if (this.isFreelancer === true) {
      this.$refs.calendar.checkChange()
      axios({
        url: '/private/scheduleInfo/' + this.$store.state.loginInfo.memberId,
        method: 'get',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': window.localStorage.getItem('TOKEN')
        }
      })
        .then(response => {
          if (response.data.data.appliedJobs !== null) {
            this.appliedList = response.data.data.appliedJobs
          }
          if (response.data.data.suggestedJobs !== null) {
            this.suggestedList = response.data.data.suggestedJobs
          }
        })
    }
  },
  methods: {
    viewDay ({ date }) {
      this.focus = date
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start
      this.end = end
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    },
    location (item) {
      let result = ''
      for (let i = 0; i < item.length - 1; i++) {
        result += item[i] + ', '
      }
      result += item[item.length - 1]
      return result
    },
    getDetail (e) {
      this.$router.push({ name: 'job', params: { num: e.num, isSchedule: true } })
    },
    goEnrollFreelancer () {
      this.$router.push({ name: 'freelancerEnroll' })
    }
  }
}
</script>
