import {observable, action, computed} from 'mobx';
import {useStrict} from 'mobx';
useStrict(true);
//import { reaction } from 'mobx/lib/api/autorun';

import TodoItem from './TodoItem';

class TodoList
{
    // 初始化给有一条记录; 这里未提供构造器方法。
    @observable list = [new TodoItem('Todo Item #1',false, 1)];
    @observable isHideDone = false;

    @action addTodo() {
        const newTodo = this.makeTodo();
        this.list = [newTodo, ...this.list];
    }

    @action makeTodo(index, isDone) 
    {
        const id = index? index:this.list.length+1;

        console.log('isDone='+isDone)
        var newItem = new TodoItem('Todo Item #' + id,isDone, id);

        return newItem;
    }

    @action toggleHidden() {
        this.isHideDone = !this.isHideDone;
    }


    @computed get shownList() {
        if (this.isHideDone) 
        {
            return this.list.filter((item) => {
                return !item.done;
            });
        } 
        else 
        {
            console.log(this.list)
            return this.list;
        }
    }
}

const SharedList = new TodoList();
export default SharedList;
// 多处共享时需要使用此方式导出保证只有一份实例；在我们这个场景下，可用可不用，都ok。