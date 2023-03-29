import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const loadFile = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');
