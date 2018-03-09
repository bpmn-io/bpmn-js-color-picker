'use strict';


function ColorContextPadProvider(contextPad, popupMenu, canvas) {

  this._contextPad = contextPad;
  this._popupMenu = popupMenu;
  this._canvas = canvas;

  contextPad.registerProvider(this);
}


ColorContextPadProvider.$inject = [
  'contextPad',
  'popupMenu',
  'canvas'
];
module.exports = ColorContextPadProvider;


ColorContextPadProvider.prototype.getContextPadEntries = function(element) {
  var self = this;

  var actions = {
    'set-color': {
      group: 'edit',
      className: 'bpmn-icon-color',
      title: 'Set Color',
      action: {
        click: function(event, element) {
          // close any existing popup
          self._popupMenu.close();

          // create new color-picker popup
          var colorPicker = self._popupMenu.create('color-picker', element);

          // get start popup draw start position
          var opts = getStartPosition(self._canvas, self._contextPad, element);

          // or fallback to current cursor position
          opts.cursor = {
            x: event.x,
            y: event.y
          };

          // open color picker submenu popup
          colorPicker.open(opts, element);
        }
      }
    }
  };

  return actions;
};


// helpers //////////////////////

function getStartPosition(canvas, contextPad, element) {

  var Y_OFFSET = 5;

  var diagramContainer = canvas.getContainer(),
      pad = contextPad.getPad(element).html;

  var diagramRect = diagramContainer.getBoundingClientRect(),
      padRect = pad.getBoundingClientRect();

  var top = padRect.top - diagramRect.top;
  var left = padRect.left - diagramRect.left;

  var pos = {
    x: left,
    y: top + padRect.height + Y_OFFSET
  };

  return pos;
}