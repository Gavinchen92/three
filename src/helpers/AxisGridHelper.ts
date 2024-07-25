import * as THREE from 'three';

export class AxisGridHelper {
  grid: THREE.GridHelper;
  axes: THREE.AxesHelper;
  private _visible: boolean;

  constructor(node: THREE.Object3D, units = 10) {
    const axes = new THREE.AxesHelper();
    if (!Array.isArray(axes.material)) {
      axes.material.depthTest = false;
    }
    axes.renderOrder = 2;
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    !Array.isArray(grid.material) && (grid.material.depthTest = false);
    grid.renderOrder = 1;
    node.add(grid);

    this.grid = grid;
    this.axes = axes;
    this.visible = false;
    this._visible = false;
  }

  get visible() {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    this.grid.visible = value;
    this.axes.visible = value;
  }
}
