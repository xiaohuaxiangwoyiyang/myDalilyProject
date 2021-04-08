<!--
 * @Author: your name
 * @Date: 2021-03-11 17:12:54
 * @LastEditTime: 2021-03-12 17:54:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/views/portal/coms/center/index.vue
-->
<template>
  <div class="center-container">
    <div class="word-container" ref="centerContainer"></div>
    <com-input />
  </div>
</template>

<script>
import BallScene from './render.js';
import info from '../../../../../public/data/productInfo';
import './index.css';
import ComInput from '../input/index.vue';

export default {
  name: 'centerContainer',
  components: {
    ComInput
  },
  mounted() {
    this.ballScene = new BallScene(this.$refs.centerContainer);
    this.queryData();
  },
  data() {
    return {
      nodes: []
    };
  },
  methods: {
    queryData() {
      info.forEach(item => {
        if (item.keywords.length) {
          item.keywords.forEach(v => this.nodes.push(v));
        }
      });
      // for(let i = 0; i < 50; i++) {
      //   this.nodes.push('数据安全态势感知');
      // }

      
      this.ballScene.init(this.nodes);
    }
  }
};
</script>

<style scoped lang="less">
.center-container {
  width: 8rem;
  height: 8.84rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('../../../../assets/images/center-bg.png') no-repeat;
  background-size: 100% 100%;
  .word-container {
    // width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }
  .input {
    .input_search {
      width: 320px;
      height: 56px;
      background: rgba(5,20,51,0.90);
      border-radius: 28px;
    }
  }
}
</style>

