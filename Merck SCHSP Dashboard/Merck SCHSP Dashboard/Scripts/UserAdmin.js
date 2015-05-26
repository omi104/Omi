var UserAdmin = function () {
    var pub = this;
    var pri = {};

    pub.LoadUserAdminData = function (userData, geoData, widgetName) {
        pri.widgetName = widgetName;
        userData = userData.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&quot;/g, '"');
        geoData = geoData.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&quot;/g, '"');
        
        userData = $.parseJSON(userData);
        geoData = $.parseJSON(geoData);
        
        UserData_Global = userData;
        var GeoListForEditing = "";
        for (var item in geoData) {
            var geo = geoData[item];
            if (geo.VALUE != undefined)
                GeoListForEditing += geo.VALUE + ":" + geo.NAME + ";";
        }
        GeoListForEditing = GeoListForEditing.slice(0, GeoListForEditing.length - 1);
        GeoListForEditing = GeoListForEditing.replace(/&#160;/g, '-');
        var lastsel;
        $("#list").jqGrid({
            datatype: "local",
            data: userData,
            colNames: ['User Name', 'First Name', 'Last Name', 'Email', 'Role', 'Email Alert'],
            colModel: [
                { name: 'UserName', index: 'UserName', formoptions: { elmsuffix: '(*)' }, width: 200, editable: true, key: true, editrules: { required: true, custom: true, custom_func: pri.addEditKeycustom_func } },
                { name: 'FirstName', index: 'FirstName', width: 200, editable: true },
                { name: 'LastName', index: 'LastName', width: 200, editable: true },
                { name: 'Email', index: 'Email', formoptions: { elmsuffix: '(*)' }, width: 200, editable: true, editrules: { required: true, email: true } },
                { name: 'RoleId', index: 'RoleId', formoptions: { elmsuffix: '(*)' }, width: 70, editable: true, edittype: "select", editoptions: { value: "1:User;2:Admin;" }, editrules: { required: true } },
                { name: 'ReceiveEmailAlert', index: 'ReceiveEmailAlert', formoptions: { elmsuffix: '(*)' }, width: 70, editable: true, edittype: "select", editoptions: { value: "true:Yes;false:No" }, editrules: { required: true } }
            ],
            rowNum: 15,
            rowList: [5, 10, 15, 20, 50],
            pager: '#pager',
            sortname: 'UserId',
            rownumbers: true,
            viewrecords: true,
            sortorder: "asc",
            onSelectRow: function(id) {
                if (id && id !== lastsel) {
                    lastsel = id;
                    SelectedIserId = lastsel;
                }
            },
            gridview: true,
            caption: "Reckitt Benckiser Account Team",
            editurl: 'UserOperation/Edit',
            ignoreCase: true,
            height: "100%"
        }).jqGrid('navGrid', '#pager', { add: true, edit: true, del: true, search: false, refresh: true },
            {
                // This is for Editing
                recreateForm: true,
                afterShowForm: function(form) {
                    $('#UserId', form).attr('disabled', 'disabled');
                },
                afterSubmit: function (response, postdata) {
                    //window.location.reload(false);
                    CommandCenter.loadWidget(pri.widgetName);
                }
            },
            {
                // This is for Adding
                recreateForm: true,
                afterShowForm: function(form) {
                },
                afterSubmit: function (response, postdata) {
                    //window.location.reload(false);
                    CommandCenter.loadWidget(pri.widgetName);
                }
            },
            { closeAfterEdit: 'true' },
            { closeAfterAdd: 'true' })
            //.navButtonAdd('#pager', {
            //    caption: "Export Users",
            //    buttonicon: "ui-icon-clipboard",
            //    onClickButton: function() {
            //        CommandCenter.navigationExportClicked('xlsx', 'AdminJJAccountTeam');
            //    },
            //    position: "last"
            //})
            .navButtonAdd('#pager', {
                caption: "Reset Password",
                buttonicon: "ui-icon-key",
                onClickButton: function() {
                    var grid = $("#list");
                    var rowUser = grid.jqGrid('getGridParam', 'selrow');
                    if (rowUser == null) {
                        $('#modalNo-button').css('visibility', 'hidden');
                        $('#modalYes-button').css('visibility', 'hidden');
                        $('#modalClose-button').css('visibility', 'visible');
                        pri.showMyModal('common-Modal', '', 'Please, select a row');
                    }
                    else {
                        pri.UserPasswordResetconfirm(rowUser);
                    }
                },
                position: "last"
            });
        jQuery("#list").jqGrid('filterToolbar', { stringResult: true, defaultSearch: "cn", searchOnEnter: false });
    };

    pri.UserPasswordResetconfirm = function (rowUser) {
        $('#selected-userId').val(rowUser);
        $('#modalClose-button').css('visibility', 'hidden');
        $('#modalNo-button').css('visibility', 'visible');
        $('#modalYes-button').css('visibility', 'visible');
        var message = "Do you want to Reset Password for the User : " + rowUser + " ?";
        pri.showMyModal('common-Modal', 'You are going to reset password of a user', message);
        //$('#confirm').modal({
        //    closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
        //    position: ["40%"],
        //    draggable: true,
        //    overlayId: 'confirm-overlay',
        //    containerId: 'confirm-container',
        //    onShow: function(dialog) {
        //        if ($.trim(message) != '') {
        //            $('.message span', dialog.data[0]).append($.trim(message));
        //        }
        //        $('.yes', dialog.data[0]).click(function() {
        //            $.ajax({
        //                type: 'POST',
        //                contentType: "application/json; charset=utf-8",
        //                url: 'UserOperation/ResetPassword?oper=ResetPassword&OnSelectJqgridKey=' + rowUser,
        //                success: function(message) {
        //                    $.modal.close();
        //                    alert(message);
        //                },
        //                error: function(data, textStatus) {
        //                    alert(textStatus);
        //                }
        //            });
        //        });
        //    }
        //});
    };

    pub.ResetPassword = function () {
        var user = $('#selected-userId').val();
        if (user) {
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: 'UserOperation/ResetPassword?oper=ResetPassword&OnSelectJqgridKey=' + user,
                success: function (message) {
                    $('#common-Modal').modal('hide');
                    alert(message);
                },
                error: function (data, textStatus) {
                    alert(textStatus);
                }
            });
        }
    };

    pri.showMyModal = function (modalId, modalTitle, modalBody) {
        $('#myModalLabel').html(modalTitle);
        $('#myModalBody').html(modalBody);
        $('#' + modalId).modal('show');
    };

    pri.addEditKeycustom_func = function(cellvalue, colname) {
        if (cellvalue == null || cellvalue == '' || cellvalue == undefined)
            return [false, cellvalue + ' : Insert Valid User Name'];
        var dialogText = $('#editmodlist > #edithdlist > span.ui-jqdialog-title').html();
        var isEdit = false;
        if (dialogText == 'Edit Record')
            isEdit = true;
        var UserIdCount = 0;
        for (var item in UserData_Global) {
            var user = UserData_Global[item];
            if (user.USER_ID == cellvalue) {
                if (isEdit)
                    UserIdCount++;
                else
                    return [false, cellvalue + ' : User Already exists'];
            }
        }

        if ((UserIdCount > 0) && SelectedIserId != cellvalue)
            return [false, cellvalue + ' : User Already exists'];
        return [true, ""];
    };

    pub.JNJChangePassword = function() {

        var oldPwd = $('#txtCurrentPassword').val();
        var newPwd = $('#txtNewPassword').val();
        var confirmPwd = $('#txtConfirmPassword').val();


        var encrypted_new_pwd = hex_md5(newPwd);
        var encrypted_old_pwd = hex_md5(oldPwd);
        var userId = $('input[id$="hiddenUserID"]').val();
        
        if ($('input[id$="hiddenUserID"]').val() == newPwd) {
            $("#divErrorMessage").text('Password should not be same as User Name');

            return;
        }

        if (newPwd.length < 6) {
            $("#divErrorMessage").text('Password should be at least 6 characters in length');

            return;
        }

        if (newPwd == confirmPwd) {
            $.ajax({
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                url: 'UserOperation/ChangePassword?userId=' + userId + '&oldPassword=' + encrypted_old_pwd + '&newPassword=' + encrypted_new_pwd,
                success: function (message) {

                    pri.ChangePasswordOnSuccess(message);

                },
                error: function (data, textStatus) {
                    alert(textStatus);
                }
            });
        } else {
            $("#divErrorMessage").text('Password missmatch');
        }
    };

    pri.ChangePasswordOnSuccess = function (result) {
        $("#divErrorMessage").text(result);
    };
    
    pri.ChangePasswordOnSuccess = function (message) {
        $("#divErrorMessage").text(message);
    };

    return pub;
}()