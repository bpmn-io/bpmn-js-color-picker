'use strict';

var fs = require('fs');

var BpmnModeler = require('bpmn-js/lib/Modeler');

var canvas = document.querySelector('#canvas');

var modeler = new BpmnModeler({ container: canvas });

var newDiagramXML = fs.readFileSync(__dirname + '/../resources/newDiagram.bpmn', 'utf-8');

modeler.importXML(newDiagramXML, function(err) {
  if (err) {
    console.log('error rendering', err);
  } else {
    console.log('rendered');
  }
});