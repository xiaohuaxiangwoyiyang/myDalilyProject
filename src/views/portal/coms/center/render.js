import { 
  Scene,
  PerspectiveCamera, 
  WebGLRenderer,
  Vector3,
  Object3D
 } from 'three';
 import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { v4 as uuidv4 } from 'uuid';
import TWEEN from '@tweenjs/tween.js';


export default class BallScene {
  constructor(container) {
    this.container = container;
    const { width, height } = getComputedStyle(this.container);
    this.width = parseInt(width.replace('px', ''));
    this.height = parseInt(height.replace('px', ''));
    this.objects = [];
    this.targets = { sphere: [] };
    this.duration = 2000;
    this.animateId = null;
  }
  // 场景、相机、渲染器初始化
  init(nodes) {
    this.clear();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 45, this.width / this.height, 1, 10000 );

    this.camera.position.set(0, 0, 5000);
    this.camera.lookAt(this.scene.position);

    this.webglRenderer = new WebGLRenderer({ antialias:true, alpha: true });
    this.webglRenderer.setClearColor('#000', 0);

    this.webglRenderer.setSize( this.width, this.height );
    this.webglRenderer.setPixelRatio(1/*, window.devicePixelRatio */);
    this.webglRenderer.domElement.style.position = 'absolute';
    this.container.appendChild( this.webglRenderer.domElement );
    
    this.css3dRenderer = new CSS3DRenderer();
    this.css3dRenderer.setSize(this.width, this.height);
    this.container.appendChild(this.css3dRenderer.domElement);
    this.css3dOrbitControls = this.setOribitControls({
      autoRotate: true,
      autoRotateSpeed: 1,
      maxDistance: 10000,
      minDistance: 10,
      enableZoom: false
    });

    this.nodes = nodes;
    this.drawClustrt();
    this.animate();
  }

  setOribitControls = ({
    enabled = true,
    enableKeys = false,
    enableDamping = true,
    dampingFactor = 0.25,
    enableZoom = true,
    autoRotate = true,
    autoRotateSpeed = 1,
    screenSpacePanning = false,
    minDistance = 100,
    maxDistance = 1000,
    enablePan = true
  }) => {
    const orbitControls = new OrbitControls(this.camera, this.css3dRenderer.domElement);

    orbitControls.enabled = enabled;
    orbitControls.enableKeys = enableKeys;
    orbitControls.enableDamping = enableDamping;
    orbitControls.dampingFactor = dampingFactor;
    orbitControls.enableZoom = enableZoom;
    orbitControls.autoRotate = autoRotate;
    orbitControls.autoRotateSpeed = autoRotateSpeed;
    orbitControls.screenSpacePanning = screenSpacePanning;
    orbitControls.minDistance = minDistance;
    orbitControls.maxDistance = maxDistance;
    orbitControls.enablePan = enablePan;
    return orbitControls;
  }
  // 绘制
  drawClustrt() {
    this.setObjectWithRandomPosition();
    this.setSphereObjects();
    this.transform(this.targets.sphere, this.duration);
  }
  setSphereObjects() {
    this.targets.sphere.length = 0;
    const sphereVecotr3 = new Vector3();
    for (let i = 0, l = this.objects.length; i < l; i++) {
      const phi = Math.acos(-1 + (2 * i) / l);
      const theta = Math.sqrt(l * Math.PI) * phi;
      const object3d = new Object3D();
      object3d.position.setFromSphericalCoords(1000, phi, theta);
      sphereVecotr3.copy(object3d.position).multiplyScalar(2);
      object3d.lookAt(sphereVecotr3);
      this.targets.sphere.push(object3d);
    }
  }
  // 设置卡片的初始位置，并添加到场景中
  setObjectWithRandomPosition() {
    this.objects.length = 0;
    this.nodes.forEach((node) => {
      const divElement = this.createCss3DNodeEle(node);
      const Css3dObject = new CSS3DObject(divElement);
      Css3dObject.name = node;
      Css3dObject.userData = node;
      Css3dObject.position.set(this.randomPosition(5000), this.randomPosition(3000), this.randomPosition(2000));
      this.scene.add(Css3dObject);
      this.objects.push(Css3dObject);
    });
  }
  // 绘制卡片
  createCss3DNodeEle(item, styleObj) {
    const divElement = document.createElement('div');
    divElement.className = 'singleItemDivwrapper';
    divElement.setAttribute('id', uuidv4());
    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = item;
    divElement.appendChild(details);
    return divElement;
  }
  // 获取任意位置
  randomPosition(max = 4000) {
    return Math.random() * max - max / 2;
  }
  // 补间动画 分布呈球体的动画
  transform = (toTransformTargets, _durantion) => {
    TWEEN.removeAll();
    for (let i =0, l = this.objects.length; i < l; i++) {
      const object = this.objects[i];
      const target = toTransformTargets[i];
      new TWEEN.Tween(object.position)
        .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * _durantion + _durantion)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      new TWEEN.Tween(object.rotation)
        .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * _durantion + _durantion)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
      new TWEEN.Tween(this)
        .to({}, _durantion * 2)
        .onUpdate(() => {
          this.render();
        })
        .start();
    }
  }
  //渲染
  render() {
    this.webglRenderer.render(this.scene, this.camera);
    this.css3dRenderer.render(this.scene, this.camera);
  }
  // 动画效果
  animate() {
    this.render();
    this.animateId = requestAnimationFrame(this.animate.bind(this));
    TWEEN.update();
    this.css3dOrbitControls.update();
  }
  clear() {
    if(this.animateId) {
      cancelAnimationFrame(this.animateId);
    }
  }
}
