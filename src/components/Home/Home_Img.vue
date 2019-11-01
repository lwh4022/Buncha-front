<template>
  <v-row no-gutters justify="center" align="center">
    <v-col>
        <video
        class="videoClass"
        contain
        autoplay
        loop
        >
          <source src="@/assets/main_business.mp4" type="video/mp4">
        </video>
    </v-col>
    <v-col class="d-flex flex-column divOnImg">
      <!-- 모바일 위치 맞추기용 // 데스크탑에서는 사라짐 -->
      <p class="font-weight-bold justify-center mb-8 display-2">검증된 프리랜서를 선택하세요</p>
      <!-- 데스크탑 위치 맞추기용 // 모바일에서는 사라짐 -->
      <div class="hidden-md-and-down" style="height:5vh"></div>
      <v-btn color="info" class="headline pt-1 pb-2 ml-auto mr-auto" min-height="50px" max-height="100px" x-large><router-link :to="{name: 'jobEnroll'}" class="desktopMenu">업무 등록하러 가기</router-link></v-btn>
      <!-- 데스크탑 위치 맞추기용 // 모바일에서는 사라짐 -->
      <div class="hidden-md-and-down" style="height:30vh"></div>
    </v-col>
  </v-row>
</template>

<style scoped>
  .divOnImg{
    display:flex;
    position:absolute;
    z-index:2;
    justify-content: center;
    flex-direction:column;
    left: 1%;
    right: 1%;
    text-align:center;
  }
  .videoClass{
    opacity: 0.5;    
  }
  .desktopMenu{
    color:white;
    text-decoration:none;
  }
</style>
