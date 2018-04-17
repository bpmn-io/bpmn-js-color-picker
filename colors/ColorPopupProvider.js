'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;


function PopupMenuProvider(popupMenu, modeling) {
  this._popupMenu = popupMenu;
  this._modeling = modeling;

  this._popupMenu.registerProvider('color-picker', this);
}


PopupMenuProvider.$inject = [
  'popupMenu',
  'modeling'
];
module.exports = PopupMenuProvider;


PopupMenuProvider.prototype.getEntries = function(element) {
  var self = this;

  var colors = [
    {
      label: 'Red',
      hex: 'ff0000'
    }, {
      label: 'Orange',
      hex: 'ff7f00'
    }, {
      label: 'Yellow',
      hex: 'ffff00'
    }, {
      label: 'Green',
      hex: '00ff00'
    }, {
      label: 'Blue',
      hex: '0000ff'
    }, {
      label: 'Indigo',
      hex: '4b0082'
    }, {
      label: 'Violet',
      hex: '9400d3'
    }
  ];

  var entries = colors.map(function(color) {
    return {
      label: color.label,
      id: color.label.toLowerCase() + '-color',
      className: 'color-icon-' + color.hex,
      action: createAction(self._modeling, element, '#' + color.hex)
    };
  });

  return entries;
};


PopupMenuProvider.prototype.getHeaderEntries = function(element) {
  return [
    {
      label: 'Clear',
      id: 'clear-color',
      className: 'color-icon-clear',
      action: createAction(this._modeling, element)
    }
  ];
};


function createAction(modeling, element, newColor) {
  // set hex value to an element
  return function() {
    var bo = getBusinessObject(element);
    var di = bo.di;

    var currentColor = bo.get('bioc:fill');

    console.log('Replacing colors from/to: ', currentColor, newColor);

    var ns = (
      newColor ?
        'http://www.omg.org/spec/BPMN/non-normative/color/1.0' :
        undefined
    );

    modeling.updateProperties(element, {
      'bioc:fill': newColor
    });

  };
}
