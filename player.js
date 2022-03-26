const GLS_JSON_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";

/* Globals for JSON data */
let data;
let steps;
let tipHtml;
let hoverTipHtml;
let tipCss;

/* global for Tip state*/
let currStepIdx = 0;

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



function onNextClick() {
    let nextStepId = steps[currStepIdx].followers[0].next;
    currStepIdx = steps.findIndex(value => value.id === nextStepId);
    if (currStepIdx > 0) {
        $("button[data-iridize-role='prevBt']").removeClass('default-prev-btn');
    }
    if (currStepIdx === steps.length - 2) {
        $("a[data-iridize-role='nextBt']").css({display: 'none'})
    }
}

function onPrevClick() {
    currStepIdx--;
    if (currStepIdx === 0) {
        $("button[data-iridize-role='prevBt']").addClass('default-prev-btn');
    }
    if (currStepIdx < steps.length - 1) {
        $("a[data-iridize-role='nextBt']").css({display: 'block'})
    }
}

function onCloseClick() {
    $('.sttip').css({display: 'none'});
}

function bindActionToButtons() {
    $("a[data-iridize-role='nextBt']").click(onNextClick);
    $("button[data-iridize-role='prevBt']").click(onPrevClick);
    $("button[data-iridize-role='closeBt']").click(onCloseClick);

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

    $("span[data-iridize-role='stepsCount']").text(steps.length - 1);

    bindActionToButtons();
}

function loadGls() {
    addMainCss();
    fetchDataFromJson();
}

addJquery();


