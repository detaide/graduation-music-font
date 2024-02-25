import { Swipe, SwipeItem,Button,Popup } from 'vant';
let arr = [Swipe, SwipeItem,Button,Popup]
export default function getVant(app){
    arr.forEach((item)=>{
    return app.use(item)
})
}
// import { } from 'element-plus';
// let arr2 = [Swipe, SwipeItem,Button]
// export default function getElement(app){
//     arr.forEach((item)=>{
//     return app.use(item)
// })
// }
