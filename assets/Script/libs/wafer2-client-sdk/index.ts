import constants from "./lib/constants";
import login from './lib/login'
import Session from "./lib/session";
import request from "./lib/request";

const qcloud:QcloudStatic = {
    login: login.login,
    setLoginUrl: login.setLoginUrl,
    LoginError: login.LoginError,

    clearSession: Session.clear,

    request: request.request,
    RequestError: request.RequestError,

}
export default qcloud;

// 导出错误类型码
Object.keys(constants).forEach(function (key) {
    if (key.indexOf('ERR_') === 0) {
        qcloud[key] = constants[key];
    }
});