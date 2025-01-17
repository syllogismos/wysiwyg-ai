// Chosen Order v1.2.1
// This plugin allows you to handle the order of the selection for Chosen multiple <select> dropdowns
// Full source at https://github.com/tristanjahier/chosen-order
// Copyright (c) 2013 - Tristan Jahier, http://tristan-jahier.fr

// DISCLAIMER
// Chosen Order is not associated with Harvest in any way.
// Chosen is an original software by Patrick Filler for Harvest, http://getharvest.com
// Full source at https://github.com/harvesthq/chosen
// Copyright (c) 2011 Harvest http://getharvest.com

// This file is generated by `grunt build`, do not edit it by hand.
(function () {
  var $, AbstractChosenOrder, _ref,
    __indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractChosenOrder = (function () {
    var ERRORS;

    function AbstractChosenOrder() { }

    ERRORS = {
      invalid_select_element: "ChosenOrder::{{function}}: first argument must be a valid HTML Multiple Select element that has been Chosenified!",
      invalid_selection_array: "ChosenOrder::{{function}}: second argument must be an Array!",
      unreachable_chosen_container: "ChosenOrder::{{function}}: could not find the Chosen UI container! To solve the problem, try adding an \"id\" attribute to your <select> element.",
      ordering_unselected_option: "ChosenOrder::{{function}}: ignoring option '{{option}}' which is not selected. Set optional parameter \"force\" to 'true' to get the ordered selection forced first."
    };

    AbstractChosenOrder.insertAt = function (node, index, parentNode) {
      return parentNode.insertBefore(node, parentNode.children[index].nextSibling);
    };

    AbstractChosenOrder.getFlattenedOptionsAndGroups = function (select) {
      var flattened_options, opt, options, sub_opt, sub_options, _i, _j, _len, _len1;
      options = Array.prototype.filter.call(select.childNodes, function (o) {
        var _ref;
        return (_ref = o.nodeName.toUpperCase()) === 'OPTION' || _ref === 'OPTGROUP';
      });
      flattened_options = [];
      for (_i = 0, _len = options.length; _i < _len; _i++) {
        opt = options[_i];
        flattened_options.push(opt);
        if (opt.nodeName.toUpperCase() === 'OPTGROUP') {
          sub_options = Array.prototype.filter.call(opt.childNodes, function (o) {
            return o.nodeName.toUpperCase() === 'OPTION';
          });
          for (_j = 0, _len1 = sub_options.length; _j < _len1; _j++) {
            sub_opt = sub_options[_j];
            flattened_options.push(sub_opt);
          }
        }
      }
      return flattened_options;
    };

    AbstractChosenOrder.isValidMultipleSelectElement = function (element) {
      return element !== null && typeof element !== "undefined" && element.nodeName === "SELECT" && element.multiple;
    };

    AbstractChosenOrder.getChosenUIContainer = function (select) {
      if (select.id !== "") {
        return document.getElementById(select.id.replace(/-/g, "_") + "_chosen");
      } else {
        return this.searchChosenUIContainer(select);
      }
    };

    AbstractChosenOrder.isChosenified = function (select) {
      return this.getChosenUIContainer(select) != null;
    };

    AbstractChosenOrder.forceSelection = function (select, selection) {
      var i, opt, options, _ref;
      options = this.getFlattenedOptionsAndGroups(select);
      i = 0;
      while (i < options.length) {
        opt = options[i];
        if (_ref = opt.getAttribute("value"), __indexOf.call(selection, _ref) >= 0) {
          opt.selected = true;
          opt.setAttribute("selected", "");
        } else {
          opt.selected = false;
          opt.removeAttribute("selected");
        }
        i++;
      }
      return this.triggerEvent(select, "chosen:updated");
    };

    AbstractChosenOrder.getSelectionOrder = function (select) {
      var chosen_options, chosen_ui, close_btn, opt, option, options, order, rel, _i, _len;
      if (this.getDOMElement != null) {
        select = this.getDOMElement(select);
      }
      order = [];
      if (!this.isValidMultipleSelectElement(select)) {
        console.error(ERRORS.invalid_select_element.replace('{{function}}', 'getSelectionOrder'));
        return order;
      }
      chosen_ui = this.getChosenUIContainer(select);
      if (chosen_ui == null) {
        console.error(ERRORS.unreachable_chosen_container.replace('{{function}}', 'getSelectionOrder'));
        return order;
      }
      chosen_options = chosen_ui.querySelectorAll('.search-choice');
      options = this.getFlattenedOptionsAndGroups(select);
      for (_i = 0, _len = chosen_options.length; _i < _len; _i++) {
        opt = chosen_options[_i];
        close_btn = opt.querySelectorAll('.search-choice-close')[0];
        if (close_btn != null) {
          rel = close_btn.getAttribute(this.relAttributeName);
        }
        option = options[rel];
        order.push(option.value);
      }
      return order;
    };

    AbstractChosenOrder.setSelectionOrder = function (select, order, force) {
      var chosen_choices, chosen_options, chosen_ui, i, j, opt, opt_val, option, options, rel, relAttributeName, _i, _j, _len, _len1, _results;
      if (this.getDOMElement != null) {
        select = this.getDOMElement(select);
      }
      if (!this.isValidMultipleSelectElement(select)) {
        console.error(ERRORS.invalid_select_element.replace('{{function}}', 'setSelectionOrder'));
        return;
      }
      chosen_ui = this.getChosenUIContainer(select);
      if (chosen_ui == null) {
        console.error(ERRORS.unreachable_chosen_container.replace('{{function}}', 'setSelectionOrder'));
        return;
      }
      if (order instanceof Array) {
        order = order.map(Function.prototype.call, String.prototype.trim);
        options = this.getFlattenedOptionsAndGroups(select);
        if ((force != null) && force === true) {
          this.forceSelection(select, order);
        }
        _results = [];
        for (i = _i = 0, _len = order.length; _i < _len; i = ++_i) {
          opt_val = order[i];
          rel = null;
          for (j = _j = 0, _len1 = options.length; _j < _len1; j = ++_j) {
            opt = options[j];
            if (opt.value === opt_val) {
              rel = j;
            }
          }
          chosen_options = chosen_ui.querySelectorAll('.search-choice');
          relAttributeName = this.relAttributeName;
          option = Array.prototype.filter.call(chosen_options, function (o) {
            return o.querySelector("a.search-choice-close[" + relAttributeName + "=\"" + rel + "\"]") != null;
          })[0];
          if (option == null) {
            console.warn(ERRORS.ordering_unselected_option.replace('{{function}}', 'setSelectionOrder').replace('{{option}}', opt_val));
            continue;
          }
          chosen_choices = chosen_ui.querySelector("ul.chosen-choices");
          _results.push(this.insertAt(option, i, chosen_ui.querySelector('ul.chosen-choices')));
        }
        return _results;
      } else {
        return console.error(ERRORS.invalid_selection_array.replace('{{function}}', 'setSelectionOrder'));
      }
    };

    return AbstractChosenOrder;

  })();

  $ = jQuery;

  $.fn.extend({
    getSelectionOrder: function () {
      return ChosenOrder.getSelectionOrder(this);
    },
    setSelectionOrder: function (order, force) {
      return ChosenOrder.setSelectionOrder(this, order, force);
    }
  });

  this.ChosenOrder = (function (_super) {
    __extends(ChosenOrder, _super);

    function ChosenOrder() {
      _ref = ChosenOrder.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ChosenOrder.relAttributeName = 'data-option-array-index';

    ChosenOrder.isjQueryObject = function (obj) {
      return (typeof jQuery !== "undefined" && jQuery !== null) && obj instanceof jQuery;
    };

    ChosenOrder.getDOMElement = function (element) {
      if (this.isjQueryObject(element)) {
        return element.get(0);
      } else {
        return element;
      }
    };

    ChosenOrder.searchChosenUIContainer = function (element) {
      if ($(element).data("chosen") != null) {
        return $(element).data("chosen").container[0];
      } else {
        return $(element).next(".chosen-container.chosen-container-multi").get(0);
      }
    };

    ChosenOrder.triggerEvent = function (target, event_name) {
      return $(target).trigger(event_name);
    };

    return ChosenOrder;

  })(AbstractChosenOrder);

}).call(this);