import ColorContextPadProvider from './ColorContextPadProvider';
import ColorPopupProvider from './ColorPopupProvider';

export default {
  __init__: [
    'colorContextPadProvider',
    'colorPopupProvider'
  ],
  colorContextPadProvider: [ 'type', ColorContextPadProvider ],
  colorPopupProvider: [ 'type', ColorPopupProvider ]
};