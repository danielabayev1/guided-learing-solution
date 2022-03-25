const GLS_JSON_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";
let data;

function addJquery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function fetchDataFromJson() {
    $.getJSON(GLS_JSON_URL, function (json) {
        data = json.data;
        console.log(data);
    });
}

addJquery();





