<!--
 * @Author: your name
 * @Date: 2021-03-11 13:49:59
 * @LastEditTime: 2021-03-17 15:53:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/views/prortal/index.vue
-->
<template>
  <div class="portal-screen-container">
    <!-- 标题 -->
    <div class="screen-header">
      <span class="title">AiGuard数据安全解决方案</span>
    </div>
    <!-- 主体内容 -->
    <div class="screen-body">
      
      <ComList :propData="data_Products"/>
      <ComCenter />
    </div>
  </div>
</template>

<script>
import ComList from './coms/list/index.vue';
import ComCenter from './coms/center/index.vue';

export default {
  components: {
    ComList,
    ComCenter,
  },
  data() {
    return {
      data_Products: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get('/data/productInfo.json').then(d => {
        const { data } = d;
        this.data_Products = data;
      }).catch(err => {
        this.data_Products = [];
      });
    }
  }
};
</script>

<style scoped lang="less">
.portal-screen-container {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/bg.png');
  background-size: 100% 100%;
  padding: 0 .4rem;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  .screen-header {
    width: 100%;
    height: .95rem;
    background: url('../../assets/images/header-bg.svg');
    background-size: 100% 100%;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      font-size: .36rem;
      color: #00D5FF;
      font-weight: 800;
    }
  }
  .screen-body {
    position: relative;
    width: 100%;
    height: 0;
    flex: 1;
    margin-top: .55rem;
    margin-bottom: 1.25rem;
    overflow: hidden;
    display: flex;
  }
}
</style>
