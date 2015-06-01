var Favourite = function () {

    var pub = this;
    var pri = {};
    
    pub.favouriteClick = function (navigationName, userId) {
        $('#favouriteTitle').val($('#page-heading').find('h2').text());
        $('#favouriteNavigationName').val(navigationName);
        $('#favouriteUserName').val(userId);
        $('#favouriteModal').modal('show');
    };
    
    pub.showConfrimation = function (navigationName, userId,favouriteFilterWidgetName) {
        var navigationTitle = $('#navigation-title-widget-container').find('.title').text();
        pub.dialog(navigationTitle, function () {
            var title = $('#dialog').find('input.titleValue').val();
            var saveCompanyFav = $('#chkSaveCompanyFav') == null ? false : $('#chkSaveCompanyFav').is(':checked');
            pub.addToFavourite(navigationName, userId, title, saveCompanyFav, favouriteFilterWidgetName);
        });
    };

    pub.addToFavourite = function (navigationName, userId, title, saveCompanyFav, favouriteFilterWidgetName) {
        var parameter = window.location.href;
        //title = title.replace('>', '&gt;').replace('<', '&lt;');
        var onClick = "";
        var selectItems = $('#sideNav li a.active');
        selectItems.each(function (index) {
            var item = $(this).attr('onclick');
            if (item) {
                onClick = item;
            }
        });
        var parameters = {
            'navigationName': navigationName,
            'userId': userId,
            'title': title,
            'parameter': parameter,
            'isSaveCompanyFavourite': saveCompanyFav,
            'onClick': onClick,
            'favouriteFilterWidgetName': favouriteFilterWidgetName
        };
        RbHelper.RBAjaxCall('FavouriteOperation/SaveFavourite', parameters, Favourite.FavouriteSaveOnSuccess);
    };

    pub.dialog = function (message, callback) {
        $('#dialog').modal({
            closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
            position: ["40%", ],
            draggable: true,
            overlayId: 'confirm-overlay',
            containerId: 'confirm-container',
            onShow: function (dialog) {
                if ($.trim(message) != '') {
                    $('#dialog').find('input.titleValue').val($.trim(message));
                }
                $('.yes', dialog.data[0]).click(function () {
                    // call the callback
                    if ($.isFunction(callback)) {
                        callback.apply();
                    }
                    // close the dialog
                    $.modal.close();
                });
            }
        });
    };

    pub.FavouriteSaveOnSuccess = function (data, parameters) {
        if (data != 'INSERTED') {
            alert(data);
        }
        else {
            CommandCenter.loadWidget(parameters.favouriteFilterWidgetName);
        }
    };
    
    pub.RenameClicked = function (obj) {
        var textVal = $(obj).closest('tr').find('.fav-title').text();
        $(obj).closest('tr').find('.divEditFavourites input').val(textVal.trim());
        $(obj).closest('tr').find('.fav-title').addClass('display-none');
        $(obj).closest('tr').find('.rename-text').addClass('display-none');
        $(obj).closest('tr').find('.rename-pane').removeClass('display-none');
    };
    
    pub.AcceptClicked = function (obj, isAccept) {
        if (isAccept) {
            var textVal = $(obj).parent().find('input').val();
            if (textVal != '') {
                $(obj).closest('tr').find('.fav-title').text(textVal);
                
                var favouriteId = $(obj).closest('tr').find('.fav-title').attr('favourite-id');
                var parameters = {
                    'favouriteId': favouriteId,
                    'title': textVal

                };
                RbHelper.RBAjaxCall('FavouriteOperation/RenameFavourite', parameters, Favourite.FavouriteRenameOnSuccess);
            }
        }
        $(obj).closest('tr').find('.rename-pane').addClass('display-none');
        $(obj).closest('tr').find('.fav-title').removeClass('display-none');
        $(obj).closest('tr').find('.rename-text').removeClass('display-none');
        
    };
    
    pub.FavouriteRenameOnSuccess = function (data, parameters) {
        if (data != 'UPDATED') {
            alert(data);
        }
    };

    pub.DeleteConfirmation = function (obj) {
        var favouriteId = $(obj).closest('tr').find('.fav-title').attr('favourite-id');
        
        var isDelete = confirm("Do you want to delete this favourite ?");

        if (isDelete == true) {
            var parameters = {
                'favouriteId': favouriteId
            };
            $(obj).closest('tr').remove();
            RbHelper.RBAjaxCall('FavouriteOperation/DeleteFavourite', parameters, Favourite.FavouriteDeleteOnSuccess);
        }
        
    };
    
    pub.FavouriteDeleteOnSuccess = function (data, parameters) {
        if (data != 'DELETED') {
            alert(data);
        }
    };

    return pub;
}();