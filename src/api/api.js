import { ApiHttp } from '../utils/http';

/**
 * 获取首页列表
 */
function getArticleList(page) {
    return ApiHttp('get', '/getAllArticle', { page });
}

/**
 * 根据ID获取文章详情
 */
function getArticleByID(id) {
    return ApiHttp('get', '/getArticle', { id });
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
 * 删除文章根据ID
 */
function deleteArticleByIds(id) {
    return ApiHttp('post', '/admin/deleteArticle', { id });
}
/**
 * 删除分类
 */
function deleteCategoryByIds(id) {
    return ApiHttp('post', '/admin/deleteCategory', { id });
}

/**
 * 更新分类
 */
function getCategoryByID(id) {
    return ApiHttp('get', '/getCategoryByID', { id });
}

/**
 * 新增文章
 */
function createArticle(article) {
    return ApiHttp('post', '/admin/createArticle', article);
}

/**
 * 修改博客文章数据
 */
function updateArticleById(article) {
    return ApiHttp('post', '/admin/updateArticle', article);
}
/**
 * 修改分类信息
 */
function updateCategoryById(category) {
    return ApiHttp('post', '/admin/updateCategory', category);
}

/**
 * 创建分类
 */
function createCategory(category) {
    return ApiHttp('post', '/admin/createCategory', category);
}

/**
 * 获取分类信息列表
 */
function getCategoryList() {
    return ApiHttp('get', '/getCategory');
}

/**
 * 获取个人设置
 */
function getSetting() {
    return ApiHttp('get', '/getSetting');
}

/**
 * 修改个人设置
 */
function updateSetting(setting) {
    return ApiHttp('post', '/admin/updateSetting', setting);
}

export {
    login,
    getSetting,
    getBlogInfo,
    getArticleInfo,
    getArticleList,
    updateArticleById,
    deleteArticleByIds,
    getArticleByID,
    getCategoryList,
    createArticle,
    deleteCategoryByIds,
    getCategoryByID,
    updateCategoryById,
    createCategory,
    updateSetting
};
