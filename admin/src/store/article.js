/*
todo 主要用于文章展示换页和数据概览
@function setArticelDate <{page,data.max}> 设置存储文章
@function switchPage <{page}> 设置被展示的分页
@function resetPageData 清空存储的文章数据
@function setPageArticleData AJAX请求文章数据并进行存储和展示
@function findArticle <router> 通过传来的router查找对应文章用于概览、删除等功能
@function removeArticle <page,router> 删除文章时同时删除state中对应的文章数据
*/
import axios from 'axios';

const article = {
    state: () => ({
        activeArticle: [], //被展示的文章
        articleData: {}, //文章数据
        max: 0, //总个数
        overviewArticle: {} //概览
    }),
    mutations: {
        setArticelDate(state, {
            page,
            data,
            max
        }) {
            state.articleData[page] = data;
            if (!state.max) state.max = max;
        },
        resetPageData(state) {
            state.articleData = {};
        },
        switchPage(state, page) {
            state.activeArticle = state.articleData[page];
        },
        findArticle(state, router) {
            state.overviewArticle = state.activeArticle.find(item => item.router == router)
        },
        removeArticle(state, {
            page,
            router
        }) {
            state.activeArticle = state.activeArticle.filter(item => item.router != router)
            state.articleData[page] = state.articleData[page].filter(item => item.router != router)
        }
    },
    actions: {
        setPageArticleData({
            commit
        }, page) {
            axios.get(`/article/page/${page}`)
                .then((res) => {
                    commit('setArticelDate', {
                        page: page,
                        data: res.data.data,
                        max: res.data.max
                    })
                    commit('switchPage', page)
                });
        },
    }
}
export default article;