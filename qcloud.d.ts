
interface QcloudStatic {

  login(config: any)

  /**
   * 发送请求
   */
  request(config: {
      // 开发者服务器 url
      url: string,

      // HTTP 请求 Header , header 中不能设置 Referer
      header?: Object,

      // HTTP 请求中其他额外的 form data
      formData?: Object,

      // 接口调用成功的回调函数
      success?: Function,

      // 接口调用失败的回调函数
      fail?: Function,

      // 接口调用结束的回调函数（调用成功、失败都会执行）
      complete?: Function,

      login?: boolean
  });

  /**
   * 设置登录地址
   */
  setLoginUrl(url:string);

  /**
   * 登录错误
   */
  LoginError(type, message);

  /**
   * 清除session
   */
  clearSession(any);

  /**
   * 请求错误
   */
  RequestError(type, message);

}

