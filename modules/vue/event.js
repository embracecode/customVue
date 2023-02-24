import { eventPools } from "./pools";

export default function (vm){
    console.log(eventPools, 'eventPools');
    for (let [node, info] of eventPools) {
        let { type, handler} = info
        vm[handler.name] = handler
        node.addEventListener(type, vm[handler.name], false)
    }
}