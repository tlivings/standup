'use strict';



import Test from 'tape';
import Standup from '../dist';
import Co from 'co';

Test.only('test standup', (t) => {

    t.test('plan', (t) => {
        t.plan(1);

        //Standup.configure(options).then(done).catch(error);

        spawn(function *() {
            const ok = yield new Promise(function(resolve, reject) {
                resolve(true);
            });

            return ok;
        }).then((ok) => t.ok(ok));

    });

});

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
            return result.value;
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
