<template>
  <v-card class="mx-auto" style="width:800px;">
    <!-- 내부 프레임-->
    <div class="pa-4">
      <!-- 인적 사항-->
      <v-card-title class="display-1 font-weight-bold">인적사항</v-card-title>
      <v-row class="pb-3 px-3 mb-12">
        <v-col cols="10">
          <v-card-text class="d-flex flex-row pa-0 mb-3">
            <v-text-field
              v-model="dataList.koName"
              label="한국이름"
              class="my-0 mx-1 blackClass"
              style="width:15%;"
              disabled
              outlined
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="dataList.vnName"
              label="베트남이름"
              class="my-0 mx-1 blackClass"
              style="width:25%;"
              disabled
              outlined
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="dataList.birthday"
              class="blackClass"
              label="생년월일"
              disabled
              outlined
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="dataList.gender"
              label="성별"
              class="my-0 mx-1 blackClass"
              style="width:15%;"
              disabled
              outlined
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-card-text class="d-flex flex-row pa-0">
            <v-text-field
              v-model="dataList.email"
              label="이메일"
              class="my-0 mx-1 blackClass"
              disabled
              outlined
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="dataList.cphone"
              label="휴대폰번호"
              class="my-0 mx-1 blackClass"
              disabled
              outlined
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="dataList.address"
              label="주소"
              class="my-0 mx-1 blackClass"
              disabled
              outlined
              hide-details
            ></v-text-field>
          </v-card-text>
        </v-col>
        <v-col cols="2" class="d-flex justify-center flex-column pt-0">
          <div class="imgBox">
            <v-avatar v-if="dataList.thumb !== ''" height="100%" width="100%" tile>
              <img id="preview" :src="dataList.thumb">
            </v-avatar>
          </div>
        </v-col>
      </v-row>

      <!-- 학력 -->
        <!-- 학력제목 -->
        <v-card-title class="mb-0 display-1 font-weight-bold">학력</v-card-title>
        <!-- 반복사항 시작-->
          <v-row class="pb-3 px-3 mb-12">
            <v-col cols="12">
              <v-card-text class="d-flex flex-column pa-0">
                <div class="d-flex flex-row my-3">
                  <div class="title font-weight-bold text-center eduTitle" style="width:10%;">구분</div>
                  <div class="title font-weight-bold text-center eduTitle" style="width:20%;">학교</div>
                  <div class="title font-weight-bold text-center eduTitle" style="width:15%;">기간</div>
                  <div class="title font-weight-bold text-center eduTitle" style="width:20%;">전공</div>
                  <div class="title font-weight-bold text-center eduTitle" style="width:35%;">학점(논문명)</div>
                </div>
                <div class="d-flex flex-row" v-for="item in dataList.eduList" :key="item.num" >
                  <div
                    class="subtitle-1 font-weight-bold text-center my-auto"
                    style="width:10%;"
                  >
                    {{ item.poOrUnder}}
                  </div>
                  <div
                    class="subtitle-1 font-weight-bold text-center my-auto"
                    style="width:20%;"
                  >
                    {{ item.schoolName}}
                  </div>
                  <div
                    class="subtitle-1 font-weight-bold text-center my-auto"
                    style="width:15%;"
                    v-if="item.enrollYear !== '' || item.gradYear !== ''"
                  >
                    {{ item.enrollYear}}&nbsp;~&nbsp;<br><span>{{item.gradYear}}</span>
                  </div>
                  <div
                    class="subtitle-1 font-weight-bold text-center my-auto"
                    style="width:20%;"
                    v-if="item.subMajorType !== '' || item.subMajor !== '' || item.major !== ''"
                  >
                    <span class="mb-0">{{ item.major }}</span><br>
                    <span
                      class="mb-0"
                      style="font-size:0.9em"
                      v-if="item.subMajorType !== '없음' && item.subMajorType !== '' || item.subMajor !== ''"
                    >
                      ({{item.subMajorType}}:&nbsp;{{item.subMajor}})
                    </span>
                    <span
                      class="mb-0"
                      style="font-size:0.9em"
                      v-if="item.subMajorType === '없음'"
                    >
                      (기타전공 : {{item.subMajorType}})
                    </span>
                  </div>
                  <div
                    class="subtitle-1 font-weight-bold text-center my-auto"
                    style="width:35%;"
                    v-if="item.score !== '' || item.totalScore !== '' || item.thesis !== ''"
                  >
                    <span v-if="item.score !== '' || item.totalScore !== ''">{{ item.score }}&nbsp;/&nbsp;{{ item.totalScore}}</span><span>{{ item.thesis}}</span>
                  </div>
                </div>
              </v-card-text>
          </v-col>
        </v-row>

      <!-- 경력 -->
      <v-card-title class="display-1 font-weight-bold mb-0">경력</v-card-title>
        <v-row class="pb-3 px-3 mb-12">
          <v-col cols="12">
            <v-card-text class="d-flex flex-column pa-0">
              <div class="d-flex flex-row my-3">
                <div class="title font-weight-bold text-center eduTitle" style="width:20%;">회사명</div>
                <div class="title font-weight-bold text-center eduTitle" style="width:50%;">담당업무</div>
                <div class="title font-weight-bold text-center eduTitle" style="width:30%;">기간</div>
              </div>
              <div class="d-flex flex-row" v-for="item in dataList.careerList" :key="item.cNum" >
                <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:20%;">{{ item.company}}</div>
                <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:50%;">{{ item.job}}</div>
                <div
                  class="subtitle-1 font-weight-bold text-center my-auto"
                  style="width:30%;"
                  v-if="item.startDate !== '' || item.endDate !==''"
                >
                  {{ item.startDate}}&nbsp;~&nbsp;<span>{{item.endDate}}</span>
                </div>
              </div>
            </v-card-text>
          </v-col>
        </v-row>

      <!-- 어학 -->
      <v-card-title class="display-1 font-weight-bold mb-0">어학</v-card-title>
      <v-row class="pb-3 px-3 mb-12">
        <v-col cols="12">
          <v-card-text class="d-flex flex-column pa-0">
            <div class="d-flex flex-row my-3">
              <div class="title font-weight-bold text-center eduTitle" style="width:20%;">외국어명</div>
              <div class="title font-weight-bold text-center eduTitle" style="width:80%;">자격증 및 회화능력</div>
            </div>
            <div class="d-flex flex-row" v-for="item in dataList.foreignLangList" :key="item.fNum" >
              <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:20%;">{{ item.language}}</div>
              <div class="subtitle-1 font-weight-bold text-center my-auto" style="width:80%;">
                <div v-if="item.levelCon !== '' && item.levelCon !== null"><span>회화능력&nbsp;:&nbsp;</span><span>{{item.levelCon}}</span></div>
                <div v-if="item.testName !== '' && item.testName !== null"><span>{{ item.testName }}</span><br><span>({{ item.score }}{{ item.unit }}&nbsp;/&nbsp;{{ item.totalScore}}{{ item.unit }},&nbsp;취득일&nbsp;:&nbsp;{{item.gotDate}})</span></div>
              </div>
            </div>
          </v-card-text>
        </v-col>
        </v-row>

      <!-- 희망업무 -->
      <v-card-title class="display-1 font-weight-bold mb-0">희망업무</v-card-title>
      <v-row class="pb-3 px-3 mb-12">
        <v-col cols="12">
          <v-chip
            :color="getColor(job)"
            v-for="(job, index) in dataList.jobs"
            :key="index"
            class="mr-3"
          >
            {{ job }}
          </v-chip>
        </v-col>
      </v-row>

      <!-- 자기소개 -->
      <v-card-title class="display-1 font-weight-bold mb-0">자기소개</v-card-title>
      <v-row class="pb-3 px-3">
        <v-col cols="12">
          <v-textarea
            v-model="dataList.description"
            class="px-0 pa-0 blackClass"
            disabled
            outlined
            hide-details
          ></v-textarea>
        </v-col>
      </v-row>
      <!-- 버튼 모음 -->
      <div class="d-flex">
        <v-btn
          class="text--black font-weight-bold mx-auto"
          style="font-size:1em"
          text
          @click="close"
        >
          닫&nbsp;기
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['freelancer'],
  computed: {
    dataList () {
      return {
        koName: this.freelancer.koName,
        vnName: this.freelancer.vnName,
        birthday: this.freelancer.birthday,
        gender: this.freelancer.gender,
        email: this.freelancer.email,
        cphone: this.freelancer.cphone,
        address: this.freelancer.address,
        thumb: this.freelancer.thumb,
        description: this.textareaBack(this.freelancer.description),
        eduList: this.freelancer.eduList,
        careerList: this.freelancer.careerList,
        foreignLangList: this.freelancer.foreignLangList,
        jobs: this.freelancer.jobs
      }
    }
  },
  methods: {
    getColor (job) {
      if (job === '통역') return 'primary'
      else if (job === '번역') return 'info'
      else if (job === '단체강의') return 'success'
      else if (job === '개인과외') return 'secondary'
    },
    close () {
      this.$emit('close')
    },
    textareaBack (text) {
      let formatted = text.replace(/\<br\/\>/g, '\r\n')
      return formatted
    }
  }
}
</script>

<style>
  .eduTitle{
    border-bottom:1px solid #cccccc;
    height:45px;
  }
  .thumb{
    border: 1px solid #cccccc;
    height:90%;
    width:90%;
  }
  .imgBox{
    width:100%;
    height:100%;
  }
  .blackClass.theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea{
    color:black !important;
  }

  .theme--light.v-text-field.v-input--is-disabled .v-text-field__prefix, .theme--light.v-text-field.v-input--is-disabled .v-text-field__suffix{
    color:black;
  }

</style>
