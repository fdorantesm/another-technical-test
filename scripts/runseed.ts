import { runSeeders } from 'typeorm-extension';
import { dataSource } from './data-source';

(async () => {
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
