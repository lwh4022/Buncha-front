<template>
  <!-- 지원자 부분 -->
  <v-card
    hover
    class="applicantsBox mb-5"
    @click="getDetailApplicant(applicant)"
  >
    <v-row class="d-flex flex-row">
      <div>
        <v-avatar v-if="hasThumb" style="margin-left:30px; margin-top:30px; width:70px; height:70px;">
          <img :src="thumb"/>
        </v-avatar>
        <v-avatar v-if="!hasThumb" style="margin-left:30px; margin-top:30px; width:70px; height:70px;">
          <v-icon style="font-size:4.5em">fas fa-user-circle</v-icon>
        </v-avatar>
      </div>
      <div class="ml-3">
        <div class="headline font-weight-bold my-3">{{ info.koName }}</div>
        <div class="applicantsContents mb-2 body-2 grey--text">{{ textareaBack(info.selfDescription) }}</div>
        <div class="body-2 font-weight-bold">학력 : {{ info.education }}</div>
      </div>
    </v-row>
  </v-card>
</template>

<script>

export default {
  props: ['applicant'],
  data () {
    return {
      thumb: '',
      hasThumb: false,
    }
  },
  computed: {
    info () {
      return {
        koName: this.applicant.koName,
        selfDescription: this.applicant.selfDescription,
        education: this.applicant.educationFormatted !== null ? this.applicant.educationFormatted : "미등록"
      }
    }
  },
  created () {
    this.fetchThumb(this.applicant.freelancerSeq)
  },
  methods: {
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    },
    fetchThumb (freelancerSeq) {
      axios({
        url: '/private/getThumbNailByFreelancer/' + freelancerSeq,
        method: 'GET',
        headers: {
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
    getDetailApplicant (info) {
      this.$emit('getDetailApplicant', info)
    }
  }
}
</script>

<style scoped>
  .applicantsBox{
    height:150px;
    background-color: #fdfffa !important;
  }
  .applicantsContents{
    width: 270px;
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
