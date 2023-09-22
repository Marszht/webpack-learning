// 可以看下 第三方库处理放方式

// console.log(process.argv);
const reg = /^([^=]+)=([\s\S]*)$/;
const params = process.argv.slice(2);
console.log(params);
console.log(process.env.a);
// export const a = {
//   name: 'mars',
// };
