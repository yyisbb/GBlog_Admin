import { ApiHttp } from '../utils/http';

/**
 * 获取首页列表
 */
function getArticleList(page) {
    return ApiHttp('get', '/getAllArticle', { page });
}

/**
 * 登录
 */
function login(username, password) {
    return ApiHttp('post', '/login', { username, password });
}

/**
 * 获取博客文章分类数量
 */
function getBlogInfo() {
    return ApiHttp('get', '/getBlogInfo');
}

/**
 * 获取博客文章数据
 */
function getArticleInfo() {
    return ApiHttp('get', '/getArticleInfo');
}

/**
 * 获取博客文章数据
 */
function deleteArticleByIds(id) {
    return ApiHttp('post', '/admin/deleteArticle', { id });
}

/**
 * 获取个人设置
 */
function getSetting() {
    return ApiHttp('get', '/getSetting');
}

export { login, getSetting, getBlogInfo, getArticleInfo, getArticleList, deleteArticleByIds };
