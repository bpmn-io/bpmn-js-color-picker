const colorImageSvg = '<svg viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="m1660 108-395 397-108 107-196-56-205-57-3 4-165 164 394 394 393 393 165-164v-1l3-3-57-204-51-181 113-113 395-396zM471 786l-366 366 393 393 394 395 366-367-393-394Z" />' +
'</svg>';

const colorImageUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(colorImageSvg);


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
      imageUrl: colorImageUrl,
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