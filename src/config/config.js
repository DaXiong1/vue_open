const serverUrl = 'http://wxtest.hx168.com.cn/v3/servlet'
const serverPath = 'http://wxtest.hx168.com.cn/v3/servlet/json'
const steps = [
  'uploadimg', 'idconfirm', 'stkacct',
  'tpbank', 'setpwd', 'risksurvey', 'visitsurvey',
  'success']
const stepMap = {
  'uploadimg': 'account/idCardCheck', // 上传照片
  'idconfirm': 'account/userCardInfo', // 信息确认
  'stkacct': 'account/openTypeSelect', // 账户选择
  'tpbank': 'account/bankBind', // 三方存管
  'setpwd': 'account/passwordSet', // 密码设置
  'risksurvey': 'account/riskAssess', // 风险测评
  'visitsurvey': 'account/visitSurvey', // 问卷回访
  'success': 'account/applyResult' // 结果页
}

export {
  serverUrl,
  serverPath,
  steps,
  stepMap
}
