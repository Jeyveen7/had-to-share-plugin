import * as constants from "./constants.es6";
import LocalisedMessages from "./localisation.es6";
import * as share from "./share.es6";
import templates from "../templates.js";
import BrowserKit from "checkout-browser-kit";

const EventManager = BrowserKit.EventManager;

var _elements;

class Renderer {
    static render(config) {
        //if the plugin has already been rendered we clear it first
        Renderer.clear(config.htmlContainer);

        var html = templates.plugin.render({
            title: LocalisedMessages[config.localisation].title,
            logoUrl: config.logoUrl,
            shareTargets: share.targets
        });

        config.htmlContainer.innerHTML = html;

        _elements = BrowserKit.DOM.getElements(config.htmlContainer, '.share-target');
        var shareFunction = function(event) {
            var name = event.target.getAttribute('data-name');
            share.post(name);
            EventManager.dispatchLogEvent(constants.Events.CONTENT_SHARED, {
                target: name
            });
        };
        for (var index in _elements) {
            BrowserKit.DOM.addEventListener(_elements[index], 'click', shareFunction);
        }
    }

    static clear(container) {
        //todo: remove click event handlers on _elements
        container.innerHTML = '';
    }
}

export default Renderer;
