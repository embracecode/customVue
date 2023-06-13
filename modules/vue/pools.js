
import { vEvent } from './shared/propsTypes'
import { checkExpressIsIncludesData, checkExpressIsIncludesDataAndText, checkFnHasArgs } from './shared/utils'

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
 *              key: count,
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
    allNodes.forEach(node => {
        const vExpress = node.textContent
        
        const expMatchTextvalue = vExpress.match(regExpAll)
        const regMatchExpress = vExpress.match(regExpress)
        const vEventVal = node.getAttribute(`@${vClick}`)
        console.log(vEventVal, '事件值', vExpress.match(regExpress), expMatchTextvalue, 'regExpAll', $data);
        // if(expMatchValue){
        //     const expInfo = checkExpressIsIncludesData($data, expMatchValue[1].trim())
        //     expInfo && expressPools.set(node, expInfo)
        // }
        // 匹配到的表达式 加入到表达式数据池
        // if (condition) {
            
        // }
        // let expInfo = []
        // if (regMatchExpress) {
        //     regMatchExpress.forEach(item => {
        //         const expMatchValue = item.match(regExp)
        //         if(expMatchValue){
        //             expInfo.push(checkExpressIsIncludesData($data, expMatchValue[1].trim()))
        //         }
        //     })
        //     expInfo && expressPools.set(node, expInfo)
        // }
        if(expMatchTextvalue){
            const expInfo = checkExpressIsIncludesDataAndText($data, expMatchTextvalue[2].trim(), expMatchTextvalue[1], expMatchTextvalue[3])
            expInfo && expressPools.set(node, expInfo)
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
