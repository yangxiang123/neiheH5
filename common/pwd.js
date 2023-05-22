(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lianlianpay = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * 杩炶繛爜鎺т欢SDK
   * @author LianLianFE
   * @date 2022-08-31
   * @version 1.0.2
   */
  var baseOptions = {
    host: {
      production: 'https://openweb.lianlianpay.com',
      development: 'http://localhost:3000/mpay-open-web',
      test: 'http://10.19.45.202:8088/mpay-open-web',
      ste: 'https://accpgw-ste.lianlianpay-inc.com/mpay-open-web'
    }
  };

  var createIframeId = function createIframeId() {
    return Date.now() + Math.random().toString(36).slice(-6);
  };

  const lianlianpay = {
    version: '1.0.0',
    iframeClassName: 'lianlianpay-password-iframe',
    iframe: null,
    messageCallback: function messageCallback() {},
    onMessage: function onMessage(event) {
      var data = event.data;

      switch (data.option) {
        case 'CLOSE':
          lianlianpay.closeIframe();
          break;

        case 'MESSAGE':
          lianlianpay.messageCallback({
            code: '0000',
            message: '鑾峰彇瀵嗙爜鎴愬姛',
            data: data.result
          });
          break;
      }
    },
    invokePasswordControl: function invokePasswordControl() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      console.log('call invokePasswordControl', options);

      if (!options.oidPartner) {
        throw new Error('璇疯緭鍏ュ晢鎴峰彿');
      }

      if (!options.passwordScene) {
        throw new Error('璇疯緭鍏ュ瘑鐮佷娇鐢ㄥ満鏅�');
      }

      if (!options.passwordElementToken) {
        throw new Error('璇疯緭鍏� Token');
      }

      if (typeof callback === 'function') {
        lianlianpay.messageCallback = callback;
      }

      var env = options.env || 'production'; // 鍒涘缓 iframe 鏃讹紝闇€瑕佸垹闄ょ幇瀛樼殑鎵€鏈� iframe 绐楀彛

      lianlianpay.closeIframe();
      var iframe = document.createElement('iframe');
      iframe.className = lianlianpay.iframeClassName;
      iframe.style.position = 'fixed';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.border = 'none';
      iframe.style.outline = 'none';
      var businessURL = "".concat(baseOptions.host[env], "/password");
      iframe.src = "".concat(businessURL);
      iframe.id = createIframeId();
      document.body.appendChild(iframe);
      lianlianpay.iframe = iframe;

      lianlianpay.iframe.onload = function () {
        lianlianpay.iframe.contentWindow.postMessage(_objectSpread2({
          uuid: 'LIANLIAN_ONLOAD',
          iframeId: iframe.id
        }, options), baseOptions.host[env]);
      };

      window.addEventListener('message', lianlianpay.onMessage);
      window.addEventListener('popstate', lianlianpay.closeIframe);
    },

    /**
     * 鍏抽棴 iframe锛屼紶 id 鍏抽棴褰撳墠锛屽惁鍒欏叧闂墍鏈�
     */
    closeIframe: function closeIframe() {
      // 鍒犻櫎鎵€鏈夌浉鍏崇殑iframe
      var iframes = document.getElementsByClassName(lianlianpay.iframeClassName);

      for (var i = 0; i < iframes.length; i++) {
        document.body.removeChild(iframes[i]);
      }

      window.removeEventListener('message', lianlianpay.onMessage);
      window.removeEventListener('popstate', lianlianpay.closeIframe);
    }
  };

  return lianlianpay;

}));