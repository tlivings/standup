'use strict';

import Fs from 'fs';
import Mkdirp from 'mkdirp';
import Path from 'path';
import Promisify from '../promisify';

const mkdirp = Promisify(Mkdirp);
const readdir = Promisify(Fs.readdir);
const link = Promisify(Fs.link);
const stat = Promisify(Fs.stat);

const copy = async (source, destination) => {
    const stats = await stat(source);

    if (stats.isDirectory()) {
        return await Promise.all((await readdir(source)).map((file) => copy(Path.join(source, file), Path.join(destination, file))));
    }

    await mkdirp(Path.dirname(destination));

    return await link(source, destination);
};

export default copy;
