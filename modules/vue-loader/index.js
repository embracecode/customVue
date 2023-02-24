// 拿到 template 标签里面的全部内容
const regexp = /\<template\>(.+?)\<\/template\>/
// 拿到 script 标签里面的全部内容
const regExpScript = /\<script\>(.+?)\<\/script\>/
// 拿到 第一个大括号
const regFirstSign = /({)/
// 匹配\r\n 换行符 用于下面替换为空
const regEnter = /[\r\n]/g
module.exports = function (source) {
    const _sourec = source.replace(regEnter, '')
    const template = _sourec.match(regexp)[1]
    const script = _sourec.match(regExpScript)[1]
    // 把拿到的template标签里的内容添加到script 里面的去 
    const finalScript = script.replace(regFirstSign, '$1 template:' + '`'+ template + '`' + ',')
    console.log(finalScript, 'vueloader 处理')

    return finalScript
}