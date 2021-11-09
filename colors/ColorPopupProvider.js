export default function ColorPopupProvider(popupMenu, modeling, translate) {
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._translate = translate;

  this._popupMenu.registerProvider('color-picker', this);
}


ColorPopupProvider.$inject = [
  'popupMenu',
  'modeling',
  'translate'
];


ColorPopupProvider.prototype.getEntries = function(element) {
  var self = this;

  var colors = [{
    label: 'Default',
    fill: undefined,
    stroke: undefined
  }, {
    label: 'Blue',
    fill: '#BBDEFB',
    stroke: '#1E88E5'
  }, {
    label: 'Orange',
    fill: '#FFE0B2',
    stroke: '#FB8C00'
  }, {
    label: 'Green',
    fill: '#C8E6C9',
    stroke: '#43A047'
  }, {
    label: 'Red',
    fill: '#FFCDD2',
    stroke: '#E53935'
  }, {
    label: 'Purple',
    fill: '#E1BEE7',
    stroke: '#8E24AA'
  }];

  var entries = colors.map(function(color) {
    return {
      title: self._translate(color.label),
      id: color.label.toLowerCase() + '-color',
      className: 'color-icon-' + color.label.toLowerCase(),
      action: createAction(self._modeling, element, color)
    };
  });

  return entries;
};


function createAction(modeling, element, color) {
  return function() {
    modeling.setColor(element, color);
  };
}