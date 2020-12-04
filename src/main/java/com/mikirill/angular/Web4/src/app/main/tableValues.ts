export class TableValues {
  current_time;
  hit_result;
  r_value;
  script_time;
  x_value;
  y_value;
  constructor(x_value: number, y_value: number, r_value: number, current_time: string, script_time: number, hit_result: string) {
    this.x_value = x_value;
    this.y_value = y_value;
    this.r_value = r_value;
    this.current_time = current_time;
    this.script_time = script_time;
    this.hit_result = hit_result;
  }
}
