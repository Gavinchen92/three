/* eslint-disable @typescript-eslint/no-explicit-any */
export class ColorGUIHelper {
  prop: string;
  obj: Record<string, any>;

  constructor(obj: Record<string, any>, prop: string) {
    this.obj = obj;
    this.prop = prop;
  }

  get value() {
    return `#${this.obj[this.prop].getHexString()}`;
  }

  set value(hex: string) {
    this.obj[this.prop].set(hex);
  }
}
