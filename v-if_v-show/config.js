/**
 * propPools: [
 *      [
 *          dom : {
 *              type: 'if || show',
 *              data: express,
 *              
 *          }
 *      ]  
 * ]
 * 
 * eventPools: [
 *      [
 *          dom: {
 *                  type: 'click',
 *                  handler: 事件名称
 *               }
 *      ]
 * ]
 * 
 * 
 * 
 * 
 */


class App {
    constructor (options) {
        const { el, methods, data } = options
        this.el = document.querySelector(el)
        this.methods = methods,
        this.data = data
        this.propPools = new Map()
        this.eventPools = new Map()
        this.init(data)
    }
    init (data) {
        // 1. 初始化Data 做一层代理
        this.initData(data)
        // 2. 初始化dom
        this.initDom(this.el)
        // 3. 初始化视图
        this.initView()
        // 4. 初始化事件
        this.initEvent(this.eventPools)
    }
    initData (data) {
        for (let key in data) {
            Object.defineProperty(this, key, {
                get () {
                    console.log('获取值： ', key, this.data[key]);
                    return this.data[key]
                },
                set (newVal) {
                    console.log('设置值： ',key, this.data[key], newVal);
                    this.data[key] = newVal
                    this.DomChange(key, this.propPools)
                }
            })
        }
    }
    initDom(el){
        const childNodes = el.childNodes
        if (!childNodes.length) {
            return
        }
        childNodes.forEach(dom => {
            if (dom.nodeType === 1) {
                let attrValueIf = dom.getAttribute('v-if')
                let attrValueShow = dom.getAttribute('v-show')
                let attrValueEvent = dom.getAttribute('@click')
                if (attrValueIf) {
                    this.propPools.set(dom, {
                        type: 'if',
                        express: attrValueIf,
                        data: this.data[attrValueIf]
                    })
                } else if (attrValueShow) {
                    this.propPools.set(dom, {
                        type: 'show',
                        express: attrValueShow,
                        data: this.data[attrValueShow]
                    })
                }
                if (attrValueEvent) {
                    this.eventPools.set(dom, this.methods[attrValueEvent])
                }
            }
            this.initDom(dom)
        });
    }
    initView(){
        // 5. dom改变触发事件更新视图
        this.DomChange(null, this.propPools)
    }
    DomChange(data, propPools){
        if (!data) {
            for(const [ node, info ] of propPools) {
                switch (info.type) {
                    case 'if':
                        info.conment = document.createComment('v-if')
                        !info.data && node.parentNode.replaceChild(info.conment, node)
                        break;
                    case 'show':
                        !info.data && (node.style.display = 'none')
                        break;
                    default:
                        break;
                }
            }
            return
        }

        for(const [ node, info ] of propPools) {
            if (data === info.express) {
                switch (info.type) {
                    case 'if':
                        info.data ? node.parentNode.replaceChild(info.conment, node) : info.conment.parentNode.replaceChild(node, info.conment)
                        info.data = !info.data
                        break;
                    case 'show':
                        info.data ? node.style.display = 'none' : node.style.display = 'block'
                        info.data = !info.data
                        break;
                    default:
                        break;
                }
            }
        }

        
    }
    initEvent(eventPools){
        for(const [key, value] of eventPools){
            key.addEventListener('click',value.bind(this), false)
        }
    }
}