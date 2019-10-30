<template>
  <v-container fluid class="pa-2">
    <!-- 제목 부분 -->
    <div class="headline font-weight-bold my-5"><v-icon style="color:black;">fas fa-user-plus</v-icon>&nbsp;&nbsp;&nbsp;지원자</div>

      <!--학력 메뉴-->
      <v-select
        v-model="filterContent"
        class="mb-4"
        :items="selectionItem"
        outlined
        offsetY
        hide-details
        clearable
      >
        <template v-slot:prepend-inner>
          <div class="d-flextext--black my-auto" style="width:50px; font-size:1em;">
            <div class="font-weight-bold" style="margin-top:3px;">학  력</div>
          </div>
        </template>
      </v-select>

      <div v-if="isNull" class="d-flex">
        <div style="height:300px;"></div>
        <div class="my-auto mx-auto headline font-weight-bold">지원자가 없습니다.</div>
      </div>

      <div v-if="!isNull">
        <div
          v-for="item in sortedList"
          :key="item.num"
        >
          <applicants-card :applicant="item" @getDetailApplicant="(info) => getDetailApplicant(info)"></applicants-card>
        </div>
      </div>
      <!-- 페이지네이션 -->
      <div class="text-center">
        <v-pagination
          v-if="length > 1"
          class="JobList"
          color="info"
          v-model="page"
          :length="length"
        ></v-pagination>
      </div>
  </v-container>
</template>

<script>
import ApplicantsCard from './ApplicantsCard'

export default {
  props: ['applicantsList'],
  data () {
    return {
      filterContent: '',
      selectionItem: [
        '대학교 재학',
        '대학교 졸업',
        '대학원 재학',
        '대학원 졸업'
      ],
      menuEdu: false,
      isNull: true,
      page: 1,
      storedArray: []
    }
  },
  components: {
    'applicants-card': ApplicantsCard
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
      if (this.applicantsList.isNull) {
        this.isNull = true
        const notVisibleArray = [{
          koName: ''
        }]
        return notVisibleArray
      } else {
        this.isNull = false

        let resultList = this.applicantsList.applicantsList

        resultList.map(item => {
          let tempArray = new Array()
          if (item.education.length < 1) {
            item.educationFormatted = '미입력'
          } else if (item.education.length === 1) {
            if (item.education[0].isStudent === true) {
              item.educationFormatted = item.education[0].poOrUnder + ' ' + '재학'
            } else {
              item.educationFormatted = item.education[0].poOrUnder + ' ' + '졸업'
            }
          } else {
            tempArray = item.education.sort((a, b) => {
              if (new Date(a.enrollYear).getTime() > new Date(b.enrollYear).getTime()) {
                return 1
              }
              if (new Date(a.enrollYear).getTime() < new Date(b.enrollYear).getTime()) {
                return -1
              }
              return 0
            })
            const lastEdu = tempArray[(tempArray.length - 1)]
            if (lastEdu.poOrUnder === '대학교' && lastEdu.isStudent) {
              item.educationFormatted = '대학교 재학'
            } else if (lastEdu.poOrUnder === '대학교' && !lastEdu.isStudent) {
              item.educationFormatted = '대학교 졸업'
            } else if (lastEdu.poOrUnder === '대학원' && lastEdu.isStudent) {
              item.educationFormatted = '대학원 재학'
            } else if (lastEdu.poOrUnder === '대학원' && !lastEdu.isStudent) {
              item.educationFormatted = '대학원 졸업'
            } else {
              item.educationFormatted = '학력 입력 미완료'
            }
          }
        })

        if (this.filterContent === '') {
          return resultList
        } else { return resultList.filter(item => item.educationFormatted === this.filterContent) }
      }
    }
  },
  methods: {
    getDetailApplicant (item) {
      this.$emit('getDetailApplicant', item)
    },
    getEducation (eduList) {
      let tempArray = new Array()
      if (eduList === null) {
        return '미등록'
      } else if (eduList.length === 1) {
        if (eduList[0].isStudent === true) {
          return eduList[0].poOrUnder + ' ' + '재학'
        } else {
          return eduList[0].poOrUnder + ' ' + '졸업'
        }
      } else {
        tempArray = eduList.sort((a, b) => {
          if (new Date(a.enrollYear).getTime() > new Date(b.enrollYear).getTime()) {
            return 1
          }
          if (new Date(a.enrollYear).getTime() < new Date(b.enrollYear).getTime()) {
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
  }
}
</script>

<style>
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
</style>
