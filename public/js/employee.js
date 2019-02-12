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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/employee.js":
/*!**********************************!*\
  !*** ./resources/js/employee.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var current_page = 1;
var employees_table_selector = '.employees_table tbody';
var last_page;
var data;
$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  }); // console.log(get_search_result());;

  get_search_result();
  $("#search_btn").click(function (e) {
    $('#pagination').empty();
    $('#pagination').removeData("twbs-pagination");
    $('#pagination').unbind("page");
    get_search_result();
  });
  $("#create_hired").val(set_today_into_date_inp());
  $("#date_to").val(set_today_into_date_inp());
  $(".tabs-page").click(function (e) {
    e.preventDefault();
    $(".tabs-page").removeClass("active");
    $(this).addClass("active");
    $(".tabs-content").hide();
    var show_selector = $(this).attr("data-display-class");
    $(show_selector).show();
  });
  $("#submit_new_employee").click(function (e) {
    // e.preventDefault();
    var create_name = $("#create_name");
    var create_position = $("#create_position");
    var create_salary = $("#create_salary");
    var create_hired = $('#create_hired');
    $.ajax({
      method: "post",
      type: "json",
      url: "/create/employee",
      data: {
        name: create_name,
        position: create_position,
        salary: create_salary,
        hired: create_hired
      },
      success: function success(r) {
        console.log(r);
      }
    });
  });
});

var get_search_result = function get_search_result() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var search_req = $("#search_req").val();
  var search_opt = $("#search_opt").val();
  var date_from = $("#date_from").val();
  var date_to = $("#date_to").val();
  var salary_from = $("#salary_from").val();
  var salary_to = $("#salary_to").val();
  $.ajax({
    method: 'get',
    type: 'json',
    url: '/search',
    data: {
      'page': page,
      'search_req': search_req,
      'search_opt': search_opt,
      'date_from': date_from,
      'date_to': date_to,
      'salary_from': salary_from,
      'salary_to': salary_to
    },
    success: function success(r) {
      console.log(r);
      respond = r;
      current_page = r['current_page'];
      last_page = r['last_page'];
      data = r['data'];
      pagination(last_page);
      $(employees_table_selector).empty();
      $.each(data, function (index, each_employee) {
        //console.log(each_employee);
        $(employees_table_selector).append('<tr data-id="' + each_employee['id'] + '">' + '<td title="Name"><img src="/images/default.jpg" width="32" height="32" ></td>' + '<td title="Name"><input type="text" value="' + each_employee['employee_name'] + '" class="form-control" ></td>' + '<td title="Position"><input type="text" value="' + each_employee['position'] + '" class="form-control"></td>' + '<td title="Salary"><input type="number" step="1" value="' + each_employee['salary'] + '"  class="form-control" ></td>' + '<td title="YYYY-MM-DD"><input type="date" value="' + unix_to_date(each_employee['hired']) + '" class="form-control"></td>' + '<td title="Boss"><input type="text" value="' + each_employee['boss_name'] + '" class="form-control"></td>' + '</tr>');
      });
    }
  });
};

var set_today_into_date_inp = function set_today_into_date_inp() {
  var now = new Date();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  var today = now.getFullYear() + '-' + month + '-' + day;
  return today;
};

var unix_to_date = function unix_to_date(unix) {
  var date = new Date(unix * 1000);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  return date.getFullYear() + '-' + month + '-' + day;
};

var pagination = function pagination(last_page) {
  $("#pagination").twbsPagination({
    totalPages: last_page,
    visiblePages: 6,
    initiateStartPageClick: false,
    // next: 'Next',
    // prev: 'Prev',
    onPageClick: function onPageClick(event, page) {
      console.log("page_to_show " + page);
      get_search_result(page);
    }
  });
};

var updater = function updater() {};

var create_employee = function create_employee() {};

/***/ }),

/***/ 1:
/*!****************************************!*\
  !*** multi ./resources/js/employee.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/ems/resources/js/employee.js */"./resources/js/employee.js");


/***/ })

/******/ });