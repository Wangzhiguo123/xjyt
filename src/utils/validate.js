/*
 * @Description: 正则校验
 * @Date: 2021-08-31 17:47:11
 * @LastEditTime: 2021-09-08 14:11:35
 */
// 校验内容
export function validateTitle(value) {
  const reg =
    /^[\d\u4e00-\u9fa5\s\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、A-Za-z\s\`\~\!\#\$\%\^\&\*\(\)\_\[\]{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?]+$/;
  return reg.test(value);
}

// 校验数字
export function validateNum(value) {
  const reg = /^[\d]+$/;
  return reg.test(value);
}
