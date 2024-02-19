import { createHook } from "async_hooks";
import { writeSync } from "fs";
const { fd } = process.stdout;

function init(asyncId, type, triggerId, resource) {
    writeSync(
        fd,
        `[init] asyncId: ${asyncId}, type: ${type}, triggerId: ${triggerId}, resource:${resource}\n`
    );
}

function destroy(asyncId) {
    writeSync(fd, `[destroy] asyncId: ${asyncId}\n`);
}

function promiseResolve(asyncId) {
    writeSync(fd, `[promiseResolve]: ${asyncId}\n`);
}

const hook = createHook({ init, promiseResolve, destroy });
hook.enable();

(() => {
    new Promise((resolve, reject) => {
        //setTimeout(resolve, 1000);
        resolve();
    });
})();
