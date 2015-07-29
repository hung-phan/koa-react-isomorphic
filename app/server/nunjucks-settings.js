'use strict';

import nunjucks from 'nunjucks';

const nunjucksEnv = nunjucks.configure('views', { autoescape: true });

// filters
nunjucksEnv.addFilter('json', obj => JSON.stringify(obj));

export default nunjucksEnv;
