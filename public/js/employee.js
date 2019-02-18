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
  });
  get_search_result();
  $("#search_btn").click(function (e) {
    e.preventDefault();
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
  $("#create_emplloyee").submit(function (e) {
    e.preventDefault();
    var form = $("#create_emplloyee");
    var data = getFormData(form);
    $.ajax({
      method: "post",
      type: "json",
      url: "/create/employee",
      data: data,
      success: function success(r) {
        console.log(r);
        alert("Position Created");
        document.getElementById("create_emplloyee").reset();
      },
      error: function error(xhr, status) {
        alert('Error status: ' + status);
      }
    });
  });
  $("#create_employee_hired").val(set_today_into_date_inp());
  $('body').click(function (e) {
    $(".bosses-div").empty();
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
        var boss_name = each_employee['boss_name'];

        if (boss_name == null) {
          boss_name = '';
        }

        var id = each_employee['id'];
        $(employees_table_selector).append('<tr id="tr' + id + '" data-id="' + id + '">' + '<td title="Name"><img src="/images/default.jpg" width="32" height="32" ></td>' + '<td title="Name"><input type="text" value="' + each_employee['employee_name'] + '" data-id="' + id + '" data-field-name="name" class="form-control update_field"   ></td>' + '<td title="Position"><input type="text" value="' + each_employee['position'] + '" data-id="' + id + '" data-field-name="position" class="form-control update_field"></td>' + '<td title="Salary"><input type="number" step="1" value="' + each_employee['salary'] + '" data-id="' + id + '" data-field-name="salary"  class="form-control update_field" ></td>' + '<td title="YYYY-MM-DD"><input type="date" value="' + unix_to_date(each_employee['hired']) + '" data-id="' + id + '" data-field-name="hired" class="form-control update_field"></td>' + '<td title="Boss" ><input type="text" value="' + boss_name + '" class="form-control boss_name" data-id="' + id + '"><div class="bosses-div boss_div_' + id + '" ></div></td>' + '<td title="Delete Position" ><a class="delete-position btn btn-outline-dark cursor-pointer" data-id="' + id + '" href="#" ><i class="fas fa-trash-alt"  ></i></a></td>' + '</tr>');
      });
      $(".update_field").change(function () {
        var field = $(this).attr("data-field-name");
        var id = $(this).attr("data-id");
        var value = $(this).val(); // console.log(field,id,value);

        update(field, id, value);
      });
      $(".update_field").keyup(function () {
        var field = $(this).attr("data-field-name");
        var id = $(this).attr("data-id");
        var value = $(this).val(); // console.log(field,id,value);

        update(field, id, value);
      });
      change_boss();
      delete_position();
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
    onPageClick: function onPageClick(event, page) {
      console.log("page_to_show " + page);
      get_search_result(page);
    }
  });
};

var update = function update(field, position_id, value) {
  $.ajax({
    method: "put",
    type: "json",
    data: {
      'position_id': position_id,
      'field': field,
      'value': value
    },
    url: "/update/employee",
    success: function success(r) {
      console.log(r);
    }
  });
};

var change_boss = function change_boss() {
  $(".boss_name").keyup(function (e) {
    var boss_name_to_search = $(this).val();
    var employee_id = $(this).attr("data-id");
    var boss_div_class = '.boss_div_' + employee_id;
    var boss_input = this;
    $(boss_div_class).empty();
    console.log(boss_name_to_search);
    $.ajax({
      method: 'get',
      type: 'json',
      url: '/employees/get_bosses/' + boss_name_to_search,
      success: function success(r) {
        console.log(r);
        var bosses_string = '<ul class="list-group" style="position:absolute">';
        $.each(r, function (index, value) {
          bosses_string += '<li class="list-group-item cursor-pointer" data-boss-id="' + value['id'] + '" data-boss-name="' + value['name'] + '" >' + value['name'] + '</li>';
        });
        bosses_string += '</ul>';
        console.log(bosses_string);
        $(boss_div_class).append(bosses_string);
        $(boss_div_class + " .list-group-item").hover(function () {
          $(this).addClass('active');
        }, function () {
          $(this).removeClass('active');
        });
        $(boss_div_class + " .list-group-item").click(function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          $(boss_input).val($(this).attr("data-boss-name"));
          var new_boss_id = $(this).attr("data-boss-id");
          var data = {
            employee_id: employee_id,
            boss_id: new_boss_id
          };
          $.ajax({
            method: 'put',
            type: 'json',
            data: data,
            url: '/update/employee/boss',
            success: function success(r) {
              console.log(r);
            },
            error: function error(xhr, status) {
              alert('Error status: ' + status);
            }
          });
          $(".bosses-div").empty();
        });
      }
    });
  });
};

var delete_position = function delete_position() {
  $(".delete-position").click(function (e) {
    e.preventDefault();
    var position_id = $(this).attr("data-id");
    var tr_selector = "#tr" + position_id;
    $.ajax({
      method: 'delete',
      data: {
        position_id: position_id
      },
      url: '/delete/employee',
      success: function success(r) {
        $(tr_selector).remove();
      },
      error: function error(_error, code) {
        alert("Error: " + code);
      }
    });
  });
};

function getFormData(form) {
  var unindexed_array = form.serializeArray();
  var indexed_array = {};
  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });
  return indexed_array;
}

;

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