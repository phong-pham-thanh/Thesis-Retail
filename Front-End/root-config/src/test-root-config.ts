import { registerApplication, start, LifeCycles } from "single-spa";

import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });


registerApplication({
  name: '@test/angular',
  app: () => System.import<LifeCycles>('@test/angular'),
  activeWhen: ['/'],
});

registerApplication({
  name: '@test/bkrm',
  app: () => System.import<LifeCycles>('@test/bkrm'),
  activeWhen: ['/'],
});

layoutEngine.activate();
start();