import { eventPools, expressPools } from "./pools";

export default function (vm){
    console.log(eventPools, 'eventPools');
    console.log(expressPools, 'expressPools');
    for (let [node, info] of eventPools) {
        let { type, handler, params} = info
        vm[handler.name] = handler
        node.addEventListener(type, handlerProxy(vm[handler.name], params), false)
    }
}
// 时间处理函数代理 处理$event值 
function handlerProxy(callback, params){
    return function(e){
        // 有参数时判断是否含有$event 若含有则是去掉第一个把剩余参数传递过去
        if (params) {
            if (params.includes('$event')) {
                let index = params.indexOf('$event')
                let eventBefore = params.slice(0, index)
                let eventAfter = params.slice(index + 1)
                callback(...eventBefore, e, ...eventAfter)
            } else {
                callback(...params)
            }
        } else {
            callback(e)
        }
    }
}