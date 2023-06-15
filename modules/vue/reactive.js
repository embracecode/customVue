import { updata } from "./render"

export default function(vm, data){
    vm.$data = data()
    for (const key in vm.$data) {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(newVal) {
                vm.$data[key] = newVal
                console.log(vm.$data[key], newVal, key, '2222')
                updata(vm, key)
            }
        })
    }
}