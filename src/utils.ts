import * as THREE from 'three';
import { AxisGridHelper } from './helpers/AxisGridHelper';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

export function makeXYZGUI(
  gui: GUI,
  vector3: THREE.Vector3,
  name: string,
  onChangeFn: (value: THREE.Vector3) => void,
) {
  const folder = gui.addFolder(name);
  folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
  folder.add(vector3, 'y', -10, 10).onChange(onChangeFn);
  folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
  folder.open();
}
