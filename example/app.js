import newDiagramXML from './newDiagram.bpmn';

import ColorPickerModule from '..';

import BpmnModeler from 'bpmn-js/lib/Modeler';


const canvas = document.querySelector('#canvas');

const modeler = new BpmnModeler({
  container: canvas,
  additionalModules: [
    ColorPickerModule
  ]
});

modeler.importXML(newDiagramXML).then(result => {

  const {
    warnings = []
  } = result;

  if (warnings.length) {
    console.log('imported with warnings', warnings);
  }
}).catch(error => {
  console.error('import error', error);
});


// hook up with UI elements
document.querySelector('#export-to-console').addEventListener('click', function(e) {

  e.preventDefault();

  modeler.saveXML({
    format: true
  }).then(result => {
    console.log(result.xml);
  }).catch(err => {
    console.error(err);
  });
});
