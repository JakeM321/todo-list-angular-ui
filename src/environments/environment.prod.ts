//TODO - switch mock dependencies with actual dependencies when ready

import { ServerDependenciesMockModule } from 'src/modules/server-dependencies-mock/server-dependencies-mock.module';

export const environment = {
  production: true
};

export { ServerDependenciesMockModule as DependenciesModule }