
import React, {
    Component,
    PropTypes
} from 'react'

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TextInput,
    ListView,
    Switch,
    TouchableOpacity,
    FlatList
} from 'react-native'

import { observable } from "mobx";
import { observer } from 'mobx-react/native';
import SharedList from './stores/TodoList';

@observer
class TodoApp extends Component {

    constructor(props) {
        super(props);
        // 多加一条记录
        props.list.addTodo();
    }

    render() {
        // 这里用observer包裹，非常关键！ 参看这里：
        //https://github.com/SangKa/mobx-docs-cn/blob/master/docs/best/react.md#mobx-只会为-observer-组件追踪数据存取如果数据是直接通过-render-进行存取的
        const ItemRenderer = observer(({ item, index }) => (
            <View style={styles.todo} key={item.id}>
                <View>
                    <Switch onValueChange={() => item.toggle()} value={item.done} />
                </View>
                <View>
                    <Text>{item.text}</Text>
                </View>
            </View>
        )
        )

        return (
            <View style={styles.container} >
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => this.props.list.addTodo()} style={styles.add}>
                        <Text>+ Add a todo</Text>
                    </TouchableOpacity>
                    <View style={styles.hide}>
                        <Text>Hide done</Text>
                        <Switch
                            onValueChange={(value) => this.props.list.toggleHidden()}
                            value={this.props.list.isHideDone} />
                    </View>
                </View>

                <FlatList
                    data={this.props.list.shownList}
                    renderItem={({ item, index }) => <ItemRenderer item={item} index={index} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    add: {
        flex: 1,
        padding: 10
    },
    hide: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    options: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 30
    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    }
});

export default class App extends React.Component {
    render() {
        return <TodoApp list={SharedList} />;
    }
}