/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AddQuestionDialogCode.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_code_question_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/code_question.js */ "./resources/js/models/code_question.js");
/* harmony import */ var _models_code_question_close_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/code_question_close.js */ "./resources/js/models/code_question_close.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "AddQuestionDialogCode",
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    startIndex: {
      type: Number,
      required: true
    },
    endIndex: {
      type: Number,
      required: true
    },
    lessonId: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      isDialogVisible: false,
      labelPosition: "left",
      question: {
        correct: {
          score: 0,
          text: "",
          comment: ""
        },
        incorrect: {
          comment: ""
        },
        closes: []
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])(["editedFilePath"])),
  watch: {
    isShown: {
      immediate: true,
      handler: function handler(newValue) {
        this.isDialogVisible = newValue;
      }
    },
    answer: {
      immediate: true,
      handler: function handler(newValue) {
        this.question.correct.text = newValue;
      }
    }
  },
  methods: {
    appendClose: function appendClose() {
      if (!this.question.closes) {
        this.question.closes = [];
      }

      this.question.closes.push({
        score: 0,
        text: "",
        comment: ""
      });
    },
    removeClose: function removeClose(index) {
      if (this.question.closes.length - 1 == index) {
        this.question.closes = this.question.closes.slice(0, index);
      } else {
        this.question.closes = this.question.closes.slice(0, index).concat(this.question.closes.slice(index + 1));
      }
    },
    register: function register() {
      var _this = this;

      this.isDialogVisible = false;
      var question = new _models_code_question_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.editedFilePath, this.startIndex, this.endIndex, this.question.correct.text, this.question.correct.score, this.question.correct.comment, this.question.incorrect.comment, this.lessonId, false);
      var that = this;
      question.store(function (response) {
        //console.log(response);
        if (response.status !== 200) {
          that.$notify.error({
            message: "問題の登録に失敗しました",
            duration: 3000
          });
          return;
        }

        var error = false;
        that.question.closes.forEach(function (close) {
          var codeQuestionClose = new _models_code_question_close_js__WEBPACK_IMPORTED_MODULE_1__["default"](close.text, close.score, close.comment, question.id);
          codeQuestionClose.store(function (response) {
            error = response.status === 200;
          });
        });

        if (error) {
          _this.$notify.error({
            message: "中間点の登録に失敗しました",
            duration: 3000
          });
        } else {
          _this.$notify.success({
            message: "問題を登録しました",
            duration: 3000
          });

          _this.$emit("added-question", {
            id: question.id,
            file_path: question.filePath,
            start_index: question.startIndex,
            end_index: question.endIndex,
            text: question.text,
            correct_comment: question.correctComment,
            score: question.score,
            incorrect_comment: question.incorrectComment,
            lesson_id: question.lessonId
          });
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIde.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddQuestionDialogCode_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddQuestionDialogCode.vue */ "./resources/js/components/AddQuestionDialogCode.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DevelopmentIdeConsole_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DevelopmentIdeConsole.vue */ "./resources/js/components/DevelopmentIdeConsole.vue");
/* harmony import */ var _DevelopmentIdeHeader_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DevelopmentIdeHeader.vue */ "./resources/js/components/DevelopmentIdeHeader.vue");
/* harmony import */ var _molecules_FileTree_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./molecules/FileTree.vue */ "./resources/js/components/molecules/FileTree.vue");
/* harmony import */ var _MarkdownEditor_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MarkdownEditor.vue */ "./resources/js/components/MarkdownEditor.vue");
/* harmony import */ var _SourceCodeEditorCreating_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SourceCodeEditorCreating.vue */ "./resources/js/components/SourceCodeEditorCreating.vue");
/* harmony import */ var _SourceCodeEditorCreatingContextMenu_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SourceCodeEditorCreatingContextMenu.vue */ "./resources/js/components/SourceCodeEditorCreatingContextMenu.vue");
/* harmony import */ var _stores_development_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../stores/development.js */ "./resources/js/stores/development.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _models_file__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../models/file */ "./resources/js/models/file.js");
/* harmony import */ var _models_lesson__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../models/lesson */ "./resources/js/models/lesson.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ __webpack_exports__["default"] = ({
  name: "DevelopmentIde",
  store: _stores_development_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  props: {
    lesson: {
      type: Object,
      required: true
    },
    questions: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    markdownTitle: {
      type: String,
      required: true
    },
    markdownUrl: {
      type: String
    },
    consolePort: {
      type: Number,
      required: true
    },
    hostPorts: {
      type: Array,
      required: true
    },
    containerPorts: {
      type: Array,
      required: true
    }
  },
  components: {
    AddQuestionDialogCode: _AddQuestionDialogCode_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    DevelopmentIdeConsole: _DevelopmentIdeConsole_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    DevelopmentIdeHeader: _DevelopmentIdeHeader_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    FileTree: _molecules_FileTree_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    MarkdownEditor: _MarkdownEditor_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    SourceCodeEditorCreating: _SourceCodeEditorCreating_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    SourceCodeEditorCreatingContextMenu: _SourceCodeEditorCreatingContextMenu_vue__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  data: function data() {
    return {
      addQuestionDialogCode: {
        isShown: false
      },
      blackout: {
        isVisible: false
      },
      delayedUpdateLesson: _.debounce(this.updateLesson, 1000),
      markdownEditor: {
        isVisible: false
      },
      sourceCodeEditor: {
        selectedStartIndex: 0,
        selectedEndIndex: 0
      },
      sourceCodeEditorCreatingContextMenu: {
        isShown: false,
        startIndex: 0,
        endIndex: 0,
        style: {
          position: "absolute",
          left: "0",
          top: "0"
        }
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_9__["mapGetters"])(["editedFileText"]), {
    questionAnswerCode: function questionAnswerCode() {
      if (!this.editedFileText) {
        return "";
      }

      return this.editedFileText.substring(this.sourceCodeEditor.selectedStartIndex, this.sourceCodeEditor.selectedEndIndex);
    }
  }),
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_9__["mapActions"])(["setEditedFile"]), {
    onclick: function onclick() {
      this.sourceCodeEditorCreatingContextMenu.isShown = false;
    },
    pushQuestion: function pushQuestion(question) {
      this.questions.push(question);
    },
    clickQuestionButton: function clickQuestionButton(questionId, button) {
      var _this = this;

      var question = this.questions.find(function (question) {
        return question.id == questionId;
      });

      if (!question) {
        return;
      }

      _models_file__WEBPACK_IMPORTED_MODULE_10__["default"].index({
        docker_container_id: this.lesson.docker_container_id,
        path: question.file_path
      }, function (response) {
        var file = new _models_file__WEBPACK_IMPORTED_MODULE_10__["default"](response.data.path, response.data.text, _this.lesson.docker_container_id);

        _this.setEditedFile(file);

        _this.markdownEditor.isVisible = false;
      });
    },
    updateBook: function updateBook(text) {
      this.lesson.book = text;
      this.delayedUpdateLesson();
    },
    updateLesson: function updateLesson() {
      var lesson = new _models_lesson__WEBPACK_IMPORTED_MODULE_11__["default"](this.lesson.tite, this.lesson.description, this.lesson.book, this.lesson.docker_container_id, this.lesson.user_name, this.lesson.console_port, this.lesson.user_id);
      lesson.id = this.lesson.id;
      lesson.update();
    },
    showSourceCodeEditorCreatingContextMenu: function showSourceCodeEditorCreatingContextMenu(x, y, startIndex, endIndex) {
      this.sourceCodeEditorCreatingContextMenu.isShown = true;
      this.sourceCodeEditorCreatingContextMenu.style.left = x + "px";
      this.sourceCodeEditorCreatingContextMenu.style.top = y + "px";
      this.sourceCodeEditor.selectedStartIndex = startIndex;
      this.sourceCodeEditor.selectedEndIndex = endIndex;
    },
    showAddQuestionDialogCode: function showAddQuestionDialogCode() {
      this.addQuestionDialogCode.isShown = true;
    },
    showBlackout: function showBlackout() {
      this.blackout.isVisible = true;
    },
    hideBlackout: function hideBlackout() {
      this.blackout.isVisible = false;
    },
    showMarkdownEditor: function showMarkdownEditor() {
      this.markdownEditor.isVisible = true;
    },
    hideMarkdownEditor: function hideMarkdownEditor() {
      this.markdownEditor.isVisible = false;
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "development-ide-console",
  props: {
    consolePort: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      activeConsoleIndex: 0,
      consoleCount: 1
    };
  },
  methods: {
    handleConsoleDropdownCommand: function handleConsoleDropdownCommand(command) {
      this.activeConsoleIndex = command;
    },
    addConsole: function addConsole() {
      ++this.consoleCount;
      this.activeConsoleIndex = this.consoleCount - 1;
    },
    isActiveConsole: function isActiveConsole(consoleId) {
      return this.activeConsoleIndex === consoleId - 1;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "DevelopmentIdeHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    urlTitle: {
      type: String,
      required: true
    },
    containerPorts: {
      type: Array,
      required: true
    },
    hostPorts: {
      type: Array,
      required: true
    }
  },
  methods: {
    handlePortDropdownCommand: function handlePortDropdownCommand(command) {
      open("http://localhost:".concat(command));
    },
    showMarkdown: function showMarkdown() {// this.$emit("show-markdown");
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MarkdownEditor.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_lesson_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/lesson.js */ "./resources/js/models/lesson.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
 // import MarkdownPreview from "./MarkdownPreview.vue";
// export default {
//   name: "MarkdownEditor",
//   props: {
//     text: {
//       type: String,
//       required: true
//     },
//     questions: {
//       type: Array,
//       required: true
//     }
//   },
//   components: {
//     MarkdownPreview
//   },
//   data() {
//     return {
//       appendingQuestionLinkDialog: {
//         isVisible: false
//       },
//       markdown: "",
//       menu: {
//         isVisible: false
//       }
//     };
//   },
//   computed: {
//     questionGroups() {
//       return this.questions.reduce((group, question) => {
//         if (question.file_path in group) {
//           group[question.file_path].push(question);
//         } else {
//           group[question.file_path] = [question];
//         }
//         return group;
//       }, {});
//     }
//   },
//   watch: {
//     text: {
//       immediate: true,
//       handler(newValue) {
//         this.markdown = newValue;
//       }
//     }
//   },
//   methods: {
//     onclick() {
//       this.menu.isVisible = false;
//     },
//     oninput() {
//       this.$emit("input", this.markdown);
//     },
//     toggleMenu() {
//       this.menu.isVisible = !this.menu.isVisible;
//     },
//     clickQuestionButton(questionId, button) {
//       this.$emit("click-question-button", questionId, button);
//     },
//     close() {
//       this.$emit("close");
//     },
//     appendQuestionLink(questionId) {
//       this.markdown += `?{${questionId}}`;
//       this.menu.isVisible = false;
//       this.$emit("input", this.markdown);
//     },
//     showAppendingQuestionLinkDialog() {
//       this.appendingQuestionLinkDialog.isVisible = true;
//     }
//   }
// };

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "MarkdownEditor",
  props: {
    lessonId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      lesson: null,
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        strikethrough: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        code: true,
        table: true,
        readmodel: true,
        htmlcode: true,
        undo: true,
        redo: true,
        trash: true,
        subfield: true,
        preview: true
      },
      delayedUpdate: _.debounce(this.update, 1000),
      updateQueue: Promise.resolve()
    };
  },
  mounted: function mounted() {
    var that = this;
    console.log(this.lessonId);
    _models_lesson_js__WEBPACK_IMPORTED_MODULE_0__["default"].index({
      id: this.lessonId
    }, function (response) {
      // title, description, book, dockerContainerId, userName, consolePort, userId
      that.lesson = new _models_lesson_js__WEBPACK_IMPORTED_MODULE_0__["default"](response.data[0].title, response.data[0].description, response.data[0].book, response.data[0].docker_container_id, response.data[0].userName, response.data[0].console_port, response.data[0].user_id);
      that.lesson.id = response.data[0].id;
    });
  },
  methods: {
    change: function change(value, render) {
      var that = this;
      this.lesson.book = value;
      this.updateQueue.then(function () {
        that.delayedUpdate();
      });
    },
    update: function update() {
      console.log(this.lesson.id);
      this.lesson.update();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreating.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SourceCodeEditorCreating.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SourceCodeEditorCreating",
  data: function data() {
    return {
      sourceCodeEditor: null
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])(["editedFileText", "editedFilePath"])),
  mounted: function mounted() {
    var _this = this;

    // this.setSourceCodeEditor({
    //   sourceCodeEditor: ace.edit("source-code-editor")
    // });
    this.sourceCodeEditor = ace.edit("source-code-editor");
    this.sourceCodeEditor.$blockScrolling = Infinity;
    this.sourceCodeEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      fontSize: "0.8rem"
    });
    this.sourceCodeEditor.setTheme("ace/theme/chaos");
    this.sourceCodeEditor.setReadOnly(true);
    var that = this;
    this.sourceCodeEditor.session.on("change", function (delta) {
      if (delta.action === "insert" && that.editedFileText !== that.sourceCodeEditor.getValue()) {
        that.setEditedFileText(that.sourceCodeEditor.getValue());
        that.updateEditedFile();
      }
    });
    this.$store.subscribe(function (mutation, state) {
      if (mutation.type !== "setEditedFile") {
        return;
      }

      _this.sourceCodeEditor.setReadOnly(false);

      _this.sourceCodeEditor.setValue(_this.editedFileText);

      var modes = {
        js: "javascript",
        php: "php",
        html: "html",
        css: "css",
        scss: "scss",
        vue: "vue",
        json: "json",
        xml: "xml"
      };

      var pathComponents = _this.editedFilePath.split(".");

      var extension = pathComponents.slice(-1)[0];

      _this.sourceCodeEditor.getSession().setMode("ace/mode/" + modes[extension]);
    });
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])(["setEditedFileText", "updateEditedFile"]), {
    showContextMenu: function showContextMenu(e) {
      var text = this.sourceCodeEditor.getValue();
      var newLineCount = 0;
      var characterIndex = 0;

      var f = function f(row) {
        for (; characterIndex < text.length; ++characterIndex) {
          if (row === newLineCount) {
            break;
          }

          if (text.charAt(characterIndex) === "\n") {
            ++newLineCount;
          }
        }
      };

      f(this.sourceCodeEditor.selection.getRange().start.row);
      var startIndex = characterIndex + this.sourceCodeEditor.selection.getRange().start.column;
      f(this.sourceCodeEditor.selection.getRange().end.row);
      var endIndex = characterIndex + this.sourceCodeEditor.selection.getRange().end.column;
      this.$emit("show-context-menu", e.pageX, e.pageY, startIndex, endIndex);
    } // oninput(e) {
    //   const that = this;
    //   const selectionStart = e.target.selectionStart;
    //   const selectedRangeBeforeInput = this.selectedRangeBeforeInput
    //     ? {
    //         start: this.selectedRangeBeforeInput.start,
    //         end: this.selectedRangeBeforeInput.end
    //       }
    //     : null;
    //   // console.log(e.target.value.length);
    //   // console.log(that.lastTextLength);
    //   if (
    //     e.inputType === "insertText" ||
    //     e.inputType === "insertLineBreak" ||
    //     (e.inputType === "insertCompositionText" &&
    //       this.lastTextLength === null) ||
    //     (e.inputType === "insertCompositionText" &&
    //       (selectedRangeBeforeInput !== null &&
    //         0 <
    //           selectedRangeBeforeInput.end - selectedRangeBeforeInput.start)) ||
    //     (e.inputType === "insertCompositionText" &&
    //       e.target.value.length - this.lastTextLength === 1)
    //   ) {
    //     // console.log("insertText");
    //     this.inputQueue.then(function() {
    //       that.insertText(selectedRangeBeforeInput, selectionStart);
    //     });
    //   } else if (
    //     e.inputType === "deleteContentBackward" ||
    //     (e.inputType === "insertCompositionText" &&
    //       this.lastTextLength - e.target.value.length === 1)
    //   ) {
    //     // console.log("deleteContentBackward");
    //     this.inputQueue.then(function() {
    //       that.deleteContentBackward(selectedRangeBeforeInput, selectionStart);
    //     });
    //   } else if (
    //     e.inputType === "insertCompositionText" &&
    //     that.lastTextLength !== e.target.value.length
    //   ) {
    //     that.insertCompositionText(selectionStart, e);
    //   } else if (e.inputType === "insertFromPaste") {
    //     //console.log(e);
    //     this.inputQueue.then(function() {
    //       that.insertFromPaste(selectedRangeBeforeInput, selectionStart);
    //     });
    //   } else if (e.inputType === "deleteByCut") {
    //     this.inputQueue.then(function() {
    //       that.deleteByCut(selectedRangeBeforeInput, selectionStart);
    //     });
    //   }
    //   this.textarea = e.target;
    //   this.selectedRangeBeforeInput = null;
    //   this.lastTextLength = e.target.value.length;
    //   this.delayedUpdate();
    // },
    // onclick(e) {
    //   this.selectedRangeBeforeInput = null;
    // },
    // onselect(e) {
    //   this.selectedRangeBeforeInput = {
    //     start: e.target.selectionStart,
    //     end: e.target.selectionEnd
    //   };
    // },
    // onfocus(e) {
    //   this.selectedRangeBeforeInput = null;
    // },
    // onpaste(e) {
    //   this.pastedText = e.clipboardData.getData("text");
    // },
    // onArrowKeyDown(e) {
    //   this.selectedRangeBeforeInput = null;
    // },
    // oncontextmenu(e) {
    //   this.$emit("show-context-menu", e);
    // },
    // insertText(selectedRangeBeforeInput, selectionStart) {
    //   const that = this;
    //   if (
    //     selectedRangeBeforeInput === null ||
    //     selectedRangeBeforeInput.start === selectedRangeBeforeInput.end
    //   ) {
    //     const caretPosition = selectionStart - 1;
    //     // console.log(caretPosition);
    //     this.questions.concat(this.descriptionTargets).forEach(item => {
    //       // console.log(item.startIndex);
    //       let updated = false;
    //       if (caretPosition <= item.startIndex) {
    //         // console.log("START");
    //         ++item.startIndex;
    //         updated = true;
    //       }
    //       if (caretPosition < item.endIndex) {
    //         // console.log("END");
    //         ++item.endIndex;
    //         updated = true;
    //       }
    //       if (updated) {
    //         item.hasUpdated = true;
    //         that.delayedUpdate();
    //       }
    //     });
    //   } else {
    //     this.questions.concat(this.descriptionTargets).forEach(item => {
    //       if (
    //         selectedRangeBeforeInput.start <= item.startIndex &&
    //         item.endIndex <= selectedRangeBeforeInput.end //  |---[---]---|
    //       ) {
    //         item.hasDeleted = true;
    //         that.delayedUpdate();
    //       } else {
    //         if (
    //           selectedRangeBeforeInput.start <= item.startIndex &&
    //           item.startIndex <= selectedRangeBeforeInput.end &&
    //           selectedRangeBeforeInput.end < item.endIndex //  |---[---|---)
    //         ) {
    //           item.startIndex = selectedRangeBeforeInput.start + 1;
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end -
    //             selectedRangeBeforeInput.start -
    //             1;
    //         } else if (
    //           item.startIndex < selectedRangeBeforeInput.start &&
    //           selectedRangeBeforeInput.start <= item.endIndex &&
    //           item.endIndex <= selectedRangeBeforeInput.end // (---|---]---|
    //         ) {
    //           item.endIndex = selectedRangeBeforeInput.start;
    //         } else if (
    //           item.startIndex < selectedRangeBeforeInput.start &&
    //           selectedRangeBeforeInput.end < item.endIndex // (---|---|---)
    //         ) {
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end -
    //             selectedRangeBeforeInput.start -
    //             1;
    //         } else if (selectedRangeBeforeInput.end < item.startIndex) {
    //           // |---|---(---)
    //           item.startIndex -=
    //             selectedRangeBeforeInput.end -
    //             selectedRangeBeforeInput.start -
    //             1;
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end -
    //             selectedRangeBeforeInput.start -
    //             1;
    //         }
    //         item.hasUpdated = !(item.endIndex < selectedRangeBeforeInput.start); //  (---)---[---]
    //         that.delayedUpdate();
    //       }
    //     });
    //   }
    // },
    // insertCompositionText(selectionStart, e) {
    //   const that = this;
    //   const diff = e.target.value.length - this.lastTextLength;
    //   const caretPosition = selectionStart - diff;
    //   this.questions.concat(this.descriptionTargets).forEach(item => {
    //     let updated = false;
    //     if (caretPosition <= item.startIndex) {
    //       item.startIndex += diff;
    //       updated = true;
    //     }
    //     if (caretPosition <= item.endIndex) {
    //       item.endIndex += diff;
    //       updated = true;
    //     }
    //     if (updated) {
    //       item.hasUpdated = true;
    //       that.delayedUpdate();
    //     }
    //   });
    // },
    // deleteContentBackward(selectedRangeBeforeInput, selectionStart) {
    //   const that = this;
    //   if (
    //     selectedRangeBeforeInput === null ||
    //     selectedRangeBeforeInput.start === selectedRangeBeforeInput.end
    //   ) {
    //     const caretPosition = selectionStart + 1;
    //     //console.log(caretPosition);
    //     this.questions.concat(this.descriptionTargets).forEach(item => {
    //       let updated = false;
    //       // console.log(question.startIndex);
    //       // console.log(question.endIndex);
    //       if (caretPosition <= item.startIndex) {
    //         //console.log("START");
    //         --item.startIndex;
    //         updated = true;
    //       }
    //       if (caretPosition <= item.endIndex) {
    //         //console.log("END");
    //         --item.endIndex;
    //         updated = true;
    //       }
    //       if (updated) {
    //         if (item.endIndex - item.startIndex == 0) {
    //           item.hasDeleted = true;
    //         } else {
    //           item.hasUpdated = true;
    //           that.delayedUpdate();
    //         }
    //       }
    //     });
    //   } else {
    //     this.questions.concat(this.descriptionTargets).forEach(item => {
    //       if (
    //         selectedRangeBeforeInput.start <= item.startIndex &&
    //         item.endIndex <= selectedRangeBeforeInput.end //  |---[---]---|
    //       ) {
    //         item.hasDeleted = true;
    //         that.delayedUpdate();
    //       } else {
    //         if (
    //           selectedRangeBeforeInput.start <= item.startIndex &&
    //           item.startIndex <= selectedRangeBeforeInput.end &&
    //           selectedRangeBeforeInput.end < item.endIndex //  |---[---|---)
    //         ) {
    //           item.startIndex = selectedRangeBeforeInput.start;
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //         } else if (
    //           item.startIndex < selectedRangeBeforeInput.start &&
    //           selectedRangeBeforeInput.start <= item.endIndex &&
    //           item.endIndex <= selectedRangeBeforeInput.end // (---|---]---|
    //         ) {
    //           item.endIndex = selectedRangeBeforeInput.start;
    //         } else if (
    //           item.startIndex < selectedRangeBeforeInput.start &&
    //           selectedRangeBeforeInput.end < item.endIndex // (---|---|---)
    //         ) {
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //         } else if (selectedRangeBeforeInput.end < item.startIndex) {
    //           // |---|---(---)
    //           item.startIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //         }
    //         item.hasUpdated = !(item.endIndex < selectedRangeBeforeInput.start); //  (---)---[---]
    //         that.delayedUpdate();
    //       }
    //     });
    //   }
    // },
    // insertFromPaste(selectedRangeBeforeInput, selectionStart) {
    //   const that = this;
    //   if (
    //     selectedRangeBeforeInput === null ||
    //     selectedRangeBeforeInput.start === selectedRangeBeforeInput.end
    //   ) {
    //     const caretPosition = selectionStart - this.pastedText.length;
    //     this.questions.concat(this.descriptionTargets).forEach(item => {
    //       let updated = false;
    //       // console.log(question.startIndex);
    //       // console.log(question.endIndex);
    //       if (caretPosition <= item.startIndex) {
    //         //console.log("START");
    //         item.startIndex += this.pastedText.length;
    //         updated = true;
    //       }
    //       if (caretPosition < item.endIndex) {
    //         //console.log("END");
    //         item.endIndex += this.pastedText.length;
    //         updated = true;
    //       }
    //       if (updated) {
    //         item.hasUpdated = true;
    //         that.delayedUpdate();
    //       }
    //     });
    //   } else {
    //     this.questions.concat(this.descriptionTargets).forEach(item => {
    //       if (
    //         selectedRangeBeforeInput.start <= item.startIndex &&
    //         item.endIndex <= selectedRangeBeforeInput.end //  |---[---]---|
    //       ) {
    //         item.hasDeleted = true;
    //         that.delayedUpdate();
    //       } else {
    //         if (
    //           selectedRangeBeforeInput.start <= item.startIndex &&
    //           item.startIndex <= selectedRangeBeforeInput.end &&
    //           selectedRangeBeforeInput.end < item.endIndex //  |---[---|---)
    //         ) {
    //           item.startIndex =
    //             selectedRangeBeforeInput.start + this.pastedText.length;
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //           item.endIndex += this.pastedText.length;
    //         } else if (
    //           item.startIndex < selectedRangeBeforeInput.start &&
    //           selectedRangeBeforeInput.start <= item.endIndex &&
    //           item.endIndex <= selectedRangeBeforeInput.end // (---|---]---|
    //         ) {
    //           item.endIndex = selectedRangeBeforeInput.start;
    //         } else if (
    //           item.startIndex < selectedRangeBeforeInput.start &&
    //           selectedRangeBeforeInput.end < item.endIndex // (---|---|---)
    //         ) {
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //           item.endIndex += this.pastedText.length;
    //         } else if (selectedRangeBeforeInput.end < item.startIndex) {
    //           // |---|---(---)
    //           item.startIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //           item.startIndex += this.pastedText.length;
    //           item.endIndex -=
    //             selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //           item.endIndex += this.pastedText.length;
    //         }
    //         item.hasUpdated = !(item.endIndex < selectedRangeBeforeInput.start); //  (---)---[---]
    //         that.delayedUpdate();
    //       }
    //     });
    //   }
    // },
    // deleteByCut(selectedRangeBeforeInput, selectionStart) {
    //   const that = this;
    //   this.questions.concat(this.descriptionTargets).forEach(item => {
    //     if (
    //       selectedRangeBeforeInput.start <= item.startIndex &&
    //       item.endIndex <= selectedRangeBeforeInput.end //  |---[---]---|
    //     ) {
    //       item.hasDeleted = true;
    //       that.delayedUpdate();
    //     } else {
    //       if (
    //         selectedRangeBeforeInput.start <= item.startIndex &&
    //         item.startIndex <= selectedRangeBeforeInput.end &&
    //         selectedRangeBeforeInput.end < item.endIndex //  |---[---|---)
    //       ) {
    //         item.startIndex = selectedRangeBeforeInput.start;
    //         item.endIndex -=
    //           selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //       } else if (
    //         item.startIndex < selectedRangeBeforeInput.start &&
    //         selectedRangeBeforeInput.start <= item.endIndex &&
    //         item.endIndex <= selectedRangeBeforeInput.end // (---|---]---|
    //       ) {
    //         item.endIndex = selectedRangeBeforeInput.start;
    //       } else if (
    //         item.startIndex < selectedRangeBeforeInput.start &&
    //         selectedRangeBeforeInput.end < item.endIndex // (---|---|---)
    //       ) {
    //         item.endIndex -=
    //           selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //       } else if (selectedRangeBeforeInput.end < item.startIndex) {
    //         // |---|---(---)
    //         item.startIndex -=
    //           selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //         item.endIndex -=
    //           selectedRangeBeforeInput.end - selectedRangeBeforeInput.start;
    //       }
    //       item.hasUpdated = !(item.endIndex < selectedRangeBeforeInput.start); //  (---)---[---]
    //       that.delayedUpdate();
    //     }
    //   });
    // },
    // update() {
    //   console.log("UPDATE");
    //   this.file.text = this.textarea.value;
    //   this.file.update();
    //   const that = this;
    //   this.questions.concat(this.descriptionTargets).forEach(item => {
    //     if (!item.hasDeleted) {
    //       return;
    //     }
    //     item.destroy();
    //     const container =
    //       item instanceof Question ? that.questions : that.descriptionTargets;
    //     Vue.delete(container, container.findIndex(i => i.id === item.id));
    //   });
    //   this.questions.concat(this.descriptionTargets).forEach(item => {
    //     if (!item.hasUpdated) {
    //       return;
    //     }
    //     item.update();
    //     const text = that.file.text.substring(item.startIndex, item.endIndex);
    //     if (item instanceof Question) {
    //       item.answer = text;
    //     } else {
    //       item.text = text;
    //     }
    //     item.hasUpdated = false;
    //   });
    // }

  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//import Question from "../models/question.js";

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "SourceCodeEditorCreatingContextMenu",
  props: {
    startIndex: {
      type: Number,
      required: true
    },
    endIndex: {
      type: Number,
      required: true
    },
    lessonId: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      areStoreQuestionOptionsShown: false,
      trimmingOptions: {
        forward: "forward",
        backward: "backward"
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapState"])({
    filePath: function filePath(state) {
      return state.editedFile ? state.editedFile.path : null;
    },
    fileText: function fileText(state) {
      return state.editedFile ? state.editedFile.text : null;
    }
  }), {
    answer: function answer() {
      if (!this.fileText) {
        return "";
      }

      return this.fileText.substring(this.startIndex, this.endIndex);
    }
  }),
  methods: {
    showStoreQuestionOptions: function showStoreQuestionOptions() {
      this.areStoreQuestionOptionsShown = true;
    },
    hideStoreQuestionOptions: function hideStoreQuestionOptions() {
      this.areStoreQuestionOptionsShown = false;
    },
    showDialogCode: function showDialogCode() {
      this.$emit("show-dialog-code");
    },
    // storeQuestion(trimmingOptions) {
    //   const question = new Question(
    //     null,
    //     this.filePath,
    //     this.startIndex,
    //     this.endIndex,
    //     this.answer,
    //     this.lessonId
    //   );
    //   question.store(response => {
    //     console.log(response);
    //   });
    //   // const that = this;
    //   // const answer = this.file.text.substring(this.startIndex, this.endIndex);
    //   // Question.index(
    //   //   { description_id: this.selectedDescription.id },
    //   //   response => {
    //   //     const index = response.data.length
    //   //       ? Math.max(...response.data.map(question => question.index)) + 1
    //   //       : 0;
    //   //     const question = new Question(
    //   //       null,
    //   //       index,
    //   //       this.selectedDescription.id
    //   //     );
    //   //     const that = this;
    //   //     question.store(response => {
    //   //       const lineRegex = /\n/g;
    //   //       let lineMatch = lineRegex.exec(answer);
    //   //       let lineStartIndex = 0;
    //   //       let lineEndIndex = 0;
    //   //       let inputButtonIndex = 0;
    //   //       while (true) {
    //   //         const storeInputButton = function(line) {
    //   //           console.log("*************");
    //   //           console.log(line);
    //   //           console.log("*************");
    //   //           const spaceRegex = / /g;
    //   //           let spaceMatch = spaceRegex.exec(line);
    //   //           let spaceStartIndex = 0;
    //   //           const createInputButton = function(startIndex, endIndex) {
    //   //             if (lineEndIndex <= lineStartIndex + spaceStartIndex) {
    //   //               return;
    //   //             }
    //   //             const lineNumber =
    //   //               that.file.text.substring(0, endIndex).split("\n").length -
    //   //               1;
    //   //             const inputButton = new InputButton(
    //   //               null,
    //   //               inputButtonIndex,
    //   //               startIndex,
    //   //               endIndex,
    //   //               lineNumber,
    //   //               question.id,
    //   //               that.file.text.substring(startIndex, endIndex)
    //   //             );
    //   //             ++inputButtonIndex;
    //   //             question.inputButtons.push(inputButton);
    //   //             inputButton.store();
    //   //             const text = that.file.text.substring(
    //   //               inputButton.startIndex,
    //   //               inputButton.endIndex
    //   //             );
    //   //             // if (text == " ") {
    //   //             //   console.log("スペース");
    //   //             // } else if (text == "\n") {
    //   //             //   console.log("開業");
    //   //             // } else {
    //   //             //   console.log(text);
    //   //             // }
    //   //             return inputButton;
    //   //           };
    //   //           while (true) {
    //   //             if (!spaceMatch) {
    //   //               const startIndex =
    //   //                 that.startIndex + lineStartIndex + spaceStartIndex;
    //   //               let endIndex = that.startIndex + lineEndIndex;
    //   //               if (startIndex === endIndex) {
    //   //                 ++endIndex;
    //   //               }
    //   //               const inputButton = createInputButton(startIndex, endIndex);
    //   //               break;
    //   //             }
    //   //             const startIndex =
    //   //               that.startIndex + lineStartIndex + spaceStartIndex;
    //   //             let endIndex =
    //   //               that.startIndex + lineStartIndex + spaceMatch.index;
    //   //             if (startIndex === endIndex) {
    //   //               ++endIndex;
    //   //             }
    //   //             const inputButton = createInputButton(startIndex, endIndex);
    //   //             if (spaceStartIndex !== spaceMatch.index) {
    //   //               const startIndex =
    //   //                 that.startIndex + lineStartIndex + spaceMatch.index;
    //   //               const endIndex =
    //   //                 that.startIndex + lineStartIndex + spaceMatch.index + 1;
    //   //               const inputButton = createInputButton(startIndex, endIndex);
    //   //             }
    //   //             spaceStartIndex = spaceMatch.index + 1;
    //   //             spaceMatch = spaceRegex.exec(line);
    //   //           }
    //   //         };
    //   //         lineEndIndex = lineMatch ? lineMatch.index : answer.length;
    //   //         const line = lineMatch
    //   //           ? answer.substring(lineStartIndex, lineMatch.index)
    //   //           : answer.substring(lineStartIndex);
    //   //         const trimmedLineIndices = this.trim(
    //   //           lineStartIndex,
    //   //           lineEndIndex,
    //   //           line,
    //   //           trimmingOptions
    //   //         );
    //   //         lineStartIndex = trimmedLineIndices.lineStartIndex;
    //   //         lineEndIndex = trimmedLineIndices.lineEndIndex;
    //   //         const trimmedLine = answer.substring(
    //   //           lineStartIndex,
    //   //           lineEndIndex
    //   //         );
    //   //         if (!lineMatch) {
    //   //           storeInputButton(trimmedLine);
    //   //           break;
    //   //         }
    //   //         storeInputButton(trimmedLine);
    //   //         lineStartIndex = lineMatch.index + 1;
    //   //         lineMatch = lineRegex.exec(answer);
    //   //       }
    //   //     });
    //   //   }
    //   // );
    //   this.$emit("hide");
    // },
    trim: function trim(lineStartIndex, lineEndIndex, line, trimmingOptions) {
      if (trimmingOptions.includes(this.trimmingOptions.forward)) {
        var regex = /^( *).*?$/;
        var match = regex.exec(line);

        if (match && match.length === 2) {
          lineStartIndex += match[1].length;
        }
      }

      if (trimmingOptions.includes(this.trimmingOptions.backward)) {
        var _regex = /^.*?( *)$/;

        var _match = _regex.exec(line);

        if (_match && _match.length === 2) {
          lineEndIndex -= _match[1].length;
        }
      }

      return {
        lineStartIndex: lineStartIndex,
        lineEndIndex: lineEndIndex
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/FileTreeItem.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_folder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/folder.js */ "./resources/js/models/folder.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _models_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/file */ "./resources/js/models/file.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "file-tree-item",
  props: {
    item: {
      type: Object,
      required: true
    },
    isFile: {
      type: Boolean,
      required: true
    },
    dockerContainerId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    icon: function icon() {
      if (this.isFile) {
        return {
          "el-icon-tickets": true
        };
      }

      return this.isExpanded ? {
        "el-icon-folder-opened": true
      } : {
        "el-icon-folder": true
      };
    }
  },
  mounted: function mounted() {
    if (!this.$refs.name) {
      return;
    }

    this.item.input = this.$refs.name;
  },
  methods: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapActions"])(["setEditedFile"]), {
    onclick: function onclick() {
      if (this.isFile) {
        var that = this;
        _models_file__WEBPACK_IMPORTED_MODULE_2__["default"].index({
          path: this.item.path,
          docker_container_id: this.dockerContainerId
        }, function (response) {
          if (response.data === "Permission denied") {
            that.$notify.error({
              title: "Permission denied",
              message: "このファイルへのアクセス権限がありません"
            });
          } else {
            that.setEditedFile(new _models_file__WEBPACK_IMPORTED_MODULE_2__["default"](that.item.path, response.data.text, that.dockerContainerId));
          }
        });
      } else {
        this.isExpanded = !this.isExpanded;

        if (this.isExpanded) {
          var _that = this;

          var url = "/folders/children?docker_container_id=".concat(this.dockerContainerId, "&root=").concat(this.item.path);
          axios.get(url).then(function (response) {
            if (response.data === "Permission denied") {
              _that.$notify.error({
                title: "Permission denied",
                message: "\u3053\u306E\u30D5\u30A9\u30EB\u30C0\u3078\u306E\u30A2\u30AF\u30BB\u30B9\u6A29\u9650\u304C\u3042\u308A\u307E\u305B\u3093"
              });
            } else {
              _that.item.childFolders = [];
              _that.item.childFiles = [];
              response.data.childFolders.forEach(function (childFolder) {
                return _that.item.childFolders.push(childFolder);
              });
              response.data.childFiles.forEach(function (childFile) {
                return _that.item.childFiles.push(childFile);
              });
            }
          });
        }
      }
    } // onInputItemName(e) {
    //   if (!e.target.value) {
    //     return;
    //   }
    //   this.item.name = e.target.value;
    //   this.item.update();
    // },
    // onShowContextMenu(e, item) {
    //   this.$emit("show-context-menu", e, item);
    // },
    // onSetFile(file) {
    //   this.$emit("set-file", file);
    // },
    // onKeyUpEnter() {
    //   if (this.item.isNameEditable) {
    //     this.item.isNameEditable = false;
    //     this.item.input.blur();
    //   } else {
    //     this.item.isNameEditable = true;
    //     this.item.input.focus();
    //   }
    // }

  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/molecules/FileTree.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_file_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/file.js */ "./resources/js/models/file.js");
/* harmony import */ var _models_folder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/folder.js */ "./resources/js/models/folder.js");
/* harmony import */ var _atoms_FileTreeItem_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atoms//FileTreeItem.vue */ "./resources/js/components/atoms/FileTreeItem.vue");
/* harmony import */ var _Routes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Routes.js */ "./resources/js/Routes.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "file-tree",
  props: {
    // hostAppDirectoryPath: {
    //   type: String,
    //   required: true
    // },
    // containerAppDirectoryPath: {
    //   type: String,
    //   required: true
    // },
    // deltaLogFilePath: {
    //   type: String,
    //   required: true
    // }
    dockerContainerId: {
      type: String,
      required: true
    }
  },
  components: {
    FileTreeItem: _atoms_FileTreeItem_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      rootPath: "/",
      rootFolder: null // fileDictionary: {},
      // fileDeltas: []

    };
  },
  mounted: function mounted() {
    this.fetchChildren(); //this.fetchFileTree();
    //this.observeFiles();
  },
  methods: {
    fetchChildren: function fetchChildren() {
      var that = this;
      var url = "/folders/children?docker_container_id=".concat(this.dockerContainerId, "&root=").concat(this.rootPath);
      axios.get(url).then(function (response) {
        if (response.data === "Permission denied") {
          that.$notify.error({
            title: "Permission deined",
            message: "フォルダへのアクセス権限がありません"
          });
        } else if (response.data === "No such directory") {
          that.$notify.error({
            title: "No such directory",
            message: "フォルダが存在しません"
          });
        } else {
          that.rootFolder = response.data;
        }
      });
    },
    //fetchFileTree() {
    // const that = this;
    // Folder.index(
    //   {
    //     path: this.hostAppDirectoryPath
    //   },
    //   response => {
    //     that.rootFolder = new Folder(that.hostAppDirectoryPath);
    //     that.fileDictionary = {};
    //     that.fileDictionary[that.rootFolder.path] = that.rootFolder;
    //     const map = function(before, after) {
    //       before.childFolders.forEach(beforeChildFolder => {
    //         const afterChild = new Folder(beforeChildFolder.path);
    //         that.fileDictionary[afterChild.path] = afterChild;
    //         map(beforeChildFolder, afterChild);
    //         after.children.push(afterChild);
    //       });
    //       before.childFiles.forEach(beforeChildFile => {
    //         const afterChild = new File(beforeChildFile.path, "");
    //         that.fileDictionary[afterChild.path] = afterChild;
    //         after.children.push(afterChild);
    //       });
    //     };
    //     map(response.data, that.rootFolder);
    //   }
    // );
    //},
    // observeFiles() {
    //   const that = this;
    //   setInterval(function() {
    //     axios
    //       .get("/file_delta?delta_log_file_path=" + that.deltaLogFilePath)
    //       .then(response => {
    //         let fileDeltas = [];
    //         response.data[1].forEach((path, index) => {
    //           path = path.slice(0, -1);
    //           fileDeltas.push({});
    //           fileDeltas[index].path = path.replace(
    //             that.containerAppDirectoryPath,
    //             that.hostAppDirectoryPath
    //           );
    //         });
    //         response.data[2].forEach((type, index) => {
    //           //console.log(type);
    //           fileDeltas[index].type = type;
    //         });
    //         response.data[3].forEach((isDir, index) => {
    //           fileDeltas[index].isDir = isDir;
    //         });
    //         response.data[4].forEach((target, index) => {
    //           fileDeltas[index].target = target;
    //         });
    //         //console.log(fileDeltas);
    //         fileDeltas.concat(that.fileDeltas);
    //         that.fileDeltas = [];
    //         fileDeltas.forEach(fileDelta => {
    //           // console.log(fileDelta.type);
    //           const fileTreeItem = that.fileDictionary[fileDelta.path];
    //           if (!fileTreeItem) {
    //             that.fileDeltas.push(fileDelta);
    //             return;
    //           }
    //           const targetPath = fileDelta.path + "/" + fileDelta.target;
    //           if (
    //             fileDelta.type === "CREATE" &&
    //             !that.fileDictionary[targetPath]
    //           ) {
    //             //console.log("CREATE");
    //             if (
    //               !fileTreeItem.children.find(
    //                 child => child.path === fileDelta.target
    //               )
    //             ) {
    //               const child =
    //                 fileDelta.isDir === ""
    //                   ? new File(targetPath, "")
    //                   : new Folder(targetPath);
    //               if (!that.fileDictionary[fileDelta.path]) {
    //                 return;
    //               }
    //               that.fileDictionary[child.path] = child;
    //               fileTreeItem.children.push(child);
    //               fileTreeItem.children.sort((a, b) => {
    //                 if (
    //                   a.baseRoute === Folder.baseRoute() &&
    //                   b.baseRoute === File.baseRoute()
    //                 ) {
    //                   return -1;
    //                 }
    //                 if (
    //                   a.baseRoute === File.baseRoute() &&
    //                   b.baseRoute === Folder.baseRoute()
    //                 ) {
    //                   return 1;
    //                 }
    //                 if (a.path < b.path) {
    //                   return -1;
    //                 } else if (b.path < a.path) {
    //                   return 1;
    //                 }
    //                 return 0;
    //               });
    //             }
    //           } else if (fileDelta.type === "DELETE") {
    //             //console.log("DELETE");
    //             const targetIndex = fileTreeItem.children.findIndex(
    //               child => child.path === targetPath
    //             );
    //             const notFound = -1;
    //             if (targetIndex !== notFound) {
    //               fileTreeItem.children.splice(targetIndex, 1);
    //               delete that.fileDictionary[targetPath];
    //             }
    //           } else if (fileDelta.type === "MODIFY") {
    //             //console.log("MODIFY");
    //             // if (that.editor.file && that.editor.file.path === targetPath) {
    //             //   File.index({ path: targetPath }, response => {
    //             //     if (response.data.text !== that.editor.getValue()) {
    //             //       that.editor.setValue(response.data.text);
    //             //     }
    //             //   });
    //             // }
    //           }
    //         });
    //       });
    //   }, 3000);
    // },
    onShowContextMenu: function onShowContextMenu(e, item) {
      this.$emit("show-context-menu", e, item);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#answer-container[data-v-8663e9fe] {\n  background: lightgray;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#development-ide[data-v-d55761cc] {\n  height: 100%;\n  overflow: hidden;\n  color: white;\n}\n#development-header[data-v-d55761cc] {\n  height: 10%;\n  background: rgb(30, 30, 30);\n  border-bottom: solid 1.5px rgb(80, 80, 80);\n}\n#development-body[data-v-d55761cc] {\n  display: -webkit-box;\n  display: flex;\n  height: 90%;\n}\n#file-tree-view[data-v-d55761cc] {\n  width: 20%;\n  height: 100%;\n}\n#center-view[data-v-d55761cc] {\n  width: 80%;\n  height: 100%;\n}\n#source-code-editor-creating[data-v-d55761cc] {\n  width: 100%;\n  height: 60%;\n}\n.markdown-editor[data-v-d55761cc] {\n  position: absolute;\n  z-index: 100;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  width: 90vw;\n  height: 90vh;\n}\n.v-enter-active[data-v-d55761cc],\n.v-leave-active[data-v-d55761cc] {\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n}\n.v-enter[data-v-d55761cc],\n.v-leave-to[data-v-d55761cc] {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.console[data-v-64da698d] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: none;\n  width: 100%;\n  height: 32%;\n}\n.active-console[data-v-64da698d] {\n  z-index: 1;\n}\n#console-tool-bar[data-v-64da698d] {\n  height: 8%;\n  background: rgb(30, 30, 30);\n  border-top: solid 1.5px rgb(80, 80, 80);\n}\n#console-container[data-v-64da698d] {\n  position: relative;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.header-button[data-v-092215c7] {\n  display: block;\n  color: white;\n  font-size: 1rem;\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* .menu {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  transform: translate(0, 105%);\n  border: 1px solid lightgray;\n} */\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.file-tree-item[data-v-158761c5] {\n  padding-left: 16px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#file-tree-tool-bar[data-v-6b7b7ff2] {\n  height: 10%;\n  background: rgb(30, 37, 51);\n}\n#file-tree[data-v-6b7b7ff2] {\n  overflow: scroll;\n  white-space: nowrap;\n  height: 100%;\n  background: rgb(30, 37, 51);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--17-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--17-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--17-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--17-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--17-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--17-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-dialog",
        {
          attrs: { visible: _vm.isDialogVisible },
          on: {
            "update:visible": function($event) {
              _vm.isDialogVisible = $event
            }
          }
        },
        [
          _c(
            "el-form",
            {
              attrs: {
                "label-position": _vm.labelPosition,
                "label-width": "100px",
                model: _vm.question
              }
            },
            [
              _c(
                "div",
                [
                  _c("h4", [_vm._v("正解")]),
                  _vm._v(" "),
                  _c("el-divider", { staticClass: "mt-1 mb-3" }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "border p-2" },
                    [
                      _c(
                        "el-form-item",
                        { staticClass: "m-0 mt-2", attrs: { label: "コード" } },
                        [
                          _c("el-input", {
                            attrs: {
                              type: "textarea",
                              value: _vm.answer,
                              disabled: ""
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          staticClass: "m-0 mt-2",
                          attrs: { label: "コメント" }
                        },
                        [
                          _c("el-input", {
                            attrs: { type: "textarea" },
                            model: {
                              value: _vm.question.correct.comment,
                              callback: function($$v) {
                                _vm.$set(_vm.question.correct, "comment", $$v)
                              },
                              expression: "question.correct.comment"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "mt-5" },
                [
                  _c("h4", [_vm._v("不正解")]),
                  _vm._v(" "),
                  _c("el-divider", { staticClass: "mt-1 mb-3" }),
                  _vm._v(" "),
                  _c(
                    "el-form-item",
                    { attrs: { label: "コメント" } },
                    [
                      _c("el-input", {
                        attrs: { type: "textarea" },
                        model: {
                          value: _vm.question.incorrect.comment,
                          callback: function($$v) {
                            _vm.$set(_vm.question.incorrect, "comment", $$v)
                          },
                          expression: "question.incorrect.comment"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("el-divider", { staticClass: "mt-3 mb-4" }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-center" },
                [
                  _c(
                    "el-button",
                    { attrs: { type: "primary" }, on: { click: _vm.register } },
                    [_vm._v("登録")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "development-ide" }, on: { click: _vm.onclick } },
    [
      _c("development-ide-header", {
        attrs: {
          title: _vm.title,
          url: _vm.markdownUrl,
          "url-title": _vm.markdownTitle,
          "container-ports": _vm.containerPorts,
          "host-ports": _vm.hostPorts
        },
        on: {
          "show-markdown": function($event) {
            _vm.showBlackout()
            _vm.showMarkdownEditor()
          }
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "development-body" } },
        [
          _c("file-tree", {
            attrs: {
              id: "file-tree-view",
              "docker-container-id": _vm.lesson.docker_container_id
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { attrs: { id: "center-view" } },
            [
              _c("source-code-editor-creating", {
                attrs: { id: "source-code-editor-creating" },
                on: {
                  "show-context-menu":
                    _vm.showSourceCodeEditorCreatingContextMenu
                }
              }),
              _vm._v(" "),
              _c("development-ide-console", {
                attrs: { "console-port": _vm.consolePort }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "transition-group",
        [
          _vm.blackout.isVisible
            ? _c("div", {
                key: "blackout",
                staticClass: "blackout",
                on: {
                  click: function($event) {
                    _vm.hideBlackout()
                    _vm.hideMarkdownEditor()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.markdownEditor.isVisible
            ? _c("MarkdownEditor", {
                key: "markdownEditor",
                staticClass: "markdown-editor",
                attrs: { text: _vm.lesson.book, questions: _vm.questions },
                on: {
                  input: _vm.updateBook,
                  close: function($event) {
                    _vm.hideBlackout()
                    _vm.hideMarkdownEditor()
                  },
                  "click-question-button": _vm.clickQuestionButton
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("add-question-dialog-code", {
        attrs: {
          "is-shown": _vm.addQuestionDialogCode.isShown,
          answer: _vm.questionAnswerCode,
          "start-index": _vm.sourceCodeEditor.selectedStartIndex,
          "end-index": _vm.sourceCodeEditor.selectedEndIndex,
          "lesson-id": _vm.lesson.id
        },
        on: { "added-question": _vm.pushQuestion }
      }),
      _vm._v(" "),
      _c("source-code-editor-creating-context-menu", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.sourceCodeEditorCreatingContextMenu.isShown,
            expression: "sourceCodeEditorCreatingContextMenu.isShown"
          }
        ],
        style: _vm.sourceCodeEditorCreatingContextMenu.style,
        attrs: {
          "start-index": _vm.sourceCodeEditor.selectedStartIndex,
          "end-index": _vm.sourceCodeEditor.selectedEndIndex,
          "lesson-id": _vm.lesson.id
        },
        on: { "show-dialog-code": _vm.showAddQuestionDialogCode }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "h-100", attrs: { id: "console-view" } }, [
    _c(
      "div",
      {
        staticClass: "d-flex align-items-center p-2",
        attrs: { id: "console-tool-bar" }
      },
      [
        _c("div", { staticClass: "ml-auto" }, [
          _c("i", {
            staticClass: "el-icon-plus",
            on: { click: _vm.addConsole }
          })
        ]),
        _vm._v(" "),
        _c("el-divider", { attrs: { direction: "vertical" } }),
        _vm._v(" "),
        _c(
          "el-dropdown",
          { on: { command: _vm.handleConsoleDropdownCommand } },
          [
            _c("span", { staticClass: "el-dropdown-link text-white" }, [
              _vm._v(
                "\n        コンソール: " +
                  _vm._s(_vm.activeConsoleIndex) +
                  "\n        "
              ),
              _c("i", { staticClass: "el-icon-arrow-down el-icon--right" })
            ]),
            _vm._v(" "),
            _c(
              "el-dropdown-menu",
              { attrs: { slot: "dropdown" }, slot: "dropdown" },
              _vm._l(_vm.consoleCount, function(consoleId) {
                return _c(
                  "el-dropdown-item",
                  { key: consoleId, attrs: { command: consoleId - 1 } },
                  [_vm._v(_vm._s(consoleId - 1))]
                )
              }),
              1
            )
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "h-100", attrs: { id: "console-container" } },
      _vm._l(_vm.consoleCount, function(consoleId) {
        return _c("iframe", {
          key: consoleId,
          staticClass: "console",
          class: {
            "active-console": _vm.isActiveConsole(consoleId)
          },
          attrs: { src: "http://localhost:" + _vm.consolePort }
        })
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "development-header" } }, [
    _c(
      "div",
      { staticClass: "d-flex align-items-center p-3" },
      [
        _c("h3", [_vm._v(_vm._s(_vm.title))]),
        _vm._v(" "),
        _c("div", { staticClass: "ml-auto" }, [
          _c("a", { staticClass: "header-button", attrs: { href: _vm.url } }, [
            _vm._v(_vm._s(_vm.urlTitle))
          ])
        ]),
        _vm._v(" "),
        _c("el-divider", { attrs: { direction: "vertical" } }),
        _vm._v(" "),
        _c(
          "el-dropdown",
          { on: { command: _vm.handlePortDropdownCommand } },
          [
            _c("span", { staticClass: "el-dropdown-link text-white" }, [
              _vm._v("\n        ポート\n        "),
              _c("i", { staticClass: "el-icon-arrow-down el-icon--right" })
            ]),
            _vm._v(" "),
            _c(
              "el-dropdown-menu",
              { attrs: { slot: "dropdown" }, slot: "dropdown" },
              _vm._l(_vm.containerPorts, function(containerPort, index) {
                return _c(
                  "el-dropdown-item",
                  {
                    key: containerPort,
                    attrs: { command: _vm.hostPorts[index] }
                  },
                  [_vm._v(_vm._s(containerPort))]
                )
              }),
              1
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("mavon-editor", {
        staticClass: "w-100 h-100",
        attrs: {
          language: "ja",
          placeholder: "執筆を始めよう!",
          value: _vm.lesson ? _vm.lesson.book : "",
          toolbars: _vm.toolbars
        },
        on: { change: _vm.change }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79& ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      on: {
        contextmenu: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          return _vm.showContextMenu($event)
        }
      }
    },
    [_c("div", { staticClass: "h-100", attrs: { id: "source-code-editor" } })]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "source-code-editor-context-menu" } }, [
    _c("div", { staticClass: "d-flex" }, [
      _c("div", [
        _c(
          "button",
          {
            staticClass: "btn btn-light",
            attrs: { type: "button" },
            on: {
              mouseover: _vm.showStoreQuestionOptions,
              mouseleave: _vm.hideStoreQuestionOptions
            }
          },
          [_vm._v("問題に追加")]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.areStoreQuestionOptionsShown,
              expression: "areStoreQuestionOptionsShown"
            }
          ],
          staticClass: "d-flex flex-column"
        },
        [
          _c(
            "button",
            {
              staticClass: "btn btn-light",
              attrs: { type: "button" },
              on: { click: _vm.showDialogCode }
            },
            [_vm._v("トリミング")]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/atoms/FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { on: { click: _vm.onclick } }, [
      _c("i", { class: _vm.icon }),
      _vm._v("\n    " + _vm._s(_vm.item.name) + "\n  ")
    ]),
    _vm._v(" "),
    !_vm.isFile
      ? _c(
          "div",
          { staticClass: "file-tree-item" },
          [
            _vm._l(_vm.item.childFolders, function(child) {
              return _c("file-tree-item", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isExpanded,
                    expression: "isExpanded"
                  }
                ],
                key: child.path,
                attrs: {
                  item: child,
                  "is-file": false,
                  "docker-container-id": _vm.dockerContainerId
                }
              })
            }),
            _vm._v(" "),
            _vm._l(_vm.item.childFiles, function(child) {
              return _c("file-tree-item", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isExpanded,
                    expression: "isExpanded"
                  }
                ],
                key: child.path,
                attrs: {
                  item: child,
                  "is-file": true,
                  "docker-container-id": _vm.dockerContainerId
                }
              })
            })
          ],
          2
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/molecules/FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "file-tree" } },
    [
      _c("el-divider", { staticClass: "m-0" }),
      _vm._v(" "),
      _vm.rootFolder
        ? _c(
            "div",
            {
              attrs: { id: "file-tree" },
              on: {
                contextmenu: function($event) {
                  $event.stopPropagation()
                  $event.preventDefault()
                  return _vm.onShowContextMenu($event, _vm.rootFolder)
                }
              }
            },
            [
              _vm._l(_vm.rootFolder.childFolders, function(child) {
                return _c("file-tree-item", {
                  key: child.path,
                  attrs: {
                    item: child,
                    "is-file": false,
                    "docker-container-id": _vm.dockerContainerId
                  },
                  on: { "show-context-menu": _vm.onShowContextMenu }
                })
              }),
              _vm._v(" "),
              _vm._l(_vm.rootFolder.childFiles, function(child) {
                return _c("file-tree-item", {
                  key: child.path,
                  attrs: {
                    item: child,
                    "is-file": true,
                    "docker-container-id": _vm.dockerContainerId
                  },
                  on: { "show-context-menu": _vm.onShowContextMenu }
                })
              })
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.1.2
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (true) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (true) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (true) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if (true) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if ( true && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if ( true && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if ( true && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if ( true && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./resources/js/Routes.js":
/*!********************************!*\
  !*** ./resources/js/Routes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Routes; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Routes =
/*#__PURE__*/
function () {
  function Routes() {
    _classCallCheck(this, Routes);
  }

  _createClass(Routes, null, [{
    key: "lessonDelta",
    value: function lessonDelta(id) {
      return "/lessons/delta/" + id;
    }
  }]);

  return Routes;
}();



/***/ }),

/***/ "./resources/js/components/AddQuestionDialogCode.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/AddQuestionDialogCode.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddQuestionDialogCode_vue_vue_type_template_id_8663e9fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true& */ "./resources/js/components/AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true&");
/* harmony import */ var _AddQuestionDialogCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddQuestionDialogCode.vue?vue&type=script&lang=js& */ "./resources/js/components/AddQuestionDialogCode.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css& */ "./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddQuestionDialogCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddQuestionDialogCode_vue_vue_type_template_id_8663e9fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddQuestionDialogCode_vue_vue_type_template_id_8663e9fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8663e9fe",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/AddQuestionDialogCode.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/AddQuestionDialogCode.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/AddQuestionDialogCode.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./AddQuestionDialogCode.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=style&index=0&id=8663e9fe&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_style_index_0_id_8663e9fe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_template_id_8663e9fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/AddQuestionDialogCode.vue?vue&type=template&id=8663e9fe&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_template_id_8663e9fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddQuestionDialogCode_vue_vue_type_template_id_8663e9fe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/DevelopmentIde.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/DevelopmentIde.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DevelopmentIde_vue_vue_type_template_id_d55761cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true& */ "./resources/js/components/DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true&");
/* harmony import */ var _DevelopmentIde_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DevelopmentIde.vue?vue&type=script&lang=js& */ "./resources/js/components/DevelopmentIde.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css& */ "./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DevelopmentIde_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DevelopmentIde_vue_vue_type_template_id_d55761cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DevelopmentIde_vue_vue_type_template_id_d55761cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d55761cc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/DevelopmentIde.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/DevelopmentIde.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIde.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIde.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=style&index=0&id=d55761cc&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_style_index_0_id_d55761cc_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_template_id_d55761cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIde.vue?vue&type=template&id=d55761cc&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_template_id_d55761cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIde_vue_vue_type_template_id_d55761cc_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/DevelopmentIdeConsole.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeConsole.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DevelopmentIdeConsole_vue_vue_type_template_id_64da698d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true& */ "./resources/js/components/DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true&");
/* harmony import */ var _DevelopmentIdeConsole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DevelopmentIdeConsole.vue?vue&type=script&lang=js& */ "./resources/js/components/DevelopmentIdeConsole.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css& */ "./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DevelopmentIdeConsole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DevelopmentIdeConsole_vue_vue_type_template_id_64da698d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DevelopmentIdeConsole_vue_vue_type_template_id_64da698d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "64da698d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/DevelopmentIdeConsole.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/DevelopmentIdeConsole.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeConsole.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeConsole.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=style&index=0&id=64da698d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_style_index_0_id_64da698d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_template_id_64da698d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeConsole.vue?vue&type=template&id=64da698d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_template_id_64da698d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeConsole_vue_vue_type_template_id_64da698d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/DevelopmentIdeHeader.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeHeader.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DevelopmentIdeHeader_vue_vue_type_template_id_092215c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true& */ "./resources/js/components/DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true&");
/* harmony import */ var _DevelopmentIdeHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DevelopmentIdeHeader.vue?vue&type=script&lang=js& */ "./resources/js/components/DevelopmentIdeHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css& */ "./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DevelopmentIdeHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DevelopmentIdeHeader_vue_vue_type_template_id_092215c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DevelopmentIdeHeader_vue_vue_type_template_id_092215c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "092215c7",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/DevelopmentIdeHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/DevelopmentIdeHeader.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeHeader.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeHeader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=style&index=0&id=092215c7&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_style_index_0_id_092215c7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_template_id_092215c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/DevelopmentIdeHeader.vue?vue&type=template&id=092215c7&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_template_id_092215c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevelopmentIdeHeader_vue_vue_type_template_id_092215c7_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/MarkdownEditor.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/MarkdownEditor.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MarkdownEditor_vue_vue_type_template_id_8fc46f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true& */ "./resources/js/components/MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true&");
/* harmony import */ var _MarkdownEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MarkdownEditor.vue?vue&type=script&lang=js& */ "./resources/js/components/MarkdownEditor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css& */ "./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MarkdownEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MarkdownEditor_vue_vue_type_template_id_8fc46f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MarkdownEditor_vue_vue_type_template_id_8fc46f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "8fc46f32",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/MarkdownEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/MarkdownEditor.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/MarkdownEditor.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./MarkdownEditor.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--17-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--17-2!../../../node_modules/vue-loader/lib??vue-loader-options!./MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=style&index=0&id=8fc46f32&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_style_index_0_id_8fc46f32_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_template_id_8fc46f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/MarkdownEditor.vue?vue&type=template&id=8fc46f32&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_template_id_8fc46f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownEditor_vue_vue_type_template_id_8fc46f32_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/SourceCodeEditorCreating.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/SourceCodeEditorCreating.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SourceCodeEditorCreating_vue_vue_type_template_id_25aa1a79___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79& */ "./resources/js/components/SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79&");
/* harmony import */ var _SourceCodeEditorCreating_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourceCodeEditorCreating.vue?vue&type=script&lang=js& */ "./resources/js/components/SourceCodeEditorCreating.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SourceCodeEditorCreating_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SourceCodeEditorCreating_vue_vue_type_template_id_25aa1a79___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SourceCodeEditorCreating_vue_vue_type_template_id_25aa1a79___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SourceCodeEditorCreating.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SourceCodeEditorCreating.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/SourceCodeEditorCreating.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreating_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SourceCodeEditorCreating.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreating.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreating_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreating_vue_vue_type_template_id_25aa1a79___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreating.vue?vue&type=template&id=25aa1a79&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreating_vue_vue_type_template_id_25aa1a79___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreating_vue_vue_type_template_id_25aa1a79___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/SourceCodeEditorCreatingContextMenu.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/components/SourceCodeEditorCreatingContextMenu.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SourceCodeEditorCreatingContextMenu_vue_vue_type_template_id_addc76b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6& */ "./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6&");
/* harmony import */ var _SourceCodeEditorCreatingContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js& */ "./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SourceCodeEditorCreatingContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SourceCodeEditorCreatingContextMenu_vue_vue_type_template_id_addc76b6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SourceCodeEditorCreatingContextMenu_vue_vue_type_template_id_addc76b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SourceCodeEditorCreatingContextMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreatingContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreatingContextMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreatingContextMenu_vue_vue_type_template_id_addc76b6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/SourceCodeEditorCreatingContextMenu.vue?vue&type=template&id=addc76b6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreatingContextMenu_vue_vue_type_template_id_addc76b6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SourceCodeEditorCreatingContextMenu_vue_vue_type_template_id_addc76b6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/atoms/FileTreeItem.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/atoms/FileTreeItem.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileTreeItem_vue_vue_type_template_id_158761c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true& */ "./resources/js/components/atoms/FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true&");
/* harmony import */ var _FileTreeItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileTreeItem.vue?vue&type=script&lang=js& */ "./resources/js/components/atoms/FileTreeItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css& */ "./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FileTreeItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileTreeItem_vue_vue_type_template_id_158761c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FileTreeItem_vue_vue_type_template_id_158761c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "158761c5",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/atoms/FileTreeItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/atoms/FileTreeItem.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/atoms/FileTreeItem.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTreeItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--17-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--17-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=style&index=0&id=158761c5&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_style_index_0_id_158761c5_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/atoms/FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/atoms/FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_template_id_158761c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/atoms/FileTreeItem.vue?vue&type=template&id=158761c5&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_template_id_158761c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTreeItem_vue_vue_type_template_id_158761c5_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/molecules/FileTree.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/molecules/FileTree.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileTree_vue_vue_type_template_id_6b7b7ff2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true& */ "./resources/js/components/molecules/FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true&");
/* harmony import */ var _FileTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileTree.vue?vue&type=script&lang=js& */ "./resources/js/components/molecules/FileTree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css& */ "./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FileTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileTree_vue_vue_type_template_id_6b7b7ff2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FileTree_vue_vue_type_template_id_6b7b7ff2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6b7b7ff2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/molecules/FileTree.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/molecules/FileTree.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/molecules/FileTree.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTree.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css&":
/*!*****************************************************************************************************************!*\
  !*** ./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--17-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--17-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=style&index=0&id=6b7b7ff2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_17_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_17_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_style_index_0_id_6b7b7ff2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/molecules/FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/molecules/FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_template_id_6b7b7ff2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/molecules/FileTree.vue?vue&type=template&id=6b7b7ff2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_template_id_6b7b7ff2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileTree_vue_vue_type_template_id_6b7b7ff2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/development_ide_creating.js":
/*!**************************************************!*\
  !*** ./resources/js/development_ide_creating.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_DevelopmentIde_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/DevelopmentIde.vue */ "./resources/js/components/DevelopmentIde.vue");

new Vue({
  el: "#development",
  components: {
    DevelopmentIde: _components_DevelopmentIde_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./resources/js/models/code_question.js":
/*!**********************************************!*\
  !*** ./resources/js/models/code_question.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CodeQuestion; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./resources/js/models/model.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CodeQuestion =
/*#__PURE__*/
function (_Model) {
  _inherits(CodeQuestion, _Model);

  _createClass(CodeQuestion, null, [{
    key: "baseRoute",
    value: function baseRoute() {
      return "code_questions";
    }
  }, {
    key: "index",
    value: function index(parameters, completion) {
      return _model_js__WEBPACK_IMPORTED_MODULE_0__["default"].index(CodeQuestion.baseRoute(), parameters, completion);
    }
  }]);

  function CodeQuestion(filePath, startIndex, endIndex, text, score, correctComment, incorrectComment, lessonId) {
    var _this;

    _classCallCheck(this, CodeQuestion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CodeQuestion).call(this, CodeQuestion.baseRoute()));
    _this.filePath = filePath;
    _this.startIndex = startIndex;
    _this.endIndex = endIndex;
    _this.text = text;
    _this.score = score;
    _this.correctComment = correctComment;
    _this.incorrectComment = incorrectComment;
    _this.lessonId = lessonId;
    return _this;
  }

  _createClass(CodeQuestion, [{
    key: "parameters",
    value: function parameters() {
      return {
        id: this.id,
        file_path: this.filePath,
        start_index: this.startIndex,
        end_index: this.endIndex,
        text: this.text,
        score: this.score,
        correct_comment: this.correctComment,
        incorrect_comment: this.incorrectComment,
        lesson_id: this.lessonId
      };
    }
  }]);

  return CodeQuestion;
}(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./resources/js/models/code_question_close.js":
/*!****************************************************!*\
  !*** ./resources/js/models/code_question_close.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CodeQuestionClose; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./resources/js/models/model.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CodeQuestionClose =
/*#__PURE__*/
function (_Model) {
  _inherits(CodeQuestionClose, _Model);

  _createClass(CodeQuestionClose, null, [{
    key: "baseRoute",
    value: function baseRoute() {
      return "code_question_closes";
    }
  }, {
    key: "index",
    value: function index(parameters, completion) {
      return _model_js__WEBPACK_IMPORTED_MODULE_0__["default"].index(CodeQuestionClose.baseRoute(), parameters, completion);
    }
  }]);

  function CodeQuestionClose(text, score, comment, codeQuestionId) {
    var _this;

    _classCallCheck(this, CodeQuestionClose);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CodeQuestionClose).call(this, CodeQuestionClose.baseRoute()));
    _this.text = text;
    _this.score = score;
    _this.comment = comment;
    _this.codeQuestionId = codeQuestionId;
    return _this;
  }

  _createClass(CodeQuestionClose, [{
    key: "parameters",
    value: function parameters() {
      return {
        text: this.text,
        score: this.score,
        comment: this.comment,
        code_question_id: this.codeQuestionId
      };
    }
  }]);

  return CodeQuestionClose;
}(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./resources/js/models/file.js":
/*!*************************************!*\
  !*** ./resources/js/models/file.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return File; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./resources/js/models/model.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var File =
/*#__PURE__*/
function (_Model) {
  _inherits(File, _Model);

  _createClass(File, null, [{
    key: "baseRoute",
    value: function baseRoute() {
      return "files";
    }
  }, {
    key: "index",
    value: function index(parameters, completion) {
      return _model_js__WEBPACK_IMPORTED_MODULE_0__["default"].index(File.baseRoute(), parameters, completion);
    }
  }]);

  function File(path, text, dockerContainerId) {
    var _this;

    _classCallCheck(this, File);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(File).call(this, File.baseRoute()));
    _this.path = path;
    _this.text = text;
    _this.dockerContainerId = dockerContainerId; // this.isNameEditable = false;

    return _this;
  }

  _createClass(File, [{
    key: "parameters",
    value: function parameters() {
      return {
        path: this.path,
        text: this.text,
        docker_container_id: this.dockerContainerId
      };
    }
  }, {
    key: "findBySuffix",
    value: function findBySuffix(suffix) {
      return this.path.endsWith(suffix);
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "path",
    get: function get() {
      return this._path;
    },
    set: function set(value) {
      this._path = value;
      this._name = value.split("/").slice(-1)[0];
    }
  }, {
    key: "text",
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      this._text = value;
    }
  }, {
    key: "dockerContainerId",
    get: function get() {
      return this._dockerContainerId;
    },
    set: function set(value) {
      this._dockerContainerId = value;
    } // get isNameEditable() {
    //     return this._isNameEditable;
    // }
    // set isNameEditable(value) {
    //     this._isNameEditable = value;
    // }

  }]);

  return File;
}(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./resources/js/models/folder.js":
/*!***************************************!*\
  !*** ./resources/js/models/folder.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Folder; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./resources/js/models/model.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Folder =
/*#__PURE__*/
function (_Model) {
  _inherits(Folder, _Model);

  _createClass(Folder, null, [{
    key: "baseRoute",
    value: function baseRoute() {
      return "folders";
    }
  }, {
    key: "index",
    value: function index(parameters, completion) {
      return _model_js__WEBPACK_IMPORTED_MODULE_0__["default"].index(Folder.baseRoute(), parameters, completion);
    }
  }]);

  function Folder(path) {
    var _this;

    _classCallCheck(this, Folder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Folder).call(this, Folder.baseRoute()));
    _this.path = path;
    _this.children = [];
    _this.isNameEditable = false;
    return _this;
  }

  _createClass(Folder, [{
    key: "parameters",
    value: function parameters() {
      return {
        path: this.path
      };
    }
  }, {
    key: "findBySuffix",
    value: function findBySuffix(suffix) {
      console.log("PATH: " + this.path);
      console.log("SUFFIX: " + suffix); // if (this.path.endsWith(suffix)) {
      //     return this;
      // }
      // for (let index = 0; index < this.children.length; ++index) {
      //     const result = this.children[index].findBySuffix(suffix);
      //     if (result) {
      //         return result;
      //     }
      // }
      // return null;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "path",
    get: function get() {
      return this._path;
    },
    set: function set(value) {
      this._path = value;
      this._name = value.split("/").slice(-1)[0];
    }
  }, {
    key: "children",
    get: function get() {
      return this._children;
    },
    set: function set(value) {
      this._children = value;
    }
  }, {
    key: "isNameEditable",
    get: function get() {
      return this._isNameEditable;
    },
    set: function set(value) {
      this._isNameEditable = value;
    }
  }]);

  return Folder;
}(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./resources/js/models/lesson.js":
/*!***************************************!*\
  !*** ./resources/js/models/lesson.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Lesson; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./resources/js/models/model.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Lesson =
/*#__PURE__*/
function (_Model) {
  _inherits(Lesson, _Model);

  _createClass(Lesson, null, [{
    key: "baseRoute",
    value: function baseRoute() {
      return "lessons";
    }
  }, {
    key: "index",
    value: function index(parameters, completion) {
      return _model_js__WEBPACK_IMPORTED_MODULE_0__["default"].index(Lesson.baseRoute(), parameters, completion);
    }
  }]);

  function Lesson(title, description, book, dockerContainerId, userName, consolePort, userId) {
    var _this;

    _classCallCheck(this, Lesson);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Lesson).call(this, Lesson.baseRoute()));
    _this.title = title;
    _this.description = description;
    _this.book = book;
    _this.dockerContainerId = dockerContainerId;
    _this.userName = userName;
    _this.consolePort = consolePort;
    _this.userId = userId;
    return _this;
  }

  _createClass(Lesson, [{
    key: "parameters",
    value: function parameters() {
      return {
        title: this.title,
        description: this.description,
        book: this.book,
        docker_container_id: this.dockerContainerId,
        user_name: this.userName,
        console_port: this.consolePort,
        user_id: this.userId
      };
    }
  }]);

  return Lesson;
}(_model_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./resources/js/models/model.js":
/*!**************************************!*\
  !*** ./resources/js/models/model.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Model; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var URI =
/*#__PURE__*/
function () {
  function URI(baseRoute) {
    _classCallCheck(this, URI);

    this.baseRoute = baseRoute;
  }

  _createClass(URI, [{
    key: "index",
    value: function index(parameters) {
      var names = Object.keys(parameters);
      return "/" + this.baseRoute + "?" + names.map(function (name) {
        return name + "=" + parameters[name];
      }).join("&");
    }
  }, {
    key: "store",
    value: function store() {
      return "/" + this.baseRoute;
    }
  }, {
    key: "create",
    value: function create() {
      return "/" + this.baseRoute + "/create";
    }
  }, {
    key: "destroy",
    value: function destroy(id) {
      return "/" + this.baseRoute + "/" + id;
    }
  }, {
    key: "update",
    value: function update(id) {
      var base = "/" + this.baseRoute + "/";
      return id ? base + id : base;
    }
  }, {
    key: "show",
    value: function show(id) {
      return "/" + this.baseRoute + "/" + id;
    }
  }, {
    key: "edit",
    value: function edit(id) {
      return "/" + this.baseRoute + "/" + id + "edit";
    }
  }]);

  return URI;
}();

var Model =
/*#__PURE__*/
function () {
  _createClass(Model, null, [{
    key: "uri",
    value: function uri(baseRoute) {
      return new URI(baseRoute);
    }
  }, {
    key: "index",
    value: function index(baseRoute, parameters, completion) {
      return new Promise(function (resolve) {
        axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(Model.uri(baseRoute).index(parameters)).then(function (response) {
          Model.handleResponse(response, completion);
          resolve(response);
        });
      });
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(response, completion) {
      if (!completion) {
        return;
      }

      completion(response);
    }
  }]);

  function Model(baseRoute) {
    _classCallCheck(this, Model);

    this.baseRoute = baseRoute;
  }

  _createClass(Model, [{
    key: "store",
    value: function store(completion) {
      var that = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(this.uri.store(), this.query()).then(function (response) {
        that.id = response.data;
        Model.handleResponse(response, completion);
      });
    }
  }, {
    key: "destroy",
    value: function destroy(completion) {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"](this.uri.destroy(this.id)).then(function (response) {
        Model.handleResponse(response, completion);
      });
    }
  }, {
    key: "update",
    value: function update(completion) {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(this.uri.update(this.id), this.query()).then(function (response) {
        Model.handleResponse(response, completion);
      });
    }
  }, {
    key: "query",
    value: function query() {
      return this.parameters(); // const parameters = this.parameters();
      // const query = {};
      // Object.keys(parameters).forEach(key => {
      //     const value = parameters[key];
      //     // if (typeof value == "string" || value instanceof String) {
      //     //     value = value.replace(" ", "%20");
      //     //     console.log(value);
      //     //     console.log(value.length);
      //     // }
      //     query[key] = encodeURIComponent(value);
      // });
      // return query;
    }
  }, {
    key: "baseRoute",
    get: function get() {
      return this._baseRoute;
    },
    set: function set(value) {
      this._baseRoute = value;
      this._uri = Model.uri(value);
    }
  }, {
    key: "uri",
    get: function get() {
      return this._uri;
    }
  }]);

  return Model;
}();



/***/ }),

/***/ "./resources/js/stores/development.js":
/*!********************************************!*\
  !*** ./resources/js/stores/development.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (new Vuex.Store({
  state: {
    editedFile: null
  },
  getters: {
    editedFileText: function editedFileText(state) {
      if (!state.editedFile) {
        return "";
      }

      return state.editedFile.text;
    },
    editedFilePath: function editedFilePath(state) {
      if (!state.editedFile) {
        return "";
      }

      return state.editedFile.path;
    }
  },
  actions: {
    setEditedFile: function setEditedFile(_ref, editedFile) {
      var commit = _ref.commit;
      commit("setEditedFile", editedFile);
    },
    setEditedFileText: function setEditedFileText(_ref2, text) {
      var commit = _ref2.commit;
      commit("setEditedFileText", text);
    },
    updateEditedFile: function updateEditedFile(_ref3) {
      var commit = _ref3.commit;
      commit("updateEditedFile");
    }
  },
  mutations: {
    // setSourceCodeEditor(state, payload) {
    //     state.sourceCodeEditor = payload.sourceCodeEditor
    //     state.sourceCodeEditor.$blockScrolling = Infinity;
    //     state.sourceCodeEditor.setOptions({
    //         enableBasicAutocompletion: true,
    //         enableSnippets: true,
    //         enableLiveAutocompletion: true,
    //         fontSize: "0.8rem",
    //     });
    //     state.sourceCodeEditor.setTheme(payload.theme ? payload.theme : "ace/theme/chaos");
    //     state.sourceCodeEditor.setReadOnly(true);
    // },
    setEditedFile: function setEditedFile(state, file) {
      state.editedFile = file; // state.sourceCodeEditor.setReadOnly(false);
      // state.sourceCodeEditor.setValue(file.text);
      // const modes = {
      //     js: "javascript",
      //     php: "php",
      //     html: "html",
      //     css: "css",
      //     scss: "scss",
      //     vue: "vue",
      //     json: "json",
      //     xml: "xml"
      // };
      // const pathComponents = file.path.split(".");
      // const extension = pathComponents.slice(-1)[0];
      // state.sourceCodeEditor.getSession().setMode("ace/mode/" + modes[extension]);
    },
    setEditedFileText: function setEditedFileText(state, text) {
      state.editedFile.text = text;
    },
    updateEditedFile: function updateEditedFile(state) {
      // console.log("#########################");
      // state.editedFile.text += "\n\n\n";
      // console.log(state.editedFile.text + "abc");
      state.editedFile.update(function (response) {// console.log(response.data + "abc");
      });
    }
  }
}));

/***/ }),

/***/ 18:
/*!********************************************************!*\
  !*** multi ./resources/js/development_ide_creating.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kobayashimasato/Apps/Web/ProMark/resources/js/development_ide_creating.js */"./resources/js/development_ide_creating.js");


/***/ })

/******/ });