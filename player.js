const GLS_JSON_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";
let data;
let steps;
let tipHtml;
let hoverTipHtml;
let tipCss;

function addJquery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = loadGls;
}

function addMainCss() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css';
    document.getElementsByTagName('head')[0].appendChild(css);
}

function fetchDataFromJson() {
    $.getJSON(GLS_JSON_URL, function (json) {
        data = json.data;
        steps = data.structure.steps;
        tipHtml = data.tiplates.tip;
        tipCss = data.css;
        hoverTipHtml = data.tiplates.hoverTip;
        addTipObject();
    });
}

function addTipObject() {
    $("head").append("<style>" + tipCss + "</style>");
    $("body").append(
        "<div  class='sttip'> " +
        "<div class='tooltip in'> " +
        "<div class='tooltip-arrow'></div>" +
        "<div class='tooltip-arrow second-arrow'></div>" +
        "<div class='popover-inner'>" +
        tipHtml +
        "</div>" +
        "</div>" +
        "</div>");
}

function loadGls() {
    addMainCss();
    fetchDataFromJson();
    alert("yay");
}

addJquery();


