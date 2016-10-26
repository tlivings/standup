'use strict';

import Assert from 'assert';
import Caller from 'caller';
import Engine from './engine';
import Fs from 'fs';
import Path from 'path';

export default {

    configure({preset, templates = '.templates', basedir = Path.resolve(Path.dir(Caller()))} = {}) {
        Assert.ok(Fs.existsSync(basedir), `${basedir} does not exist.`);

        templates = Path.join(basedir, templates);

        if (preset) {
            preset = {
                name: preset,
                dir: Path.join(basedir, templates, preset)
            };
        }

        Assert.ok(Fs.existsSync(templates), `${templates} does not exist.`);
        Assert.ok(!preset || Fs.existsSync(preset.dir), `${preset.dir} does not exist.`);

        const commondir = Path.join(basedir, templates, 'common');

        return Engine({
            preset: preset,
            templates: templates,
            basedir: basedir,
            common: Fs.existsSync(commondir) && commondir
        });
    }

};
