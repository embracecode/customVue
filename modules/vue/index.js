import { getFirstNodes } from "./shared/utils"
import reactive from "./reactive"
import pools, { eventPools, expressPools } from "./pools"
import event from './event'
import { render } from './render'
const Vue = { 
    createApp
}
export function createApp(component){
    const vm = {}
    console.log(component, '组件实例');
    const { data, methods, template } = component

    vm.mount = mount
    vm.$nodes = createNode(template)

    const init = () => {
        reactive(vm, data)
        pools(vm, methods)
        event(vm)
        render(vm)
    }
    init()

    return vm
} 
// 
function createNode(template){
    const _temNodes = document.createElement('div')
    _temNodes.innerHTML = template
    // return getFirstNodes(_temNodes)
    // console.log(getFirstNodes(_temNodes) === _temNodes.firstElementChild, '第一个元素子节点' ); // true
    return _temNodes.firstElementChild
}
function mount(el){
    document.querySelector(el).appendChild(this.$nodes)
}
export default Vue