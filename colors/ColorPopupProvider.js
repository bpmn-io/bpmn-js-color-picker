import {
  domify
} from 'min-dom';

const COLORS = [ {
  label: 'Default',
  fill: undefined,
  stroke: undefined
}, {
  label: 'Blue',
  fill: '#BBDEFB',
  stroke: '#0D4372'
}, {
  label: 'Orange',
  fill: '#FFE0B2',
  stroke: '#6B3C00'
}, {
  label: 'Green',
  fill: '#C8E6C9',
  stroke: '#205022'
}, {
  label: 'Red',
  fill: '#FFCDD2',
  stroke: '#831311'
}, {
  label: 'Purple',
  fill: '#E1BEE7',
  stroke: '#5B176D'
} ];


export default function ColorPopupProvider(config, popupMenu, modeling, translate) {
  this._popupMenu = popupMenu;
  this._modeling = modeling;
  this._translate = translate;

  this._colors = config && config.colors || COLORS;
  this._defaultFillColor = config && config.defaultFillColor || 'white';
  this._defaultStrokeColor = config && config.defaultStrokeColor || 'rgb(34, 36, 42)';

  this._popupMenu.registerProvider('color-picker', this);
}


ColorPopupProvider.$inject = [
  'config.colorPicker',
  'popupMenu',
  'modeling',
  'translate'
];


ColorPopupProvider.prototype.getEntries = function(elements) {
  var self = this;

  var colorIcon = domify(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="100%">
      <rect rx="2" x="1" y="1" width="22" height="22" fill="var(--fill-color)" stroke="var(--stroke-color)" style="stroke-width:2"></rect>
    </svg>
  `);

  var entries = this._colors.map(function(color) {

    colorIcon.style.setProperty('--fill-color', color.fill || self._defaultFillColor);
    colorIcon.style.setProperty('--stroke-color', color.stroke || self._defaultStrokeColor);

    return {
      title: self._translate(color.label),
      id: color.label.toLowerCase() + '-color',
      imageUrl: `data:image/svg+xml;utf8,${ encodeURIComponent(colorIcon.outerHTML) }`,
      action: createAction(self._modeling, elements, color)
    };
  });

  return entries;
};


function createAction(modeling, element, color) {
  return function() {
    modeling.setColor(element, color);
  };
}