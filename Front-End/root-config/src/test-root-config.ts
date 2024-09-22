import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: 'retail',
  app: () => System.import<LifeCycles>('retail'),
  activeWhen: ['/retail'],
});

registerApplication({
  name: '@test/bkrm',
  app: () => System.import<LifeCycles>('@test/bkrm'),
  activeWhen: ['/bkrm'],
});

start({
  urlRerouteOnly: true,
});
