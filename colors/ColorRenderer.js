'use strict';

var inherits = require('inherits');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;
var BpmnRenderer = require('bpmn-js/lib/draw/BpmnRenderer');

var svgAttr = require('tiny-svg/lib/attr');


function ColorRenderer(eventBus, styles, pathMap) {
  // set higher priority then a default 1000 for an existing BpmnRenderer
  var callPriority = 2000;

  BpmnRenderer.call(this, eventBus, styles, pathMap);

  var self = this;

  eventBus.on([ 'render.shape' ], callPriority, function(evt, context) {
    var element = context.element,
        visuals = context.gfx;

    // call default implementation
    var shape = self.drawShape(visuals, element);

    // 2D shape with default white color
    svgAttr(shape, {
      fill: getBackgroundColor(element) || '#ffffff'
    });

    // make sure default renderer is not called anymore
    return shape;
  });


  eventBus.on([ 'render.connection' ], callPriority, function(evt, context) {
    var element = context.element,
        visuals = context.gfx;

    // call default implementation
    var shape = self.drawConnection(visuals, element);

    // line shape with default black color
    svgAttr(shape, {
      stroke: getBackgroundColor(element)  || '#000000'
    });

    // make sure default renderer is not called anymore
    return shape;
  });
}

inherits(ColorRenderer, BpmnRenderer);

module.exports = ColorRenderer;


function getBackgroundColor(element) {
  var bo = getBusinessObject(element);
  return bo.di.get('color:background-color');
}
