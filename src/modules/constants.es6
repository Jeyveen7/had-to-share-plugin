export const VERSION = '**VERSION**';
export const DEFAULT_NAMESPACE = 'HadToShare';
export const GLOBAL_CONFIG_NAME_SUFFIX = 'Config';

/** regex */
export const SCRIPT_TAG_SRC_REGEX = /(hadtoshare).+(.js)$/i;
export const NAMESPACE_REGEX_VALIDATION = /^([a-zA-Z$_])([\w$_]+)$/;

export const DEFAULT_LOCALISATION = 'EN-GB';
export const LOCALISATION_REGEX_VALIDATION = /^[a-zA-Z]{2}-[a-zA-Z]{2}$/;

/** styling **/
export const DEFAULT_CSS_PATH = 'http://localhost:8000/css/h2s.css';
export const DEFAULT_LOGO_PATH = 'http://localhost:8000/img/logo.png';

// validation errors
export const Errors = {
    MISSING_CONFIGURATION: 'Missing configuration',
    INVALID_CONFIGURATION: 'Invalid configuration',
    NO_ARGUMENTS_FOUND: 'No arguments found',
    INVALID_URL: 'Invalid URL',
    INVALID_NAMESPACE: 'Invalid namespace',
    INVALID_CALLBACK: 'Invalid callback'
};

export const Events = {
    READY: 'ready',
    CONTENT_SHARED: 'contentShared'
};

(function() {
    var eventsValueKeyMap = {};
    // index Events by value to get the key
    for (var key in Events) {
        eventsValueKeyMap[Events[key]] = key;
    }

    /**
     * Helper function to check if a value exists
     * @param  {string} value
     * @return {Boolean}
     */
    Events.valueExists = function(value) {
        return !!eventsValueKeyMap[value];
    };
})();
