const serverUrl = 'http://wxtest.hx168.com.cn/v3/servlet'
const serverPath = 'http://wxtest.hx168.com.cn/v3/servlet/json'
const steps = [
  'uploadimg', 'idconfirm', 'stkacct',
  'tpbank', 'setpwd', 'risksurvey', 'visitsurvey',
  'success']
const stepMap = {
  'uploadimg': 'idCardCheck', // 上传照片
  'idconfirm': 'userCardInfo', // 信息确认
  'stkacct': 'openTypeSelect', // 账户选择
  'tpbank': 'bankBind', // 三方存管
  'setpwd': 'passwordSet', // 密码设置
  'risksurvey': 'riskAssess', // 风险测评
  'visitsurvey': 'visitSurvey', // 问卷回访
  'success': 'applyResult' // 结果页
}
// 数据字典检索key值
const dictionary = {
  'ethnic': 'ethnicType2',
  'edu': 'adapter2',
  'job': 'occupational2'
}

export {
  serverUrl,
  serverPath,
  steps,
  stepMap,
  dictionary
}
