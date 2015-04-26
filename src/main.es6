import HadToShare from "./modules/hadtoshare.es6";
import * as constants from "./modules/constants.es6";
import BrowserKit from "checkout-browser-kit";

const Logger = BrowserKit.Logger;
const EventManager = BrowserKit.EventManager;

/** Bootstrap **/

//HadToShare.configure();
Logger.log(`< ${HadToShare.namespace} v${HadToShare.version} >`, 'log');

/** Public Interface **/

window[HadToShare.namespace] = {
    get version() {
        return HadToShare.version;
    },

    get namespace() {
        return HadToShare.namespace;
    },

    get debugMode() {
        return HadToShare.debugMode;
    },
    set debugMode(value) {
        HadToShare.debugMode = value;
    },

    addEventHandler(eventName, handler) {
        EventManager.addEventHandler(eventName, handler);
    },
    removeEventHandler(eventName, handler) {
        EventManager.removeEventHandler(eventName, handler);
    },
    removeAllEventHandlers() {
        EventManager.removeAllEventHandlers();
    },

    render(config) {
        HadToShare.render(config);
    }
};

HadToShare.render(window[`${HadToShare.namespace}${constants.GLOBAL_CONFIG_NAME_SUFFIX}`]);

// ready to go ...
EventManager.dispatchLogEvent(constants.Events.READY);
