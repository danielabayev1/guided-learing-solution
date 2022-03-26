const GLS_JSON_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";

/* Globals for JSON data */
let data;
let steps;
let tipHtml;
let hoverTipHtml;
let tipCss;

/* global for Tip state*/
let currStepIdx = 0;


/*
*
* Adds JQUERY to document. After it loads, runs loadGls.
*
* */
function addJquery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = loadGls;
}

/*
*
* Adds the main CSS from the word document task
*
* */
function addMainCss() {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css';
    document.getElementsByTagName('head')[0].appendChild(css);
}

/*
*
* Fetches data from JSON CDN. After it gets the data, it runs addTipObject(because of getJSON is async).
*
* */
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

/*
*
* Sets Tip's object position according the right selectors from JSON data
*
* */
function setTipPosition() {
    let stepAction = steps[currStepIdx].action;
    let targetSelector = stepAction.selector;
    if (!targetSelector || !$(targetSelector)[0]) {
        // for first tip which does not attached to any valid selector
        const viewPortRect = $("body")[0].getBoundingClientRect();
        (window.jQuery)('.sttip').css({
            position: 'absolute',
            top: viewPortRect.bottom / 2,
            left: viewPortRect.right / 2
        });
        return;
    }

    let targetSelectorRect = $(targetSelector)[0].getBoundingClientRect();
    let tipPosition;

    switch (stepAction.placement) {
        case ("right"): {
            tipPosition = {top:targetSelectorRect.top, left:targetSelectorRect.right};
            break;
        }
        case ("bottom"): {
            tipPosition = {top:targetSelectorRect.bottom, left:targetSelectorRect.left};
            break;
        }
    }
    $('.sttip').css({position: 'absolute', ...tipPosition});
}

/*
*
* Configures Tip object properties: position, content.
*
* */
function configureTipProperties() {
    $("span[data-iridize-role='stepCount']").text(currStepIdx + 1);
    const stepAction = steps[currStepIdx].action;
    let content;
    if (stepAction.type === "tip") {
        content = stepAction.contents["#content"];
        setTipPosition();
        $("div[data-iridize-id='content']").html(content);
    }
}

/*
*
* onClick action for 'Next' button
*
* */
function onNextClick() {
    let nextStepId = steps[currStepIdx].followers[0].next;
    currStepIdx = steps.findIndex(value => value.id === nextStepId);
    if (currStepIdx > 0) {
        $("button[data-iridize-role='prevBt']").removeClass('default-prev-btn');
    }
    if (currStepIdx === steps.length - 2) {
        $("a[data-iridize-role='nextBt']").css({display: 'none'})
    }
    configureTipProperties();
}

/*
*
* onClick action for 'back' button
*
* */
function onPrevClick() {
    currStepIdx--;
    if (currStepIdx === 0) {
        $("button[data-iridize-role='prevBt']").addClass('default-prev-btn');
    }
    if (currStepIdx < steps.length - 1) {
        $("a[data-iridize-role='nextBt']").css({display: 'block'})
    }
    configureTipProperties();
}

/*
*
* onClick action for 'close' button
*
* */
function onCloseClick() {
    $('.sttip').css({display: 'none'});
}

/*
*
* Binds actions to buttons on Tip object
* */
function bindActionToButtons() {
    $("a[data-iridize-role='nextBt']").click(onNextClick);
    $("button[data-iridize-role='prevBt']").click(onPrevClick);
    $("button[data-iridize-role='closeBt']").click(onCloseClick);

}

/*
*
* Adds tip object CSS and HTML code, and configures it.
*
* */
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
    configureTipProperties();
}

/*
*
* Loads the GLS engine
*
* */
function loadGls() {
    addMainCss();
    fetchDataFromJson();
}

/*
*
* Runs the whole program
*
* */
function run() {
    addJquery();
}

run();



