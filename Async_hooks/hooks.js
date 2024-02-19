const fs = require("fs");
const { fd } = process.stdout;
const async_hooks = require("async_hooks");

/**
 * Init callback --> asyncId: 4, type: Timeout, triggerAsyncId: 1, resource: 4
 * Destroy callback --> async id: 4
 */

function init(asyncId, type, triggerAsyncId, resource) {
    fs.writeSync(
        fd,
        `Init callback --> asyncId: ${asyncId}, type: ${type}, triggerAsyncId: ${triggerAsyncId}, resource: ${resource}\n`
    );
}

function destroy(asyncId) {
    fs.writeSync(fd, `Destroy callback --> async id: ${asyncId}\n`);
}

const asyncHook = async_hooks.createHook({ init, destroy });

asyncHook.enable();

setTimeout(() => {
    console.log("I've enter the function"); // run the script once and then another time but commenting this line
}, 1000);
