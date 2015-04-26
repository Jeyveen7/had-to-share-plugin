module.exports = (function() {
    var Hogan = require('hogan');
    var templates = {};
    templates['plugin'] = new Hogan.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"h2s-plugin\">");t.b("\n" + i);t.b("    <div class=\"branding\">");t.b("\n" + i);t.b("        <img src=\"");t.b(t.v(t.f("logoUrl",c,p,0)));t.b("\">");t.b("\n" + i);t.b("        <span>");t.b(t.v(t.f("title",c,p,0)));t.b("</span>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <div class=\"share-targets\">");t.b("\n" + i);if(t.s(t.f("shareTargets",c,p,1),c,p,0,179,258,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <img src=\"");t.b(t.v(t.f("iconUrl",c,p,0)));t.b("\" class=\"share-target\" data-name=\"");t.b(t.v(t.f("name",c,p,0)));t.b("\">");t.b("\n" + i);});c.pop();}t.b("    </div>");t.b("\n" + i);t.b("</div>");return t.fl(); },partials: {}, subs: {  }});
    return templates;
})();