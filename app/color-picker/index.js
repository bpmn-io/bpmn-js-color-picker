'use strict';

module.exports = {
  __init__: [
    'colorRenderer',
    'colorContextPadProvider',
    'colorPopupProvider'
  ],
  colorRenderer: [ 'type', require('./ColorRenderer') ],
  colorContextPadProvider: [ 'type', require('./ColorContextPadProvider') ],
  colorPopupProvider: [ 'type', require('./ColorPopupProvider') ]
};