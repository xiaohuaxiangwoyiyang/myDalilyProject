<template>
  <div class="input-container">
    <div class="input-box">
      <input class="input" placeholder="请选择关键词搜索"/>
      <span class="icon"></span>

    </div>
    <transition>
      <ul class="input-list" v-show="data_IsShow">
        <li class="input-list-li">XXXXXX</li>
      </ul>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data_IsShow: true,
      };
    }
  };
</script>
<style scoped lang="less">
.input-container {
  position: absolute;
  top: 44%;
  left: 27%;
  // transform: translate(-50%, -50%);

  .input-box{
    width: 3.2rem;
    background: rgba(5,20,51,0.90);
    border-radius: 0.28rem;
    position: relative;
    padding: .14rem .24rem;
    .input {
      width: 80%;
      height: 100%;
      border: 0 none;
      font-family: PingFang-SC-Heavy;
      font-size: .2rem;
      color: #00D5FF;
      font-weight: 800;
      outline: medium;
      background: transparent;
    }
    .placeholder {
      font-family: PingFang-SC-Heavy;
      font-size: 18px;
      color: rgba(0,213,255,0.45);
      font-weight: 800;
    }
    .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .input-list {
    width: 100%;
    height: 4.76rem;
    background: rgba(5,20,51,0.90);
    border-radius: 0.05rem;
    padding: .14rem 0;
    list-style: none;
    position: absolute;
    left: 0;
    top: .6rem;
    .input-list-li {
      padding: .14rem .24rem;
      font-size: .2rem;
      color: rgba(0,213,255,1);
    }
  }
}
</style>
