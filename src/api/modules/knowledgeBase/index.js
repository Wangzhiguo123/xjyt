/*
 * @Description: 知识库接口
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-18 10:25:24
 * @LastEditTime: 2021-08-27 10:27:12
 */
import * as request from "@/api/index";
/**
 * 
 * @returns 知识库查询
 */
export function getSearchList(query){
  return request.get('/v1/article/search/searchList', query)
}
// 获取所有分类列表
export function getAllClassifyList(){
  return request.get('/v1/classification/getAllClassificationList')
}

/**
 *
 * 知识库管理
 */

// 获取作者下拉列表数据
export function getAuthorList() {
  return request.post("/v1/article/getAuthorList");
}
// 获取类别下拉列表数据
export function getClassificationList() {
  return request.post("/v1/article/getClassificationList");
}
// 获取标签下拉列表数据
export function getLabelList() {
  return request.post("/v1/article/getLabelList");
}
// 获取知识库列表
export function getKnowledgeBaseList(param) {
  return request.post("/v1/article/getArticlePage", param);
}
// 删除知识库列表文章
export function deleteArticle(param) {
  return request.post("/v1/article/deleteArticle", param);
}


// 知识库新增 关联文章查询
export function getNotBindLinkArticleList(param) {
  return request.post("/v1/article/getNotBindLinkArticleList", param);
}

// 知识库新增 保存草稿
export function saveAsDraft(param) {
  return request.post("/v1/article/insertArticle", param);
}
// 知识库新增 发布文章
export function publishArticle(param) {
  return request.post("/v1/article/publishOrUnPublishArticle", param);
}
// 知识库新增 获取编辑文章信息
export function getArticleInfo(param) {
  return request.post("/v1/article/getArticleObject", param);
}
// 知识库新增 编辑文章信息
export function updateArticle(param) {
  return request.post("/v1/article/updateArticle", param);
}


/**
 * 类别管理
 */
// 获取类别列表
export function getClassifyList(query) {
  return request.get("/v1/classification/getAllClassificationByPage", query);
}
// 删除类别
export function delClassifies(param) {
  return request.post("/v1/classification/delClassification", param);
}
// 新增标签
export function addClassify(param) {
  return request.post("/v1/classification/AddClassification", param);
}

/**
 * 标签管理
 */
// 获取标签列表
export function getLableList(query) {
  return request.get("/v1/label/getAllLabelByPage", query);
}
// 删除标签
export function delLables(param) {
  // param.headers = {
  //   "Content-Type": "application/json;charset=utf-8",
  // };
  return request.post("/v1/label/delLabelByIds", param);
}
// 新增标签
export function addLabel(param) {
  return request.post("/v1/label/addLabel", param);
}
