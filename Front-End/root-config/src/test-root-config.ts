import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: 'welcome',
  app: () => System.import<LifeCycles>('welcome'),
  activeWhen: ['/welcome'],
});

registerApplication({
  name: '@test/bkrm',
  app: () => System.import<LifeCycles>('@test/bkrm'),
  activeWhen: ['/bkrm'],
});

start({
  urlRerouteOnly: true,
});
