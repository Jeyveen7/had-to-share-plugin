import * as constants from "./constants.es6";
import Renderer from "./renderer.es6";
import BrowserKit from "checkout-browser-kit";

const Logger = BrowserKit.Logger;
const EventManager = BrowserKit.EventManager;

const Errors = constants.Errors;
const Events = constants.Events;

var _config = {};
var _scriptTag = getPluginScriptTag() || {
    getAttribute: function() {
        return null;
    }
};

/**
 * Scans all SCRIPT tags on a page for a matching source (src).
 * @return {object} The DOM element representing the SCRIPT tag
 */
function getPluginScriptTag() {
    return document.currentScript || (() => {
        var scripts = document.getElementsByTagName("script");
        for (var index = scripts.length - 1; index--; index >= 0) {
            if (constants.SCRIPT_TAG_SRC_REGEX.test(scripts[index].getAttribute('src'))) {
                return scripts[index];
            }
        }
        return null;
    })();
}

/**
 * Handlers for events can be added on boot (as a shortcut) via window.XXXConfig or the configure method.
 *
 * Handlers are simply the "Event value" defined as a property and the value of that property is the handler function.
 *
 * Eg:
 * {
 *     ...
 *     ready: function(event) {
 *         console.log('ready to go');
 *     },
 *     ...
 * }
 */
function checkAndAddEventHandlers(configValues) {
    for (var key in configValues) {
        // the "key of configValues" is the "value of Events"
        if (Events.valueExists(key) && typeof configValues[key] === 'function') {
            // we have a matching event key and a valid handler, add the handler
            EventManager.addEventHandler(key, configValues[key]);
        }
    }
}

/**
 * To set a custom namespace for various reasons, the "data-namespace" attribute can be used.
 */
function setNamespace() {
    var namespace = _scriptTag.getAttribute('data-namespace');
    if (namespace) {
        if (constants.NAMESPACE_REGEX_VALIDATION.test(namespace)) {
            _config.namespace = namespace;
        } else {
            throw new Error(Errors.INVALID_NAMESPACE);
        }
    } else {
        _config.namespace = constants.DEFAULT_NAMESPACE;
    }
}

/**
 * Loads CSS file and mounts onto the DOM
 */
function loadCSS() {
    var cssElement = document.createElement('LINK');
    cssElement.setAttribute('rel', 'stylesheet');
    cssElement.setAttribute('type', 'text/css');
    cssElement.setAttribute('href', constants.DEFAULT_CSS_PATH);
    document.getElementsByTagName('head')[0].appendChild(cssElement);
}

class HadToShare {
    /**
     * Scans the SCRIPT tag for data-xxx config attributes or alternatively, looks for config items in configValues.
     * @param  {object} configValues
     * @return {void}
     */
    static configure(configValues) {
        configValues = configValues || {};

        // debug mode
        var isDebugMode = _scriptTag.getAttribute('data-debug-mode');
        HadToShare.debugMode = isDebugMode === 'true' ? true : (isDebugMode === 'false' ? false : configValues.debugMode);

        // localisation
        var localisation = _scriptTag.getAttribute('data-localisation') || configValues.localisation || constants.DEFAULT_LOCALISATION;
        HadToShare.localisation = localisation;

        // html container
        _config.htmlContainer = BrowserKit.DOM.getElement(String(configValues.htmlContainerSelector), _scriptTag.parentNode || document.getElementsByTagName('body')[0]);

        // logo
        _config.logoUrl = _scriptTag.getAttribute('data-logo-url') || configValues.logoUrl || constants.DEFAULT_LOGO_PATH;

        // add any handlers on the configValues (eg: ready)
        checkAndAddEventHandlers(configValues);
    }

    static get version() {
        return constants.VERSION;
    }

    static get namespace() {
        return _config.namespace;
    }

    static get debugMode() {
        return _config.debugMode;
    }
    static set debugMode(value) {
        _config.debugMode = !!value; // force truthy if undefined
        Logger.debugMode = !!value;
    }

    static get localisation() {
        return _config.localisation;
    }
    static set localisation(value) {
        if (constants.LOCALISATION_REGEX_VALIDATION.test(value)) {
            _config.localisation = value.toUpperCase();
        } else {
            throw new Error(Errors.INVALID_LOCALISATION);
        }
    }

    static render(config) {
        BrowserKit.extend(_config, config);
        HadToShare.configure(_config);
        Renderer.render(_config);
    }
}

// Finalise the namespace and return the module
setNamespace();
loadCSS();
export default HadToShare;
