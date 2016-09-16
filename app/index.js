'use strict';

var fs = require('fs');
var BpmnModeler = require('bpmn-js/lib/Modeler');

var canvas = document.querySelector('#canvas');

// Create new Modeler
var modeler = new BpmnModeler({
  container: canvas,
  additionalModules: [
    require('./colors')
  ],
  keyboard: { bindTo: document }
});

// Load example diagram
var newDiagramXML = fs.readFileSync(__dirname + '/newDiagram.bpmn', 'utf-8');

modeler.importXML(newDiagramXML, function(err) {
  if (err) {
    console.log('error rendering', err);
  } else {
    console.log('rendered');
  }
});


// GLOBAL UI
document.querySelector('#export-to-console').addEventListener('click', function(e) {

  modeler.saveXML({
    format: true
  }, function(err, xml) {
    if (err) {
      console.error(err);
    } else {
      console.log(xml);
    }
  });

  e.preventDefault();
});
