
import { expressPools } from "./pools";

export function render (vm) {
    expressPools.forEach((info, node) => {
        _render(vm, node, info)
    })
}

export function updata (vm, key) {
    expressPools.forEach((info, node)=> {
        if (info.key === key) {
            _render(vm, node, info)
        }
    })
}
let executedMoreExpress = new Function('vm', 'node','complileValue',`
    with (vm) {
        node.textContent = complileValue;
    }
`)
function _render (vm, node, info) {
    // info {key: 'count', express: 'count + 1'} 
    // 把拿到的表达式的值组合起来
    /**
     * info
     * [{type: 'text', value: '字符串：'} ,{type: 'express', value: 'str'}]
     */
    // let complileValue = info.reduce((pre, {type, value})=>{
    //     if (type === 'text') {
    //         return pre + value
    //     } else {
    //         return pre + '${' + value + '}'
    //     }
    // }, '')
    // console.log(info, 'info', complileValue);
    // let _r = new Function('vm', 'node','complileValue',`
    //         with (vm) {
    //             node.textContent = ${complileValue};
    //         }
    //     `)
    // _r(vm, node, complileValue)
    // console.log(_r.toString())
    // 第一版 单个匹配表达式 xxxx{{ a }} xxxx 情况
    const { express, beforeValue, afterValue } = info
    const r = new Function('vm', 'node', 'beforeValue', 'afterValue',`
        {
            let a = '';
            with (vm) {
                a = ${express};
            };
            node.textContent = beforeValue + a + afterValue
        }
    `)
    r(vm, node, beforeValue, afterValue)
    console.log(r.toString())
    
}