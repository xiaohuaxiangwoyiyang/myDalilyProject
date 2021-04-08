/*
 * @Author: your name
 * @Date: 2021-03-12 16:46:26
 * @LastEditTime: 2021-03-25 09:42:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/views/portal/coms/left/index.js
 */
import { select } from 'd3';
import { LEFT_PATH, RIGHT_PATH } from '../../config';
import ImageLeftTag from '@/assets/images/left-tag.svg';
import ImageRightTag from '@/assets/images/right-tag.svg';

class List {
  constructor(root) {
    this.root = select(root);
    this.width = 858;
    this.height = 806;
    this.svg = this.root.append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, this.width, this.height].join(','));

    //
    this.setDefaultData();
  }

  setDefaultData() {
    //设置渐变色渐变坐标
    this.linearGradientAxisMap = {
      x1: '100%',
      x2: '0%',
      y1: '50%',
      y2: '50%',
    };
  }
  
  appendLinearGradient(defs, id, stopArr, axisMap) {
    const gradient = defs.append('linearGradient')
        .attr('id', id)
        .attr('x1', axisMap?.x1 || this.linearGradientAxisMap['x1'])
        .attr('x2', axisMap?.x2 || this.linearGradientAxisMap['x2'])
        .attr('y1', axisMap?.y1 || this.linearGradientAxisMap['y1'])
        .attr('y2', axisMap?.y2 || this.linearGradientAxisMap['y2']) 
        .call(linearGradient => {
          stopArr.forEach(item => {
            linearGradient.append('stop')
              .attr('stop-color', item.color)
              .attr('offset', item.offset)
              .attr('stop-opacity', item.opacity);
          });
        });
  }

  //高亮显示某一项
  hightLight(highlightIndex) {
    this.root.selectAll('.product-item')
      .each((d, index, g) => {
        const currentGroup = select(g[index]);
        if(highlightIndex === index) {
          currentGroup.classed('active-product-item', true);
        }
        else {
          currentGroup.classed('active-product-item', false);
        }
      });
  }

  clearHighLight() {
    this.hightLight(-1);
  }

}

class LeftList extends List {
  constructor(root) {
    super(root);
    this.init();
  }
  
  init() {
    this.createDefs();
  }
  
  //创建渐变色
  createDefs() {
    const linearGradientStop = [
      {
        offset: '0%',
        opacity: 1,
      },
      {
        offset: '100%',
        opacity: 0,
      },
    ];

    const defs = this.svg.append('defs');

    //添加border渐变
    this.appendLinearGradient(
      defs,
      'leftBorderLinearGradient',
      linearGradientStop.map(item => {
        item.color = '#00D5FF';
        return item;
      }),
    );
    
    //添加高亮颜色填充渐变
    this.appendLinearGradient(
      defs,
      'leftHighlightLinearGradient',
      linearGradientStop.map((item, index) => {
        item.color = index === 0 ? '#00D5FF' : '#051433';
        return item;
      }),
    );
    
    //添加背景色渐变
    this.appendLinearGradient(
      defs,
      'leftFillLinearGradient',
      linearGradientStop.map((item, index) => {
        item.color = '#051433';
        return item;
      }),
    );
  }

  //
  setData(data) {
    //先clear画布
    this.svg.selectAll('g').remove();
    //
    this.svg.selectAll('g')
      .data(LEFT_PATH)
      .enter()
      .append('g')
      .each((path, i, group) => {
        const { d, width, offsetX } = path;
        const itemGroup = select(group[i])
                            .attr('class', 'product-item');
        //添加框
        itemGroup.append('path')
          .attr('d', d)
          .attr('class', 'product-box left-product-box');

        //添加文字内容
        if(data[i]) {
          const { name, children, icon } = data[i];
          const productInfoDiv = itemGroup.append('foreignObject')
            .attr('width', width)
            .attr('height', '10%')
            .attr('class', 'product-container')
            .attr('y', `${i * 10}%`)
            .attr('x', offsetX)
            .append('xhtml:div')
            .attr('class', 'product-info');
          if(children && children.length) {
            productInfoDiv.append('img')
              .attr('class', 'group-icon')
              .attr('src', ImageLeftTag);
          }
          productInfoDiv.append('span')
            .attr('class', 'product-name')
            .html(name);
          productInfoDiv.append('svg')
            .attr('class', 'icon')
            .attr('aria-hidden', true)
            .append('use')
            .attr('xlink:href', `#icon-${icon}`);
        }

        //添加click事件
        itemGroup.on('click', () => {
          this.hightLight(i);
          
        });
      
      });
    
  }
}

class RightList extends List {
  constructor(root) {
    super(root);
    this.init();
  }

  init() {
    this.createDefs();
  }
  
  //创建渐变色
  createDefs() {
    const linearGradientStop = [
      {
        offset: '0%',
        opacity: 0,
      },
      {
        offset: '100%',
        opacity: 1,
      },
    ];

    const defs = this.svg.append('defs');

    //创建border渐变色
    this.appendLinearGradient(
      defs,
      'rightBorderLinearGradient',
      linearGradientStop.map(item => {
        item.color = '#00D5FF';
        return item;
      }),
    );

    //创建填充色
    this.appendLinearGradient(
      defs,
      'rightFillLinearGradient',
      linearGradientStop.map(item => {
        item.color = '#051433';
        return item;
      }),
    );

    //添加高亮颜色填充渐变
    this.appendLinearGradient(
      defs,
      'rightHighlightLinearGradient',
      linearGradientStop.map((item, index) => {
        item.color = index === 0 ? '#051433' : '#00D5FF';
        return item;
      }),
    );
    
  }

  setData(data) {
    //先clear画布
    this.svg.selectAll('g').remove();
    //
    this.svg.selectAll('g')
      .data(RIGHT_PATH)
      .enter()
      .append('g')
      .each((path, i, group) => {
        const { d, width, offsetX } = path;
        const itemGroup = select(group[i])
                            .attr('class', 'product-item');
         //添加框
        itemGroup.append('path')
          .attr('d', d)
          .attr('class', 'product-box right-product-box');
 
         //添加文字内容
        if(data[i]) {
          const { name, children, icon } = data[i];
          const productInfoDiv = itemGroup.append('foreignObject')
            .attr('width', width)
            .attr('height', `${100/9}%`)
            .attr('class', 'product-container')
            .attr('y', `${i * 100 / 9}%`)
            .attr('x', offsetX)
            .append('xhtml:div')
            .attr('class', 'product-info');

          productInfoDiv.append('svg')
            .attr('class', 'icon')
            .attr('aria-hidden', true)
            .append('use')
            .attr('xlink:href', `#icon-${icon}`);

          productInfoDiv.append('span')
            .attr('class', 'product-name')
            .html(name);
           
          if(children && children.length) {
            productInfoDiv.append('img')
              .attr('class', 'group-icon')
              .attr('src', ImageRightTag);
          }
        }
 
         //添加click事件
        itemGroup.on('click', () => {
          this.hightLight(i);
             
        });
      });
  }
}

export {
  LeftList,
  RightList,
};