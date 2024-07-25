import './index.css';

import * as THREE from 'three';
import { resizeRendererToDisplaySize } from './utils';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ColorGUIHelper } from './helpers/ColorGUIHelper';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 40;
const aspect = canvas.clientWidth / canvas.clientHeight; // the canvas default
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

const scene = new THREE.Scene();

const gui = new GUI();

{
  const planeSize = 40;
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'https://threejs.org/manual/examples/resources/images/checker.png',
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.repeat.set(planeSize / 2, planeSize / 2);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  scene.add(mesh);
}

{
  const cubeSize = 4;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
  const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
  scene.add(mesh);
}

{
  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(
    sphereRadius,
    sphereWidthDivisions,
    sphereHeightDivisions,
  );
  const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
  const mesh = new THREE.Mesh(sphereGeo, sphereMat);
  mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  scene.add(mesh);
}

{
  const intensity = 1;
  const light = new THREE.DirectionalLight(0xffffff, intensity);

  light.position.set(0, 10, 0);

  light.target.position.set(-5, 0, 0);

  scene.add(light);
  scene.add(light.target);

  const helper = new THREE.DirectionalLightHelper(light);
  scene.add(helper);

  gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('Color');
  gui.add(light, 'intensity', 0, 2, 0.01).name('Intensity');
  gui.add(light.target.position, 'x', -10, 10);
  gui.add(light.target.position, 'z', -10, 10);
  gui.add(light.target.position, 'y', 0, 10);
}

function render(time: number) {
  time *= 0.001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
