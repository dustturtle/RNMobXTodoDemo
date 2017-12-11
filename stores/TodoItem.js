import {observable, action, computed} from 'mobx';
import {useStrict} from 'mobx';
useStrict(true);

// todoItem model.
export default class TodoItem
{
    // 提供一个构造器方法用于方便创建对象；默认都从构造器方法创建。
    constructor(text,done,index){
        this.done = done?done:false;
        this.text = text?text:'';
        this.id = index;
        this.key = index;
    }

    @observable done;
    @observable text;
    id;
    key;

    // 使用action来操作，语义更清晰！
    @action toggle() {
        console.log('toggle in item, done='+this.done)
        this.done = !this.done;
        console.log('2-toggle in item, done='+this.done)
    }
}