import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-cff8c951.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["nwc-stock-finder",[[1,"nwc-stock-finder",{"list":[32],"empty":[32],"loading":[32]}]]],["nwc-stock-price",[[1,"nwc-stock-price",{"symbol":[1537],"data":[32],"inputValue":[32],"isValid":[32],"error":[32],"loading":[32]},[[32,"nwc_symbol_selected","onSymbolSelected"]]]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["nwc-side-drawer",[[1,"nwc-side-drawer",{"titletext":[513],"opened":[516],"showContactTab":[32],"open":[64],"close":[64]}]]],["nwc-todo-list",[[1,"nwc-todo-list",{"namespace":[1],"tasks":[32],"active":[32]}]]],["nwc-spinner",[[1,"nwc-spinner",{"color":[513]}]]]], options);
});
