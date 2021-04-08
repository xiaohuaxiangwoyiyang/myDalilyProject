<!--
 * @Author: your name
 * @Date: 2021-03-11 17:12:19
 * @LastEditTime: 2021-03-18 20:57:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/views/portal/coms/left/index.vue
-->
<template>
  <div class="list-container">
    <div class="left-list" ref="leftList">
    </div>
    <div class="right-list" ref="rightList">
    </div>
    <!-- <ComModal :prop_Data="data_ProductInfo"/> -->
  </div>
</template>

<script>
// import ComModal from '../detail-modal/index';
import { LeftList, RightList } from './index.js';

export default {
  components: {
    // ComModal,
  },
  props: {
    propData: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      data_ProductInfo: {
        state: '已发布',
        children: [
          {
            'name': 'AiSort'
          },
          {
            'name': 'AiMask'
          }
        ],
        
      }
    };
  },
  created() {
  },
  mounted() {
    this.left = new LeftList(this.$refs.leftList);
    this.right = new RightList(this.$refs.rightList);
  },
  watch: {
    propData(newVal) {
      this.left.setData(newVal.slice(0, 10), 'left');
      this.right.setData(newVal.slice(10), 'right');
    }
  }
};
</script>

<style scoped lang="less">
@deep: ~">>>";
.list-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .left-list {
    width: 50%;
    height: 100%;
    @{deep} .product-info {
      right: 0;
    }
  }
  .right-list {
    width: 50%;
    height: 100%;
    @{deep} .product-info {
      left: 0;
    }
  }
  @{deep} .product-item {
    .product-box {
      stroke-width: 2;
      fill-opacity: 0.96;
    }
    .left-product-box {
      stroke: url(#leftBorderLinearGradient);
      fill: url(#leftFillLinearGradient);
    }
    .right-product-box {
      stroke: url(#rightBorderLinearGradient);
      fill: url(#rightFillLinearGradient);
    }
    .product-container {
      position: relative;
      cursor: pointer;
      .product-info {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        .group-icon {
          width: 36px;
        }
        .product-name {
          margin: 0 .16rem;
          color: #00D5FF;
          font-size: .2rem;
        }
      }
    }
  }
  @{deep} .active-product-item {
    .left-product-box {
      stroke: none;
      fill: url(#leftHighlightLinearGradient);
    }
    .right-product-box {
      stroke: none;
      fill: url(#rightHighlightLinearGradient);
    }
    .product-name {
      margin: 0 .16rem;
      color: #fff;
      font-size: .2rem;
    }
    .icon {
      fill: #fff;
    }
  }
}
</style>