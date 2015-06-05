var RbHelper = function () {
    var pub = this;
    pub.ReloadIfPeriodHasChanged = function () {
        if (isMonthChanged == '1') {
            isMonthChanged = '0';
            location.reload();
        }
    };
    pub.ExportClick = function (exportType) {
        CommandCenter.navigationExportClicked(exportType, CommandCenter.getNavigationName());
    };

    pub.FavouriteClick = function (username) {
        Favourite.favouriteClick(CommandCenter.getNavigationName(), username);
    };


    pub.KSAClick = function (userId) {
        $('#KSAPassword').val('');
        $('#KSAUserName').val(userId);
        $('#KSA-Auth-Modal').modal('show');
    }

    pub.AuthorizeKSANavigation = function (userid, password) {
        var parameters = {
            'userId': userid,
            'password': password,
        };
        RbHelper.RBAjaxCall('Authorize/AuthorizeKsaNavigation', parameters, pub.Authorize_KSA_Success);
    }
    pub.Authorize_KSA_Success = function (data,parameter) {
            if (data == "Success") {
                var element = $('#navigation3');
                var item = element[0];
                RBCommandCenter.navigationChanged(item, 'NavKSATerritoryLevel', 'KSA Territory Level');
            } else
                alert("KSA Password mismatch.");
        },


    pub.ExpandCollapseAll = function (element, parentLevel) {
        var image = $(element);
        var imagePath = new String(image.attr('src'));
        var showExpandAll = imagePath.indexOf('expandAll') >= 0 ? true : false;

        $('div.company-expand-collapse td.ExpandCollapseText img ').each(function (index, item) {
            if (showExpandAll) {
                imagePath = imagePath.replace('expandAll', 'collapseAll');
                image.attr('src', imagePath);
                ExpandAllReport(item, parentLevel);
            }
            else {
                imagePath = imagePath.replace('collapseAll', 'expandAll');
                image.attr('src', imagePath);
                CollapseAllReport(item, parentLevel);
            }
        });
    },

    pub.HideMenu = function (e) {
        if (!$('#sidebar').hasClass('collapse-sidebar'))
            $('#toggle-menu-anchor').click();
    };
    pub.togglePanel = function (element) {
        if ($(element).hasClass('panel-minimize')) {
            $(element).removeClass('panel-minimize').addClass('panel-maximize');
            $(element).children('i').removeClass('fa-minus').addClass('fa-plus');
            $(element).closest('div.panel-heading').next('div.panel-body').css('display', 'none');
        }
        else if ($(element).hasClass('panel-maximize')) {
            $(element).removeClass('panel-maximize').addClass('panel-minimize');
            $(element).children('i').removeClass('fa-plus').addClass('fa-minus');
            $(element).closest('div.panel-heading').next('div.panel-body').css('display', 'block');
        }
        else if ($(element).hasClass('panel-close')) {
            $(element).closest('.panel').css('display', 'none');
        }
    };

    pub.resizeBodyWidth = function (navigation) {
        if (navigation == 'UserManagement' || navigation == 'Guide' || navigation == "YourAccount" || navigation == "Email" || navigation == "Favourites" || navigation == "NavContactUs") {
            if (!$('#pptx-icon').parent('a').hasClass('display-none')) {
                $('#pptx-icon').parent('a').addClass('display-none');
            }
            if (!$('#pdf-icon').parent('a').hasClass('display-none')) {
                $('#pdf-icon').parent('a').addClass('display-none');
            }
            if (!$('#xlsx-icon').parent('a').hasClass('display-none')) {
                $('#xlsx-icon').parent('a').addClass('display-none');
            }
            if (!$('#filters-info').hasClass('display-none')) {
                $('#filters-info').addClass('display-none');
            }
            if (!$('#favourite-icon').parent('a').hasClass('display-none')) {
                $('#favourite-icon').parent('a').addClass('display-none');
            }
            if (!$('#filter-container').hasClass('display-none')) {
                $('#body-container').addClass('hidden-filter');
                $('#filter-container').addClass('display-none');
                $('#toggle-filter-bar').addClass('display-none');
            }
            if (navigation == "UserManagement") {
                $('#xlsx-icon').parent('a').removeClass('display-none');
            }

        } else {
            $('#pptx-icon').parent('a').removeClass('display-none');
            $('#pdf-icon').parent('a').removeClass('display-none');
            $('#xlsx-icon').parent('a').removeClass('display-none');
            $('#favourite-icon').parent('a').removeClass('display-none');
            if ($('#filter-container').hasClass('display-none')) {
                $('#body-container').removeClass('hidden-filter');
                $('#filter-container').removeClass('display-none');

                $('#toggle-filter-bar').removeClass('display-none');
            }
            $('#filters-info').removeClass('display-none');
            if (navigation == "NavHome")
                $('#filters-info').addClass('display-none');
        }
        pub.showHideSwitchNumberFormat(navigation);
    };

    pub.highlightMenu = function (elementId, navigationLabel) {
        if ($('#' + elementId).parent('li').parent('ul').hasClass('sub')) {
            $('#page-heading').find('h2').html($('#' + elementId).parent('li').parent('ul').siblings('a').children("span:first").text() + ' - ' + $('#' + elementId).children("span:first").text());
        } else {
            $('#page-heading').find('h2').html($('#' + elementId).children("span:first").text());
        }

        $('#sideNav li a.active').removeClass('active');
        $('#' + elementId).addClass('active');
        if ($('#' + elementId).parent('li').parent('ul').hasClass('sub')) {
            var subNav = $('#' + elementId).parent('li').parent('ul');
            if (!subNav.parent('li').hasClass('highlight-menu')) {
                subNav.parent('li').addClass('highlight-menu');
            }
            subNav.siblings('a').addClass('active');
            if (!$('#sidebar').hasClass('collapse-sidebar')) {
                if (!subNav.hasClass('show')) {
                    subNav.addClass('show');
                }
                if (subNav.siblings('a').hasClass('notExpand')) {
                    subNav.siblings('a').removeClass('notExpand').addClass('expand');
                }
                if (!subNav.siblings('a.sideNav-arrow').hasClass('rotate0')) {
                    subNav.siblings('a.sideNav-arrow').removeClass('rotate0').addClass('rotate90');
                }
            } //else {
            //    subNav.siblings('a').addClass('active');
            //}

        } else {
            //close all expanded subs
            var navLi = $('#sideNav').find('li.highlight-menu');
            navLi.removeClass('highlight-menu');
            var navexpand = $('#sideNav').find('li.hasSub .expand');
            navexpand.next('ul').removeClass('show');
            navexpand.next('ul').slideUp('slow');
            navexpand.addClass('notExpand').removeClass('expand');
            if (navexpand.find('.sideNav-arrow').hasClass('rotate90')) {
                navexpand.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
            }
        }
    };

    pub.RBAjaxCall = function (ajaxUrl, parameters, onSuccess) {
        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            data: parameters,
            success: function (data) {
                onSuccess(data, parameters);
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });

    };

    pub.showHideSwitchNumberFormat = function (navigation) {
        if (navigation == "NavCategoriesAllCategoriesByLocation" || navigation == "NavCategoriesAllCategoriesByCompanies" || navigation == "NavCategoriesAllCategoriesByBrand" || navigation == "NavCategoriesAllLocByMarket" || navigation == "NavBrandsAllLocationsAtGlance" || navigation == "NavCompaniesAllLocations" || navigation == "NavSubBrandsAllLocationsAtGlance" || navigation == "NavSKUAllLocationsAtGlance" || navigation == "NavMoleculeAllLocationsAtGlance") {
            $('#NumberFormatswitch').css('display', 'inline-block');
        } else {
            $('#NumberFormatswitch').css('display', 'none');
        }
    };

    pub.GetAndSetLatestPeriodType = function () {
        if ($('#filter-PeriodType-control option:selected').text() == "Monthly") {
            $('#latest-period-type').text('Latest 13 Months');
        } else {
            $('#latest-period-type').text($('#filter-PeriodType-control option:selected').text());
        }
    };

    return pub;
}();
