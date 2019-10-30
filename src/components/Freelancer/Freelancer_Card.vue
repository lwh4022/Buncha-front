<template>
  <v-card
    hover
    class="applicantsBox mb-5"
  >
    <div class="d-flex flex-row">
      <div class="mr-3">
        <v-avatar v-if="hasThumb" style="margin-left:26px; margin-top:40px; width:80px; height:80px;">
          <img :src="item.thumb"/>
        </v-avatar>
        <v-avatar v-if="!hasThumb" style="margin-left:26px; margin-top:40px; width:80px; height:80px;">
          <v-icon style="font-size:4.5em">fas fa-user-circle</v-icon>
        </v-avatar>
      </div>
      <div class="ml-3">
        <div class="headline font-weight-bold my-3" style="color:#263238">{{ item.koName }}</div>
        <div class="applicantsContents mb-2 body-2 grey--text">{{ item.selfDescription }}</div>
        <div class="mb-2">
          <v-chip
            v-for="(job, index) in item.jobAvailables"
            :key="index"
            :color="getColor(job)"
            class="mr-2"
            small
          >
            {{job}}
          </v-chip>
        </div>
        <div class="body-2 font-weight-bold mb-5">학력 : {{ education }}</div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      thumb: '',
      hasThumb: false,
    }
  },
  props: ['freelancer'],
  computed: {
    item () {
      return {
        koName: this.freelancer.koName,
        selfDescription: this.textareaBack(this.freelancer.selfDescription),
        jobAvailables: this.freelancer.jobAvailables,
        thumb: this.thumb
      }
    },
    education () {
      let tempArray = new Array()
      if (this.freelancer.eduList === null) {
        return '미등록'
      } else {
        if (this.freelancer.eduList.length === 1) {
          if (this.freelancer.eduList[0].isStudent === true) {
            if (this.freelancer.eduList[0].poOrUnder === 'null' || this.freelancer.eduList[0].poOrUnder === null) {
              return '미등록'
            } else {
              return this.freelancer.eduList[0].poOrUnder + ' ' + '재학'
            }
          } else {
            if (this.freelancer.eduList[0].poOrUnder === 'null' || this.freelancer.eduList[0].poOrUnder === null) {
              return '미등록'
            } else {
              return this.freelancer.eduList[0].poOrUnder + ' ' + '졸업'
            }
          }
        } else {
          tempArray = this.freelancer.eduList.sort((a, b) => {
            if (new Date(a.enrollDate).getTime() > new Date(b.enrollDate).getTime()) {
              return 1
            }
            if (new Date(a.enrollDate).getTime() < new Date(b.enrollDate).getTime()) {
              return -1
            }
            return 0
          })
          const lastEdu = tempArray[(tempArray.length - 1)]
          if (lastEdu.poOrUnder === '대학교' && lastEdu.isStudent) {
            return '대학교 재학'
          } else if (lastEdu.poOrUnder === '대학교' && !lastEdu.isStudent) {
            return '대학교 졸업'
          } else if (lastEdu.poOrUnder === '대학원' && lastEdu.isStudent) {
            return '대학원 재학'
          } else if (lastEdu.poOrUnder === '대학원' && !lastEdu.isStudent) {
            return '대학원 졸업'
          } else {
            return '학력 입력 미완료'
          }
        }
      }
    },
    getDay () {
      return Math.ceil(new Date(this.jobInfo.recruitDate).getTime() - new Date().getTime()) <= 0
        ? '마감'
        : 'D-' + Math.ceil(new Date(new Date(this.jobInfo.recruitDate).getTime() - new Date().getTime()).getTime() / 1000 / 60 / 60 / 24)
    }
  },
  created () {
    axios({
      url: '/public/getThumbNailByFileSeq/' + this.freelancer.fileSeq,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': window.localStorage.getItem('TOKEN')
      },
      responseType: 'blob'
    })
      .then(response => {
        if(response.data.type !== "application/json"){
          let reader = new FileReader()
          reader.onload = e => {
            this.thumb = e.target.result
            this.hasThumb = true
          }
          reader.readAsDataURL(response.data)
        } else {
          this.hasThumb = false
        }
      })
      
      .catch(error => {
        console.log(error)
        this.hasThumb = false
      })
  },
  methods: {
    getColor (job) {
      if (job === '통역') return 'primary'
      else if (job === '번역') return 'info'
      else if (job === '단체강의') return 'success'
      else if (job === '개인과외') return 'secondary'
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    }
  }
}
</script>

<style scoped>
  .applicantsContents{
    width: 320px;
    height: inherit;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
</style>
