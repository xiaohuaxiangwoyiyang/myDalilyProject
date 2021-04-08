<!--
 * @Author: your name
 * @Date: 2021-03-18 16:32:36
 * @LastEditTime: 2021-03-18 21:28:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/views/portal/coms/detail-modal/index.vue
-->
<template>
  <div class="detail-modal">
    <img src="../../../../assets/images/modal.svg" class="border border-top"/>
    <div class="product-container">
      <p class="title">{{cpd_ProductName}}</p>
      <div 
        class="state-container"
        :class="{'publish-state-container': prop_Data.state === '已发布',}"
      >
        <svg class="icon state-icon" aria-hidden="true">
          <use 
            v-if="prop_Data.state === '已发布'"
            xlink:href="#icon-publish"
          ></use>
          <use 
            v-else
            xlink:href="#icon-unpublish"
          ></use>
        </svg>
        <span>{{prop_Data.state}}</span>
      </div>
      
    </div>
    <img src="../../../../assets/images/modal.svg" class="border"/>
  </div>
</template>

<script>

export default {
  props: {
    prop_Data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {

    };
  },
  computed: {
    cpd_ProductName() {
      if(this.prop_Data.children) {
        return this.prop_Data.children.map(item => item.name).join(' + ');
      }
      return this.prop_Data.name;
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
   
  },
};
</script>

<style scoped lang="less">
.detail-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4.5rem;
  height: auto;
  background: rgba(5,20,51,0.90);
  .border {
    width: 100%;
  }
  .border-top {
    transform: rotate(-180deg);
  }
  .product-container {
    margin-top: .3rem;
    padding: 0 .32rem;
    .title {
      color: #fff;
      font-size: .24rem;
      font-weight: 800;
    }
    .state-container {
      display: inline-block;
      margin-top: .16rem;
      color: #FDFF78;
      padding: 3px 8px;
      border: 1px solid #FDFF78;
      border-radius: 14px;
      .state-icon {
        font-size: .14rem;
      }
      span {
        margin-left: 4px; 
        font-size: .14rem;
      }
    }
    .publish-state-container {
      color: #00D5FF;
      border: 1px solid #00D5FF;
    }

  }
}
</style>
