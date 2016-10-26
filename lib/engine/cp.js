'use strict';

import Fs from 'fs';
import Mkdirp from 'mkdirp';
import Path from 'path';
import Promisify from '../promisify';

const mkdirp = Promisify(Mkdirp);
const readdir = Promisify(Fs.readdir);
const link = Promisify(Fs.link);
const stat = Promisify(Fs.stat);

const spawn = (generatorFunc) => {
    const continuer = (verb, arg) => {
        let result;

        try {
            result = generator[verb](arg);
        }
        catch (error) {
            return Promise.reject(error);
        }

        if (result.done) {
            return Promise.resolve(result.value);
        }
        else {
            return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
    }

    const generator = generatorFunc();
    const onFulfilled = continuer.bind(continuer, 'next');
    const onRejected = continuer.bind(continuer, 'throw');

    return onFulfilled();
};

const copy = (source, destination) => {
    return spawn(function* () {
        const stats = yield stat(source);

        if (stats.isDirectory()) {
            return yield Promise.all((yield readdir(source)).map((file) => copy(Path.join(source, file), Path.join(destination, file))));
        }

        yield mkdirp(Path.dirname(destination));

        return yield link(source, destination);
    });
};

export default copy;
