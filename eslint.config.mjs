import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  ignored: [ 'dist' ],
  build: [
    '*.js',
    '*.mjs'
  ]
};

export default [
  {
    ignores: files.ignored,
  },
  ...bpmnIoPlugin.configs.browser.map(config => {
    return {
      ...config,
      ignores: files.build
    };
  }),
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: files.build
    };
  })
];