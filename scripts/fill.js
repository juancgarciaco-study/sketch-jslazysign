var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(f, g, l) {
    f instanceof String && (f = String(f));
    for (var q = f.length, h = 0; h < q; h++) {
        var n = f[h];
        if (g.call(l, n, h, f)) return {
            i: h,
            v: n
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(f, g, l) {
    f != Array.prototype && f != Object.prototype && (f[g] = l.value)
};
$jscomp.getGlobal = function(f) {
    return "undefined" != typeof window && window === f ? f : "undefined" != typeof global && null != global ? global : f
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(f, g, l, q) {
    if (g) {
        l = $jscomp.global;
        f = f.split(".");
        for (q = 0; q < f.length - 1; q++) {
            var h = f[q];
            h in l || (l[h] = {});
            l = l[h]
        }
        f = f[f.length - 1];
        q = l[f];
        g = g(q);
        g != q && null != g && $jscomp.defineProperty(l, f, {
            configurable: !0,
            writable: !0,
            value: g
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(f) {
    return f ? f : function(g, f) {
        return $jscomp.findInternal(this, g, f).v
    }
}, "es6", "es3");
parseQueryString = function() {
    var f = /\+/g,
        g = /([^&=]+)=?([^&]*)/g,
        l = window.location.search.substring(1);
    for (urlParams = {}; void 0 === g.exec(l);) urlParams[decodeURIComponent((void 0)[1].replace(f, " "))] = decodeURIComponent((void 0)[2].replace(f, " "));
    return urlParams
};
var fparams = parseQueryString();

function Fill() {
    Fill.prototype.readonly = [];
    Fill.prototype.toShow = [];
    var f = !1,
        g = [],
        l = [],
        q = [],
        h = {
            position: {
                my: "left bottom+35"
            }
        },
        n = (new Spinner).spin(),
        p = -1;
    this.init = function() {
        fill.url = window.location.search.replace("?", "");
        $("#imgPage").load(function() {
            $(this).show();
            fill.countRequired();
            $("#divWait").hide()
        });
        refresh(1);
        $("#lnkExit").yshbutton("E879");
        $("#lnkMenu").yshbutton("E896").click(function() {
            $("#divMenu").is(":visible") ? $("#divMenu").animate({
                bottom: 20,
                opacity: 0
            }, "400", function() {
                $("body").unbind("click");
                $("#divMenu").hide()
            }) : $("#divMenu").show().animate({
                bottom: 130,
                opacity: 1
            }, "400", function() {
                $("body").unbind("click").click(function() {
                    $("body").unbind("click");
                    $("#lnkMenu").click()
                })
            })
        });
        $("#ddlPage").change(function() {
            save(!1, !1, 0, $("#ddlPage").val());
            $("#ddlPage").blur()
        }).blur(function() {
            $("#ddlPage").hide();
            $("#lbPage").show()
        });
        $("#ddlDoc").change(function() {
            $("#ddlDoc").blur();
            save(!1, !1, 0, $("#ddlPage").val())
        }).blur(function() {
            $("#ddlDoc").hide();
            $("#lbDoc").show()
        });
        $("#lbNext").text("Next.Page").yshbutton("E5CC").click(function() {
            save(!1,
                !1, 0, "p_" + $("#ddlDoc").val() + "_" + (parseInt($("#ddlPage").val()) + 1 + "_n"))
        });
        $("#lbPrev").text("Prev.Page").yshbutton("E5CB").click(function() {
            save(!1, !1, 0, "p_" + $("#ddlDoc").val() + "_" + (parseInt($("#ddlPage").val()) - 1 + "_p"))
        });
        $("#lnkSave").yshbutton("E24D").click(function() {
            save(!1, !1)
        }).attr("title", "Save");
        $(window).resize(function() {
            resizeWindow()
        });
        $("#lbDoc").click(function() {
            $("#lbDoc").is(":visible") && ($("#lbDoc").hide(), $("#ddlDoc").show().focus())
        });
        $("#lbPage").click(function() {
            $("#lbPage").is(":visible") &&
                ($("#lbPage").hide(), $("#ddlPage").show().focus())
        });
        $("body").css("max-height", "500px");
        isMobile() && $("#divExit").insertBefore($("#docEnum"));
        $("#divMasterHelp").show();
        $(window).unload(function() {
            fill.readOnly || save()
        });
        $("#lnkHelp").yshbutton("E8FD").click(function() {
            showInfo()
        });
        $("#btnCompCtrl").text("Finish").yshbutton("E877").click(function() {
            fill.selectNextControl(3)
        });
        $("#btnNextCtrl").text("Next field").yshbutton("E038").click(function() {
            fill.selectNextControl(2)
        });
        $("#btnSend").text("Send").yshbutton("E0BE").click(function() {
            save(!1,
                !1, 0, null, !1, 4)
        });
        $("#btnCancelSend").text("Cancel").yshbutton("E92B").click(function() {
            cancelRequest()
        });
        isMobile && $(".grayBand img[title]").removeAttr("title")
    };
    uploaderCallback = function(a) {
        a = a.split(";");
        "ok" !== a[0] ? Common.obj.showWarningNew("Failed to attach file", 300, 400, "Error", "#divprnt") : fill.request.att.push({
            ID: a[1],
            Name: a[2]
        })
    };
    deleteAttachment = function(a) {
        $.ajax({
            url: "controls/FillH.ashx",
            data: {
                action: "rema",
                rid: fill.url,
                aid: a,
                tm: (new Date).getTime()
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: !0,
            success: function(b) {
                a.hasOwnProperty(status) && "ok" != a.status ? Common.obj.showWarningNew(a.msg, 300, 400, "Error", "#divprnt") : (fill.request.att = b, uploader.refresh(b))
            },
            error: function() {
                Common.obj.showWarningNew("Failed to remove attachment.", 300, 400, "Error", "#divprnt")
            }
        })
    };
    virtNavigation = function(a) {};
    showCompleteButton = function() {
        !fill.request.cmp || fill.request.complete ? $("#divComplete").remove() : ($("#divComplete").remove(), $("#lnkComplete").hide(), $("#imgPage").offset(), $("body").append('<div id="divComplete" class="ui-corner-all vComplete" ' +
            ("2" === fill.request.sclick ? ">Click to submit all documents<br/>" : 'style="height:55px">Click to sign all documents<img src="/Images/ysh_arrow.png"style="width:70px"/>') + "</div>"), $("#divComplete").css({
            left: 15,
            top: $("#hdr").height() + 10
        }).hover(function() {
            $("#divComplete").css({
                opacity: .8,
                cursor: "pointer"
            })
        }, function() {
            $("#divComplete").css({
                opacity: .5,
                cursor: "default"
            })
        }).click(function() {
            save(!0, !0, -1)
        }).draggable({
            start: function(a) {
                a.stopPropagation()
            },
            stop: function(a) {
                a.stopPropagation()
            }
        }))
    };
    refresh =
        function(a) {
            $.ajax({
                url: "controls/FillH.ashx",
                data: {
                    action: "fill",
                    rid: fill.url,
                    ft: 1 === a ? 1 : 0,
                    pg: $("#ddlPage").val(),
                    tm: (new Date).getTime()
                },
                dataType: "json",
                async: !0,
                contentType: "application/json; charset=utf-8",
                success: function(b) {
                    b.hasOwnProperty("status") && "ok" != b.status ? Common.obj.showWarningNew(b.msg, 300, 400, "Error", 200 < $("#docarea").width() ? "#divprnt" : void 0) : (b.disc && showDisclaimer(), b.v ? ($("#lnkMenu").hide(), $("#btnSend").css("display", "block"), $("#btnCancelSend").css("display", "block")) : ($("#btnNextCtrl").css("display",
                        "block"), $("#btnCompCtrl").css("display", "block"), $("#divExit").css("display", "block")), populate(b, 1 === a && !b.complete && 0 < b.map.length))
                },
                error: function(b, a, m) {
                    window.location = "/SystemMessage.aspx?t=0&msg=Invalid Parameters. Please contact support."
                }
            })
        };
    cleanUp = function() {
        g = [];
        l = [];
        $("#imgPage").hide();
        $(".mapSelected").removeClass("mapSelected");
        $("#divPage").find("[id*=cc_]").remove()
    };
    populate = function(a, b) {
        cleanUp();
        fill.request = a;
        fill.mult = b;
        url = fill.request.url;
        setTimeout(function() {
                generateDocMap()
            },
            0);
        $("#divPage").css({
            width: a.w,
            height: a.h
        });
        resizeWindow();
        $("#imgPage").attr("src", "controls/FillH.ashx?action=getpage&p=" + a.img).attr("alt", a.img);
        a.flds && setTimeout(function() {
            positionFields()
        }, 1);
        var e = $("#ddlDoc");
        e.find("option").remove();
        for (var m = "", c = 0; c < a.docs.length; c++) e[0].options.add(new Option(a.docs[c].doctitle, a.docs[c].id)), 1 == a.docs[c].gid && (m = a.docs[c].id, $("#lbDoc").text(a.docs[c].doctitle));
        "" != $.trim(m) && (e.val(m), fill.request.cdoc = m);
        e = $("#ddlPage");
        e.find("option").remove();
        for (c = 1; c <= a.pc; c++) e[0].options.add(new Option(c, c - 1));
        "" != $.trim(m) && (e.val(a.pg), $("#lbPage").text(a.pg + 1 + " of " + a.pc));
        !fill.request.slf && !fill.request.il || fill.request.complete || ($("#lbBack").show(), $("#lbBack").unbind("click").text("Exit").yshbutton("E879").click(function() {
            checkComplete(2)
        }).attr("title", "Save and exit"));
        fill.readOnly = fill.request.complete && !fill.request.il;
        fill.request.pdf && !fill.request.complete ? $("#lnkDownload").show().unbind("click").yshbutton("E2C4").click(function() {
            save(void 0,
                2)
        }) : $("#lnkDownload").hide();
        fill.request.complete ? $("#lnkAttach").unbind("click").hide() : $("#lnkAttach").yshbutton("E226").unbind("click").click(function() {
            uploader.init("controls/Handler.ashx?action=attach&data=" + url + "&tm=" + (new Date).getTime(), uploaderCallback, "#divprnt", fill.request.att, deleteAttachment)
        }).attr("title", "Attach Document");
        if (fill.request.il) {
            e = $("#ddlSignees");
            e.find("option").remove();
            for (c = 0; c < fill.request.sgn.length; c++) a = fill.request.sgn[c], e[0].options.add(new Option(a.Name,
                a.ID)), 1 == a.Misc && e.val(a.ID);
            $("[id$=ddlSignees]").show().unbind("change").change(function() {
                save(!1, !1, 0)
            });
            $("#divSave").css("width", "50px");
            $("#lblSignees").show()
        }
        showCompleteButton();
        showCompleteDialog();
        fill.request.msg && showInfo(2);
        b && 1 !== fparams.ret && showInfo(1)
    };
    showGuide = function() {
        $("#divInfoDlg").remove();
        $("#warnDlg").remove();
        $("body").append('<div id="divVideo"><iframe width="660" height="415" src="https://www.youtube.com/embed/81Bi0wLVL80?start=58" frameborder="0" allowfullscreen></iframe></div>');
        $("#divVideo").dialog({
            height: 480,
            width: 700,
            title: "Signing YouSignHere Document",
            open: function() {
                $("#divVideo").dialog("option", "position", {
                    my: "center top",
                    at: "center top+150",
                    of: "[id$=divPage]"
                })
            },
            beforeClose: function() {
                $("#divVideo").remove()
            }
        })
    };
    var u = null;
    showMsg = function(a, b) {
        u && clearTimeout(u);
        "" == a ? $("#divMsg").html("").hide() : (1 != b && (a = '<div style="float:left;width: 480px">' + a + '</div><div class="msgclose"><i class="material-icons md-18">&#xE14C</i></div>'), $("#divMsg").html(a), $("#divMsg").show(),
            $(".msgclose").click(function() {
                clearTimeout(u);
                $("#divMsg").html("").hide()
            }), 1 != b && (u = setTimeout(function() {
                $("#divMsg").html("").hide()
            }, 1E4)))
    };
    showInfo = function(a) {
        for (var b = 0, e = 0, m = 0, c = 0; c < fill.request.map.length; c++) {
            m += fill.request.map[c].Pages.length;
            for (var g = 0; g < fill.request.map[c].Pages.length; g++) e += fill.request.map[c].Pages[g].RequiredFields, b += fill.request.map[c].Pages[g].SignCount
        }
        if (0 >= e + b) return "";
        if (1 == a) m = "There are " + m + " page" + (1 == m ? "" : "s") + " in this package" + (0 < b ? (0 < e ? ", " : " and ") +
            b + " place" + (1 == b ? "" : "s") + " to sign" : " ") + (0 < e ? (0 < b ? ", and " : "") + e + " required field" + (1 == e ? "" : "s") + " to populate to complete it." : ""), showMsg(m);
        else {
            if (2 == a || 3 == a) return m = "You still have ", 0 < e && (m += e + " required field" + (1 < e ? "s (pink) " : " ") + " to fill"), 0 < b && (m += (0 < e ? " and " : "") + b + " place" + (1 < b ? "s" : "") + " to sign"), m += " before package is complete.", 3 != a && showMsg(m), m;
            m = '<div style="font-size:12px">There are <strong>' + m + "</strong> page" + (1 == m ? "" : "s") + " in this package. " + (0 < b ? " You will have to sign in <strong>" +
                b + "</strong> place" + (1 == b ? "" : "s") + "." : ".") + (0 < e ? " There " + (1 == e ? "is" : "are ") + e + " field" + (1 == e ? "" : "s") + ", which <strong>must</strong> be filled <strong>prior</strong> to completing the package<br/>" : "");
            m += '</div><br/><strong style="font-size:12px;color:red">Please make sure to complete the whole package.</strong><br/><br/>';
            m += " <br/><br/><strong>Tip 1</strong> Required fields highlighted with pink background. These must be filled before you can sign the document.";
            m += " <br/><br/><strong>Tip 2</strong> Progress bar at the top shows you how much is left.";
            m += ' <br/><br/><a href="javascript:showGuide()" style="color:red">Watch 2 min guide "Signing YouSignHere document"</a>';
            $("body").append('<div id="divInfoDlg" style="display:none"><div id="cmpbody"></div></div>');
            $dlg = $("#cmpbody");
            $dlg.append('<div class="yousignhere" style="width:100%">You Sign Here</div>');
            $dlg.append('<div class="highlightbandMsg" style="width:100%;padding-top:20px;height:45px;text-align:center"><span class="PageTitle">Information</span></div>');
            $dlg.append('<div style="text-align:left;margin-top:10px">' +
                m + "</div>");
            $("#divInfoDlg").dialog({
                autoOpen: !0,
                modal: !0,
                draggable: !0,
                height: 420,
                width: 400,
                closeOnEscape: !0,
                resizable: !1,
                title: "Complete",
                position: {
                    my: "center top",
                    at: "center top+100",
                    of: "#divprnt"
                },
                buttons: {
                    "Got it, continue": function() {
                        $(this).dialog("destroy");
                        $("#divInfoDlg").remove()
                    }
                },
                close: function() {
                    $("#divInfoDlg").remove()
                }
            });
            $(".ui-dialog-titlebar").hide()
        }
    };
    showCompleteDialog = function() {
        var a = !1;
        a = fill.request.il ? 0 <= q.indexOf($("#ddlSignees").val()) : 0 <= q.indexOf(fill.request.c);
        fill.request.complete ?
            ($("#lnkExit").show(), $("#btnCompCtrl").yshbutton("option", "disabled"), $("#btnNextCtrl").yshbutton("option", "disabled"), $("#lnkMenu").yshbutton("option", "disabled").unbind("click"), showMsg('<div style="text-align:center;padding-top:6px;font-size:12px;color:darkgreen">You have completed the request. Completed copies will be sent to you shortly</div>', 1)) : $("#lnkExit").hide();
        fill.request.complete && !a && (q.push(fill.request.il ? $("#ddlSignees").val() : fill.request.c), $("#lnkSave").hide(), $("#lnkDownload").hide(),
            $("#lnkAttach").hide(), (fill.request.slf || fill.request.il || fill.request.v) && $("#lbBack").hide(), $("#lnkExit").unbind("click").click(function() {
                checkComplete(1)
            }), $("#lnkComplete").hide(), $("body").append('<div id="divCmplDialog" style="display:none"><div id="cmpbody"></div></div>'), $dlg = $("#cmpbody"), $dlg.append('<div class="yousignhere" style="width:100%">You Sign Here</div>'), $dlg.append('<div class="highlightbandMsg" style="width:100%;padding-top:20px;height:45px;text-align:center"><span class="PageTitle">Confirmation</span></div>'),
            $dlg.append('<div style="text-align:center;margin-top:10px">You have completed the request.  Completed<br />copies of the signed documents will be emailed to you.</div>'), fill.request.il || fill.request.slf || $dlg.append('<div style="text-align:center;margin-top:10px">We recommend that you close your browser.</div>'), $("#divCmplDialog").dialog({
                autoOpen: !0,
                modal: !0,
                draggable: !0,
                height: 280,
                width: 362,
                closeOnEscape: !0,
                resizable: !1,
                title: "Complete",
                position: {
                    my: "center top",
                    at: "center top+100",
                    of: "#divprnt"
                },
                buttons: {
                    OK: function() {
                        $(this).dialog("destroy");
                        $("#divCmplDialog").remove()
                    }
                },
                close: function() {
                    $("#divCmplDialog").remove()
                }
            }), $(".ui-dialog-titlebar").hide());
        switch (fill.request.sclick) {
            default:
                $("#lnkComplete").hide().unbind("click");
                break;
            case 1:
                $("#lnkComplete").is(":visible") && ($("#lnkComplete").attr("title", "One Click Sign").text("One click sign").unbind("click").yshbutton("E150").click(function() {
                    save(!0, !0, -1)
                }).tooltip(h), setTimeout(function() {
                    $("#lnkComplete").mouseover()
                }, 500), setTimeout(function() {
                        $("#lnkComplete").mouseout()
                    },
                    3E3))
        }
    };
    this.countRequired = function() {
        var a = 0,
            b = 0,
            e = [];
        $("[id*=cc_]").each(function() {
            for (var c = $(this).attr("id"), m = !1, f = 0; f < e.length; f++)
                if (0 <= e[f].indexOf(c)) {
                    m = !0;
                    break
                } if (!m && $(this).is(":visible")) {
                c = "#" + $(this).attr("id");
                m = 1 == $.data($(this)[0], "req");
                var k = $(this).is(":disabled"),
                    x = $(this).is(":checkbox"),
                    l = "",
                    h = !1;
                for (f = 0; f < g.length; f++) {
                    for (var n = 0; n < g[f].length; n++)
                        if (g[f][n][0] == c) {
                            l = g[f].handler.getState();
                            for (h = 0; h < g[f].length; e.push(g[f][h++][0]));
                            h = !0;
                            break
                        } if (h) break
                }
                c = !1;
                h ? c = l ? !1 :
                    !0 : x ? x && (c = !$(this).is(":checked")) : c = "" == $.trim($(this).val());
                m && c && !k && a++;
                $(this).is("div") && 0 == $.data($(this)[0], "sgnd") && b++
            }
        });
        null != fill.cp && (fill.cp.RequiredFields = a, $("[id*=" + fill.d + "_" + fill.cpi + "]").find("#spanReq" + fill.cpi).text(a), $("[id*=" + fill.d + "_" + fill.cpi + "]").find("#spanSign" + fill.cpi).text(b));
        var m = fill.req + a,
            c = fill.sgn + b,
            f = fill.treq + fill.tsgn,
            k = 0 >= f ? 100 : parseInt((f - m - c) / f * 100);
        0 > k && (k = 0);
        $("#pbProgress").val(k);
        isNaN(f - m - c) ? $("#lbProgress").text("") : $("#lbProgress").text(f - m -
            c + " out of " + f);
        virtNavigation(a + b);
        return a
    };
    var t = !1,
        r = null;
    positionFields = function() {
        r = null;
        var a = $("#divPage");
        a.position();
        a.position();
        var b = [],
            e = [];
        t = !0;
        for (var f = 0; f < fill.request.flds.length; f++) {
            var c = fill.request.flds[f];
            if ("" != $.trim(c.id)) {
                switch (c.ftp) {
                    case 1:
                        "" == c.fontsize && (c.fontsize = 12);
                        3 * c.fontsize < c.h ? a.append('<textarea id="cc' + c.id + '"/>') : a.append('<input id="cc' + c.id + '"/>');
                        $("#cc" + c.id).val(c.val).attr("autocomplete", "off");
                        break;
                    case 2:
                        a.append('<input type="checkbox" style="" id="cc' +
                            c.id + '"/>');
                        $("#cc" + c.id).prop("checked", 1 == c.val);
                        break;
                    case 4:
                        if (1 == c.auto) {
                            a.append('<input id="cc' + c.id + '"/>');
                            for (var x = [], k = 0; k < c.lookup.length; k++) x.push(c.lookup[k]);
                            h = $("#cc" + c.id);
                            h.autocomplete({
                                source: x,
                                minLength: 0
                            }).focus(function() {
                                $(this).autocomplete("search", "")
                            });
                            h.val(c.val)
                        } else {
                            a.append('<select id="cc' + c.id + '"/>');
                            var h = $("#cc" + c.id);
                            for (k = 0; k < c.lookup.length; k++) h[0].options.add(new Option(c.lookup[k]));
                            h.val(c.val).change()
                        }
                        break;
                    case 7:
                        if (c.ro && !c.signed || c.v) continue;
                        a.append('<div style="text-align:center;vertical-align:middle;padding-top:1px" class="ui-corner-all" id="cc' +
                            c.id + '"><img src="" alt=""/></div>');
                        signPrepare(c);
                        c.signed && (c.ro = !1);
                        break;
                    case 8:
                        if (c.ro && !c.signed || c.v) continue;
                        k = '<div style="text-align:center;padding-top:1px;min-width:20px;" ' + (c.signed ? "" : 'class="ui-corner-all"') + ' id="cc' + c.id + '">';
                        20 > Math.min(c.w, c.h) && (c.w = 35, c.h = 30);
                        k += '<img id="ii' + c.id + '" style="width:' + Math.min(30, .8 * Math.min(c.w, c.h)) + 'px" src="" alt=""/>';
                        k += "</div>";
                        a.append(k);
                        initPrepare(c);
                        c.signed && (c.ro = !1, c.showborder = "none");
                        break;
                    case 9:
                        a.append('<span  id="cc' + c.id + '"/>'),
                            $("#cc" + c.id).html(c.val), c.showborder = "none"
                }
                $.trim(c.grn) && (k = b.indexOf(c.grn), 0 <= k ? k = g[k] : (k = [], b.push(c.grn), g.push(k)), k.push(["#cc" + c.id, c.reqrd]));
                0 < c.dd && (k = e.indexOf(c.dd), 0 <= k ? k = l[k] : (k = [], e.push(c.dd), l.push(k)), k.push("#cc" + c.id));
                positionMe("#cc" + c.id, c)
            }
        }
        for (k = 0; k < g.length; k++) g[k].handler = new GroupedControls, g[k].handler.init(g[k]);
        for (k = 0; k < l.length; k++) 1 >= l[k].length || (l[k].handler = new TaggedControls, l[k].handler.init(l[k]));
        for (f = 0; f < fill.request.flds.length; f++) {
            c = fill.request.flds[f];
            a = null;
            for (k = 0; k < g.length; k++) {
                for (b = 0; b < g[k].length; b++)
                    if (g[k][b][0] == "#cc" + c.id) {
                        a = g[k];
                        break
                    } if (null != a) break
            }
            "" != $.trim(c.bv) && (bb = JSON.parse(c.bv.replace(/@/g, "")), c.bb = new behaviorList(c, bb, a))
        }
        t = !1;
        fill.countRequired();
        setTimeout(function() {
            y = !1;
            v = null;
            fill.selectNextControl(fill.request.msg ? 3 : 1)
        }, 1E3)
    };
    var v = null,
        y = !1;
    this.selectNextControl = function(a) {
        var b = null,
            e = 9999,
            f = 1,
            c = 0;
        null != v && (f = parseInt(v.attr("tabindex")) + 1);
        do {
            (3 == a ? $('[tabindex]:enabled[req="1"]').not(".selected").filter(function() {
                return $(this).attr("tabindex") >=
                    f
            }) : $("[tabindex]:enabled").not(".selected").filter(function() {
                return $(this).attr("tabindex") >= f
            })).each(function() {
                var a = parseInt($(this).attr("tabindex"));
                a < e && (e = a, b = $(this))
            });
            if (null != b)
                if ("" == getValue(b)) {
                    y && 1 != $.data(b[0], "req") ? b = null : v = b;
                    y = !1;
                    break
                } else b = null;
            if (null == b) {
                f = e + 1;
                if (f > p) {
                    f = e = 1;
                    if (2 == a) {
                        var g = !0;
                        $('[tabindex]:enabled[req="1"]').each(function() {
                            if ("" == getValue($(this))) return g = !1
                        });
                        if (g && null == findInitial()) break
                    }
                    if (1 < ++c) {
                        y = !0;
                        null != r && "" == getValue(r) && 1 == $.data(r[0], "req") ?
                            (c = 0, r.hasClass("selected") && (b = r), v = b) : b = findInitial();
                        break
                    }
                }
                null == b && (b = findInitial());
                e = 9999
            }
        } while (null == b);
        null == b && (b = findSignature());
        null != b && (selectMe($(b)), makeVisible($(b)));
        null !== b || 2 !== a && 3 !== a ? 3 === a && showInfo(2) : (showMsg(""), r = null, y = !1, v = null, save(!1, !1, 0, "p_" + $("#ddlDoc").val() + "_" + (parseInt($("#ddlPage").val()) + 1 + "_n"), !1, a))
    };
    findInitial = function() {
        var a = null,
            b = $(".init:visible").not(".signed"),
            e = b.not(".selected");
        1 == b.length ? a = b : 1 == e.length ? a = e : 0 < e.length && (a = $($(".init:visible").not(".signed").not(".selected")[0]));
        return a
    };
    findSignature = function() {
        var a = null,
            b = $(".sign:visible").not(".signed");
        1 == b.length ? a = b : 0 < b.length && (a = $($(".sign:visible").not(".signed").not(".selected")[0]));
        return a
    };
    getValue = function(a) {
        if (null == a) return "";
        for (var b = "#" + a.attr("id"), e = !1, f = "", c = 0; c < g.length; c++) {
            for (var h = 0; h < g[c].length; h++)
                if (g[c][h][0] == b) {
                    for (h = 0; h < g[c].length; h++)
                        if (e = !0, $(g[c][h][0]).is(":checkbox")) {
                            if (f = $(g[c][h][0]).is(":checked") ? 1 : "", "" != f) break
                        } else if (f = $(g[c][h][0]).val(), "" != $.trim(f)) break;
                    break
                } if (e) break
        }
        return e ?
            f : a.is(":checkbox") ? a.is(":checked") ? 1 : "" : null === a.val() ? "" : a.val()
    };
    makeVisible = function(a) {
        var b = $(window).scrollTop(),
            e = b + $(window).height(),
            f = $("#divprnt"),
            c = a.offset().top;
        c + a.height() <= e && c >= b || (a = a.offset(), f.scrollTop(a.top))
    };
    var w = !1,
        z = !1;
    selectMe = function(a) {
        if (!a.hasClass("selected")) {
            null == a || a.hasClass("sign") || (r = a);
            $(".selected").each(function() {
                $(this).removeClass("selected");
                $(this).is(":checkbox") ? $(this).css({
                        "outline-color": "",
                        "outline-width": "0"
                    }).change() : $(this).hasClass("sign") ||
                    $(this).hasClass("init") ? $(this).css("background-color", "") : $(this).css("border-width:", "1px")
            });
            for (var b = "#" + a.attr("id"), e = !1, f = 0; f < g.length; f++) {
                for (var c = 0; c < g[f].length; c++)
                    if (g[f][c][0] == b) {
                        for (c = 0; c < g[f].length; c++) $(g[f][c][0]).addClass("selected"), e = !0;
                        break
                    } if (e) break
            }
            e || a.addClass("selected");
            setTimeout(function() {
                a.focus()
            }, 1);
            z || (setTimeout(highlight, 500), z = !0)
        }
    };
    highlight = function() {
        $(".selected").each(function() {
            var a = $.data($(this)[0], "req");
            $(this).is(":checkbox") ? w ? $(this).css({
                "outline-color": a &&
                    !$(this).is(":checked") ? fill.reqc : "gray",
                "outline-width": "2px",
                "outline-style": "solid"
            }) : $(this).css({
                "outline-color": "",
                "outline-width": "0",
                "outline-style": a ? "solid" : "none"
            }) : $(this).hasClass("sign") || $(this).hasClass("init") ? $(this).parent().css("background-color", w ? fill.nonreqc : fill.reqc) : a && "rgb(255, 132, 153)" == $(this).css("background-color") ? $(this).css("border-color", w ? "white" : "black") : $(this).css("border-color", w ? "#C0C0C0" : "black")
        });
        w = !w;
        setTimeout(highlight, 500)
    };
    signPrepare = function(a) {
        var b =
            $("#cc" + a.id);
        b.addClass("sbutton").attr("name", a.id).unbind("click");
        if (a.signed) b.css({
            "background-color": "",
            border: "none"
        }).removeClass("ui-corners-all").find("img").attr("src", "controls/FillH.ashx?action=signature&c=" + fill.request.c + "&f=" + a.c).css({
            width: a.w,
            height: a.h
        }).addClass("signed");
        else if (a.ro || fill.request.cmp) b.find("img").attr("src", "../images/signButton.png");
        else {
            var e = Math.min(a.h, 29);
            b.hover(function() {
                $(this).css("border", "1px solid gray")
            }, function() {
                $(this).css("border", "none")
            }).find("img").attr("src",
                "../images/ysh_arrow.png").click(function() {
                signDocument(a.id)
            }).addClass("fsign sign").css({
                border: "none",
                "max-width": "98px",
                "max-height": e + "px"
            })
        }
        $.data(b[0], "sgnd", a.signed ? 1 : a.ro ? 2 : 0)
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
            var e = Math.min(a.h, 29);
            b.click(function(b) {
                initialDocument(b, a.id)
            }).hover(function() {
                $(this).css("border", "1px solid gray")
            }, function() {
                $(this).css("border", "none")
            }).find("img").attr("src", "../images/initial.png").addClass("fsign init").css({
                border: "none",
                "max-width": "98px",
                "max-height": e + "px"
            })
        }
        $.data(b[0], "sgnd", a.signed ? 1 : a.ro ? 2 : 0)
    };
    positionMe = function(a, b) {
        var e = $(a);
        e.attr("ln", b.ln);
        b.ln > p && (p = b.ln);
        if ("" !== $.trim(a) && ("" !== $.trim(b.prompt) && (e.attr("pmt",
                b.prompt), e.attr("placeholder", b.prompt)), void 0 !== e.attr("id"))) {
            var g = b.l,
                c = b.t,
                h = b.w,
                k = b.h;
            2 === b.ftp ? e.css({
                height: "15px",
                width: "15px"
            }) : (g--, c--);
            1 === b.ftp && (e.css({
                "word-wrap": "break-word"
            }), 0 < b.mlen && e.attr("maxlength", b.mlen));
            9 != b.ftp && 7 !== b.ftp && 0 < b.tab && e.attr("tabindex", b.tab);
            b.tab > p && (p = b.tab);
            var l = .7;
            0 === b.trsp ? b.sign ? l = .8 : 2 === b.ftp || 9 === b.ftp ? l = 1 : b.reqrd && (l = .7) : l = 1;
            e.css({
                left: Math.round(g),
                top: Math.round(c),
                position: "absolute",
                opacity: l
            });
            "null" != b.font && null != b.font && void 0 != b.font &&
                "" != b.font && e.css({
                    "font-family": b.font
                });
            0 >= b.fontsize && (b.fontsize = 12);
            0 < b.fontsize && 8 != b.ftp && e.css({
                "font-size": b.fontsize + "px"
            });
            0 < h && (e.css({
                width: Math.round(h - 2),
                height: Math.round(k - 2),
                border: "none" != b.showborder ? "1px solid #C0C0C0" : "none"
            }).addClass("ui-widget"), !b.sign && (0 >= b.fontsize || k < b.fontsize) ? e.css({
                height: Math.round(k - 2)
            }) : b.sign && e.css({
                height: k + "px",
                border: "none",
                "line-height": k + "px",
                "vertical-align": "middle"
            }));
            "" != b.validator && FieldValidation.obj.initValidator(a, b.prompt, b.validator,
                !1, b.fmt, b.reqrd);
            b.reqrd ? (2 != b.ftp ? e.blur(function() {
                    if (!f) {
                        var a = 8 != b.ftp ? $(this).val() : $(this).text();
                        a == b.prompt && (a = "");
                        setReqState($(this), !("" != $.trim(a) || b.ro || e.is(":disabled")));
                        8 == b.ftp && b.signed && $(this).css({
                            border: ""
                        });
                        t || setTimeout(function() {
                            fill.countRequired()
                        }, 10)
                    }
                }).blur() : e.change(function() {
                    setReqState(e, !e.is(":checked") && !e.attr("disabled"));
                    t || setTimeout(function() {
                        fill.countRequired()
                    }, 10)
                }).change(), $.data(e[0], "req", "1"), e.attr("req", "1")) : b.ro ? 7 != b.ftp && e.css({
                    background: "#EFEFEF"
                }) :
                "none" != b.showborder && e.css({
                    background: fill.nonreqc
                });
            if (1 <= b.valtype && 6 >= b.valtype)
                if (e.is(":enabled") && 9 != b.ftp && 3 >= b.valtype && e.datepicker({
                        changeMonth: !0,
                        changeYear: !0,
                        yearRange: "1920:2030",
                        onClose: function(a, b) {
                            "" != a && 0 > a.indexOf("MM/") && $(this).css({
                                background: fill.nonreqc
                            })
                        }
                    }), 1 === b.ftp && 2 <= b.valtype && 6 >= b.valtype && (e.val() === b.prompt || "" === $.trim(e.val()))) 2 === b.valtype ? e.val($.datepicker.formatDate("mm/dd/yy", new Date)) : 4 === b.valtype ? e.val($.datepicker.formatDate("dd", new Date)) : 5 === b.valtype ?
                    e.val(getMonthName()) : 6 === b.valtype ? e.val($.datepicker.formatDate("yy", new Date)) : e.val($.datepicker.formatDate("mm/dd/yy", new Date)), $.data(e[0], "rosv", "1");
                else if (9 === b.ftp && 2 <= b.valtype && 6 >= b.valtype && "" === $.trim(e.text())) {
                switch (parseInt(b.valType)) {
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
            b.ro && 7 !== b.ftp && (e.attr("disabled", "disabled"), fill.readonly.push(e.attr("id")));
            e.focus(function() {
                selectMe($(this))
            });
            fill.toShow.push(e)
        }
    };
    getMonthName = function() {
        return "January February March April May June July August September October November December".split(" ")[(new Date).getMonth()]
    };
    signDocument = function(a) {
        0 < a && $("[id$=" + a + "]").css("cursor", "wait");
        setTimeout(function() {
            save(1, 1, a)
        }, 10)
    };
    initialDocument = function(a, b) {
        setTimeout(function() {
                save(2, 1, b)
            },
            10)
    };
    doInitial = function(a, b) {
        "" != $.trim(a.ii) ? (spanel.inm = a.ii, initialMe(b)) : isMobile() ? window.location = "mobilesignpad.aspx?nosign=4&fldid=" + b + "&b=" + encodeURIComponent(a.url) + "&d=0&f=" + fill.request.sf : ($("body").append('<div id="divInitPanel" style="display:none"><div id="ackPanel" ><div style="margin-top:10px;margin-bottom:10px;font-size:12px;font-weight:bold">Create Initial</div><div id="divInArea" tabindex="0" class="ui-corner-all " tabindex="1" style="font-size:35px;text-align:center;width:97%;height:60px;padding-left:5px;padding-top:20px;margin-bottom:10px;border:thin solid gray;"></div></div><div id="btnICancel" class="ibutton" style="font-weight:bold;font-size:11px">Cancel</div><div id="btnInitial" class="ibutton" style="float:right;color:white;font-weight:bold;font-size:11px">Accept</div></div>'),
            $("#divInitPanel").dialog({
                height: 200,
                width: 300,
                modal: !0,
                closeOnEscape: !1,
                resizable: !1,
                draggable: !0,
                open: function() {
                    $("#divInArea").addClass("f" + fill.request.sf);
                    $("#btnInitial").button({
                        icons: {
                            primary: "ui-icon-check"
                        }
                    }).click(function() {
                        initialMe(b)
                    });
                    $("#btnICancel").button({
                        icons: {
                            primary: "ui-icon-close"
                        }
                    }).click(function() {
                        $("#divInitPanel").dialog("destroy").remove()
                    });
                    $("#btnInitial").removeClass("ui-corner-all");
                    $("#btnICancel").removeClass("ui-corner-all");
                    $("#divInArea").text(spanel.inm);
                    $("#divInArea").html($("#divInArea").html() + spanel.carret).focus();
                    $("#divInArea").keyup(function(a) {
                        a.preventDefault();
                        13 == a.keyCode || 10 == a.keyCode ? $("#btnInitial").click() : (46 == a.keyCode || 8 == a.keyCode ? 0 < spanel.inm.length && (spanel.inm = spanel.inm.substring(0, spanel.inm.length - 1)) : 4 > spanel.inm.length && 32 != a.which && (spanel.inm += String.fromCharCode(a.which)), $("#divInArea").text(spanel.inm), $("#divInArea").html($("#divInArea").html() + spanel.carret).focus(), function c() {
                            $(".blink_me").fadeOut(500).fadeIn(500,
                                c)
                        }())
                    });
                    (function m() {
                        $(".blink_me").fadeOut(500).fadeIn(500, m)
                    })()
                },
                position: {
                    my: "center top",
                    at: "center top+100",
                    of: "#divprnt"
                }
            }), $(".ui-dialog-titlebar").hide(), $(".ui-dialog-titlebar-close").hide(), $(".ui-button-text").css({
                "font-weight": "bold"
            }), $(window).resize(function() {
                $("#divSignPanel").dialog("option", "position", {
                    my: "center top",
                    at: "top+100",
                    of: "#divprnt"
                })
            }))
    };
    initialMe = function(a) {
        if ("" != $.trim(spanel.inm)) return $.ajax({
            url: "controls/FillH.ashx",
            data: {
                action: "init",
                str: spanel.inm,
                fid: a,
                rid: fill.url,
                doc: $("#ddlDoc").val(),
                pg: $("#ddlPage").val(),
                tm: (new Date).getTime()
            },
            type: "POST",
            dataType: "json",
            async: !1,
            beforeSend: function() {
                $(".ibutton").button("option", "disabled", !0)
            },
            success: function(b) {
                b.status && "ok" != b.status ? alert("Failed.  Please reload the document and try again.") : (fill.request.complete = b.complete, showCompleteDialog(), $("#divInitPanel").dialog("destroy").remove(), $("#cc" + a).css({
                    "background-color": "",
                    border: "none"
                }).removeClass("ui-corners-all").unbind("click").unbind("hover").html('<div style="width:100%;height:100%;overflow:hidden" class="f' +
                    fill.request.sf + '">' + spanel.inm + "</div>"), b = $(".selected"), b.removeClass("selected"), b.addClass("signed"), b.css("background-color", fill.nonreqc), fill.selectNextControl(2))
            },
            complete: function() {
                $(".ibutton").button("option", "disabled", !1)
            }
        }), res
    };
    generateDocMap = function() {
        var a = fill.request.map;
        fill.req = 0;
        fill.sgn = 0;
        fill.treq = 0;
        fill.tsgn = 0;
        $("#pnlMap").html("");
        fill.request.skp ? $(".skipb1").show().prop("checked", fill.request.skpf) : $(".skipb1").hide();
        for (var b = 0, e = 0, f = 0, c = 0; c < a.length; c++) {
            b += fill.request.map[c].Pages.length;
            for (var g = 0; g < a[c].Pages.length; g++) f++, a[c].Pages[g].CurrentFl ? (fill.cp = a[c].Pages[g], fill.d = a[c].Doc, fill.cpi = g, e = f, fill.csgn = a[c].Pages[g].SignCount, fill.ctsgn = a[c].Pages[g].TotalSignCount) : (fill.req += a[c].Pages[g].RequiredFields, fill.sgn += a[c].Pages[g].SignCount), fill.treq += a[c].Pages[g].TotalRequiredFields, fill.tsgn += a[c].Pages[g].TotalSignCount
        }
        $("#lbCPage").text(e);
        $("#lbTPage").text(b);
        $("#docmap").show()
    };
    validate = function() {
        f = !0;
        $("[id*=cc_]").each(function() {
            "function" == typeof $(this).blur &&
                $(this).blur()
        });
        f = !1
    };
    getFieldValue = function(a) {
        var b = "",
            e = $(a);
        if ("" == $.data(a, "vv") || e.val() != $.data(a, "vv"))
            if (e.is(":checkbox") || e.is(":radio")) b = e.is(":checked") ? "1" : "0";
            else if (b = e.val(), "" == b || $.trim(b) == e.attr("pmt")) b = " ";
        return b
    };
    showWait = function() {
        if (0 >= $("#divWait").length) {
            var a = $("#hdr").width() + $("#hdr").offset().left;
            $("body").append('<div id="divWait" style="width:' + a + 'px;height:100%;position:absolute;left:0;top:0;opacity:0.6;background-color:white;z-index:999999;"></div>');
            $("#divWait").append(n.el)
        }
        $("#divWait").show()
    };
    gotopage = function(a) {
        var b = a.split("_");
        fill.d = b[0];
        $("#warnDlg").remove();
        r = v = null;
        save(!1, !1, 0, "p_" + a)
    };
    save = function(a, b, e, f, c, g) {
        if (fill.hasOwnProperty("request")) {
            validate();
            var k = [],
                h;
            $("[id*=cc_]").each(function() {
                var a = $.data($(this)[0], "rosv");
                if ("1" === a || $(this).is(":enabled")) {
                    h = "";
                    if ($(this).is(":checkbox") || $(this).is(":radio")) h = $(this).is(":checked") ? "1" : "0";
                    else if (h = $(this).val(), "1" === a && "" === h && (h = $(this).text()), "" === h || $.trim(h) === $(this).attr("pmt")) h = " ";
                    "1" === $(this).attr("external") &&
                        (h += "|||" + $(this).find("option:selected").text());
                    $(this).is("img") && "1" !== a || k.push($(this).attr("id") + "=" + h + ($(this).is(":visible") ? "" : "|v|"))
                }
            });
            var l = !0;
            "undefined" == typeof a && (l = !1);
            var m = 3 === g ? 2 : 2 === g ? 1 : 0;
            4 === g && (m = 4);
            $.ajax({
                url: "controls/FillH.ashx",
                beforeSend: function() {
                    showWait()
                },
                data: {
                    action: "save",
                    rid: fill.url,
                    data: k.join(";"),
                    cdoc: fill.request.cdoc,
                    doc: $("#ddlDoc").val(),
                    pg: fill.request.pg,
                    np: f,
                    sgn: $("#ddlSignees").val(),
                    signing: a ? 1 : 0,
                    c: fill.request.c,
                    check: b && 2 !== b ? 1 : 0,
                    fldid: e,
                    cmp: c ?
                        1 : 0,
                    skpf: m,
                    tm: (new Date).getTime()
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                async: l,
                success: function(c) {
                    $("#divWait").hide();
                    if (4 === g) c.status && "failed" === c.status ? alert("Failed to send request.  Please contact request.") : ($(window).unbind("beforeunload"), window.location.href = "/Library.aspx");
                    else if (c.status && "failed" === c.status) {
                        $("#divWait").hide();
                        c = c.msg.split(";");
                        for (var h = "", k = !1, l = 0; l < c.length; l++) {
                            var m = c[l].split("=");
                            if (2 === m.length) {
                                for (var n = m[1].split(","),
                                        p = "", q = n[0], r = 1; r < n.length; r++) "" !== p && (p += ","), 0 < n[r].indexOf("*") ? p += n[r].replace("*", "(you are here)") : (p += "<a href=\"javascript:gotopage('$$url')\">$$pg</a>".replace(/\$\$pg/, n[r]).replace(/\$\$url/, q + "_" + (parseInt(n[r]) - 1)), k = !0);
                                h += "<tr><td>$$doc</td><td>$$pages</td></tr>".replace(/\$\$doc/, m[0]).replace(/\$\$pages/, p)
                            }
                        }
                        h = '<span style="font-size:12px">You first <strong>MUST</strong> complete the following pages as required fields present on those pages</span>' + ('<table style="width:100%;margin-top:15px;font-size:12px"><thead><tr><th  style="width:200px;text-align:left">Document</th><th style="text-align:left">Pages</th></tr>' +
                            h + "</table>");
                        k && (h += '<div style="margin-top:15px">Click on a page in the table above to navigate to it.</div>');
                        Common.obj.showWarningNew('<div style="width:100%;text-align:left">' + (h + '<div style="margin-top:15px;"><strong>Tip</strong>: Document Map on the left shows you number of required fields and signatures on each page of the package.  You can also use it to navigate through the package.</div><div style="margin-top:15px;font-size:12px"><a href="javascript:showGuide()" style="color:red">View 2 min guide "Signing YouSignHere document"</a></div>') +
                            "</div>", 350 + 20 * c.length, 500, "Attention! You cannot sign because:", "#divprnt")
                    } else a ? ($("#divWait").hide(), a && -1 === e ? 2 > fill.request.sclick ? askConfirm(c, -1) : Common.obj.showConfirmNew('<div style="width:100%;text-align:left"><strong>You will not be able to modify a "completed" document.</strong><br/>  Once complete, document will become read-only<br /><br /> Would you like to continue?</div>', 300, 400, "Complete", "Cancel", "#divprnt", completeDoc) : 1 === a ? doSign(c, e) : 2 === a && doInitial(c, e)) : 2 === b ? ($("#divWait").hide(),
                        $("#divDownload").attr("src", "controls/FillH.ashx?action=download&rid=" + encodeURIComponent(fill.url) + "&tm=" + (new Date).getTime())) : ("1" !== $("#lbTPage").text() && (f && $("#docarea").parent().scrollTop(0), c.msg && 2 === c.sclick && "" === showInfo(3) || populate(c)), $("#divWait").hide(), c.msg && 2 === c.sclick && "" === showInfo(3) && ($("#divWait").hide(), Common.obj.showConfirmNew('<div style="width:100%;text-align:left"><strong>You will not be able to modify a "completed" document.</strong><br/>  Once complete, document will become read-only<br /><br /> Would you like to continue?</div>',
                        300, 400, "Complete", "Cancel", "#divprnt", completeDoc)))
                },
                error: function() {
                    $("#divWait").hide()
                }
            })
        }
    };
    doSign = function(a, b, e) {
        $(a).find("signcount").text();
        isMobile() ? (fill.signing = !0, window.location = "mobilesignpad.aspx?nosign=" + a.stype + "&fldid=" + b + "&b=" + encodeURIComponent(a.url) + "&d=" + (e ? 1 : 0)) : ($("#divWait").hide(), setTimeout(function() {
            spanel.param = b;
            spanel.stype = a.stype;
            spanel.sorder = a.sorder;
            spanel.ds = a.ds;
            spanel.url = url;
            spanel.doc = $("#ddlDoc").val();
            spanel.pg = $("#ddlPage").val();
            fill.request.il &&
                (spanel.sgn = $("#ddlSignees").val());
            spanel.init(700, 460, "#divprnt", signCallback)
        }, 1))
    };
    resizeWindow = function() {
        $("#divWind").height($(window).height() - $("#hdr").height() - 52 + "px")
    };
    askConfirm = function(a, b) {
        $("#divWait").hide();
        isMobile() ? doSign(a, b, 1) : ($("#divWait").hide(), ackDisclaimerNew('By clicking this button, I am authorizing YSH to automatically populate the "signature" fields in this document with my signature.  I understand that I may sign each of the above fields, but I still am selecting this automatic population option knowingly and voluntarily.  YSH makes no representations or guarantees about the content of the documents being electronically initialed or signed using YSH -- it provides users only with the technological ability to electronically initial and/or sign documents as they see fit, at their discretion.  I hereby agree to hold harmless and indemnify YSH in the event there are any legal claims, including any litigation, involving in any manner my electronic initial(s) and/or signature(s) on this document.',
            550, 400,
            function(e) {
                e ? doSign(a, b) : showCompleteButton()
            }, "#divprnt"))
    };
    signCallback = function(a) {
        populate(a)
    };
    completeDoc = function() {
        $.ajax({
            url: "controls/FillH.ashx",
            data: {
                action: "savec",
                rid: fill.url,
                tm: (new Date).getTime()
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            async: !1,
            success: function(a) {
                a.status && "failed" == a.status ? Common.obj.showWarningNew('<div style="width:100%;text-align:left">' + a.msg + "</div>", 300, 400, "Error", "#divprnt") : populate(a)
            }
        })
    };
    cancelRequest = function() {
        $.ajax({
            url: "controls/FillH.ashx",
            data: {
                action: "cancelreq",
                rid: fill.url,
                tm: (new Date).getTime()
            },
            dataType: "json",
            async: !0,
            contentType: "application/json; charset=utf-8",
            success: function(a) {
                $(window).unbind("beforeunload");
                window.location.href = "/Library.aspx"
            },
            error: function(a, b, e) {
                window.location = "/SystemMessage.aspx?t=0&msg=Failed to send request. Please contact support."
            }
        })
    }
}
$(document).bind("dragstart", function() {
    return !1
});
var fill = new Fill;
$(function() {
    fill.init();
    fill.reqc = "rgb(255, 132, 153)";
    fill.nonreqc = "rgb(251, 251, 251)";
    fill.reqbord = "2px solid black";
    $(document).on("keydown", function(f) {
        var g = $(f.target).attr("id");
        "undefined" != typeof g && 0 <= g.indexOf("cc_") || 8 == f.keyCode && f.preventDefault()
    })
});

function FieldValidation() {
    validateField = function(f, g, l, q, h, n) {
        g = new RegExp(g);
        val = $(f.target).val();
        if ("" === val) {
            var p = n ? "Black" : "Gray";
            q && (Common.obj.showWarningNew("This field may not contain an empty value", 300, 400, "Error", "#divprnt"), $(f.target).focus());
            $(f.target).css("color", p);
            $(f.target).val("")
        } else if (!g.test(val)) $(f.target).css("color", p), $(f.target).val("");
        else if (null !== h && "undefined" !== typeof h && (n = h.split(","), 2 == n.length)) {
            h = n[0];
            q = n[1];
            p = new RegExp(n[1], "g");
            n = $(f.target).val().replace(p,
                "");
            h = h.split(p);
            p = "";
            for (g = 0; g < h.length; g++)
                for (0 < p.length && (p += q), l = 0; l < h[g].length; l++) {
                    var u = n.substring(0, 1);
                    if ("" === u) break;
                    var t = h[g].substring(l, l + 1);
                    "#" !== t ? (p += t, u === t && (n = n.substring(1))) : (p += n.substring(0, 1), n = n.substring(1))
                }
            $(f.target).val(p)
        }
    };
    hidePrompt = function(f, g) {
        val = $(f.target).val();
        $(f.target).css("color", "Black")
    };
    this.initValidator = function(f, g, l, q, h, n) {
        cc = n ? "Black" : "Gray";
        "" != $(f).val() && $(f).val() != g || "" == g || $(f).css("color", cc);
        $.data($(f)[0], "vv", g);
        $(f).blur(function(f) {
            validateField(f,
                l, g, q, h, n)
        }).blur();
        $(f).focus(function(f) {
            hidePrompt(f, g)
        })
    };
    checkComplete = function(f) {
        d = function() {
            1 === f ? fill.request.ext ? window.location = fill.request.ext : fill.request.slf || fill.request.il ? fill.request.mob && isMobile() ? window.location = "defaultm.aspx" : window.location = "requests.aspx" : window.location = "index.html" : fill.request.mob && isMobile() ? window.location = "Defaultm.aspx" : window.location = "Requests.aspx"
        };
        if (fill && fill.request && !fill.signing) {
            var g = showInfo(3);
            fill.prompted = !0;
            "" !== g ? Common.obj.showConfirmNew('<div style="text-align:left">' +
                g + "<br/><br/>Do you want to quit?</div>", 300, 350, "Yes", "No", "#divprnt",
                function() {
                    showWait();
                    d()
                }) : d()
        }
    }
}
null == FieldValidation.obj && (FieldValidation.obj = new FieldValidation);
$(window).bind("beforeunload", function(f) {
    if (!isMobile() && !fill.prompted && fill && fill.request && !fill.signing && !fill.request.complete && 0 < fill.request.map.length) {
        if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) return confirm("You did not complete the package. There are more pages to complete. Are you sure you want to quit?");
        alert("You did not complete the package. There are more pages to work on. \n\nPlease come back and complete this request later.  It will be available to you until it expires or complete.")
    }
});