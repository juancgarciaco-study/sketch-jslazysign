const _template_page = '<section class="sectionPage" id="Page_?"><img src="../images/{srcimg}" loading="lazy" alt="Page ?" class="imgPage" id="Page_?_Image" /></section>';
let p = -1;
const fill={};
fill.readonly = [];
fill.toShow = [];
fill.reqc = "rgb(255, 132, 153)";
fill.nonreqc = "rgb(251, 251, 251)";
fill.reqbord = "2px solid black";
let b = !1,
    a = [],
    c = [],
    g = [],
    e = {
        position: {
            my: "left bottom+35"
        }
    },
    h = (new Spinner).spin(),
    f = -1;
    function FieldValidation() {
        validateField = function(b, a, c, g, e, h) {
            a = new RegExp(a);
            val = $(b.target).val();
            if ("" === val) {
                var f = h ? "Black" : "Gray";
                g && (Common.obj.showWarningNew("This field may not contain an empty value", 300, 400, "Error", "#divprnt"), $(b.target).focus());
                $(b.target).css("color", f);
                $(b.target).val("")
            } else if (!a.test(val)) $(b.target).css("color", f), $(b.target).val("");
            else if (null !== e && "undefined" !== typeof e && (h = e.split(","), 2 == h.length)) {
                e = h[0];
                g = h[1];
                f = new RegExp(h[1], "g");
                h = $(b.target).val().replace(f,
                    "");
                e = e.split(f);
                f = "";
                for (a = 0; a < e.length; a++)
                    for (0 < f.length && (f += g), c = 0; c < e[a].length; c++) {
                        var k = h.substring(0, 1);
                        if ("" === k) break;
                        var l = e[a].substring(c, c + 1);
                        "#" !== l ? (f += l, k === l && (h = h.substring(1))) : (f += h.substring(0, 1), h = h.substring(1))
                    }
                $(b.target).val(f)
            }
        };
        hidePrompt = function(b, a) {
            val = $(b.target).val();
            $(b.target).css("color", "Black")
        };
        this.initValidator = function(b, a, c, g, e, h) {
            cc = h ? "Black" : "Gray";
            "" != $(b).val() && $(b).val() != a || "" == a || $(b).css("color", cc);
            $.data($(b)[0], "vv", a);
            $(b).blur(function(b) {
                validateField(b,
                    c, a, g, e, h)
            }).blur();
            $(b).focus(function(b) {
                hidePrompt(b, a)
            })
        };
        checkComplete = function(b) {
            d = function() {
                1 === b ? fill.request.ext ? window.location = fill.request.ext : fill.request.slf || fill.request.il ? fill.request.mob && isMobile() ? window.location = "defaultm.aspx" : window.location = "requests.aspx" : window.location = "index.html" : fill.request.mob && isMobile() ? window.location = "Defaultm.aspx" : window.location = "Requests.aspx"
            };
            if (fill && fill.request && !fill.signing) {
                var a = showInfo(3);
                fill.prompted = !0;
                "" !== a ? Common.obj.showConfirmNew('<div style="text-align:left">' +
                    a + "<br/><br/>Do you want to quit?</div>", 300, 350, "Yes", "No", "#divprnt",
                    function() {
                        showWait();
                        d()
                    }) : d()
            }
        }
    }
    null == FieldValidation.obj && (FieldValidation.obj = new FieldValidation)
;
    
setReqState = function(b, a) {
    a && !b.is(":disabled") ? b.is(":checkbox") ? b.css({
        background: fill.reqc,
        "outline-color": fill.reqc,
        "outline-width": "2px",
        "outline-style": "solid"
    }).addClass("rctrl") : b.css({
        background: fill.reqc,
        border: fill.reqbord
    }).addClass("rctrl") : b.is(":checkbox") ? b.css({
        background: fill.nonreqc,
        "outline-color": fill.nonreqc,
        "outline-width": "0",
        "outline-style": "solid"
    }).removeClass("rctrl") : b.css({
        background: fill.nonreqc,
        border: "1px solid #C0C0C0"
    }).removeClass("rctrl")
};
initPrepare = function(a) {
    var b = $("#cc" + a.id);
    b.addClass("sbutton").attr("name", a.id).unbind("click");
    if (a.signed) b.css({
        "background-color": "",
        border: "none"
    }).removeClass("ui-corners-all").addClass("signed").html('<div style="width:100%;height:100%;overflow:hidden" class="f' + fill.request.sf + '">' + a.val + "</div>");
    else if (a.ro) b.find("img").attr("src",
        "../images/signButton.png");
    else {
        var c = Math.min(a.h, 29);
        b.click(function(b) {
            initialDocument(b, a.id)
        }).hover(function() {
            $(this).css("border", "1px solid gray")
        }, function() {
            $(this).css("border", "none")
        }).find("img").attr("src", "../images/initial.png").addClass("fsign init").css({
            border: "none",
            "max-width": "98px",
            "max-height": c + "px"
        })
    }
    $.data(b[0], "sgnd", a.signed ? 1 : a.ro ? 2 : 0)
};
positionMe = function(a, c) {
    var e = $(a);
    e.attr("ln", c.ln);
    c.ln > f && (f = c.ln);
    if ("" !== $.trim(a) && ("" !== $.trim(c.prompt) && (e.attr("pmt",
            c.prompt), e.attr("placeholder", c.prompt)), void 0 !== e.attr("id"))) {
        var h = c.l,
            g = c.t,
            k = c.w,
            q = c.h;
        2 === c.ftp ? e.css({
            height: "15px",
            width: "15px"
        }) : (h--, g--);
        1 === c.ftp && (e.css({
            "word-wrap": "break-word"
        }), 0 < c.mlen && e.attr("maxlength", c.mlen));
        9 != c.ftp && 7 !== c.ftp && 0 < c.tab && e.attr("tabindex", c.tab);
        c.tab > f && (f = c.tab);
        var m = .7;
        0 === c.trsp ? c.sign ? m = .8 : 2 === c.ftp || 9 === c.ftp ? m = 1 : c.reqrd && (m = .7) : m = 1;
        e.css({
            left: Math.round(h),
            top: Math.round(g),
            position: "absolute",
            opacity: m
        });
        "null" != c.font && null != c.font && void 0 != c.font &&
            "" != c.font && e.css({
                "font-family": c.font
            });
        0 >= c.fontsize && (c.fontsize = 12);
        0 < c.fontsize && 8 != c.ftp && e.css({
            "font-size": c.fontsize + "px"
        });
        0 < k && (e.css({
            width: Math.round(k - 2),
            height: Math.round(q - 2),
            border: "none" != c.showborder ? "1px solid #C0C0C0" : "none"
        }).addClass("ui-widget"), !c.sign && (0 >= c.fontsize || q < c.fontsize) ? e.css({
            height: Math.round(q - 2)
        }) : c.sign && e.css({
            height: q + "px",
            border: "none",
            "line-height": q + "px",
            "vertical-align": "middle"
        }));
        "" != c.validator && FieldValidation.obj.initValidator(a, c.prompt, c.validator, !1, c.fmt, c.reqrd);
        c.reqrd ? (2 != c.ftp ? e.blur(function() {
                if (!b) {
                    var a = 8 != c.ftp ? $(this).val() : $(this).text();
                    a == c.prompt && (a = "");
                    setReqState($(this), !("" != $.trim(a) || c.ro || e.is(":disabled")));
                    8 == c.ftp && c.signed && $(this).css({
                        border: ""
                    });
                    l || setTimeout(function() {
                        fill.countRequired()
                    }, 10)
                }
            }).blur() : e.change(function() {
                setReqState(e, !e.is(":checked") && !e.attr("disabled"));
                l || setTimeout(function() {
                    fill.countRequired()
                }, 10)
            }).change(), $.data(e[0], "req", "1"), e.attr("req", "1")) 
            :
            c.ro ? 7 != c.ftp && e.css({ background: "#EFEFEF" }) : "none" != c.showborder && e.css({ background: fill.nonreqc });
        if (1 <= c.valtype && 6 >= c.valtype)
            if (e.is(":enabled") && 9 != c.ftp && 3 >= c.valtype && e.datepicker({
                    changeMonth: !0,
                    changeYear: !0,
                    yearRange: "1920:2030",
                    onClose: function(a, b) {
                        "" != a && 0 > a.indexOf("MM/") && $(this).css({
                            background: fill.nonreqc
                        })
                    }
                }), 1 === c.ftp && 2 <= c.valtype && 6 >= c.valtype && (e.val() === c.prompt || "" === $.trim(e.val()))) 2 === c.valtype ? e.val($.datepicker.formatDate("mm/dd/yy", new Date)) : 4 === c.valtype ? e.val($.datepicker.formatDate("dd", new Date)) : 5 === c.valtype ?
                e.val(getMonthName()) : 6 === c.valtype ? e.val($.datepicker.formatDate("yy", new Date)) : e.val($.datepicker.formatDate("mm/dd/yy", new Date)), $.data(e[0], "rosv", "1");
            else if (9 === c.ftp && 2 <= c.valtype && 6 >= c.valtype && "" === $.trim(e.text())) {
            switch (parseInt(c.valType)) {
                case 2:
                    e.text($.datepicker.formatDate("mm/dd/yy", new Date));
                    break;
                case 4:
                    e.text($.datepicker.formatDate("dd", new Date));
                    break;
                case 5:
                    e.text(getMonthName());
                    break;
                case 6:
                    e.text($.datepicker.formatDate("yy", new Date));
                    break;
                default:
                    e.text($.datepicker.formatDate("mm/dd/yy",
                        new Date))
            }
            $.data(e[0], "rosv", "1")
        }
        c.ro && 7 !== c.ftp && (e.attr("disabled", "disabled"), fill.readonly.push(e.attr("id")));
        e.focus(function() {
            //selectMe($(this))
        });
        fill.toShow.push(e)
    }
};
positionFields = function () {
    let m = null;
    let $html_pages = $(".sectionPage");
    let $html_docarea = $("#docarea");

    let _data = result_a;

    //let _data_pages = _data.Pages;

    _data?.Pages?.forEach(
        pg => {
            let _img = (pg?.Props?.img) ? (pg.Props.img) + '.jpeg' : 'placeholder-loading-demo.gif'
            let _template = _template_page
                .replaceAll('?', pg?.Page)
                .replaceAll('{srcimg}', _img)
                ;
            let b = $(_template);
            let e = [], h = [], c = []; l = !0;

            //console.log(pg?.Props?.flds);
            $html_docarea.append(b);
            pg?.Props?.flds.forEach(
                (f, ix, obj) => {

                    switch (f.ftp) {
                        case 1:
                            "" == f.fontsize && (f.fontsize = 12); 3 * f.fontsize < f.h ? b.append('<textarea id="cc' + f.id + '"/>') : b.append('<input id="cc' + f.id + '" v="' + f.val + '"/>'); $("#cc" + f.id).val(f.val).attr("autocomplete", "off");
                            break;
                        case 2:
                            b.append('<input type="checkbox" style="" id="cc' + f.id + '"/>'); $("#cc" + f.id).prop("checked", 1 == f.val);
                            break;
                        case 4: if (1 == f.auto) {
                            b.append('<input id="cc' + f.id + '"/>'); for (var k = [], n = 0; n < f.lookup.length; n++)k.push(f.lookup[n]); r = $("#cc" + f.id); r.autocomplete({ source: k, minLength: 0 }).focus(function () { $(this).autocomplete("search", "") }); r.val(f.val)
                        } else {
                            b.append('<select id="cc' + f.id + '"/>'); var r = $("#cc" + f.id); for (n = 0; n < f.lookup.length; n++)r[0].options.add(new Option(f.lookup[n])); r.val(f.val).change()
                        }
                            break;
                        case 7:
                            if (!(f.ro && !f.signed || f.v)) {
                                b.append('<div style="text-align:center;vertical-align:middle;padding-top:1px" class="ui-corner-all" id="cc' + f.id + '"><img src="" alt=""/></div>'); signPrepare(f); f.signed && (f.ro = !1);
                            }
                            break;
                        case 8:
                            if (!(f.ro && !f.signed || f.v)) {
                                n = '<div style="text-align:center;padding-top:1px;min-width:20px;" ' + (f.signed ? "" : 'class="ui-corner-all"') + ' id="cc' + f.id + '">'; 20 > Math.min(f.w, f.h) && (f.w = 35, f.h = 30); n += '<img id="ii' + f.id + '" style="width:' + Math.min(30, .8 * Math.min(f.w, f.h)) + 'px" src="" alt=""/>'; n += "</div>"; b.append(n); initPrepare(f); f.signed && (f.ro = !1, f.showborder = "none");
                            }
                            break;
                        case 9:
                            b.append('<span  id="cc' + f.id + '" v="' + f.val + '"/>'), $("#cc" + f.id).html(f.val), f.showborder = "none"
                    }
                    $.trim(f.grn) && (n = e.indexOf(f.grn), 0 <= n ? n = a[n] : (n = [], e.push(f.grn), a.push(n)), n.push(["#cc" + f.id, f.reqrd])); 0 < f.dd && (n = h.indexOf(f.dd), 0 <= n ? n = c[n] : (n = [], h.push(f.dd), c.push(n)), n.push("#cc" + f.id)); positionMe("#cc" + f.id, f)

                    //console.log(`(${ix}) id: ${f.id} -> ${f.ftp}`);

                }
            );

            //$html_docarea.append(b);
        }
    );

/*
    return;

    var b = $("#divPage"); b.position(); b.position(); var e = [], h = []; l = !0;
    for (var g = 0; g < fill.request.flds.length; g++) {
        var f = fill.request.flds[g]; if ("" != $.trim(f.id)) {
            switch (f.ftp) {
                case 1:
                    "" == f.fontsize && (f.fontsize = 12); 3 * f.fontsize < f.h ? b.append('<textarea id="cc' + f.id + '"/>') : b.append('<input id="cc' + f.id + '" v="' + f.val + '"/>'); $("#cc" + f.id).val(f.val).attr("autocomplete", "off");
                    break;
                case 2:
                    b.append('<input type="checkbox" style="" id="cc' + f.id + '"/>'); $("#cc" + f.id).prop("checked", 1 == f.val);
                    break;
                case 4: if (1 == f.auto) {
                    b.append('<input id="cc' + f.id + '"/>'); for (var k = [], n = 0; n < f.lookup.length; n++)k.push(f.lookup[n]); r = $("#cc" + f.id); r.autocomplete({ source: k, minLength: 0 }).focus(function () { $(this).autocomplete("search", "") }); r.val(f.val)
                } else {
                    b.append('<select id="cc' + f.id + '"/>'); var r = $("#cc" + f.id); for (n = 0; n < f.lookup.length; n++)r[0].options.add(new Option(f.lookup[n])); r.val(f.val).change()
                }
                    break;
                case 7:
                    if (f.ro && !f.signed || f.v) continue;
                    b.append('<div style="text-align:center;vertical-align:middle;padding-top:1px" class="ui-corner-all" id="cc' + f.id + '"><img src="" alt=""/></div>'); signPrepare(f); f.signed && (f.ro = !1);
                    break;
                case 8: if (f.ro && !f.signed || f.v) continue; n = '<div style="text-align:center;padding-top:1px;min-width:20px;" ' + (f.signed ? "" : 'class="ui-corner-all"') + ' id="cc' + f.id + '">'; 20 > Math.min(f.w, f.h) && (f.w = 35, f.h = 30); n += '<img id="ii' + f.id + '" style="width:' + Math.min(30, .8 * Math.min(f.w, f.h)) + 'px" src="" alt=""/>'; n += "</div>"; b.append(n); initPrepare(f); f.signed && (f.ro = !1, f.showborder = "none");
                    break;
                case 9:
                    b.append('<span  id="cc' + f.id + '" v="' + f.val + '"/>'), $("#cc" + f.id).html(f.val), f.showborder = "none"
            }
            $.trim(f.grn) && (n = e.indexOf(f.grn), 0 <= n ? n = a[n] : (n = [], e.push(f.grn), a.push(n)), n.push(["#cc" + f.id, f.reqrd])); 0 < f.dd && (n = h.indexOf(f.dd), 0 <= n ? n = c[n] : (n = [], h.push(f.dd), c.push(n)), n.push("#cc" + f.id)); positionMe("#cc" + f.id, f)
        }
    }
    for (n = 0; n < a.length; n++)a[n].handler = new GroupedControls, a[n].handler.init(a[n]); for (n = 0; n < c.length; n++)1 >= c[n].length || (c[n].handler = new TaggedControls, c[n].handler.init(c[n])); for (g = 0; g < fill.request.flds.length; g++) {
        f =
            fill.request.flds[g]; b = null; for (n = 0; n < a.length; n++) { for (e = 0; e < a[n].length; e++)if (a[n][e][0] == "#cc" + f.id) { b = a[n]; break } if (null != b) break } "" != $.trim(f.bv) && (bb = JSON.parse(f.bv.replace(/@/g, "")), f.bb = new behaviorList(f, bb, b))
    } l = !1; fill.countRequired(); setTimeout(function () { t = !1; p = null; fill.selectNextControl(fill.request.msg ? 3 : 1) }, 1E3)
*/
};
