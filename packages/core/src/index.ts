import type { App, Plugin } from 'vue';
import CpnA from './components/CpnA/index.vue';
import CpnB from './components/CpnB/index.vue';

export * from './components';
export * from './hooks';

const VueComponents: Plugin = {
  install(app: App) {
    app.component('CpnA', CpnA);
    app.component('CpnB', CpnB);
  }
};

export default VueComponents;
