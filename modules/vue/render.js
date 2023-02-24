
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
function _render (vm, node, info) {
    // info {key: 'count', express: 'count + 1'} 
    const { express, beforeValue, afterValue } = info
    // const r = new Function('vm', 'node',`
    //     with (vm) {
    //         node.textContent = ${beforeValue}${express}${afterValue};
    //     }
    // `)
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
}