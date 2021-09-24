var saswp_attached_rv = [],
    saswp_attached_col = [],
    rmv_boolean = !1,
    rmv_html = "";
jQuery(document).ready(function(s) {
    if (s(document).on("click", "#saswp_loc_display_on_front", function() {
            s(this).is(":checked") ? s(".saswp-front-location-inst").removeClass("saswp_hide") : s(".saswp-front-location-inst").addClass("saswp_hide")
        }), s(document).on("change", ".saswp-collection-where", function() {
            s(this);
            var a = s(this).val();
            a && function(a) {
                a && s.ajax({
                    url: ajaxurl,
                    method: "GET",
                    data: {
                        action: "saswp_get_select2_data",
                        type: a,
                        q: "",
                        saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                    },
                    beforeSend: function() {},
                    success: function(a) {
                        if (a) {
                            var e = "";
                            s.each(a, function(s, a) {
                                e += '<option value="' + a.id + '">' + a.text + "</option>"
                            }), s(".saswp-collection-where-data").html(""), s(".saswp-collection-where-data").append(e), saswp_select2()
                        }
                    },
                    error: function(s) {
                        console.log("Failed Ajax Request"), console.log(s)
                    }
                })
            }(a)
        }), s(".saswp-collection-display-method").change(function() {
            "shortcode" == s(this).val() ? (s(".saswp-coll-where").addClass("saswp_hide"), s("#saswp-motivatebox").css("display", "block")) : (s(".saswp-coll-where").removeClass("saswp_hide"), s("#saswp-motivatebox").css("display", "none"))
        }).change(), s(document).on("click", ".saswp-dismiss-notices", function() {
            var a = s(this),
                e = s(this).attr("notice-type");
            e && s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_dismiss_notices",
                    notice_type: e,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    "t" == s.status && a.parent().parent().hide()
                },
                error: function(s) {
                    console.log(s)
                }
            })
        }), saswp_select2(), s(".saswp-upgrade-to-pro").parent().attr({
            href: "https://structured-data-for-wp.com/pricing/",
            target: "_blank"
        }), s(document).on("click", ".saswp-attach-reviews", function() {
            s(".saswp-enable-append-reviews").is(":checked") ? (tb_show(saswp_localize_data.translable_txt.attach_review, "#TB_inline??width=615&height=400&inlineId=saswp-embed-code-div"), s(document).find("#TB_window").width(600).height(415).css({
                top: "200px",
                "margin-top": "0px"
            }), s(".saswp-attached-rv-count").show()) : s(".saswp-attached-rv-count").hide()
        }), s(".close-attached-reviews-popup").on("click", function() {
            s("#TB_closeWindowButton").trigger("click")
        }), s("#saswp_attahced_reviews").val() && (saswp_attached_rv = JSON.parse(s("#saswp_attahced_reviews").val())), s("#saswp_attached_collection").val() && (saswp_attached_col = JSON.parse(s("#saswp_attached_collection").val())), s(document).on("click", ".saswp-attach-rv-checkbox", function() {
            var a;
            a = parseInt(s(this).parent().attr("data-id"));
            var e = s(this).parent().attr("data-type");
            s(this).is(":checked") ? ("review" == e && saswp_attached_rv.push(a), "collection" == e && saswp_attached_col.push(a)) : ("review" == e && saswp_attached_rv.splice(saswp_attached_rv.indexOf(a), 1), "collection" == e && saswp_attached_col.splice(saswp_attached_col.indexOf(a), 1));
            var t = saswp_attached_rv.length,
                i = saswp_attached_col.length,
                c = "";
            t > 0 && (c += t + " Reviews, "), i > 0 && (c += i + " Collection"), c || (c = 0), s(".saswp-attached-rv-count").text("Attached " + c), s("#saswp_attahced_reviews").val(JSON.stringify(saswp_attached_rv)), s("#saswp_attached_collection").val(JSON.stringify(saswp_attached_col))
        }), s(".saswp-load-more-rv").on("click", function(a) {
            var e = s(this).attr("data-type"),
                t = s(".saswp-add-rv-loop[data-type=" + e + "]").length,
                i = t / 10 + 1;
            s("#saswp-add-rv-automatic .spinner").addClass("is-active"), a.preventDefault(), s.get(ajaxurl, {
                action: "saswp_get_reviews_on_load",
                data_type: e,
                offset: t,
                paged: i,
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            }, function(a) {
                if ("t" == a.status) {
                    var t = "";
                    a.result && (s.each(a.result, function(s, a) {
                        var i = "";
                        "review" == e && saswp_attached_rv.includes(parseInt(a.saswp_review_id)) && (i = "checked"), "collection" == e && saswp_attached_col.includes(parseInt(a.saswp_review_id)) && (i = "checked"), t += '<div class="saswp-add-rv-loop" data-type="' + e + '" data-id="' + a.saswp_review_id + '">', "review" == e && (t += '<input class="saswp-attach-rv-checkbox" type="checkbox" ' + i + ">  <strong> " + a.saswp_reviewer_name + " ( Rating - " + a.saswp_review_rating + ' ) <span class="saswp-g-plus"><img src="' + a.saswp_review_platform_icon + '"/></span></strong>'), "collection" == e && (t += '<input class="saswp-attach-rv-checkbox" type="checkbox" ' + i + ">  <strong> " + a.saswp_reviewer_name + " </strong>"), t += "</div>"
                    }), s(".saswp-add-rv-automatic-list[data-type=" + e + "]").append(t)), a.message && (s(".saswp-rv-not-found[data-type=" + e + "]").removeClass("saswp_hide"), s(".saswp-load-more-rv[data-type=" + e + "]").addClass("saswp_hide"))
                } else alert(a.message);
                s("#saswp-add-rv-automatic .spinner").removeClass("is-active")
            }, "json")
        }), s(".saswp-modify-schema-toggle").click(function(a) {
            a.preventDefault(), s(".saswp-modify-container").slideToggle("300");
            var e = s("#saswp_enable_custom_field"),
                t = e.val();
            e.val("1" === t ? "0" : "1"), s(".saswp-enable-modify-schema-output").change()
        }), s(".saswp-enable-itemlist").change(function() {
            s(this).is(":checked") ? (s("#saswp_item_list_tags").show(), s(".saspw-item-list-note").show(), "custom" == s("#saswp_item_list_tags").val() ? s("#saswp_item_list_custom").show() : s("#saswp_item_list_custom").hide()) : (s(".saspw-item-list-note").hide(), s("#saswp_item_list_tags").hide(), s("#saswp_item_list_custom").hide())
        }), s("#saswp_item_list_tags").change(function() {
            "custom" == s(this).val() ? s("#saswp_item_list_custom").show() : s("#saswp_item_list_custom").hide()
        }), s(document).on("click", ".saswp-add-g-location-btn", function(a) {
            var e;
            e = s("#saswp_google_place_api_key").length ? '<input class="saswp-g-blocks-field" name="sd_data[saswp_reviews_location_blocks][]" type="number" min="5" step="5" placeholder="5" disabled="disabled">' : '<input class="saswp-g-blocks-field" name="sd_data[saswp_reviews_location_blocks][]" type="number" min="10" step="10" placeholder="10">', a.preventDefault();
            var t = "";
            (t += '<tr><td style="width:12%;"><strong>' + saswp_localize_data.translable_txt.place_id + '</strong></td><td style="width:20%;"><input class="saswp-g-location-field" name="sd_data[saswp_reviews_location_name][]" type="text" value=""></td><td style="width:10%;"><strong>' + saswp_localize_data.translable_txt.reviews + '</strong></td><td style="width:10%;">' + e + '</td><td style="width:10%;"><a class="button button-default saswp-fetch-g-reviews">' + saswp_localize_data.translable_txt.fetch + '</a></td><td style="width:10%;"><a type="button" class="saswp-remove-review-item button">x</a></td><td style="width:10%;"><p class="saswp-rv-fetched-msg"></p></td></tr>') && s(".saswp-g-reviews-settings-table").append(t)
        }), s(document).on("click", ".saswp-fetch-g-reviews", function() {
            var a, e = s(this);
            e.addClass("updating-message");
            var t = s(this).parent().parent().find(".saswp-g-location-field").val(),
                i = s(this).parent().parent().find(".saswp-g-blocks-field").val(),
                c = s("#saswp_google_place_api_key").val(),
                p = s("#reviews_addon_license_key").val(),
                o = s("#reviews_addon_license_key_status").val();
            if ("premium" == (a = s("#saswp_google_place_api_key").length ? "free" : "premium")) {
                if (!(i > 0)) return alert(saswp_localize_data.translable_txt.blocks_zero), e.removeClass("updating-message"), !1;
                if (0 != i % 10) return e.parent().parent().find(".saswp-rv-fetched-msg").text(saswp_localize_data.translable_txt.step_in), e.parent().parent().find(".saswp-rv-fetched-msg").css("color", "#988f1b"), e.removeClass("updating-message"), !1
            }
            "" != t && (p || c) ? s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_fetch_google_reviews",
                    reviews_api_status: o,
                    reviews_api: p,
                    location: t,
                    blocks: i,
                    g_api: c,
                    premium_status: a,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    "t" == s.status ? (e.parent().parent().find(".saswp-rv-fetched-msg").text(saswp_localize_data.translable_txt.success), e.parent().parent().find(".saswp-rv-fetched-msg").css("color", "green")) : (e.parent().parent().find(".saswp-rv-fetched-msg").text(s.message), e.parent().parent().find(".saswp-rv-fetched-msg").css("color", "#988f1b")), e.removeClass("updating-message")
                },
                error: function(s) {
                    console.log(s)
                }
            }) : ("" == t && alert(saswp_localize_data.translable_txt.enter_place_id), "" == c && alert(saswp_localize_data.translable_txt.enter_api_key), "" == p && alert(saswp_localize_data.translable_txt.enter_rv_api_key), e.removeClass("updating-message"))
        }), saswp_localize_data.do_tour) {
        var a, e = "<h3>" + saswp_localize_data.translable_txt.using_schema + "</h3>";
        e += "<p>" + saswp_localize_data.translable_txt.do_you_want + " <b>" + saswp_localize_data.translable_txt.sd_update + "</b> " + saswp_localize_data.translable_txt.before_others + "</p>", e += '<style type="text/css">', e += ".wp-pointer-buttons{ padding:0; overflow: hidden; }", e += ".wp-pointer-content .button-secondary{  left: -25px;background: transparent;top: 5px; border: 0;position: relative; padding: 0; box-shadow: none;margin: 0;color: #0085ba;} .wp-pointer-content .button-primary{ display:none}  #saswp_mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }", e += "</style>", e += '<div id="saswp_mc_embed_signup">', e += '<form method="POST" accept-charset="utf-8" id="saswp-news-letter-form">', e += '<div id="saswp_mc_embed_signup_scroll">', e += '<div class="saswp-mc-field-group" style="    margin-left: 15px;    width: 195px;    float: left;">', e += '<input type="text" name="saswp_subscriber_name" class="form-control" placeholder="Name" hidden value="' + saswp_localize_data.current_user_name + '" style="display:none">', e += '<input type="text" value="' + saswp_localize_data.current_user_email + '" name="saswp_subscriber_email" class="form-control" placeholder="Email*"  style="      width: 180px;    padding: 6px 5px;">', e += '<input type="text" name="saswp_subscriber_website" class="form-control" placeholder="Website" hidden style=" display:none; width: 168px; padding: 6px 5px;" value="' + saswp_localize_data.get_home_url + '">', e += '<input type="hidden" name="ml-submit" value="1" />', e += "</div>", e += '<div id="mce-responses">', e += "</div>", e += '<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_a631df13442f19caede5a5baf_c9a71edce6" tabindex="-1" value=""></div>', e += '<input type="submit" value="Subscribe" name="subscribe" id="pointer-close" class="button mc-newsletter-sent" style=" background: #0085ba; border-color: #006799; padding: 0px 16px; text-shadow: 0 -1px 1px #006799,1px 0 1px #006799,0 1px 1px #006799,-1px 0 1px #006799; height: 30px; margin-top: 1px; color: #fff; box-shadow: 0 1px 0 #006799;">', e += '<p id="saswp-news-letter-status"></p>', e += "</div>", e += "</form>", e += "</div>", s(document).on("submit", "#saswp-news-letter-form", function(a) {
            a.preventDefault();
            var e = s(this),
                t = e.find('input[name="saswp_subscriber_name"]').val(),
                i = e.find('input[name="saswp_subscriber_email"]').val();
            website = e.find('input[name="saswp_subscriber_website"]').val(), s.post(saswp_localize_data.ajax_url, {
                action: "saswp_subscribe_to_news_letter",
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce,
                name: t,
                email: i,
                website: website
            }, function(a) {
                a ? "Some fields are missing." == a ? (s("#saswp-news-letter-status").text(""), s("#saswp-news-letter-status").css("color", "red")) : "Invalid email address." == a ? (s("#saswp-news-letter-status").text(""), s("#saswp-news-letter-status").css("color", "red")) : "Invalid list ID." == a ? (s("#saswp-news-letter-status").text(""), s("#saswp-news-letter-status").css("color", "red")) : "Already subscribed." == a ? (s("#saswp-news-letter-status").text(""), s("#saswp-news-letter-status").css("color", "red")) : (s("#saswp-news-letter-status").text("You're subscribed!"), s("#saswp-news-letter-status").css("color", "green")) : alert("Sorry, unable to subscribe. Please try again later!")
            })
        });
        var t = {
            content: e,
            position: {
                edge: "top",
                align: "left"
            }
        };
        a = function() {
            s(saswp_localize_data.displayID).pointer(t).pointer("open"), saswp_localize_data.button2 && (jQuery("#pointer-close").after('<a id="pointer-primary" class="button-primary">' + saswp_localize_data.button2 + "</a>"), jQuery("#pointer-primary").click(function() {
                saswp_localize_data.function_name
            }), jQuery("#pointer-close").click(function() {
                s.post(saswp_localize_data.ajax_url, {
                    pointer: "saswp_subscribe_pointer",
                    action: "dismiss-wp-pointer"
                })
            }))
        }, (t = s.extend(t, {
            buttons: function(s, a) {
                return button = jQuery('<a id="pointer-close" class="button-secondary">' + saswp_localize_data.button1 + "</a>"), button_2 = jQuery("#pointer-close.button"), button.bind("click.pointer", function() {
                    a.element.pointer("close")
                }), button_2.on("click", function() {
                    setTimeout(function() {
                        a.element.pointer("close")
                    }, 3e3)
                }), button
            },
            close: function() {
                s.post(saswp_localize_data.ajax_url, {
                    pointer: "saswp_subscribe_pointer",
                    action: "dismiss-wp-pointer"
                })
            },
            show: function(s, a) {
                a.pointer.css({
                    left: "170px",
                    top: "160px"
                })
            }
        })).position && t.position.defer_loading ? s(window).bind("load.wp-pointers", a) : a()
    }
    var i;
    if (s(".saswp-tabs a").click(function(a) {
            var e = s(this).attr("href"),
                t = getParameterByName("tab", e);
            return t || (t = "general"), s(this).siblings().removeClass("nav-tab-active"), s(this).addClass("nav-tab-active"), "premium_features" == t && "yes" == jQuery(this).attr("data-extmgr") ? window.location.href = "edit.php?post_type=saswp&page=saswp-extension-manager" : (s(".form-wrap").find(".saswp-" + t).siblings().hide(), s(".form-wrap .saswp-" + t).show(), window.history.pushState("", "", e)), !1
        }), s(".saswp-schame-type-select").select2(), s(".saswp-schame-type-select").change(function(a) {
            a.preventDefault(), s(".saswp-custom-fields-table").html("");
            var e = s(this).val();
            s(".saswp-option-table-class tr").each(function(a, e) {
                a > 0 && s(this).hide()
            }), "TechArticle" == e || "Article" == e || "Blogposting" == e || "NewsArticle" == e || "WebPage" == e ? s(".saswp-enable-speakable").parent().parent().show() : s(".saswp-enable-speakable").parent().parent().hide(), "Book" == e || "Course" == e || "Organization" == e || "CreativeWorkSeries" == e || "MobileApplication" == e || "ImageObject" == e || "HowTo" == e || "MusicPlaylist" == e || "MusicAlbum" == e || "Recipe" == e || "TVSeries" == e || "SoftwareApplication" == e || "Event" == e || "VideoGame" == e || "Service" == e || "AudioObject" == e || "VideoObject" == e || "local_business" == e || "Product" == e || "Review" == e ? s(".saswp-enable-append-reviews").parent().parent().show() : s(".saswp-enable-append-reviews").parent().parent().hide(), "VideoObject" == e ? s(".saswp-enable-markup-class").parent().parent().show() : s(".saswp-enable-markup-class").parent().parent().hide(), s("#saswp_location_meta_box").addClass("saswp_hide"), "local_business" == e && (s("#saswp_location_meta_box").removeClass("saswp_hide"), s(".saswp-option-table-class tr").eq(1).show(), s(".saswp-business-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1), s(".select-post-type").val("show_globally").trigger("change")), "Service" == e && (s(".saswp-service-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1)), "Event" == e && (s(".saswp-event-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1)), "Review" == e && (s(".saswp-review-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1), s(".saswp-item-reivewed-list").change()), "ItemList" == e ? (s(".saswp-schema-modify-section").hide(), s(".saswp-itemlist-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1), s(".saswp-itemlist-item-type-list").change()) : s(".saswp-schema-modify-section").show(), saswp_enable_rating_review(), s(".saswp-manual-modification").html(""), s(".saswp-static-container .spinner").addClass("is-active"), s.get(ajaxurl, {
                action: "saswp_get_manual_fields_on_ajax",
                schema_type: e,
                post_id: saswp_localize_data.post_id,
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            }, function(a) {
                s(".saswp-static-container .spinner").removeClass("is-active"), s(".saswp-manual-modification").append(a), saswp_schema_datepicker(), saswp_schema_timepicker(), saswp_item_reviewed_call()
            }), "HowTo" == e || "local_business" == e || "FAQ" == e ? s(".saswp-enable-modify-schema").show() : (s(".saswp-enable-modify-schema-output").val("automatic"), s(".saswp-enable-modify-schema-output").change(), s(".saswp-enable-modify-schema").hide())
        }), s("#saswp_business_type").select2(), s(".saswp-local-sub-type-2").select2(), s("#saswp_business_type").change(function() {
            var a = s(this).val(),
                e = s(".saswp-schame-type-select").val();
            s(".saswp-option-table-class tr").each(function(a, e) {
                a > 1 && (s(this).hide(), s(this).find(".saswp-local-sub-type-2").attr("disabled", !0))
            }), "TechArticle" == e || "Article" == e || "Blogposting" == e || "NewsArticle" == e || "WebPage" == e ? s(".saswp-enable-speakable").parent().parent().show() : s(".saswp-enable-speakable").parent().parent().hide(), "Book" == e || "Course" == e || "Organization" == e || "CreativeWorkSeries" == e || "MobileApplication" == e || "ImageObject" == e || "HowTo" == e || "MusicPlaylist" == e || "MusicAlbum" == e || "Recipe" == e || "TVSeries" == e || "SoftwareApplication" == e || "Event" == e || "VideoGame" == e || "Service" == e || "AudioObject" == e || "VideoObject" == e || "local_business" == e || "Product" == e || "Review" == e ? s(".saswp-enable-append-reviews").parent().parent().show() : s(".saswp-enable-append-reviews").parent().parent().hide(), "VideoObject" == e ? s(".saswp-enable-markup-class").parent().parent().show() : s(".saswp-enable-markup-class").parent().parent().hide(), s("#saswp_location_meta_box").addClass("saswp_hide"), "local_business" == e && (s(".saswp-" + a + "-tr").show(), s(".saswp-business-text-field-tr").show(), s(".saswp-" + a + "-tr").find("select").attr("disabled", !1), s("#saswp_location_meta_box").removeClass("saswp_hide")), "Review" == e && (s(".saswp-review-text-field-tr").show(), s(".saswp-review-text-field-tr").find("select").attr("disabled", !1)), "ItemList" == e ? (s(".saswp-schema-modify-section").hide(), s(".saswp-itemlist-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1)) : s(".saswp-schema-modify-section").show(), "Event" == e && (s(".saswp-event-text-field-tr").show(), s(".saswp-option-table-class tr").find("select").attr("disabled", !1)), saswp_enable_rating_review()
        }).change(), s(".saswp-checkbox").change(function() {
            var a = s(this).attr("id"),
                e = s(this);
            switch (a) {
                case "saswp-the-seo-framework-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-the-seo-framework").val(1) : s("#saswp-the-seo-framework").val(0);
                    break;
                case "saswp-seo-press-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-seo-press").val(1) : s("#saswp-seo-press").val(0);
                    break;
                case "saswp-aiosp-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-aiosp").val(1) : s("#saswp-aiosp").val(0);
                    break;
                case "saswp-smart-crawl-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-smart-crawl").val(1) : s("#saswp-smart-crawl").val(0);
                    break;
                case "saswp-squirrly-seo-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-squirrly-seo").val(1) : s("#saswp-squirrly-seo").val(0);
                    break;
                case "saswp-wp-recipe-maker-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-recipe-maker").val(1) : s("#saswp-wp-recipe-maker").val(0);
                    break;
                case "saswp-wpzoom-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpzoom").val(1) : s("#saswp-wpzoom").val(0);
                    break;
                case "saswp-yotpo-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-yotpo").val(1) : s("#saswp-yotpo").val(0);
                    break;
                case "saswp-ryviu-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ryviu").val(1) : s("#saswp-ryviu").val(0);
                    break;
                case "saswp-ultimate-blocks-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ultimate-blocks").val(1) : s("#saswp-ultimate-blocks").val(0);
                    break;
                case "saswp-starsrating-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-starsrating").val(1) : s("#saswp-starsrating").val(0);
                    break;
                case "saswp-wptastyrecipe-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wptastyrecipe").val(1) : s("#saswp-wptastyrecipe").val(0);
                    break;
                case "saswp-recipress-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-recipress").val(1) : s("#saswp-recipress").val(0);
                    break;
                case "saswp-wp-ultimate-recipe-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-ultimate-recipe").val(1) : s("#saswp-wp-ultimate-recipe").val(0);
                    break;
                case "saswp-zip-recipes-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-zip-recipes").val(1) : s("#saswp-zip-recipes").val(0);
                    break;
                case "saswp-mediavine-create-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-mediavine-create").val(1) : s("#saswp-mediavine-create").val(0);
                    break;
                case "saswp-ht-recipes-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ht-recipes").val(1) : s("#saswp-ht-recipes").val(0);
                    break;
                case "saswp-wpsso-core-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpsso-core").val(1) : s("#saswp-wpsso-core").val(0);
                    break;
                case "saswp-for-wordpress-checkbox":
                    s(this).is(":checked") ? s("#saswp-for-wordpress").val(1) : s("#saswp-for-wordpress").val(0);
                    break;
                case "saswp-for-amp-checkbox":
                    s(this).is(":checked") ? s("#saswp-for-amp").val(1) : s("#saswp-for-amp").val(0);
                    break;
                case "saswp_kb_contact_1_checkbox":
                    s(this).is(":checked") ? (s("#saswp_kb_contact_1").val(1), s("#saswp_kb_telephone, #saswp_contact_type").parent().parent("li").removeClass("saswp-display-none")) : (s("#saswp_kb_contact_1").val(0), s("#saswp_kb_telephone, #saswp_contact_type").parent().parent("li").addClass("saswp-display-none"));
                    break;
                case "saswp-logo-dimensions-check":
                    s(this).is(":checked") ? (s("#saswp-logo-dimensions").val(1), s("#saswp-logo-width, #saswp-logo-height").parent().parent("li").show()) : (s("#saswp-logo-dimensions").val(0), s("#saswp-logo-width, #saswp-logo-height").parent().parent("li").hide());
                    break;
                case "saswp_archive_schema_checkbox":
                    s(this).is(":checked") ? (s("#saswp_archive_schema").val(1), s(".saswp_archive_schema_type_class").parent().parent().show()) : (s("#saswp_archive_schema").val(0), s(".saswp_archive_schema_type_class").parent().parent().hide());
                    break;
                case "saswp_website_schema_checkbox":
                    s(this).is(":checked") ? (s("#saswp_website_schema").val(1), s("#saswp_search_box_schema").parent().parent().show()) : (s("#saswp_website_schema").val(0), s("#saswp_search_box_schema").parent().parent().hide());
                    break;
                case "saswp_search_box_schema_checkbox":
                    s(this).is(":checked") ? s("#saswp_search_box_schema").val(1) : s("#saswp_search_box_schema").val(0);
                    break;
                case "saswp_breadcrumb_remove_cat_checkbox":
                    s(this).is(":checked") ? s("#saswp_breadcrumb_remove_cat").val(1) : s("#saswp_breadcrumb_remove_cat").val(0);
                    break;
                case "saswp_breadcrumb_schema_checkbox":
                    s(this).is(":checked") ? (s("#saswp_breadcrumb_schema").val(1), s("#saswp_breadcrumb_remove_cat").parent().parent().show()) : (s("#saswp_breadcrumb_schema").val(0), s("#saswp_breadcrumb_remove_cat").parent().parent().hide());
                    break;
                case "saswp_comments_schema_checkbox":
                    s(this).is(":checked") ? s("#saswp_comments_schema").val(1) : s("#saswp_comments_schema").val(0);
                    break;
                case "saswp-compativility-checkbox":
                    s(this).is(":checked") ? s("#saswp-flexmlx-compativility").val(1) : s("#saswp-flexmlx-compativility").val(0);
                    break;
                case "saswp-review-module-checkbox":
                    s(this).is(":checked") ? s("#saswp-review-module").val(1) : s("#saswp-review-module").val(0);
                    break;
                case "saswp-stars-rating-checkbox":
                    s(this).is(":checked") ? (s(".saswp-stars-post-table").removeClass("saswp_hide"), s(this).parent().parent().next().removeClass("saswp_hide"), s("#saswp-stars-rating").val(1)) : (s(this).parent().parent().next().addClass("saswp_hide"), s(".saswp-stars-post-table").addClass("saswp_hide"), s("#saswp-stars-rating").val(0));
                    break;
                case "saswp-kk-star-raring-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-kk-star-raring").val(1) : s("#saswp-kk-star-raring").val(0);
                    break;
                case "saswp-rmprating-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-rmprating").val(1) : s("#saswp-rmprating").val(0);
                    break;
                case "saswp-ratingform-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ratingform").val(1) : s("#saswp-ratingform").val(0);
                    break;
                case "saswp-wpdiscuz-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpdiscuz").val(1) : s("#saswp-wpdiscuz").val(0);
                    break;
                case "saswp-yet-another-stars-rating-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-yet-another-stars-rating").val(1) : s("#saswp-yet-another-stars-rating").val(0);
                    break;
                case "saswp-simple-author-box-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-simple-author-box").val(1) : s("#saswp-simple-author-box").val(0);
                    break;
                case "saswp-woocommerce-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-woocommerce").val(1) : s("#saswp-woocommerce").val(0);
                    break;
                case "saswp_woocommerce_archive_checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp_woocommerce_archive").val(1) : s("#saswp_woocommerce_archive").val(0);
                    break;
                case "saswp-wpecommerce-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpecommerce").val(1) : s("#saswp-wpecommerce").val(0);
                    break;
                case "saswp-default-review-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp_default_review").val(1) : s("#saswp_default_review").val(0);
                    break;
                case "saswp-extra-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-extra").val(1) : s("#saswp-extra").val(0);
                    break;
                case "saswp-soledad-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-soledad").val(1) : s("#saswp-soledad").val(0);
                    break;
                case "saswp-wp-theme-reviews-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-theme-reviews").val(1) : s("#saswp-wp-theme-reviews").val(0);
                    break;
                case "saswp-dw-question-answer-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-dw-question-answer").val(1) : s("#saswp-dw-question-answer").val(0);
                    break;
                case "saswp-wpqa-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpqa").val(1) : s("#saswp-wpqa").val(0);
                    break;
                case "saswp-wp-job-manager-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-job-manager").val(1) : s("#saswp-wp-job-manager").val(0);
                    break;
                case "saswp-yoast-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-yoast").val(1) : s("#saswp-yoast").val(0);
                    break;
                case "saswp-polylang-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-polylang").val(1) : s("#saswp-polylang").val(0);
                    break;
                case "saswp-autolistings-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-autolistings").val(1) : s("#saswp-autolistings").val(0);
                    break;
                case "saswp-wpml-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpml").val(1) : s("#saswp-wpml").val(0);
                    break;
                case "saswp-metatagmanager-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-metatagmanager").val(1) : s("#saswp-metatagmanager").val(0);
                    break;
                case "saswp-slimseo-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-slimseo").val(1) : s("#saswp-slimseo").val(0);
                    break;
                case "saswp-rankmath-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-rankmath").val(1) : s("#saswp-rankmath").val(0);
                    break;
                case "saswp-taqyeem-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-taqyeem").val(1) : s("#saswp-taqyeem").val(0);
                    break;
                case "saswp-video-thumbnails-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-video-thumbnails").val(1) : s("#saswp-video-thumbnails").val(0);
                    break;
                case "saswp-featured-video-plus-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-featured-video-plus").val(1) : s("#saswp-featured-video-plus").val(0);
                    break;
                case "saswp-wp-product-review-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-product-review").val(1) : s("#saswp-wp-product-review").val(0);
                    break;
                case "saswp-the-events-calendar-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-the-events-calendar").val(1) : s("#saswp-the-events-calendar").val(0);
                    break;
                case "saswp-homeland-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-homeland").val(1) : s("#saswp-homeland").val(0);
                    break;
                case "saswp-ratency-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ratency").val(1) : s("#saswp-ratency").val(0);
                    break;
                case "saswp-wpresidence-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpresidence").val(1) : s("#saswp-wpresidence").val(0);
                    break;
                case "saswp-myhome-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-myhome").val(1) : s("#saswp-myhome").val(0);
                    break;
                case "saswp-realestate-5-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-realestate-5").val(1) : s("#saswp-realestate-5").val(0);
                    break;
                case "saswp-stamped-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-stamped").val(1) : s("#saswp-stamped").val(0);
                    break;
                case "saswp-sabaidiscuss-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-sabaidiscuss").val(1) : s("#saswp-sabaidiscuss").val(0);
                    break;
                case "saswp-geodirectory-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-geodirectory").val(1) : s("#saswp-geodirectory").val(0);
                    break;
                case "saswp-classipress-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-classipress").val(1) : s("#saswp-classipress").val(0);
                    break;
                case "saswp-realhomes-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-realhomes").val(1) : s("#saswp-realhomes").val(0);
                    break;
                case "saswp-learn-press-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-learn-press").val(1) : s("#saswp-learn-press").val(0);
                    break;
                case "saswp-wplms-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wplms").val(1) : s("#saswp-wplms").val(0);
                    break;
                case "saswp-learn-dash-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-learn-dash").val(1) : s("#saswp-learn-dash").val(0);
                    break;
                case "saswp-lifter-lms-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-lifter-lms").val(1) : s("#saswp-lifter-lms").val(0);
                    break;
                case "saswp-senseilms-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-senseilms").val(1) : s("#saswp-senseilms").val(0);
                    break;
                case "saswp-wp-event-manager-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-event-manager").val(1) : s("#saswp-wp-event-manager").val(0);
                    break;
                case "saswp-events-manager-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-events-manager").val(1) : s("#saswp-events-manager").val(0);
                    break;
                case "saswp-event-calendar-wd-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-event-calendar-wd").val(1) : s("#saswp-event-calendar-wd").val(0);
                    break;
                case "saswp-event-organiser-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-event-organiser").val(1) : s("#saswp-event-organiser").val(0);
                    break;
                case "saswp-modern-events-calendar-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-modern-events-calendar").val(1) : s("#saswp-modern-events-calendar").val(0);
                    break;
                case "saswp-woocommerce-booking-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? (s("#saswp-woocommerce-booking").val(1), s("#saswp-woocommerce-booking-main").val(1)) : (s("#saswp-woocommerce-booking").val(0), s("#saswp-woocommerce-booking-main").val(0));
                    break;
                case "saswp-woocommerce-booking-main-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? (s("#saswp-woocommerce-booking-main").val(1), s("#saswp-woocommerce-booking").val(1)) : (s("#saswp-woocommerce-booking-main").val(0), s("#saswp-woocommerce-booking").val(0));
                    break;
                case "saswp-woocommerce-membership-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-woocommerce-membership").val(1) : s("#saswp-woocommerce-membership").val(0);
                    break;
                case "saswp-defragment-checkbox":
                    s(this).is(":checked") ? s("#saswp-defragment").val(1) : s("#saswp-defragment").val(0);
                    break;
                case "saswp-cooked-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-cooked").val(1) : s("#saswp-cooked").val(0);
                    break;
                case "saswp-flexmlx-compativility-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-flexmlx-compativility").val(1) : s("#saswp-flexmlx-compativility").val(0);
                    break;
                case "saswp-shopper-approved-review-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? (s("#saswp-shopper-approved-review").val(1), s(".saswp-s-reviews-settings-table").parent().parent().parent().show()) : (s("#saswp-shopper-approved-review").val(0), s(".saswp-s-reviews-settings-table").parent().parent().parent().hide());
                    break;
                case "saswp-google-review-checkbox":
                    s(this).is(":checked") ? (s("#saswp-google-review").val(1), s("#saswp-google-rv-free-checkbox").length ? (s("#saswp-google-review-free").parent().parent().show(), s("#saswp-google-rv-free-checkbox").is(":checked") ? s("#saswp_google_place_api_key").parent().parent().show() : s("#saswp_google_place_api_key").parent().parent().hide()) : s("#saswp_google_place_api_key").parent().parent().show(), s(".saswp-g-reviews-settings-table").parent().parent().parent().show()) : (s("#saswp-google-review").val(0), s("#saswp_google_place_api_key").parent().parent().hide(), s(".saswp-g-reviews-settings-table").parent().parent().parent().hide(), s("#saswp-google-rv-free-checkbox").length && s("#saswp-google-review-free").parent().parent().hide());
                    break;
                case "saswp-google-rv-free-checkbox":
                    s("#saswp-google-review-checkbox").is(":checked") && s(this).is(":checked") ? (s("#saswp-google-review-free").val(1), s("#saswp_google_place_api_key").parent().parent().show()) : (s("#saswp-google-review-free").val(0), s("#saswp_google_place_api_key").parent().parent().hide());
                    break;
                case "saswp-markup-footer-checkbox":
                    s(this).is(":checked") ? s("#saswp-markup-footer").val(1) : s("#saswp-markup-footer").val(0);
                    break;
                case "saswp-pretty-print-checkbox":
                    s(this).is(":checked") ? s("#saswp-pretty-print").val(1) : s("#saswp-pretty-print").val(0);
                    break;
                case "saswp-wppostratings-raring-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wppostratings-raring").val(1) : s("#saswp-wppostratings-raring").val(0);
                    break;
                case "saswp-bbpress-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-bbpress").val(1) : s("#saswp-bbpress").val(0);
                    break;
                case "saswp-microdata-cleanup-checkbox":
                    s(this).is(":checked") ? s("#saswp-microdata-cleanup").val(1) : s("#saswp-microdata-cleanup").val(0);
                    break;
                case "saswp-other-images-checkbox":
                    s(this).is(":checked") ? s("#saswp-other-images").val(1) : s("#saswp-other-images").val(0);
                    break;
                case "saswp-rss-feed-image-checkbox":
                    s(this).is(":checked") ? s("#saswp-rss-feed-image").val(1) : s("#saswp-rss-feed-image").val(0);
                    break;
                case "saswp-image-resizing-checkbox":
                    s(this).is(":checked") ? s("#saswp-image-resizing").val(1) : s("#saswp-image-resizing").val(0);
                    break;
                case "saswp-multiple-size-image-checkbox":
                    s(this).is(":checked") ? s("#saswp-multiple-size-image").val(1) : s("#saswp-multiple-size-image").val(0);
                    break;
                case "saswp-easy-testimonials-checkbox":
                    s(this).is(":checked") ? s("#saswp-easy-testimonials").val(1) : s("#saswp-easy-testimonials").val(0);
                    break;
                case "saswp-brb-checkbox":
                    s(this).is(":checked") ? s("#saswp-brb").val(1) : s("#saswp-brb").val(0);
                    break;
                case "saswp-testimonial-pro-checkbox":
                    s(this).is(":checked") ? s("#saswp-testimonial-pro").val(1) : s("#saswp-testimonial-pro").val(0);
                    break;
                case "saswp-bne-testimonials-checkbox":
                    s(this).is(":checked") ? s("#saswp-bne-testimonials").val(1) : s("#saswp-bne-testimonials").val(0);
                    break;
                case "saswp-ampforwp-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ampforwp").val(1) : s("#saswp-ampforwp").val(0);
                    break;
                case "saswp-wpreviewslider-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpreviewslider").val(1) : s("#saswp-wpreviewslider").val(0);
                    break;
                case "saswp-ampbyautomatic-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ampbyautomatic").val(1) : s("#saswp-ampbyautomatic").val(0);
                    break;
                case "saswp-cmp-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-cmp").val(1) : s("#saswp-cmp").val(0);
                    break;
                case "saswp-wpreviewpro-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpreviewpro").val(1) : s("#saswp-wpreviewpro").val(0);
                    break;
                case "saswp-webstories-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-webstories").val(1) : s("#saswp-webstories").val(0);
                    break;
                case "saswp-resized-image-folder-checkbox":
                    var t = s("#saswp-resized-image-folder-checkbox");
                    s(this).is(":checked") ? s.ajax({
                        type: "POST",
                        url: ajaxurl,
                        dataType: "json",
                        data: {
                            action: "saswp_create_resized_image_folder",
                            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                        },
                        success: function(a) {
                            "t" == a.status ? (s("#saswp-resized-image-folder").val(1), s("#saswp-resized-image-folder-checkbox").after('<a class="saswp-clear-images button button-default">Clear Images</a>')) : (t.prop("checked", !1), t.next().text(a.message), t.next().css("color", "red"))
                        },
                        error: function(s) {
                            t.prop("checked", !1), t.next().text(s), t.next().css("color", "red")
                        }
                    }) : (s("#saswp-resized-image-folder").val(0), s(".saswp-clear-images").remove());
                    break;
                case "saswp-elementor-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-elementor").val(1) : s("#saswp-elementor").val(0);
                    break;
                case "saswp-rannarecipe-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-rannarecipe").val(1) : s("#saswp-rannarecipe").val(0);
                    break;
                case "saswp-jetpackrecipe-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-jetpackrecipe").val(1) : s("#saswp-jetpackrecipe").val(0);
                    break;
                case "saswp-quickandeasyfaq-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-quickandeasyfaq").val(1) : s("#saswp-quickandeasyfaq").val(0);
                    break;
                case "saswp-ultimatefaqs-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ultimatefaqs").val(1) : s("#saswp-ultimatefaqs").val(0);
                    break;
                case "saswp-arconixfaq-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-arconixfaq").val(1) : s("#saswp-arconixfaq").val(0);
                    break;
                case "saswp-faqconcertina-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-faqconcertina").val(1) : s("#saswp-faqconcertina").val(0);
                    break;
                case "saswp-wpjobmanager-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpjobmanager").val(1) : s("#saswp-wpjobmanager").val(0);
                    break;
                case "saswp-simplejobboard-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-simplejobboard").val(1) : s("#saswp-simplejobboard").val(0);
                    break;
                case "saswp-wpjobopenings-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpjobopenings").val(1) : s("#saswp-wpjobopenings").val(0);
                    break;
                case "saswp-webfaq10-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-webfaq10").val(1) : s("#saswp-webfaq10").val(0);
                    break;
                case "saswp-wpfaqschemamarkup-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpfaqschemamarkup").val(1) : s("#saswp-wpfaqschemamarkup").val(0);
                    break;
                case "saswp-faqschemaforpost-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-faqschemaforpost").val(1) : s("#saswp-faqschemaforpost").val(0);
                    break;
                case "saswp-masteraccordion-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-masteraccordion").val(1) : s("#saswp-masteraccordion").val(0);
                    break;
                case "saswp-easyfaqs-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-easyfaqs").val(1) : s("#saswp-easyfaqs").val(0);
                    break;
                case "saswp-accordion-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-accordion").val(1) : s("#saswp-accordion").val(0);
                    break;
                case "saswp-html5responsivefaq-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-html5responsivefaq").val(1) : s("#saswp-html5responsivefaq").val(0);
                    break;
                case "saswp-wpresponsivefaq-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpresponsivefaq").val(1) : s("#saswp-wpresponsivefaq").val(0);
                    break;
                case "saswp-easyaccordion-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-easyaccordion").val(1) : s("#saswp-easyaccordion").val(0);
                    break;
                case "saswp-helpiefaq-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-helpiefaq").val(1) : s("#saswp-helpiefaq").val(0);
                    break;
                case "saswp-mooberrybm-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-mooberrybm").val(1) : s("#saswp-mooberrybm").val(0);
                    break;
                case "saswp-novelist-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-novelist").val(1) : s("#saswp-novelist").val(0);
                    break;
                case "saswp-accordionfaq-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-accordionfaq").val(1) : s("#saswp-accordionfaq").val(0);
                    break;
                case "saswp-schemaforfaqs-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-schemaforfaqs").val(1) : s("#saswp-schemaforfaqs").val(0);
                    break;
                case "saswp-wp-customer-reviews-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-customer-reviews").val(1) : s("#saswp-wp-customer-reviews").val(0);
                    break;
                case "saswp-total-recipe-generator-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-total-recipe-generator").val(1) : s("#saswp-total-recipe-generator").val(0);
                    break;
                case "saswp-wordpress-news-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wordpress-news").val(1) : s("#saswp-wordpress-news").val(0);
                    break;
                case "saswp-ampwp-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-ampwp").val(1) : s("#saswp-ampwp").val(0);
                    break;
                case "saswp-wp-event-aggregator-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wp-event-aggregator").val(1) : s("#saswp-wp-event-aggregator").val(0);
                    break;
                case "saswp-timetable-event-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-timetable-event").val(1) : s("#saswp-timetable-event").val(0);
                    break;
                case "saswp-xo-event-calendar-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-xo-event-calendar").val(1) : s("#saswp-xo-event-calendar").val(0);
                    break;
                case "saswp-vs-event-list-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-vs-event-list").val(1) : s("#saswp-vs-event-list").val(0);
                    break;
                case "saswp-calendarize-it-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-calendarize-it").val(1) : s("#saswp-calendarize-it").val(0);
                    break;
                case "saswp-events-schedule-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-events-schedule").val(1) : s("#saswp-events-schedule").val(0);
                    break;
                case "saswp-woo-event-manager-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-woo-event-manager").val(1) : s("#saswp-woo-event-manager").val(0);
                    break;
                case "saswp-stachethemes-event-calendar-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-stachethemes-event-calendar").val(1) : s("#saswp-stachethemes-event-calendar").val(0);
                    break;
                case "saswp-all-in-one-event-calendar-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-all-in-one-event-calendar").val(1) : s("#saswp-all-in-one-event-calendar").val(0);
                    break;
                case "saswp-event-on-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-event-on").val(1) : s("#saswp-event-on").val(0);
                    break;
                case "saswp-easy-recipe-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-easy-recipe").val(1) : s("#saswp-easy-recipe").val(0);
                    break;
                case "saswp-tevolution-events-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-tevolution-events").val(1) : s("#saswp-tevolution-events").val(0);
                    break;
                case "saswp-strong-testimonials-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-strong-testimonials").val(1) : s("#saswp-strong-testimonials").val(0);
                    break;
                case "saswp-wordlift-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wordlift").val(1) : s("#saswp-wordlift").val(0);
                    break;
                case "saswp-betteramp-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-betteramp").val(1) : s("#saswp-betteramp").val(0);
                    break;
                case "saswp-wpamp-checkbox":
                    saswp_compatibliy_notes(e, a), s(this).is(":checked") ? s("#saswp-wpamp").val(1) : s("#saswp-wpamp").val(0)
            }
        }).change(), s("#saswp_kb_type").change(function() {
            var a = s(this).val();
            s(".saswp_org_fields, .saswp_person_fields").parent().parent().addClass("saswp_hide"), s(".saswp_kg_logo").parent().parent().parent().addClass("saswp_hide"), s("#sd-person-image").parent().parent().parent().addClass("saswp_hide"), "Organization" == a && (s(".saswp_org_fields").parent().parent().removeClass("saswp_hide"), s(".saswp_person_fields").parent().parent().addClass("saswp_hide"), s(".saswp_kg_logo").parent().parent().parent().removeClass("saswp_hide"), s("#sd-person-image").parent().parent().parent().addClass("saswp_hide")), "Person" == a && (s(".saswp_org_fields").parent().parent().addClass("saswp_hide"), s(".saswp_person_fields").parent().parent().removeClass("saswp_hide"), s(".saswp_kg_logo").parent().parent().parent().removeClass("saswp_hide"), s("#sd-person-image").parent().parent().parent().removeClass("saswp_hide"))
        }).change(), s(document).on("click", "input[data-id=media]", function(a) {
            a.preventDefault();
            var e = s(this),
                t = e.attr("id").replace("_button", ""),
                i = wp.media({
                    title: "Application Icon",
                    button: {
                        text: "Select Icon"
                    },
                    multiple: !1,
                    library: {
                        type: "image"
                    }
                }).on("select", function() {
                    var a = i.state().get("selection").first().toJSON();
                    s("#" + t).val(a.url), s("input[data-id='" + t + "_id']").val(a.id), s("input[data-id='" + t + "_height']").val(a.height), s("input[data-id='" + t + "_width']").val(a.width), s("input[data-id='" + t + "_thumbnail']").val(a.url), "sd_default_image_button" === e.attr("id") && (s("#sd_default_image_width").val(a.width), s("#sd_default_image_height").val(a.height));
                    var c = "";
                    "saswp_image_div_" + t == "saswp_image_div_sd_default_image" && a.height < 1200 && (c = '<p class="saswp_warning">Image size is smaller than recommended size</p>'), s(".saswp_image_div_" + t).html('<div class="saswp_image_thumbnail"><img class="saswp_image_prev" src="' + a.url + '"/><a data-id="' + t + '" href="#" class="saswp_prev_close">X</a></div>' + c)
                }).open()
        }), s(document).on("click", ".saswp_prev_close", function(a) {
            a.preventDefault();
            var e = s(this).attr("data-id");
            s(this).parent().remove(), s("#" + e).val(""), s("input[data-id='" + e + "_id']").val(""), s("input[data-id='" + e + "_height']").val(""), s("input[data-id='" + e + "_width']").val(""), s("input[data-id='" + e + "_thumbnail']").val(""), "sd_default_image" === e && (s("#sd_default_image_width").val(""), s("#sd_default_image_height").val(""))
        }), s(document).on("click", ".saswp-modify-schema", function(a) {
            a.preventDefault();
            var e = s(this).attr("schema-id"),
                t = s(this);
            t.addClass("updating-message"), s.get(ajaxurl, {
                action: "saswp_modify_schema_post_enable",
                tag_ID: saswp_localize_data.tag_ID,
                schema_id: e,
                post_id: saswp_localize_data.post_id,
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            }, function(a) {
                s(".saswp-post-specific-wrapper[data-id=" + e + "] .saswp-post-specific-setting").after(a), s(".saswp_modify_this_schema_hidden_" + e).val(1), s(".saswp-ps-toggle[schema-id=" + e + "]").removeClass("saswp_hide"), s(".saswp-restore-schema[schema-id=" + e + "]").parent().removeClass("saswp_hide"), s(".saswp-modify-schema[schema-id=" + e + "]").parent().addClass("saswp_hide"), t.removeClass("updating-message"), saswp_schema_datepicker(), saswp_schema_timepicker(), saswp_enable_rating_review(), saswp_item_reviewed_call()
            })
        }), s(document).on("click", ".saswp-restore-schema", function(a) {
            a.preventDefault();
            var e = s(this).attr("schema-id"),
                t = s(this);
            t.addClass("updating-message"), s.post(ajaxurl, {
                action: "saswp_modify_schema_post_restore",
                tag_ID: saswp_localize_data.tag_ID,
                schema_id: e,
                post_id: saswp_localize_data.post_id,
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            }, function(a) {
                t.removeClass("updating-message"), "t" == a.status ? (s(".saswp_modify_this_schema_hidden_" + e).val(0), s(".saswp-restore-schema[schema-id=" + e + "]").parent().addClass("saswp_hide"), s(".saswp-modify-schema[schema-id=" + e + "]").parent().removeClass("saswp_hide"), s(".saswp-ps-toggle[schema-id=" + e + "]").remove()) : alert("Something went wrong")
            }, "json")
        }), s(document).on("change", ".saswp-schema-type-toggle", function(a) {
            var e = s(this).attr("data-schema-id"),
                t = s(this).attr("data-post-id"),
                i = s(".saswp_modify_this_schema_hidden_" + e).val();
            if (s(this).is(":checked")) {
                var c = 0;
                s(".saswp-ps-toggle[schema-id=" + e + "]").addClass("saswp_hide"), s(".saswp-restore-schema[schema-id=" + e + "]").parent().addClass("saswp_hide"), s(".saswp-modify-schema[schema-id=" + e + "]").parent().addClass("saswp_hide"), s("#saswp_custom_schema_field[schema-id=" + e + "]").parent().addClass("saswp_hide")
            } else s("#saswp_custom_schema_field[schema-id=" + e + "]").parent().removeClass("saswp_hide"), 1 == i ? (s(".saswp-ps-toggle[schema-id=" + e + "]").removeClass("saswp_hide"), s(".saswp-restore-schema[schema-id=" + e + "]").parent().removeClass("saswp_hide")) : (s(".saswp-modify-schema[schema-id=" + e + "]").parent().removeClass("saswp_hide"), s(".saswp-ps-toggle[schema-id=" + e + "]").addClass("saswp_hide"), s(".saswp-restore-schema[schema-id=" + e + "]").parent().addClass("saswp_hide")), c = 1;
            s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_enable_disable_schema_on_post",
                    status: c,
                    schema_id: e,
                    post_id: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {},
                error: function(s) {
                    console.log(s)
                }
            })
        }), s(document).on("click", ".saswp-reset-data", function(a) {
            a.preventDefault(), 1 == confirm("Are you sure?") && s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_reset_all_settings",
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    setTimeout(function() {
                        location.reload()
                    }, 1e3)
                },
                error: function(s) {
                    console.log(s)
                }
            })
        }), s(document).on("click", ".saswp_license_activation", function(a) {
            a.preventDefault();
            var e = s(this);
            e.addClass("updating-message");
            var t = s(this).attr("license-status"),
                i = s(this).attr("add-on"),
                c = s("#" + i + "_addon_license_key").val();
            t && i && c ? s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_license_status_check",
                    license_key: c,
                    license_status: t,
                    add_on: i,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(a) {
                    if ("active" == a.status && location.reload(), "deactivated" == a.status && location.reload()) {
                        var t = "enter_key_" + i;
                        document.getElementById(t).innerHTML = "Plugin activated successfully"
                    }
                    s("#" + i + "_addon_license_key_status").val(a.status), "active" == a.status ? (s(".saswp-" + i + "-dashicons").addClass("dashicons-yes"), s(".saswp-" + i + "-dashicons").removeClass("dashicons-no-alt"), s(".saswp-" + i + "-dashicons").css("color", "green"), s(".saswp_license_activation[add-on='" + i + "']").attr("license-status", "inactive"), s(".saswp_license_activation[add-on='" + i + "']").text("Deactivate"), s(".saswp_license_status_msg[add-on='" + i + "']").text("Activated"), s(".saswp_license_status_msg[add-on='" + i + "']").css("color", "green"), s(".saswp_license_status_msg[add-on='" + i + "']").text(a.message)) : (s(".saswp-" + i + "-dashicons").addClass("dashicons-no-alt"), s(".saswp-" + i + "-dashicons").removeClass("dashicons-yes"), s(".saswp-" + i + "-dashicons").css("color", "red"), s(".saswp_license_activation[add-on='" + i + "']").attr("license-status", "active"), s(".saswp_license_activation[add-on='" + i + "']").text("Activate"), s(".saswp_license_status_msg[add-on='" + i + "']").css("color", "red"), s(".saswp_license_status_msg[add-on='" + i + "']").text(a.message)), e.removeClass("updating-message")
                },
                error: function(s) {
                    console.log(s)
                }
            }) : (alert("Please enter value license key"), e.removeClass("updating-message"))
        }), i = document.getElementById("activated-plugins-days_remaining")) var c = i.getAttribute("days_remaining");
    if (c >= 0 && c <= 7 && setTimeout(function() {
            s("#refresh_license_icon_top-").trigger("click")
        }, 0), s(document).on("click", "#refresh_license_icon_top-", function(a) {
            document.getElementById("refresh_license_icon_top").classList.add("spin"), s(this);
            var e = s(this).attr("licensestatusinternal"),
                t = s(this).attr("add-on"),
                i = s(this).attr("data-attr");
            s(this).attr("add-onname"), e && t && i && (s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_license_status_check",
                    license_key: i,
                    license_status: e,
                    add_on: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(a) {
                    if (s("#" + t + "_addon_license_key_status").val(a.status), document.getElementById("refresh_license_icon_top").classList.remove("spin"), "active" == a.status)
                        if (remaining_days = a.days_remaining, remaining_days >= 0 && remaining_days <= 7) s("span.saswp-addon-alert").text("expiring in " + remaining_days + " days ");
                        else {
                            s("span.saswp-addon-alert").text("Active");
                            var e = document.getElementsByClassName("saswp-addon-alert");
                            e[0] && (e[0].style.color = "green");
                            var i = document.getElementsByClassName("renewal-license");
                            i[0] && (i[0].style.display = "none"), document.getElementById("refresh_license_icon_top")
                        }
                },
                error: function(s) {
                    console.log(s)
                }
            }), jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_license_transient",
                    license_key: i,
                    license_status: e,
                    add_on: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    JSON.parse(s)
                }
            }))
        }), i = document.getElementById("activated-plugins-days_remaining")) c = i.getAttribute("days_remaining");
    if (setTimeout(function() {
            s("#refresh_expired_addon-").trigger("click")
        }, 0), s(document).on("click", "#refresh_expired_addon-", function(a) {
            document.getElementById("refresh_expired_addon").classList.add("spin"), s(this);
            var e = s(this).attr("licensestatusinternal"),
                t = s(this).attr("add-on"),
                i = s(this).attr("data-attr");
            s(this).attr("add-onname"), e && t && i && (s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_license_status_check",
                    license_key: i,
                    license_status: e,
                    add_on: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(a) {
                    s("#" + t + "_addon_license_key_status").val(a.status), document.getElementById("refresh_expired_addon").classList.remove("spin"), "active" == a.status && (remaining_days = a.days_remaining, remaining_days < 0 ? s("span#exp").text("Expired") : remaining_days > 7 && (s("span.inner_span").text(""), s("span.saswp_addon_inactive").text(""), s("span.expiredinner_span").text("Your License is Active"), s("span.expiredinner_span").css("color", "green"), s(".renewal-license").css("display", "none"), s(".saswp_addon_icon").css("display", "none")))
                },
                error: function(s) {
                    console.log(s)
                }
            }), jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_expired_license_transient",
                    license_key: i,
                    license_status: e,
                    add_on: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    JSON.parse(s)
                }
            }))
        }), i = document.getElementById("activated-plugins-days_remaining")) c = i.getAttribute("days_remaining");
    s(document).on("click", "#user_refresh_expired_addon-", function(a) {
        document.getElementById("user_refresh_expired_addon").classList.add("spin"), s(this);
        var e = s(this).attr("licensestatusinternal"),
            t = s(this).attr("add-on"),
            i = s(this).attr("data-attr");
        e && t && i && s.ajax({
            type: "POST",
            url: ajaxurl,
            dataType: "json",
            data: {
                action: "saswp_license_status_check",
                license_key: i,
                license_status: e,
                add_on: t,
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            },
            success: function(a) {
                s("#" + t + "_addon_license_key_status").val(a.status), document.getElementById("user_refresh_expired_addon").classList.remove("spin"), "active" == a.status && (remaining_days = a.days_remaining, remaining_days < 0 ? (s("span#exp").text("Expired"), location.reload()) : remaining_days > 7 && (s("span.inner_span").text(""), s("span.saswp_addon_inactive").text(""), s("span.expiredinner_span").text("Your License is Active"), s("span.expiredinner_span").css("color", "green"), s(".renewal-license").css("display", "none"), s(".saswp_addon_icon").css("display", "none")))
            },
            error: function(s) {
                console.log(s)
            }
        })
    }), s(".saswp-send-query").on("click", function(a) {
        a.preventDefault();
        var e = s("#saswp_query_message").val(),
            t = s("#saswp_query_email").val(),
            i = s("#saswp_query_premium_cus").val();
        "" != s.trim(e) && i && "" != s.trim(t) && 1 == saswpIsEmail(t) ? s.ajax({
            type: "POST",
            url: ajaxurl,
            dataType: "json",
            data: {
                action: "saswp_send_query_message",
                premium_cus: i,
                message: e,
                email: t,
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            },
            success: function(a) {
                "t" == a.status ? (s(".saswp-query-success").show(), s(".saswp-query-error").hide()) : (s(".saswp-query-success").hide(), s(".saswp-query-error").show())
            },
            error: function(s) {
                console.log(s)
            }
        }) : "" == s.trim(e) && "" == i && "" == s.trim(t) ? alert("Please enter the message, email and select customer type") : ("" == i && alert("Select Customer type"), "" == s.trim(e) && alert("Please enter the message"), "" == s.trim(t) && alert("Please enter the email"), 0 == saswpIsEmail(t) && alert("Please enter a valid email"))
    }), s(".saswp-import-plugins").on("click", function(a) {
        a.preventDefault();
        var e = s(this);
        e.addClass("updating-message");
        var t = s(this).attr("data-id");
        s.get(ajaxurl, {
            action: "saswp_import_plugin_data",
            plugin_name: t,
            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
        }, function(a) {
            "t" == a.status ? (s(e).parent().find(".saswp-imported-message").text(a.message), s(e).parent().find(".saswp-imported-message").removeClass("saswp-error"), setTimeout(function() {
                location.reload()
            }, 2e3)) : (s(e).parent().find(".saswp-imported-message").addClass("saswp-error"), s(e).parent().find(".saswp-imported-message").text(a.message)), e.removeClass("updating-message")
        }, "json")
    }), s(".saswp-feedback-no-thanks").on("click", function(a) {
        a.preventDefault(), s.get(ajaxurl, {
            action: "saswp_feeback_no_thanks",
            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
        }, function(a) {
            "t" == a.status && s(".saswp-feedback-notice").hide()
        }, "json")
    }), s(".saswp-feedback-remindme").on("click", function(a) {
        a.preventDefault(), s.get(ajaxurl, {
            action: "saswp_feeback_remindme",
            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
        }, function(a) {
            "t" == a.status && s(".saswp-feedback-notice").hide()
        }, "json")
    }), s(document).on("change", ".saswp-local-business-type-select", function(a) {
        a.preventDefault();
        var e = s(this),
            t = s(this).val();
        s.get(ajaxurl, {
            action: "saswp_get_sub_business_ajax",
            business_type: t,
            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
        }, function(a) {
            if ("t" == a.status) {
                s(".saswp-local-business-name-select").parents("tr").remove();
                var t = e.parents(".saswp-post-specific-wrapper").attr("data-id"),
                    i = '<tr><th><label for="saswp_business_name_' + t + '">Sub Business Type</label></th>';
                i += '<td><select class="saswp-local-business-name-select" id="saswp_business_name_' + t + '" name="saswp_business_name_' + t + '">', s.each(a.result, function(s, a) {
                    i += '<option value="' + s + '">' + a + "</option>"
                }), i += "</select></td>", i += "</tr>", e.parents(".form-table tr:first").after(i)
            } else s(".saswp-local-business-name-select").parents("tr").remove()
        }, "json")
    }), saswp_item_reviewed_call(), jQuery(".saswp-local-schema-time-picker").timepicker({
        timeFormat: "H:i:s"
    }), s(document).on("click", ".saswp-add-custom-schema", function(a) {
        a.preventDefault(), s(".saswp-add-custom-schema-field").removeClass("saswp_hide"), s(this).hide()
    }), s(document).on("click", ".saswp-delete-custom-schema", function(a) {
        a.preventDefault(), s("#saswp_custom_schema_field").val(""), s(".saswp-add-custom-schema-field").addClass("saswp_hide"), s(".saswp-add-custom-schema").show()
    }), saswp_schema_datepicker(), saswp_schema_timepicker(), saswp_reviews_datepicker(), s(document).on("click", ".saswp-add-more-item", function(a) {
        a.preventDefault(), s(".saswp-review-item-list-table").append('<tr class="saswp-review-item-tr"><td>Review Item Feature</td><td><input type="text" name="saswp-review-item-feature[]"></td><td>Rating</td><td><input step="0.1" min="0" max="5" type="number" name="saswp-review-item-star-rating[]"></td><td><a type="button" class="saswp-remove-review-item button">x</a></td></tr>')
    }), s(document).on("click", ".saswp-remove-review-item", function(a) {
        a.preventDefault(), s(this).parent().parent("tr").remove()
    }), s(document).on("focusout", ".saswp-review-item-tr input[type=number]", function(a) {
        a.preventDefault();
        var e = 0,
            t = s(".saswp-review-item-tr input[type=number]").length;
        s(".saswp-review-item-tr input[type=number]").each(function(a, t) {
            "" == s(t).val() ? e += parseFloat(0) : e += parseFloat(s(t).val())
        });
        var i = e / t;
        s("#saswp-review-item-over-all").val(i)
    }), s("#saswp-review-location").change(function() {
        var a = s(this).val();
        s(".saswp-review-shortcode").addClass("saswp_hide"), 3 == a && s(".saswp-review-shortcode").removeClass("saswp_hide")
    }).change(), s("#saswp-review-item-enable").change(function() {
        s(this).is(":checked") ? s(".saswp-review-fields").show() : s(".saswp-review-fields").hide()
    }).change(), s(document).on("click", ".saswp-restore-post-schema", function(a) {
        a.preventDefault();
        var e = s(this);
        if (e.addClass("updating-message"), s(".saswp-post-specific-schema-ids").val()) var t = JSON.parse(s(".saswp-post-specific-schema-ids").val());
        s.post(ajaxurl, {
            action: "saswp_restore_schema",
            schema_ids: t,
            post_id: saswp_localize_data.post_id,
            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
        }, function(s) {
            "t" == s.status ? setTimeout(function() {
                location.reload()
            }, 1e3) : (alert(s.msg), setTimeout(function() {
                location.reload()
            }, 1e3)), e.removeClass("updating-message")
        }, "json")
    }), s(document).on("click", "div.saswp-tab ul.saswp-tab-nav a", function(a) {
        a.preventDefault();
        var e = s(this).attr("data-id");
        s(".saswp-post-specific-wrapper").hide(), s("#" + e).show(), s("div.saswp-tab ul.saswp-tab-nav a").removeClass("selected"), s("div.saswp-tab ul.saswp-tab-nav li").removeClass("selected"), s(this).addClass("selected"), s(this).parent().addClass("selected"), saswp_enable_rating_review()
    }), s("#saswp-global-tabs a:first").addClass("saswp-global-selected"), s(".saswp-global-container").hide();
    var p = window.location.hash;
    if ("#saswp-default-container" == p ? s(".saswp-global-container:eq(2)").show() : "#saswp-knowledge-container" == p ? s(".saswp-global-container:eq(1)").show() : s(".saswp-global-container:first").show(), s("#saswp-global-tabs a").click(function() {
            var a = s(this).attr("data-id");
            s(this).hasClass("saswp-global-selected") || (s("#saswp-global-tabs a").removeClass("saswp-global-selected"), s(this).addClass("saswp-global-selected"), s(".saswp-global-container").hide(), s("#" + a).show())
        }), s("#saswp-review-tabs a:first").addClass("saswp-global-selected"), s(".saswp-review-container").hide(), s(".saswp-review-container:first").show(), s("#saswp-review-tabs a").click(function() {
            var a = s(this).attr("data-id");
            s(this).hasClass("saswp-global-selected") || (s("#saswp-review-tabs a").removeClass("saswp-global-selected"), s(this).addClass("saswp-global-selected"), s(".saswp-review-container").hide(), s("#" + a).show())
        }), s("#saswp-compatibility-tabs a:first").addClass("saswp-global-selected"), s(".saswp-compatibility-container").hide(), s(".saswp-compatibility-container:first").show(), s("#saswp-compatibility-tabs a").click(function() {
            var a = s(this).attr("data-id");
            s(this).hasClass("saswp-global-selected") || (s("#saswp-compatibility-tabs a").removeClass("saswp-global-selected"), s(this).addClass("saswp-global-selected"), s(".saswp-compatibility-container").hide(), s("#" + a).show())
        }), s('a[href="' + saswp_localize_data.new_url_selector + '"]').attr("href", saswp_localize_data.new_url_href), s(".saswp-enable-modify-schema-output").on("change", function() {
            s(".saswp-static-container").addClass("saswp_hide"), s(".saswp-dynamic-container").addClass("saswp_hide"), "manual" == s(this).val() && (s(".saswp-static-container").removeClass("saswp_hide"), s(".saswp-dynamic-container").addClass("saswp_hide")), "automatic" == s(this).val() && (s(".saswp-static-container").addClass("saswp_hide"), s(".saswp-dynamic-container").removeClass("saswp_hide"))
        }), s(document).on("change", ".saswp-custom-fields-name", function() {
            var a = "text",
                e = s(this).parent().parent("tr"),
                t = s(this).val(); - 1 == t.indexOf("_image") && -1 == t.indexOf("_logo") || (a = "image");
            var i = s(this).parent().parent("tr").find("td:eq(1)");
            saswp_get_meta_list(null, a, null, i, t, e)
        }), s(document).on("click", ".saswp-skip-button", function(a) {
            a.preventDefault(), s(this).parent().parent().hide(), s.post(ajaxurl, {
                action: "saswp_skip_wizard",
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            }, function(s) {}, "json")
        }), s(document).on("click", ".saswp_add_schema_fields_on_fly", function(a) {
            a.preventDefault();
            var e = s(this);
            e.addClass("updating-message");
            var t = s(this).attr("data-id"),
                i = s(this).attr("fields_type"),
                c = s(this).attr("div_type"),
                p = s(this).attr("itemlist_sub_type"),
                o = s("saswp_specific_" + t + " , .saswp-" + c + "-table-div").length,
                n = s("saswp_specific_" + t + " , .saswp-" + c + "-table-div:nth-child(" + o + ")").attr("data-id");
            (n = ++n) || (n = 0), saswp_get_post_specific_schema_fields(e, n, i, c, t, i + "_", p)
        }), s(document).on("click", ".saswp-table-close", function() {
            s(this).parent().remove()
        }), s(document).on("click", ".saswp-rmv-modify_row", function(a) {
            a.preventDefault(), s(this).parent().parent().remove()
        }), s(document).on("change", ".saswp-custom-meta-list", function() {
            var a = s(this),
                e = s("select#schema_type option:selected").val(),
                t = s(this).val(),
                i = s(this).parent().parent("tr").find(".saswp-custom-fields-name").val(),
                c = "",
                p = e.toLowerCase() + "_" + i,
                o = "saswp_fixed_image[" + i + "]";
            "manual_text" == t ? (c += '<td><input type="text" name="saswp_fixed_text[' + i + ']"></td>', c += '<td><a class="button button-default saswp-rmv-modify_row">X</a></td>', s(this).parent().parent("tr").find("td:gt(1)").remove(), s(this).parent().parent("tr").append(c), saswpCustomSelect2()) : "taxonomy_term" == t ? saswp_taxonomy_term.taxonomy ? (c += saswp_taxonomy_term_html(saswp_taxonomy_term.taxonomy, i), a.parent().parent("tr").find("td:gt(1)").remove(), a.parent().parent("tr").append(c), saswpCustomSelect2()) : s.get(ajaxurl, {
                action: "saswp_get_taxonomy_term_list",
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            }, function(s) {
                s && (saswp_taxonomy_term.taxonomy = s, c += saswp_taxonomy_term_html(s, i), a.parent().parent("tr").find("td:gt(1)").remove(), a.parent().parent("tr").append(c), saswpCustomSelect2())
            }, "json") : "custom_field" == t ? (c += '<td><select class="saswp-custom-fields-select2" name="saswp_custom_meta_field[' + i + ']">', c += "</select></td>", c += '<td><a class="button button-default saswp-rmv-modify_row">X</a></td>', s(this).parent().parent("tr").find("td:gt(1)").remove(), s(this).parent().parent("tr").append(c), saswpCustomSelect2()) : "fixed_image" == t ? (c += "<td>", c += "<fieldset>", c += '<input data-id="media" style="width: 30%;" class="button" id="' + p + '_button" name="' + p + '_button" type="button" value="Upload" />', c += '<input type="hidden" data-id="' + p + '_height" class="upload-height" name="' + o + '[height]" id="' + p + '_height" value="">', c += '<input type="hidden" data-id="' + p + '_width" class="upload-width" name="' + o + '[width]" id="' + p + '_width" value="">', c += '<input type="hidden" data-id="' + p + '_thumbnail" class="upload-thumbnail" name="' + o + '[thumbnail]" id="' + p + '_thumbnail" value="">', c += '<div class="saswp_image_div_' + p + '">', c += "</div>", c += "</fieldset>", c += "</td>", c += '<td><a class="button button-default saswp-rmv-modify_row">X</a></td>', s(this).parent().parent("tr").find("td:gt(1)").remove(), s(this).parent().parent("tr").append(c), saswpCustomSelect2()) : (c += "<td></td>", c += '<td><a class="button button-default saswp-rmv-modify_row">X</a></td>', s(this).parent().parent("tr").find("td:gt(1)").remove(), s(this).parent().parent("tr").append(c), saswpCustomSelect2())
        }), s(document).on("change", ".saswp-item-reivewed-list", function() {
            s(".saswp-custom-fields-table").html(""), saswp_meta_list_fields = [];
            var a = s(this),
                e = s("select#schema_type option:selected").val();
            saswp_item_reviewed_ajax(e, a, "manual")
        }), s(document).on("click", ".saswp-add-custom-fields", function() {
            var a = s(this);
            a.addClass("updating-message");
            var e = s("select#schema_type option:selected").val(),
                t = "",
                i = null;
            "Review" == e && (t = s("select.saswp-item-reivewed-list option:selected").val(), i = "saswp_review_name");
            var c = s("#post_ID").val();
            "" != e && (saswp_meta_list_fields[e] ? saswp_get_meta_list(a, "text", saswp_meta_list_fields[e], null, i, null) : s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_get_schema_type_fields",
                    post_id: c,
                    schema_type: e,
                    schema_subtype: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    saswp_meta_list_fields[e] = s, saswp_get_meta_list(a, "text", saswp_meta_list_fields[e], null, i, null)
                },
                error: function(s) {
                    console.log(s)
                }
            }))
        }), saswpCustomSelect2(), saswp_enable_rating_review(), s('a[href="' + saswp_localize_data.collection_post_add_url + '"]').attr("href", saswp_localize_data.collection_post_add_new_url), s(document).on("click", ".saswp_coonect_google_place", function() {
            var a = s("#saswp_google_place_id").val(),
                e = s("#saswp_language_list").val(),
                t = s("#saswp_googel_api").val();
            "" != a && s.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: "json",
                data: {
                    action: "saswp_connect_google_place",
                    place_id: a,
                    language: e,
                    google_api: t,
                    saswp_security_nonce: saswp_localize_data.saswp_security_nonce
                },
                success: function(s) {
                    console.log(s.status)
                },
                error: function(s) {
                    console.log(s)
                }
            })
        }), s(document).on("click", ".saswp-add-social-links", function() {
            s(".saswp-social-links-table").append('<tr><td><input type="text" placeholder="https://www.facebook.com/profile" name="sd_data[saswp_social_links][]" value=""></td><td><a class="button button-default saswp-rmv-modify_row">X</a></td></tr>')
        }), s(document).on("click", ".saswp-show-accept-rv-popup", function() {
            tb_show("Reviews Form", "#TB_inline??width=600&height=400&inlineId=saswp-accept-reviews-popup"), s(document).find("#TB_window").width(600).height(400).css({
                top: "100px",
                "margin-top": "0px"
            })
        }), ("saswp_reviews" == saswp_localize_data.post_type || "saswp-collections" == saswp_localize_data.post_type) && "edit.php" == saswp_localize_data.page_now) {
        var o = '<div class="saswp-custom-post-tab">';
        o += '<div style="display:none;" id="saswp-accept-reviews-popup">', o += '<div class="saswp-accept-rv-container">', o += "<p>Use Below shortcode to show reviews form in your website. Using this you can accept reviews from your website directly</p>", o += '<div class="saswp-show-form-on-tab"><strong>Simple Form</strong> <input value="[saswp-reviews-form]" type="text" readonly></div>', o += '<div class="saswp-show-form-on-tab"><strong>Show form on button tap</strong> <input value="[saswp-reviews-form onbutton=&quot;1&quot;]" type="text" readonly></div>', o += '<p><strong>Note:</strong> To enable google reCAPTCHA v2 add SITE KEY & SECRET KEY respectively as parameters in above shortcode. Eg <input value="[saswp-reviews-form site_key=&quot;your key&quot; secret_key=&quot;your key&quot;]" type="text" readonly>. To get keys <a target="_blank" href="https://www.google.com/recaptcha/admin/create">Click here.</a> You must choose reCAPTCHA type v2 </p>', o += "</div>", o += "</div>", o += '<h2 class="nav-tab-wrapper">', o += "<a href=" + saswp_localize_data.reviews_page_url + ' class="nav-tab ' + (saswp_localize_data.current_url == saswp_localize_data.reviews_page_url ? "saswp-global-selected" : "") + '">Reviews</a>', o += "<a href=" + saswp_localize_data.collections_page_url + ' class="nav-tab ' + (saswp_localize_data.current_url == saswp_localize_data.collections_page_url ? "saswp-global-selected" : "") + '">Collections</a>', o += '<a class="nav-tab saswp-show-accept-rv-popup">Accept Reviews</a>', o += "</h2>", o += "</div>", jQuery(jQuery(".wrap")).prepend(o)
    }
    jQuery(document).on("click", ".saswp-clear-images", function(a) {
        a.preventDefault();
        var e = s(this);
        1 == confirm("Are you sure? It will remove all the resized images") && (e.addClass("updating-message"), s.ajax({
            type: "POST",
            url: ajaxurl,
            dataType: "json",
            data: {
                action: "saswp_clear_resized_image_folder",
                saswp_security_nonce: saswp_localize_data.saswp_security_nonce
            },
            success: function(s) {
                e.removeClass("updating-message"), "t" != s.status && alert("something went wrong")
            },
            error: function(s) {
                console.log(s)
            }
        }))
    }), "saswp" == saswp_localize_data.post_type && "edit.php" == saswp_localize_data.page_now && jQuery(jQuery(".wrap a")[0]).after("<a href='" + saswp_localize_data.saswp_settings_url + "' id='' class='page-title-action'>Settings</a>"), "undefined" != typeof saswp_reviews_data && s(".saswp-rating-div").rateYo({
        spacing: "5px",
        rtl: saswp_localize_data.is_rtl,
        rating: saswp_reviews_data.rating_val,
        readOnly: saswp_reviews_data.readonly,
        onSet: function(a, e) {
            s(this).next().next().val(a)
        }
    }).on("rateyo.change", function(a, e) {
        var t = e.rating;
        s(this).next().text(t)
    }), s("#sd-person-phone-number, #saswp_kb_telephone").focusout(function() {
        var a = s(this);
        a.parent().find(".saswp-phone-validation").remove();
        var e = s(this).val();
        /^\+([0-9]{1,3})\)?[-. ]?([0-9]{2,4})[-. ]?([0-9]{2,4})[-. ]?([0-9]{2,4})$/.test(e) ? a.parent().find(".saswp-phone-validation").remove() : a.after('<span style="color:red;" class="saswp-phone-validation">Invalid Phone Number</span>')
    }), saswpCollectionSlider(), s(document).on("click", ".saswp-add-rv-btn", function() {
        s(".saswp-dynamic-platforms").toggle()
    }), s(".saswp-rmv-coll-rv").on("click", function() {
        if (rmv_boolean = !rmv_boolean, saswp_on_collection_design_change(), jQuery(jQuery(".saswp-add-dynamic-section")).remove(), rmv_boolean) {
            var s = "";
            s += '<div class="saswp-add-dynamic-section">', s += '<div class="saswp-add-dynamic-btn">', s += '<span class="dashicons dashicons-plus-alt saswp-add-rv-btn"></span>', s += "</div>", s += '<div class="saswp-dynamic-platforms" style="display:none;">', s += '<select name="saswp_dynamic_platforms" id="saswp_dynamic_platforms"><option value="">Choose Platform</option>' + jQuery("#saswp-plaftorm-list").html() + "</select>", s += "</div>", s += "</div>", jQuery(jQuery(".saswp-collection-preview")[0]).after(s)
        }
    }), s(document).on("change", "#saswp_dynamic_platforms", function() {
        var a = s(this).val();
        a && jQuery.get(ajaxurl, {
            action: "saswp_add_to_collection",
            rvcount: "",
            platform_id: a,
            saswp_security_nonce: saswp_localize_data.saswp_security_nonce
        }, function(a) {
            if (a.status && a.message) {
                var e = "";
                if (s.each(a.message, function(s, a) {
                        e += '<option value="' + a.saswp_review_id + '">' + a.saswp_reviewer_name + " ( " + a.saswp_review_rating + " ) </option>"
                    }), e) {
                    var t = "";
                    t += '<select id="saswp_dynamic_reviews_list" class="saswp-select2">', t += e, t += "</select>", t += '<a class="button button-default saswp-add-single-rv">Add</a>', s("#saswp_dynamic_platforms").nextAll().remove(), s("#saswp_dynamic_platforms").after(t), saswp_select2()
                }
            }
        }, "json")
    }), s(document).on("click", ".saswp-add-single-rv", function(a) {
        a.preventDefault();
        var e = s("#saswp_dynamic_reviews_list").val(),
            t = s("#saswp_dynamic_platforms").val();
        e && saswp_get_collection_data(null, t, null, e, !0)
    }), s(document).on("click", ".saswp-remove-coll-rv", function() {
        var a = s(this).attr("data-id"),
            e = s(this).attr("platform-id");
        if (e) {
            var t = saswp_collection[e].filter(function(s) {
                return s.saswp_review_id != a
            });
            saswp_collection[e] = t, saswp_on_collection_design_change()
        }
    }), s(document).on("click", ".saswp-grid-page", function(a) {
        a.preventDefault(), saswp_grid_page = s(this).attr("data-id"), saswp_on_collection_design_change()
    }), s("#saswp-coll-pagination").change(function() {
        saswp_grid_page = 1, s("#saswp-coll-per-page").parent().addClass("saswp_hide_imp"), s(this).is(":checked") && s("#saswp-coll-per-page").parent().removeClass("saswp_hide_imp"), saswp_on_collection_design_change()
    }), s(".saswp-accordion").click(function() {
        s(this).toggleClass("active"), s(this).next(".saswp-accordion-panel").slideToggle(200)
    }), s(document).on("click", ".saswp-opn-cls-btn", function() {
        s("#saswp-reviews-cntn").toggle(), s("#saswp-reviews-cntn").is(":visible") ? (s(".saswp-onclick-show").css("display", "flex"), s(".saswp-onclick-hide").hide(), s(".saswp-open-class").css("width", "500px")) : (s(".saswp-onclick-show").css("display", "none"), s(".saswp-onclick-hide").show(), s(".saswp-open-class").css("width", "300px"))
    }), s(".saswp-collection-display-method").change(function() {
        "shortcode" == s(this).val() ? s(".saswp-collection-shortcode").removeClass("saswp_hide") : s(".saswp-collection-shortcode").addClass("saswp_hide")
    }).change(), s(document).on("click", ".saswp-remove-platform", function(a) {
        a.preventDefault();
        var e = s(this).attr("platform-id");
        saswp_collection.splice(e, 1), s(this).parent().remove(), saswp_on_collection_design_change()
    }), s(".saswp-number-change").bind("keyup mouseup", function() {
        saswp_on_collection_design_change()
    }), s(".saswp-coll-settings-options").change(function() {
        saswp_grid_page = 1;
        var a = s(".saswp-collection-desing").val();
        s(".saswp-coll-options").addClass("saswp_hide"), s(".saswp-collection-lp").css("height", "auto"), s(".saswp-rmv-coll-rv").hide(), s(".saswp-add-dynamic-section").hide(), "grid" == a && (s(".saswp-grid-options").removeClass("saswp_hide"), s(".saswp-rmv-coll-rv").show(), s(".saswp-add-dynamic-section").show()), "gallery" == a && s(".saswp-slider-options").removeClass("saswp_hide"), "fomo" == a && (s(".saswp-fomo-options").removeClass("saswp_hide"), s(".saswp-collection-lp").css("height", "31px")), "popup" == a && s(".saswp-collection-lp").css("height", "31px"), saswp_on_collection_design_change()
    }).change(), s(".saswp-add-to-collection").on("click", function(a) {
        a.preventDefault();
        var e = s(this),
            t = s("#saswp-plaftorm-list").val(),
            i = s("#saswp-review-count").val();
        t && i > 0 ? (e.addClass("updating-message"), saswp_get_collection_data(i, t, e, null)) : alert("Enter Count")
    });
    var n, l, r = s("#saswp_total_reviews_list").val();
    r && saswp_get_collection_data(null, null, null, null, r), (n = document.createElement("div")).style.cssText = "position:absolute; background:black; color:white; padding:4px 6px;z-index:10000;border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);opacity:0;transition:opacity 0.3s", n.innerHTML = "Copied!", document.body.appendChild(n);
    var w = document.getElementById("saswp-motivatebox");
    w && w.addEventListener("mouseup", function(s) {
        var a = (s = s || event).target || s.srcElement;
        "motivate" == a.className && (function(s) {
            var a = document.createRange();
            a.selectNodeContents(s);
            var e = window.getSelection();
            e.removeAllRanges(), e.addRange(a)
        }(a), function() {
            var s;
            try {
                s = document.execCommand("copy")
            } catch (a) {
                s = !1
            }
            return s
        }() && function(s) {
            var a = s || event;
            clearTimeout(l), n.style.left = a.pageX - 10 + "px", n.style.top = a.pageY + 15 + "px", n.style.opacity = 1, l = setTimeout(function() {
                n.style.opacity = 0
            }, 500)
        }(s))
    }, !1)
});