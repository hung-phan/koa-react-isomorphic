'use strict';

import path from 'path';

export const ROOT_PATH   = path.join(__dirname, './../../');
export const PUBLIC_PATH = path.join(ROOT_PATH, 'public');
export const join = (...args) => path.join(...args);
