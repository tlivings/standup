'use strict';

import Test from 'tape';
import Copy from '../dist/engine/copy';
import Path from 'path';
import Fs from 'fs';

Test('test copy', (t) => {

    t.test('copy a file', (t) => {
        t.plan(1);

        Copy(Path.join(__dirname, 'fixtures/app/.templates/option1/file1.js'), Path.join(__dirname, 'fixtures/tmp/file1.js'))
        .then(() => {
            t.ok(Fs.existsSync(Path.join(__dirname, 'fixtures/tmp/file1.js')));
            Fs.unlinkSync(Path.join(__dirname, 'fixtures/tmp/file1.js'));
            Fs.rmdirSync(Path.join(__dirname, 'fixtures/tmp'));
        })
        .catch((error) => {
            console.log(error.stack);
        });
    });

    t.test('copy recursive', (t) => {
        t.plan(2);

        console.time('copy');
        Copy(Path.join(__dirname, 'fixtures/app/.templates/option2'), Path.join(__dirname, 'fixtures/tmp/option2'))
        .then(() => {
            console.timeEnd('copy');
            t.ok(Fs.existsSync(Path.join(__dirname, 'fixtures/tmp/option2/file2.js')));
            t.ok(Fs.existsSync(Path.join(__dirname, 'fixtures/tmp/option2/file3.js')));
            Fs.unlinkSync(Path.join(__dirname, 'fixtures/tmp/option2/file2.js'));
            Fs.unlinkSync(Path.join(__dirname, 'fixtures/tmp/option2/file3.js'));
            Fs.rmdirSync(Path.join(__dirname, 'fixtures/tmp/option2'));
            Fs.rmdirSync(Path.join(__dirname, 'fixtures/tmp'));
        })
        .catch((error) => {
            console.log(error.stack);
        });
    });

});
