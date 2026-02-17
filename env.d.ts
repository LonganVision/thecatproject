// 告诉 TS：只要是 .module.css 结尾的文件，都导出一个 key 为 string, value 为 string 的对象
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
