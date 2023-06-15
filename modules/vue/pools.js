
import { vEvent } from './shared/propsTypes'
import { checkFnHasArgs, checkMoreExpressIsincludesDataKey } from './shared/utils'

export const eventPools = new Map()

export const expressPools = new Map()

/** 
 * 
 * eventPools: [
 *      {
 *          button: {
 *              type: cilck
 *              handler: methdos.xxxx.bind(vm, ...args)
 *          }  
 *      }
 * ]
 * 
 * expressPools: [
 *      {
 *          h1: {
 *              key: [count],
 *              express: count + 1
 *          }
 *      }
 * ]
 * 
 * 
*/
// /\{\{((?:.|\r?\n)+?)\}\}/g
// 匹配双大括号里面的内容  
const regExpress = /\{\{((?:.|\r?\n)+?)\}\}/g
const regExp = /\{\{(.+?)\}\}/
// 匹配 双大括号前面的内容 双大括号内容 及双大括号后面的内容
const regExpAll = /(.*)\{\{(.+?)\}\}(.*)/
export default function(vm, methdos){
    const { $nodes, $data } = vm
    const allNodes = $nodes.querySelectorAll('*')
    const { vClick } = vEvent
    let allExecValue = []
    allNodes.forEach(node => {
        const vExpress = node.textContent
        allExecValue = executedText($data, vExpress)
        const vEventVal = node.getAttribute(`@${vClick}`)
        if (allExecValue.key) {
            expressPools.set(node, allExecValue)
        }
        // 匹配到的事件 加入到事件数据池
        if (vEventVal) {
            const handlerInfo = checkFnHasArgs(vEventVal)
            // 根据事件有无参数 判断走的逻辑
            let handler,params
            if (handlerInfo) {
                params = handlerInfo.prames
                handler = methdos[handlerInfo.methodsName].bind(vm)
            } else {
                handler = methdos[vEventVal].bind(vm)
            }
            handler && eventPools.set(node, {
                type: vClick,
                handler: handler,
                params: params
            })
            node.removeAttribute(`@${vClick}`)
        }
    });
}
// 处理node节点里面的字符串  字符串{{num}}字符串{{count}}字符串
function executedText(data, params) {
    let allExecValue = []
    let execValue
    regExpress.lastIndex = 0
    let lastIndex = 0
    // 正表达式捕获
    while (execValue = regExpress.exec(params)) {
        let index = execValue.index
        // 获取到的字符串
        if (index > lastIndex) { // 文本
            allExecValue.push(JSON.stringify(params.slice(lastIndex, index)))
        }
        // 获取的是{{}}花括号里面的内容
        allExecValue.push(`_s(${execValue[1].trim()})`)
        lastIndex = index + execValue[0].length
    }
    // 获取到的字符串
    if (lastIndex < params.length) {
        allExecValue.push(JSON.stringify(params.slice(lastIndex)))
    }
    // 把 node节点   字符串{{num}}字符串{{count}}字符串 处理成想要的样式
    /**
     * {
     *    obj = {  
     *        key: [num,count],
    *         express
     *    }
     */
    let obj = checkMoreExpressIsincludesDataKey(data, allExecValue.join('+'))
    return obj
}