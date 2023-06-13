<template>
    <div>
        <h1>{{ count + 1 }}</h1>
        <h1>{{ count + 2 }}</h1>
        <h1>{{ count }} 22222 {{ num }}</h1>
        <h1>{{ count }}</h1>
        <h2>字符串：{{ str }}</h2>
        <h2>无表达式</h2>
        <button @click="plus(1,2,3)">加1</button>
        <button @click="minus(2)">减二</button>
        <button @click="strPlus('字符串', '拼接')">字符串</button>
        <button @click="add100($event,1)">加100</button>
        <button @click="noparams()">无参数</button>
    </div>
</template>
<script>
    export default {
        data() { 
            return {
                count: 0,
                num: 10,
                str: '我是'
            }
        },
        methods: {
            plus(value,a,b){
                this.count  = this.count + value + a + b
            },
            minus(value) {
                console.log(this.count,value, '减法');
                this.count -= value
            },
            add100(e, b){
                console.log(e,b,1111111);
                this.count += 100
            },
            strPlus(a, b){
                this.str = this.str + a + b
            },
            noparams(e){
                console.log(e);
            }
        }
    }
</script>