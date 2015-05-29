
(function ($) {
    $.appStart = function(element, options) {
        // plugin's default options
        var defaults = {
            sidebar: {
                fixed: false,//fixed sidebar
                rememberToggle: false, //remember if sidebar is hided
                offCanvas: true //make sidebar offcanvas in tablet and small screens
            },
            sideNav: {
                toggleMode: true, //close previous open submenu before expand new
                hover: false, //shows subs on hover or click
                showArrows: true,//show arrow to indicate sub
                sideNavArrowIcon: 'fa-caret-down', //arrow icon for navigation
                subOpenSpeed: 300,//animation speed for open subs
                subCloseSpeed: 400,//animation speed for close subs
                animationEasing: 'linear',//animation easing
                absoluteUrl: false, //put true if use absolute path links. example http://www.host.com/dashboard instead of /dashboard
                subDir: '' //if you put template in sub dir you need to fill here. example '/html'
            },
            tooltips: true,
            backToTop: {
                active: true, //activate back to top
                scrolltime: 800, //scroll time speed
                imgsrc: 'Content/Images/backtop.png', //image 
                width: 48, //width of image
                place: 'bottom-right', //position top-left, top-right, bottom-right, bottom-left
                fadein: 500, //fadein speed
                fadeout: 500, // fadeOut speed
                opacity: 0.5, //opacity
                marginX: 1, //X margin
                marginY: 2 //Y margin
            }
        };

        // current instance of the object
        var plugin = this;

        // this will hold the merged default, and user-provided options
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element; // reference to the actual DOM element

        // the "constructor" method that gets called when the object is created
        plugin.init = function() {

            // the plugin's final properties are the merged default and 
            // user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            //respondjs handle responsive view
            this.respondjs();
            //activate storejs plugin
            this.storejs();
            //first impression
            this.firstImpression();
            this.toggleSidebar();
            //toggle right sidebar
            this.toggleFilterbar();
            //sidebar nav function
            this.sideBarNav();
            //set current class on nav
            this.setCurrentNav();
            //check if sidebar need to be toggled
            if (plugin.settings.sidebar.rememberToggle) {
                var breakpoint = plugin.getBreakPoint();
                if (store.get('sidebarToggle') == 1 && breakpoint == 'large' || store.get('sidebarToggle') == 1 && breakpoint == 'laptop') {
                    plugin.toggleLeftSidebar();
                    plugin.sideBarNavToggle();
                    plugin.collapseSideBarNav();
                }
            }
            
            //responsive sidebar button handle 
            this.resSidebarButton();

            //back to top
            if (plugin.settings.backToTop) {
                this.backToTop();
            }
        }

        //get breakpoint
        plugin.getBreakPoint = function() {
            var jRes = jRespond([
                {
                    label: 'phone',
                    enter: 0,
                    exit: 767
                }, {
                    label: 'tablet',
                    enter: 768,
                    exit: 979
                }, {
                    label: 'laptop',
                    enter: 980,
                    exit: 1366
                }, {
                    label: 'large',
                    enter: 1367,
                    exit: 10000
                }
            ]);

            return jRes.getBreakpoint();
        }

        // public methods

        //toggle sidebar
        plugin.toggleSidebar = function () {
            var toggleButton = $('.toggle-sidebar>a');
            var breakpoint = plugin.getBreakPoint();
            var sidebar = $(".page-sidebar");
            toggleButton.unbind().bind("click", function (e) {
                e.preventDefault();
                //sidebar 
                if (sidebar.hasClass('hide-sidebar')) {
                    plugin.showLeftSidebar();
                } else if (sidebar.hasClass('collapse-sidebar')) {
                    plugin.unToggleLeftSidebar();
                    plugin.collapseSideBarNav(true);
                } else {
                    if (breakpoint == "phone") {
                        plugin.hideLeftSidebar();
                    } else {

                        var subNavs = $('.side-nav> .nav').find('li>ul.sub');
                        $.each(subNavs, function (index, item) {
                            $(item).removeAttr('style');
                        });
                        plugin.toggleLeftSidebar();
                        plugin.collapseSideBarNav(false);
                    }

                }

                //remember toggle                
                if (sidebar.hasClass('collapse-sidebar')) {
                    store.set('sidebarToggle', 1);
                    plugin.sideBarNavToggle();
                } else {
                    store.set('sidebarToggle', 0);
                }

            });
        }

        //hide left sidebar
        plugin.hideLeftSidebar = function () {
            var breakpoint = plugin.getBreakPoint();
            $('.page-sidebar').addClass('hide-sidebar');
            $('.page-content').addClass('full-page');
            $('.page-content').removeClass('sidebar-page');
            if (breakpoint == 'phone' && !plugin.settings.sidebar.offCanvas) {
                $('.page-content').addClass('overLap');
            }
            if (breakpoint == 'phone' && plugin.settings.sidebar.offCanvas || breakpoint == 'tablet' && plugin.settings.sidebar.offCanvas) {
                $('.page-content').removeClass('offCanvas');
            }
        }

        //toggle left sidebar
        plugin.toggleLeftSidebar = function () {
            var breakpoint = plugin.getBreakPoint();
            $('#toggle-menu-anchor > i').removeClass('fa-minus-circle').addClass('fa-plus-circle');
            $('.page-sidebar').addClass('collapse-sidebar');
            $('.page-content').addClass('collapsed-sidebar');
            $('.page-content').removeClass('sidebar-page');
            if (breakpoint == 'tablet' && !plugin.settings.sidebar.offCanvas) {
                $('.page-content').removeClass('overLap');
            }
        }
        
        //untogle left sidebar
        plugin.unToggleLeftSidebar = function () {
            var breakpoint = plugin.getBreakPoint();
            $('#toggle-menu-anchor > i').removeClass('fa-plus-circle').addClass('fa-minus-circle');
            $('.page-sidebar').removeClass('collapse-sidebar');
            $('.page-content').removeClass('collapsed-sidebar');
            $('.page-content').addClass('sidebar-page');
            //if (breakpoint == 'tablet' && !plugin.settings.sidebar.offCanvas) {
            //    $('.page-content').addClass('overLap');
            //}
        }

        //showleft sidebar
        plugin.showLeftSidebar = function () {
            var breakpoint = plugin.getBreakPoint();
            $('.page-sidebar').removeClass('hide-sidebar');
            $('#toggle-menu-anchor > i').removeClass('fa-plus-circle').addClass('fa-minus-circle');
            $('.page-sidebar').removeClass('collapse-sidebar');
            $('.page-content').removeClass('full-page');
            if (breakpoint == 'large' || breakpoint == 'laptop' && !plugin.settings.sidebar.offCanvas) {
                $('.page-content').removeClass('overLap');
            }
            if (breakpoint == 'phone' && !plugin.settings.sidebar.offCanvas) {
                $('.page-content').addClass('overLap');
            }

            if (breakpoint == 'phone' && plugin.settings.sidebar.offCanvas || breakpoint == 'tablet' && plugin.settings.sidebar.offCanvas) {
                $('.page-content').addClass('offCanvas');
            }
            $('.page-content').removeClass('collapsed-sidebar');
            $('.page-content').addClass('sidebar-page');
        }

        //toggle right sidebar
        plugin.toggleFilterbar = function () {
            var toggleButton = $('#toggle-filter-bar');
            
            toggleButton.unbind().bind("click", function(e) {
                e.preventDefault();
                if ($('#filter-container').hasClass('hide-right-bar')) {
                    $('#toggle-filter-bar > i').removeClass('fa-outdent').addClass('fa-indent');
                    $('#body-container').removeClass('hide-right-bar','normal');
                    $('#filter-container').removeClass('hide-right-bar', 'normal');
                } else {
                    $('#toggle-filter-bar > i').removeClass('fa-indent').addClass('fa-outdent');
                    $('#body-container').addClass('hide-right-bar');
                    $('#filter-container').addClass('hide-right-bar');
                }
                
            });
        };
        
        //toggle left sidebar
        plugin.showHideFilterSidebar = function () {
            var breakpoint = plugin.getBreakPoint();
            if (breakpoint == 'large' || breakpoint == 'laptop' || breakpoint == 'tablet') {
                if ($('#body-container').hasClass('hide-right-bar')) {
                    $('#toggle-filter-bar > i').removeClass('fa-outdent').addClass('fa-indent');
                    $('#body-container').removeClass('hide-right-bar');
                    $('#filter-container').removeClass('hide-right-bar');
                }
            }
            else if (breakpoint == 'phone') {
                if (!$('#body-container').hasClass('hide-right-bar')) {
                    $('#toggle-filter-bar > i').removeClass('fa-indent').addClass('fa-outdent');
                    $('#body-container').addClass('hide-right-bar');
                    $('#filter-container').addClass('hide-right-bar');
                }
            }
        }

        plugin.sideBarNav = function () {
            //cache the elements
            var nav = $('.side-nav> .nav');
            var navCurrent = nav.find('li.current');
            var navLi = nav.find('li');
            var navLink = nav.find('a');
            var navSub = nav.find('li>ul.sub');
            //put hasSub class
            navSub.closest('li').addClass('hasSub');

            //put notExpand class
            if (!navSub.prev('a').hasClass('notExpand')) {
                navSub.prev('a').addClass('notExpand');
            }

            if (plugin.settings.sideNav.showArrows) {
                if (!$('side-Nav').hasClass('show-arrows')) {
                    $('side-Nav').addClass('show-arrows');
                }
                if (!navSub.prev('a').find('i.sideNav-arrow').length) {
                    navSub.prev('a').prepend('<i class="' + plugin.settings.sideNav.sideNavArrowIcon + ' sideNav-arrow"></i>');
                }
            }

            navLink.unbind().bind("click", function (e) {
                var _this = $(this);
                if (_this.hasClass('notExpand')) {
                    e.preventDefault();
                    //check if menu is collapsed
                    if (!$('.page-sidebar').hasClass('collapse-sidebar')) {
                        //check if is 3lv menu
                        if ($(this).closest('li').closest('ul').hasClass('show')) {
                            //expand ul and change class to expand
                            _this.next('ul').slideDown(plugin.settings.sideNav.subOpenSpeed, plugin.settings.sideNav.animationEasing);
                            _this.next('ul').addClass('show');
                            _this.addClass('expand').removeClass('notExpand');
                            navLi.removeClass('highlight-menu');
                            _this.closest('li.hasSub').addClass('highlight-menu');
                            _this.find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90');
                        } else {
                            //close all expanded subs
                            navexpand = nav.find('li.hasSub .expand');
                            navexpand.next('ul').removeClass('show');
                            navexpand.next('ul').slideUp(plugin.settings.sideNav.subCloseSpeed, plugin.settings.sideNav.animationEasing);
                            navexpand.addClass('notExpand').removeClass('expand');
                            navexpand.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
                            //expand ul and change class to expand
                            _this.next('ul').slideDown(plugin.settings.sideNav.subOpenSpeed, plugin.settings.sideNav.animationEasing);
                            _this.next('ul').addClass('show');
                            _this.addClass('expand').removeClass('notExpand');
                            navLi.removeClass('highlight-menu');
                            _this.closest('li.hasSub').addClass('highlight-menu');
                            _this.find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90');
                        }
                    }
                } else if (_this.hasClass('expand')) {
                    e.preventDefault();
                    //collapse ul and change class to notExpand
                    _this.next('ul').removeClass('show');
                    _this.next('ul').slideUp(plugin.settings.sideNav.subCloseSpeed, plugin.settings.sideNav.animationEasing);
                    _this.addClass('notExpand').removeClass('expand');
                    _this.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
                    navLi.removeClass('highlight-menu');
                }
            });
        }

        plugin.sideBarNavToggle = function () {
            var nav = $('.side-nav');
            var navLi = nav.find('li');
            if (Modernizr.touch) {
                navLi.unbind().bind('click', function () {
                    _this = $(this);
                    if (_this.hasClass('hover-li')) {
                        _this.removeClass('hover-li');
                    } else {
                        navLi.each(function (index) {
                            $(this).removeClass('hover-li');
                        });
                        _this.addClass('hover-li');
                    }
                });
            } else {
                navLi.hover(
                    function () {
                        //in 
                        $(this).addClass('hover-li');
                    },
                    function () {
                        //out 
                        $(this).removeClass('hover-li');
                    }
                );
            }

        }

        //set current nav element
        plugin.setCurrentNav = function () {
            var domain = document.domain;
            var navig = $('.side-nav> .nav');
            var navLinks = navig.find('a');
            if (domain === '') {
                //domain not found
                var pageUrl = window.location.pathname.split('/');
                var winLoc = pageUrl.pop(); // get last item
                this.setCurrentClass(navLinks, winLoc);

            } else {
                if (plugin.settings.sideNav.absoluteUrl) {
                    //absolute url is enabled
                    var newDomain = 'http://' + domain + window.location.pathname;
                    setCurrentClass(navLinks, newDomain);

                } else {
                    //absolute url is disabled
                    var afterDomain = window.location.pathname.split('/');
                    var afterDomain = afterDomain.pop();
                    if (plugin.settings.sideNav.subDir != '') {
                        var afterDomain = window.location.pathname + plugin.settings.sideNav.subDir;
                    }
                    this.setCurrentClass(navLinks, afterDomain);
                }
            }
        }

        plugin.setCurrentClass = function (mainNavLinkAll, url) {
            mainNavLinkAll.each(function (index) {
                //convert href to array and get last element
                var href = $(this).attr('href');
                if (href === url) {
                    //set new current class
                    $(this).addClass('active');

                    ulElem = $(this).closest('ul');
                    if (ulElem.hasClass('sub')) {
                        //its a part of sub menu need to expand this menu
                        //aElem = ulElem.prev('a.hasUl').addClass('drop');
                        ulElem.addClass('show').css('display', 'block');
                        var _this = $(this).closest('li.hasSub').children('a.notExpand');
                        _this.removeClass('notExpand').addClass('expand active-state');
                        _this.closest('li.hasSub').addClass('highlight-menu');

                        if (plugin.settings.sideNav.showArrows) {
                            _this.find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90');
                        }
                    }
                } else {
                    if (url == '') {
                        url = 'index.html';
                    }
                    if (href === url) {
                        $(this).addClass('active');
                    }
                }

            });
        }

        //responsive Sidebar button
        plugin.resSidebarButton = function () {
            var rsb = $('#showNav');
            rsb.unbind().bind('click', function () {
                if ($(this).hasClass('sidebar-showed')) {
                    plugin.hideLeftSidebar();
                    $(this).removeClass('sidebar-showed');
                } else {
                    plugin.showLeftSidebar();
                    $(this).addClass('sidebar-showed');
                }
            });
        }
        
        //expand all nav ul element
        plugin.expandSideBarNav = function() {
            nav = $('#sideNav');
            nava = nav.find('a.notExpand');
            nava.next('ul').slideDown(plugin.settings.sideNav.subOpenSpeed, plugin.settings.sideNav.animationEasing);
            nava.next('ul').addClass('show');
            nava.addClass('expand').removeClass('notExpand');
            if (plugin.settings.sideNav.showArrows) {
                nava.find('.sideNav-arrow').removeClass('rotate0').addClass('rotateM180');
            }
        };

        //collapse all nav ul elements except current
        plugin.collapseSideBarNav = function (state) {
            nav = $('#sideNav');
            if (state) {
                nava = nav.find('a.expand').not('a.active-state');
            } else {
                nava = nav.find('a.expand');
            }

            nava.next('ul').slideUp(plugin.settings.sideNav.subOpenSpeed, plugin.settings.sideNav.animationEasing);
            nava.next('ul').removeClass('show');
            if (!state) {
                setTimeout(function() {
                    nava.next('ul').removeAttr('style');
                }, plugin.settings.sideNav.subCloseSpeed);
            }
            nava.addClass('notExpand').removeClass('expand');
            if (plugin.settings.sideNav.showArrows) {
                nava.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
            }
        };
        


        plugin.responsiveTables = function () {
            var tables = $('#navigation-layout').find('table');
            $.each(tables, function (index, table) {
                if (!$(table).hasClass('table')) {
                    $(table).addClass('table');
                }
                if (!$(table).parent().hasClass('table-responsive')) {
                    $(table).parent().addClass('table-responsive');
                }
            });
        };
        
        plugin.nonResponsiveTables = function () {
            var tables = $('#navigation-layout').find('table');
            $.each(tables, function (index, table) {
                if ($(table).hasClass('table')) {
                    $(table).removeClass('table');
                }
                if ($(table).parent().hasClass('table-responsive')) {
                    $(table).parent().removeClass('table-responsive');
                }
            });
        };

        //respondjs plugin
        plugin.respondjs = function() {

            // call jRespond and add breakpoints
            var jRes = jRespond([
                {
                    label: 'phone',
                    enter: 0,
                    exit: 767
                }, {
                    label: 'tablet',
                    enter: 768,
                    exit: 979
                }, {
                    label: 'laptop',
                    enter: 980,
                    exit: 1366
                }, {
                    label: 'large',
                    enter: 1367,
                    exit: 10000
                }
            ]);
            // register enter and exit functions for a single breakpoint
            jRes.addFunc({
                breakpoint: 'large',
                enter: function() {
                    plugin.showHideFilterSidebar();
                },
                exit: function() {

                }
            });
            jRes.addFunc({
                breakpoint: 'laptop',
                enter: function () {
                    plugin.showHideFilterSidebar();

                },
                exit: function() {

                }
            });
            jRes.addFunc({
                breakpoint: 'tablet',
                enter: function () {
                    plugin.showHideFilterSidebar();
                    plugin.toggleLeftSidebar();
                    plugin.sideBarNavToggle();
                    plugin.collapseSideBarNav();
                    plugin.responsiveTables();
                },
                exit: function() {
                    plugin.showLeftSidebar();
                    plugin.nonResponsiveTables();
                }
            });
            jRes.addFunc({
                breakpoint: 'phone',
                enter: function () {
                    plugin.showHideFilterSidebar();
                    plugin.hideLeftSidebar();
                    plugin.responsiveTables();
                },
                exit: function() {
                    plugin.showLeftSidebar();
                    plugin.nonResponsiveTables();
                }
            });

            return jRes;
        }
        
        //back to top
        plugin.backToTop = function () {
            //GoUP 0.1.2 - Developed by Roger Vila (@_rogervila)
            (function (e) {
                e.fn.goup = function (t) {
                    e.fn.goup.defaultOpts = { appear: 200, scrolltime: 800, imgsrc: "http://goo.gl/VDOdQc", width: 72, place: "bottom-right", fadein: 500, fadeout: 500, opacity: .5, marginX: 2, marginY: 2 };
                    var n = e.extend({}, e.fn.goup.defaultOpts, t);
                    return this.each(function () {
                        var t = e(this);
                        t.html("<a><img /></a>");
                        var r = e("#goup a");
                        var i = e("#goup a img");
                        t.css({ position: "fixed", display: "block", width: "'" + n.width + "px'", "z-index": "9" });
                        r.css("opacity", n.opacity);
                        i.attr("src", n.imgsrc);
                        i.width(n.width);
                        i.hide();
                        e(function () {
                            e(window).scroll(function () {
                                if (e(this).scrollTop() > n.appear) i.fadeIn(n.fadein);
                                else i.fadeOut(n.fadeout)
                            });
                            e(r).hover(function () {
                                e(this).css("opacity", "1.0");
                                e(this).css("cursor", "pointer")
                            }, function () { e(this).css("opacity", n.opacity) });
                            e(r).click(function () {
                                e("body,html").animate({ scrollTop: 0 }, n.scrolltime);
                                return false
                            })
                        });
                        if (n.place === "top-right") t.css({ top: n.marginY + "%", right: n.marginX + "%" });
                        else if (n.place === "top-left") t.css({ top: n.marginY + "%", left: n.marginX + "%" });
                        else if (n.place === "bottom-right") t.css({ bottom: n.marginY + "%", right: n.marginX + "%" });
                        else if (n.place === "bottom-left") t.css({ bottom: n.marginY + "%", left: n.marginX + "%" });
                        else t.css({ bottom: n.marginY + "%", right: n.marginX + "%" })
                    })
                }
            })(jQuery);

            $('body').append('<div id="goup"></div>');
            $('#goup').goup({
                appear: 200,
                scrolltime: plugin.settings.backToTop.scrolltime,
                imgsrc: plugin.settings.backToTop.imgsrc,
                width: plugin.settings.backToTop.width,
                place: plugin.settings.backToTop.place,
                fadein: plugin.settings.backToTop.fadein,
                fadeout: plugin.settings.backToTop.fadeout,
                opacity: plugin.settings.backToTop.opacity,
                marginX: plugin.settings.backToTop.marginX,
                marginY: plugin.settings.backToTop.marginY,
            });
        };

        //first impression lib
        plugin.firstImpression = function() {
            window.firstImpression = function(c, f) {
                var a, b, d, e;
                a = function(j, k, i) {
                    var h, g, l;
                    if (arguments.length > 1 && String(k) !== "[object Object]") {
                        i = i || {};
                        if (k === null || k === undefined) {
                            i.expires = -1
                        }
                        if (typeof i.expires === "number") {
                            h = i.expires;
                            l = i.expires = new Date();
                            l.setTime(l.getTime() + h * 24 * 60 * 60 * 1000)
                        }
                        i.path = "/";
                        return (document.cookie = [encodeURIComponent(j), "=", encodeURIComponent(k), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join(""))
                    }
                    g = new RegExp("(?:^|; )" + encodeURIComponent(j) + "=([^;]*)").exec(document.cookie);
                    return g ? decodeURIComponent(g[1]) : null
                };
                if (c === undefined) {
                    c = "_firstImpression"
                }
                if (f === undefined) {
                    f = 730
                }
                if (c === null) {
                    a("_firstImpression", null);
                    return
                }
                if (f === null) {
                    a(c, null);
                    return
                }
                b = function() { return a(c) };
                d = function() { a(c, true, { expires: f }) };
                e = function() {
                    var g = b();
                    if (!g) {
                        d()
                    }
                    return !g
                };
                return e()
            };
        };
        
        //storejs plugin
        plugin.storejs = function () {
            /* Copyright (c) 2010-2013 Marcus Westin */
            (function (e) {

                function o() {
                    try {
                        return r in e && e[r]
                    } catch (t) {
                        return !1
                    }
                }

                var t = {}, n = e.document, r = "localStorage", i = "script", s;
                t.disabled = !1, t.set = function (e, t) {
                }, t.get = function (e) {
                }, t.remove = function (e) {
                }, t.clear = function () {
                }, t.transact = function (e, n, r) {
                    var i = t.get(e);
                    r == null && (r = n, n = null), typeof i == "undefined" && (i = n || {}), r(i), t.set(e, i)
                }, t.getAll = function () {
                }, t.forEach = function () {
                }, t.serialize = function (e) { return JSON.stringify(e) }, t.deserialize = function (e) {
                    if (typeof e != "string") return undefined;
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        return e || undefined
                    }
                };
                if (o())
                    s = e[r], t.set = function (e, n) { return n === undefined ? t.remove(e) : (s.setItem(e, t.serialize(n)), n) }, t.get = function (e) { return t.deserialize(s.getItem(e)) }, t.remove = function (e) { s.removeItem(e) }, t.clear = function () { s.clear() }, t.getAll = function () {
                        var e = {};
                        return t.forEach(function (t, n) { e[t] = n }), e
                    }, t.forEach = function (e) {
                        for (var n = 0; n < s.length; n++) {
                            var r = s.key(n);
                            e(r, t.get(r))
                        }
                    };
                else if (n.documentElement.addBehavior) {
                    var u, a;
                    try {
                        a = new ActiveXObject("htmlfile"), a.open(), a.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), a.close(), u = a.w.frames[0].document, s = u.createElement("div")
                    } catch (f) {
                        s = n.createElement("div"), u = n.body
                    }

                    function l(e) {
                        return function () {
                            var n = Array.prototype.slice.call(arguments, 0);
                            n.unshift(s), u.appendChild(s), s.addBehavior("#default#userData"), s.load(r);
                            var i = e.apply(t, n);
                            return u.removeChild(s), i
                        }
                    }

                    var c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");

                    function h(e) { return e.replace(/^d/, "___$&").replace(c, "___") }

                    t.set = l(function (e, n, i) { return n = h(n), i === undefined ? t.remove(n) : (e.setAttribute(n, t.serialize(i)), e.save(r), i) }), t.get = l(function (e, n) { return n = h(n), t.deserialize(e.getAttribute(n)) }), t.remove = l(function (e, t) { t = h(t), e.removeAttribute(t), e.save(r) }), t.clear = l(function (e) {
                        var t = e.XMLDocument.documentElement.attributes;
                        e.load(r);
                        for (var n = 0, i; i = t[n]; n++) e.removeAttribute(i.name);
                        e.save(r)
                    }), t.getAll = function (e) {
                        var n = {};
                        return t.forEach(function (e, t) { n[e] = t }), n
                    }, t.forEach = l(function (e, n) {
                        var r = e.XMLDocument.documentElement.attributes;
                        for (var i = 0, s; s = r[i]; ++i) n(s.name, t.deserialize(e.getAttribute(s.name)))
                    })
                }
                try {
                    var p = "__storejs__";
                    t.set(p, p), t.get(p) != p && (t.disabled = !0), t.remove(p)
                } catch (f) {
                    t.disabled = !0
                }
                t.enabled = !t.disabled, typeof module != "undefined" && module.exports && this.module !== module ? module.exports = t : typeof define == "function" && define.amd ? define(t) : e.store = t
            })(Function("return this")())
        };

        // fire up the plugin!
        // call the "constructor" method
        plugin.init();

        return plugin;
    };

    // add the plugin to the jQuery.fn object
    $.fn.appStart = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('appStart')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.appStart(this, options);

                // store a reference to the plugin object
                // element.data('appStart').publicMethod(arg1, arg2, ... argn) or
                // element.data('appStart').settings.propertyName
                $(this).data('appStart', plugin);

            }

        });

    };

})(jQuery);