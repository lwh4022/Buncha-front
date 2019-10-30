<template>
  <v-container fluid class="pa-0">

    <!-- Header.vue -->
    <header-bar :windowXSize="windowXSize"></header-bar>

    <!-- FAQ -->
    <v-card class="mx-auto mt-12" style="width:1024px;">
      <div class="headline font-weight-bold py-12 pl-5">자주 묻는 질문</div>
      <!--질문 구역-->
      <div class="px-5 pb-5">
        <v-expansion-panels popout>

          <!-- 1번 질문 -->
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              <span>
                <v-icon class="text--white" style="color:#555900">fas fa-question-circle</v-icon>
                <!-- 제목 부분 -->
                &nbsp;&nbsp;&nbsp;업무등록은 어떻게 하나요?
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <!-- 답변 부분-->
              업무 등록은 홈페이지를 통해서 가능하며, 등록 후 심사를 거쳐 홈페이지에 게시됩니다.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 2번 질문 -->
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              <span>
                <v-icon class="text--white" style="color:#555900">fas fa-question-circle</v-icon>
                <!-- 제목 부분 -->
                &nbsp;&nbsp;&nbsp;프리랜서 등록 후 결과는 언제쯤 받아 볼 수 있을까요?
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <!-- 답변 부분-->
              내부 검토 후 답변까지 보통 1 ~ 2일 정도 소요가 됩니다. 최대한 빨리 답변 드릴 수 있도록 최선을 다하겠습니다.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 3번 질문 -->
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              <span>
                <v-icon class="text--white" style="color:#555900">fas fa-question-circle</v-icon>
                <!-- 제목 부분 -->
                &nbsp;&nbsp;&nbsp;파트너와 협의 시 어떤 도움을 받을 수 있을까요?
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <!-- 답변 부분-->
              아직까지 미팅 및 협의 시에 제공할 수 있는 서비스는 없습니다.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 4번 질문 -->
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              <span>
                <v-icon class="text--white" style="color:#555900">fas fa-question-circle</v-icon>
                <!-- 제목 부분 -->
                &nbsp;&nbsp;&nbsp;대금 지급과 관련 서비스가 있을까요?
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <!-- 답변 부분-->
              아직까지 대금 결제와 관련된 서비스가 없습니다.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- 5번 질문 -->
          <v-expansion-panel class="mb-2">
            <v-expansion-panel-header>
              <span>
                <v-icon class="text--white" style="color:#555900">fas fa-question-circle</v-icon>
                <!-- 제목 부분 -->
                &nbsp;&nbsp;&nbsp;회원 탈퇴 방법을 알고 싶습니다.
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pt-4">
              <!-- 답변 부분-->
              관리자에게 메일을 보내주시면 회원 탈퇴를 진행해 드리도록 하겠습니다.
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-card>

    <!-- 문의처-->
    <v-card class="mx-auto mt-12" style="width:1024px;height:350px;">
      <v-row>
        <v-col cols="6">
          <div class="headline font-weight-bold pa-4">도움이 더 필요하신가요?</div>
          <div class="pl-4">메일로 당신의 문의사항을 보내주세요</div>
        </v-col>
        <v-col cols="6">
          <v-card-text>
            <v-textarea
            v-model="contents"
            height="100%"
            label="문의사항을 입력해주세요"
            filled
            outlined
          ></v-textarea>
          <v-text-field
            v-model="email"
            label="답변 받으실 이메일을 적어주세요"
            :rules="[rules.emailCheck]"
            filled
            outlined
          ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="ml-auto" color="info" @click="submit">전송</v-btn>
            <a ref="mailTo" :href="mailTo" class="d-none"></a>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Header from '@/components/Header_Footer/Header'

export default {
  props: ['windowXSize'],
  data () {
    return {
      rules: {
        emailCheck: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '이메일 형식이 아닙니다'
        }
      },
      contents: '',
      email: '',
      mailTo: ''
    }
  },
  components: {
    'header-bar': Header
  },
  computed: {
    form () {
      return {
        contents: this.contents,
        email: this.email
      }
    }
  },
  methods: {
    submit () {
      let title = '고객이 보내온 이야기'
      let content = this.contents
      let emailToReceive = this.email
      this.mailTo = 'mailto:lwh4022@gmail.com&subject=' + title + '&body=' + content + '&20' + emailToReceive
      this.$refs.mailTo.click()
    }
  }
}
</script>
