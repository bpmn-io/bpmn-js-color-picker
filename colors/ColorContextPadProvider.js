export default function ColorContextPadProvider(contextPad, popupMenu, canvas, translate) {

  this._contextPad = contextPad;
  this._popupMenu = popupMenu;
  this._canvas = canvas;
  this._translate = translate;

  contextPad.registerProvider(this);
}


ColorContextPadProvider.$inject = [
  'contextPad',
  'popupMenu',
  'canvas',
  'translate'
];


ColorContextPadProvider.prototype.getContextPadEntries = function(element) {
  var self = this;

  var actions = {
    'set-color': {
      group: 'edit',
      className: 'bpmn-icon-color',
      title: self._translate('Set Color'),
      action: {
        click: function(event, element) {

          // get start popup draw start position
          var position = {
            ...getStartPosition(self._canvas, self._contextPad, element),
            cursor: {
              x: event.x,
              y: event.y
            }
          };

          // open new color-picker popup
          self._popupMenu.open(element, 'color-picker', position);
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