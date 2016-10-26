'use strict';

const promisify = (fn, context) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn.apply(context, [...args, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }]);
        });
    };
};

export default promisify;
