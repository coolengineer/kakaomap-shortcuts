
let keySelectorMap = {
    "1": "ul.list_map_setting a.traffic",
    "2": "ul.list_map_setting a.cctv",
    "Q": "ul.list_map_setting a.accident",
    "W": "ul.list_map_setting a.bike",
    "A": "ul.list_map_setting a.terrain",
    "S": "ul.list_map_setting a.usedistrict",
    "X": "ul.list_map_setting a.hboundary",
    "Z": "ul.list_map_setting a.bboundary"
}

if(window.jQuery){(function($){
    let keyCodeSelectorMap = {};

    let shiftCtrlTipMap  = {};
    let altTipMap  = {};

    for( let key of Object.keys(keySelectorMap) ) {
        keyCodeSelectorMap[ key.charCodeAt(0) ] = keySelectorMap[key];
        shiftCtrlTipMap[key] = keySelectorMap[key];
    }
    shiftCtrlTipMap["M"] = "div.MapTypeControl a";
    shiftCtrlTipMap["U"] = "#tool\\.map\\.copyurl, a.link_copyurl";
    altTipMap["+"] = "div.zoom_control button:nth(0)";
    altTipMap["-"] = "div.zoom_control button:nth(1)";

    function showShiftCtrlTip(show) {
        for(let key of Object.keys(shiftCtrlTipMap)) {
            if (show) {
                $(shiftCtrlTipMap[key]).addClass("shortcutallocated").attr("data-shortcut-key", key);
            } else {
                $(shiftCtrlTipMap[key]).removeClass("shortcutallocated");
            }
        }
    }

    function showAltTip(show) {
        for(let key of Object.keys(altTipMap)) {
            if (show) {
                $(altTipMap[key]).addClass("shortcutallocated").attr("data-shortcut-key", key);
            } else {
                $(altTipMap[key]).removeClass("shortcutallocated");
            }
        }
    }

    $(document).on("keyup", e => {
        console.log("UP", e);
        if (!e.ctrlKey || !e.shiftKey) {
            showShiftCtrlTip(false);
        }
        if (!e.altKey) {
            showAltTip(false);
        }
    });
    $(document).on("keydown", e => {
        console.log("DOWN", e);
        let click_selector = null;
        if (e.ctrlKey && e.shiftKey) {
            if (e.which in keyCodeSelectorMap) {
                click_selector = $(keyCodeSelectorMap[e.which]);
            }
            switch(e.which) {
                case 'M'.charCodeAt(0): click_selector = $("div.MapTypeControl a").not(".ACTIVE"); break;
                //case 'U'.charCodeAt(0): click_selector = $("#tool\\.map\\.copyurl"); break;
                case 'U'.charCodeAt(0): click_selector = $("#tool\\.map\\.copyurl, a.link_copyurl"); break;
                default:
            }
            showShiftCtrlTip(true);
        }
        if (e.metaKey) {
            switch(e.which) {
                case 187: /*+*/ click_selector = $("div.zoom_control button:nth(0)"); break;
                case 189: /*-*/ click_selector = $("div.zoom_control button:nth(1)"); break;
            }
            showAltTip(true);
        }
        if (click_selector) {
            click_selector.each(
               (i,elm) => elm.click()
            )
            e.stopPropagation();
            e.preventDefault();
        }
    });
})(window.jQuery)}
