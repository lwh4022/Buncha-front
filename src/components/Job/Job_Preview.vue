<template>
  <v-card max-width="800px" class="mx-auto my-auto">
    <!-- 내부 프레임-->
    <div class="pa-4">
      <!-- 업무 한줄 소개-->
      <div class="pa-3 mb-3" style="border:1px solid black;background-color:white;">
        <v-card-title class="pa-1">업무 한줄 소개</v-card-title>
        <v-row class="pa-0">
          <v-col cols="12">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field disabled v-model="singleLineIntro" outlined hide-details></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </div>

      <!-- 구인자정보 -->
      <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
        <v-card-title class="pa-1">구인자 정보</v-card-title>
        <v-row class="pa-0">
          <v-col cols="12" class="pb-0">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field
                v-model="comOrIndi"
                label="회사/개인"
                outlined
                style="width:10%"
                class="mr-1"
                disabled
                hide-details
              ></v-text-field>
              <v-text-field
                v-show="comOrIndi === '회사'"
                v-model="companyName"
                label="회사명"
                outlined
                style="width:10%;"
                class="mr-1"
                disabled
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="pic"
                label="담당자"
                style="width:10%"
                class="mr-1"
                outlined
                disabled
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="phone"
                label="전화번호"
                outlined
                class="mr-1"
                disabled
                hide-details
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="이메일"
                outlined
                disabled
                hide-details
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </div>

      <!-- 업무 정보-->
      <!-- 첫번째 줄 -->
      <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
        <v-card-title class="pa-1">업무 정보</v-card-title>
        <v-row>
          <v-col cols="12">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field
                v-model="jobType"
                label="업무종류"
                class="mr-1"
                outlined
                disabled
                hide-details
              ></v-text-field>
              <!-- 시작 일자 -->
              <v-text-field
                v-model="startDate"
                label="시작일자"
                class="mr-1"
                outlined
                disabled
                hide-details
              ></v-text-field>
              <!-- 종료 일자 -->
              <v-text-field
                v-model="endDate"
                label="종료일자"
                class="mr-1"
                disabled
                outlined
                hide-details
              ></v-text-field>
              <!-- 마감 일자 -->
              <v-text-field
                v-model="recruitDate"
                label="모집마감"
                disabled
                outlined
                hide-details
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- 업무 정보 -->
        <!-- 두번째 줄 -->
        <v-row>
          <v-col cols="2" class="py-0 pr-0">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field
                v-model="numRecruit"
                label="모집인원"
                suffix="명"
                class="mr-1"
                outlined
                hide-details
                disabled
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="10" class="py-0 pl-0">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field
                v-model="jobLocation"
                label="근무장소"
                disabled
                outlined
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- 업무 정보 -->
        <!-- 세번째 줄 -->
        <v-row>
          <v-col cols="2" class="py-0 pr-1">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field
                ref="salary"
                v-model="salary"
                label="급여"
                disabled
                outlined
                hide-details
              ></v-text-field>
            </v-card-text>
          </v-col>
          <v-col cols="4" class="py-0 pl-0">
            <v-card-text class="d-flex flex-row pa-0">
              <v-text-field
                v-show="!isNego"
                v-model="amount"
                label="금액"
                suffix="만원"
                class="centered-input pr-4"
                disabled
                outlined
                hide-details
              ></v-text-field>
              <v-checkbox
                v-show="isNego"
                v-model="isNego"
                label="협의"
              ></v-checkbox>
            </v-card-text>
          </v-col>
          <v-col cols="6"></v-col>
        </v-row>
      </div>

      <!-- 업무 상세 소개 -->
      <div class="pa-3 mb-3" style="border:1px solid black;background-color:white">
        <v-card-title class="pa-1">업무 상세 소개</v-card-title>
        <v-textarea
          v-model="jobDescription"
          wrap="hard"
          outlined
          hide-details
          disabled
          auto-grow
        ></v-textarea>
      </div>
      <!-- 버튼 모음 -->
      <v-card-actions>
        <v-btn class="text--black font-weight-bold mx-auto" text>닫&nbsp;&nbsp;기</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>

export default {
  props: ['jobInfo'],
  data () {
    return {
      singleLineIntro: jobInfo.singleLineIntro,
      comOrIndi: jobInfo.comOrIndi,
      companyName: jobInfo.companyName,
      pic: jobInfo.pic,
      phone: jobInfo.phone,
      email: jobInfo.email,
      jobType: jobInfo.jobType,
      startDate: jobInfo.startDate,
      endDate: jobInfo.endDate,
      recruitDate: jobInfo.recruitDate,
      numRecruit: jobInfo.numRecruit,
      jobLocation: jobInfo.jobLocation,
      salary: jobInfo.salary,
      amount: jobInfo.amount,
      isNego: jobInfo.isNego,
      jobDescription: jobInfo.jobDescription
    }
  }
}
</script>

<style>
  .centered-input input{
    text-align: right;
  }
  .theme--light.v-input--is-disabled .v-label, .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea{
    color:black;
  }
  .theme--light.v-text-field.v-input--is-disabled .v-text-field__prefix, .theme--light.v-text-field.v-input--is-disabled .v-text-field__suffix{
    color:black;
  }
</style>
