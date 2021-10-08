/*
 * @Description: kpi模块
 * @Date: 2021-08-31 16:45:54
 * @LastEditTime: 2021-09-15 17:43:15
 */
import * as request from "@/api/index";
const base1 = "/passkpi";
/**
 *
 * @returns 评价模型管理
 */
// 获取模型列表
export function getModelList(param) {
  return request.get(`${base1}/v1/evaluationmodel/page`, param);
}
// 获取评价模型详情
export function getModelDetail(param) {
  return request.get(`${base1}/v1/evaluationmodel/getDetail/${param.id}`, param);
}
// 禁用启用模型
export function setModelStatus({ id, code }) {
  return request.get(`${base1}/v1/evaluationmodel/setStatus/${id}/${code}`);
}
// 删除模型
export function deleteModel(id) {
  return request.deletefn(`${base1}/v1/evaluationmodel/delete/${id}`);
}
// 保存评价模型
export function addCommentModel(param) {
  return request.post(`${base1}/v1/evaluationmodel/submit`, param);
}
// 发布评价模型
export function publishCommentModel(id) {
  return request.get(`${base1}/v1/evaluationmodel/publish/${id}`);
}
// 获取检查单位列表
export function getAssessCycleList(param) {
  return request.get(`${base1}/v1/evaluationmodel/cycle-select`, param);
}
// 获取指标列表树集合
export function getModelExpressList(id) {
  return request.get(`${base1}/v1/modelMiddel/tree/${id}`);
}
// 获取指标列表选择集合
export function getModelExpressSelectList(id) {
  return request.get(`${base1}/v1/evaluationmodel/getIndexs/${id}`);
}
// 新增指标节点
export function addModelNode(param) {
  return request.post(`${base1}/v1/modelMiddel/insert`, param);
}
// 删除指标节点
export function deleteModelNode(id) {
  return request.deletefn(`${base1}/v1/modelMiddel/delete/${id}`);
}
// 修改指update标节点
export function updateModelNode(param) {
  return request.post(`${base1}/v1/modelMiddel/update`, param);
}
// 更新权重、基础分
export function updateBaseAndWeightScore(param) {
  return request.post(`${base1}/v1/modelMiddel/saveScore`, param);
}
/**
 * 指标库管理
 */
// 获取指标库列表数据
export function getExpressList(param) {
  return request.get(`${base1}/v1/indexs/page`, param);
}
// 获取指标库状态下拉
export function getExpressStatusList() {
  return request.get(`${base1}/v1/indexs/status-select`);
}
// 删除指标库列表数据
export function deleteExpress(param) {
  return request.deletefn(`${base1}/v1/indexs/${param}`);
}
// 导出指标库列表数据
export function exportExpress() {
  return request.get(`${base1}/v1/indexs/export`);
}
// 修改指标库列表数据状态
export function updateExpressStatus(param) {
  return request.put(`${base1}/v1/indexs`, param);
}
// 查看指标库列表关联模型
export function getRelativeCommentModal(param) {
  return request.get(`${base1}/v1/indexs/link-model-list/${param}`);
}
// 新增指标库
export function addExpress(param) {
  return request.post(`${base1}/v1/indexs`, param);
}
// 编辑指标库
export function updateExpress(param) {
  return request.put(`${base1}/v1/indexs`, param);
}
// 获取指标库详情
export function getExpressDetail(param) {
  return request.get(`${base1}/v1/indexs/detail/${param}`);
}
// 获取指标类型下拉
export function getExpressTypeSelect() {
  return request.get(`${base1}/v1/indexs/type-select`);
}
// 获取评价对象级别下拉
export function getCommentLevelSelect() {
  return request.get(`${base1}/v1/indexs/object-level-select`);
}
// 获取评价对象级别下拉
export function getCommentDimensionSelect(param) {
  return request.get(`${base1}/v1/indexs/object-select`, param);
}

/*指标配置*/
// 获取指标关联的对象级别
export function getFormulaObjectSelect(param) {
  return request.get(`${base1}/v1/indexs/formula-object-select/${param}`);
}
// 获取指标公式配置的指标下拉列表
export function getFormulaIndexSelect(param) {
  return request.get(`${base1}/v1/indexs/formula-index-select/${param}`);
}
// 获取评价对象参数下拉
export function getFormulaParamSelect() {
  return request.get(`${base1}/v1/indexs/formula-param-select`);
}
// 新增指标配置
export function addFormula(param) {
  return request.post(`${base1}/v1/indexs/add-formula`, param);
}

/**
 *
 * @returns 维度维护
 */
/*****业务管理*****/
// 业务列表查询
export function getBusinessList(param) {
  return request.post(`${base1}/v1/business/list`, param);
}
// 业务新增
export function addBusiness(param) {
  return request.post(`${base1}/v1/business/insert`, param);
}
// 业务更新
export function updateBusiness(param) {
  return request.post(`${base1}/v1/business/update`, param);
}
// 业务删除
export function deleteBusiness(query) {
  return request.deletefn(`${base1}/v1/business/delete/${query}`);
}

/** 场景管理 */
// 获取列表数据
export function getSceneList() {
  return request.get(`${base1}/v1/scenes/tree`);
}
// 场景节点新增
export function addScene(param) {
  return request.post(`${base1}/v1/scenes`, param);
}
// 业务更新
export function updateScene(param) {
  return request.put(`${base1}/v1/scenes`, param);
}
// 业务删除
export function deleteScene(query) {
  return request.deletefn(`${base1}/v1/scenes/${query}`);
}

/** 组织机构维度 */
// 获取列表数据
export function getOrganizaList() {
  return request.get(`${base1}/v1/orgLevels/tree`);
}
// 新增
export function addOrganiza(param) {
  return request.post(`${base1}/v1/orgLevels`, param);
}
// 更新
export function updateOrganiza(param) {
  return request.put(`${base1}/v1/orgLevels`, param);
}
// 删除
export function deleteOrganiza(query) {
  return request.deletefn(`${base1}/v1/orgLevels/${query}`);
}

/** 地质关系维度 */
// 获取列表数据
export function getGeologyList() {
  return request.post(`${base1}/v1/geology/list`);
}
// 地址维度节点新增
export function addGeology(param) {
  return request.post(`${base1}/v1/geology/insert`, param);
}
// 地址更新
export function updateGeology(param) {
  return request.post(`${base1}/v1/geology/update`, param);
}
// 地址删除
export function deleteGeology(query) {
  return request.deletefn(`${base1}/v1/geology/delete/${query}`);
}

/** 集输关系维度 */
// 获取列表数据
export function getTransportList() {
  return request.get(`${base1}/v1/gatherings/tree`);
}
// 新增
export function addTransport(param) {
  return request.post(`${base1}/v1/gatherings`, param);
}
// 更新
export function updateTransport(param) {
  return request.put(`${base1}/v1/gatherings`, param);
}
// 删除
export function deleteTransport(query) {
  return request.deletefn(`${base1}/v1/gatherings/${query}`);
}

/**组织机构维度关联 */
// 获取关联表格数据
export function getOrganizaRelativeList(param) {
  return request.get(`${base1}/v1/orgLevels/org-level-tree`, param);
}
// 新增关联表格数据
export function addOrganizaRelative(param) {
  return request.post(`${base1}/v1/orgLevels/link-org`, param);
}
// 更新关联表格数据
export function updateOrganizaRelative(param) {
  return request.put(`${base1}/v1/orgLevels/link-update`, param);
}
// 下载导入模板
export function downloadOrganizaTemplate() {
  return request.get(`${base1}/v1/orgLevels/import-template`);
}
// 导出模板
export function exportOrganizaTemplate() {
  return request.get(`${base1}/v1/orgLevels/export`);
}

/**\地址关系维度关联 */
// 获取关联表格数据
export function getGeologyRelativeList(param) {
  return request.post(`${base1}/v1/linkgeology/tree`, param);
}
// 修改关联表格数据
export function changeGeologyRelative(param) {
  return request.post(`${base1}/v1/linkgeology/saveOrUpdate`, param);
}
// 下载导入模板
export function downloadGeologyTemplate() {
  return request.get(`${base1}/v1/linkgeology/import-template`);
}
// 导出模板
export function exportGeologyTemplate() {
  return request.get(`${base1}/v1/geology/export`);
}

/**\集输关系维度关联 */
// 获取关联表格数据
export function getTransportRelativeList(param) {
  return request.get(`${base1}/v1/gatherings/unit-gathering-tree`, param);
}
// 新增关联表格数据
export function addTransportRelative(param) {
  return request.post(`${base1}/v1/gatherings/link-unit`, param);
}
// 更新关联表格数据
export function updateTransportRelative(param) {
  return request.put(`${base1}/v1/gatherings/link-update`, param);
}
// 下载导入模板
export function downloadTransportTemplate() {
  return request.get(`${base1}/v1/gatherings/import-template`);
}
// 导出模板
export function exportTransportTemplate() {
  return request.get(`${base1}/v1/gatherings/export`);
}

/**
 *
 * @returns 评价管理
 */
// 获取指标评价模型列表
export function getIndicatorAssessModelList(param) {
  return request.get(`${base1}/v1/assess/model-select`, param);
}
// 获取检查单位列表
export function getUnitlList(param) {
  return request.get(`${base1}/v1/assess/unit-select`, param);
}

// 获取评价管理分页列表
export function getAssessList(param) {
  return request.get(`${base1}/v1/assess/page`, param);
}
// 删除模型
export function deleteAssess(id) {
  return request.deletefn(`${base1}/v1/assess/delete/${id}`);
}
// 获取创建人列表
export function getCreateUserList(param) {
  return request.get(`${base1}/v1/assess/user-select`, param);
}
// 获取评价对象树
export function getObjectTree(param) {
  return request.get(`${base1}/v1/assess/object-select`, param);
}
// 添加评价对象
export function addAddObject(param) {
  return request.post(`${base1}/v1/assess/add-object`, param);
}
// 删除评价对象
export function removeObject(param) {
  return request.post(`${base1}/v1/assess/remove-object`, param);
}
// 获取评价模型树
export function getModelTree(param) {
  return request.get(`${base1}/v1/assess/model-tree/${param.id}`, {});
}
// 获取评价管理详情
export function getAssessDetail(param) {
  return request.get(`${base1}/v1/assess/detail/${param.id}`, {});
}
// 更新评价分
export function updateScore(param) {
  return request.post(`${base1}/v1/assess/update/detail`, param);
}
// 创建评价管理
export function createAssess(param) {
  return request.post(`${base1}/v1/assess`, param);
}
// 编辑评价管理
export function updateAssess(param) {
  return request.post(`${base1}/v1/assess/update`, param);
}
// 确认评价
export function confirmAssess(param) {
  return request.get(`${base1}/v1/assess/confirm/${param.id}`, {});
}
/**
 *
 * @returns 评价结果
 */
// 获取评价结果列表
export function getAssessResultList(param) {
  return request.get(`${base1}/v1/assessDetail/page`, param);
}
// 导出评价结果
export function exportAssessResult(param) {
  return request.get(`${base1}/v1/assessDetail/export`, param);
}
// 获取指标下拉列表
export function getIndexList(param) {
  return request.get(`${base1}/v1/assessDetail/index-select`, param);
}
// 获取集输单元树
export function getGatheringUnitTree(param) {
  return request.get(`${base1}/v1/assessDetail/gathering-unit-tree`, param);
}
// 获取地质单元树
export function getGeologyUnitTree(param) {
  return request.get(`${base1}/v1/assessDetail/geology-unit-tree`, param);
}