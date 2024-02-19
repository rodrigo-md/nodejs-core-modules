import { createHook } from "async_hooks";
import { nextTick } from "process";

function init(asyncId, type, triggerId, resource) {
    console.log(
        `[init] asyncId: ${asyncId}, type: ${type}, triggerId: ${triggerId}, resource: ${resource}`
    );
}

function destroy(asyncId, type, triggerId, resource) {
    console.log(
        `[destroy] asyncId: ${asyncId}, type: ${type}, triggerId: ${triggerId}, resource: ${resource}`
    );
}

const hook = createHook({ init, destroy });
hook.enable();

setTimeout(() => {
    nextTick(() => {
        // process.nextTick doesn't change the result
        console.log("I've enter the function");
    });
}, 1000);
