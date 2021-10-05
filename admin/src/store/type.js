/*
todo 存储文章类型
*/
import axios from 'axios';

const article = {
    state: () => ({
        type: [], //选择器选择的文章类型
        typeData: [], //数据库读取到的文章类型
    }),
    mutations: {
        setType(state, type) {
            state.typeData = type;
        },
        changeType(state, type) {
            state.type = type;
        },
        removeType(state, index) {
            state.typeData.splice(index, 1)
        },
        addType(state, type) {
            state.typeData.unshift({
                type: type,
                time: new Date()
            })
        }
    },
    actions: {
        getType(store) {
            axios.get('/type').then(res => {
                store.commit('setType', res.data.data)
            })
        }
    }
};
export default article;