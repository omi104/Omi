var AdminEmail = function () {

    var pub = this;
    var pri = {};
    pri.NEW_EMAIL_TEMPLATE = "0";
    pri.IsNavigationChanged = true;

    pub.PreviewNewsletter = function () {
        var divPreviewNewsletter = $('<div id="divPreviewNewsletter" style="background-color:white;">' + $('iframe[src="javascript:true;"]').contents().find("body").html() + '</div>');

        divPreviewNewsletter.dialog({
            title: 'Newsletter Preview',
            width: 900,
            modal: true,
            close: $(this).remove()
        });
    };

    pub.EmailTemplateAjaxCall = function (ajaxUrl, parameters, onsuccess, onerror) {
        $.ajax({
            url: ajaxUrl,
            type: 'POST',
            data: parameters,
            success: function (msg) {
                var result = $.parseJSON(msg);
                onsuccess(result);
            },
            error: function (errorThrown) {
                if (onerror != null) {
                    onerror();
                }
            }
        });

    };

    pub.EmailFilterChanged = function (parameterKey, obj) {
        var value = $(obj).find('option:selected').val();
        pri.IsNavigationChanged = false;

        var parameterObj = {};
        parameterObj[parameterKey] = value;
        CommandCenter.parametersChanged(parameterObj);
    };

    pub.OnFirstLoad = function (subject, content) {

        var emailtemplateContainer = $('#email-editor-container');
        
        if (pri.IsNavigationChanged) {
            $('select#filter-EmailTemplate-control').val(0);
            pub.LoadReport(emailtemplateContainer, '', 'imageName', '', '');
        }
        else {
            
            pub.LoadReport(emailtemplateContainer, '', 'imageName', subject, content);
            pri.IsNavigationChanged = true;
        }


    };

    pub.LoadReport = function (emailtemplateContainer,snapshotfactor, imageName, subject, content) {
        
        subject = subject.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        content = content.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

        var subjectDom = $('<div style="font-weight: bold; padding-top: 10px; padding-bottom: 5px;font-size: 12px;">Email Subject<input type="text" value="" style="width: 81%; border: solid 1px #C0C0C0; margin-left: 39px; margin-bottom: 10px;font-size: 12px;" id="txtEmailSubject"></div>');
        emailtemplateContainer.append(subjectDom);

        var htmlEditorContainer = $('<div class="leftPanel"></div>');
        emailtemplateContainer.append(htmlEditorContainer);

        emailtemplateContainer.find('.leftPanel').append('<textarea id="txtTemplate"></textarea>');
        emailtemplateContainer.find('#txtEmailSubject').val(subject);
        emailtemplateContainer.find('textarea').text(content);
        
        emailtemplateContainer.find('textarea').cleditor({ width: "96%", height: 500, useCSS: true })[0].focus();

        emailtemplateContainer.find('.attachmentHolder').hide();
        if (snapshotfactor != "Body" && imageName != "") {
            var attachmentLink = "FileDownload.aspx?fileName=" + imageName + "&displayName=EMEA Share Report&folderName=temp";
            emailtemplateContainer.find('#attachmentLink').attr('href', attachmentLink);
            emailtemplateContainer.find('.attachmentHolder').show();
        }
    };

    pub.MessageDialog = function (msg) {
        var message = $('<div style="text-align:center;font-weight:bold;">' + msg + '</div>');
        message.dialog({
            'modal': true,
            title: 'Message',
            resizable: false,
            buttons: {
                'Ok': function () {
                    $(this).dialog('close');
                }
            }
        });
    };


    pub.SelectUserForNewsletterSending = function () {
        $('#txtUserListForEmail').remove();
        $('#divUserListForEmail').remove();
        
        $('#divEmailUserList  .content').empty();
        $('#divEmailUserList  .content').append('<div id = ' + '"txtUserListForEmail"' + '></div>');
        $('#divEmailUserList  .content').append('<div id = ' + '"divUserListForEmail"' + '></div>');

        var data = { };
        pub.EmailTemplateAjaxCall("EmailTemplate/GetHierarchicalGeoAndUser", data, pub.ShowSelectUserForNewsletterSendingDialog, pub.ShowNewsletterOnError);
    };

    pub.ShowSelectUserForNewsletterSendingDialog = function (result) {
        
        if ($('select#filter-EmailTemplate-control').val() == '0') {
            alert('Please select a template first');
            return;
        }
        
        if (result != null) {
            $('div#divUserListForEmail').html(result.Message);
            pub.ApplyBindings();
        }

        $('#divEmailUserList').dialog({
            minWidth: 400,
            minHeight: 400,
            height: 400,
            width: 400,
            modal: true,
            title: 'Select Recipient(s) for the Newsletter',
            buttons: {
                'Close': function () {
                    $(this).dialog('close');
                },
                'Send': function () {
                    SendNewsletter();
                }
            }
        });
        $('#divEmailUserList').dialog('open');
    };
    
    pub.SendNewsletter = function() {
        if ($('#txtUserListForEmail').html() == '') {
            return;
        }

        var users = '';
        $('#txtUserListForEmail .ui-div-user').each(function() {
            users += $(this).text() + ';';
        });

        var data = {
            'templateId': $('.selectEmailTemplate').val(),
            'sendTo': users,
            'emailSubject': $('#txtEmailSubject').val(),
            'strHtml': $('iframe[src="javascript:true;"]').contents().find("body").html().replace(/</g, '&lt;').replace(/>/g, '&gt;')
        };

        pub.EmailTemplateAjaxCall("EmailTemplate/SendNewsletter", data, pub.SendNewsletterOnSuccess, pub.SendNewsletterOnError);

    };
    
    pub.SendNewsletterOnSuccess = function (result) {
        MessageDialog("Email sent successfully.");
        $('#divEmailTo').dialog('close');
    };
    
    pub.SendNewsletterOnError = function () {
        MessageDialog('Error sending newsletter');
    };

    pub.ApplyBindings = function() {

        $('div[id*=divUserListForEmail] input').click(function () {
            if ($(this).attr('id') == 'ALL') {
                if ($(this).is(':checked')) {
                    $('div[id*=divUserListForEmail] input').attr("checked",true);
                }
                else {
                    $('div[id*=divUserListForEmail] input').removeAttr("checked");
                }
            }
            else {
                if ($(this).is(':checked')) {
                    $('input[parentId^=' + $(this).attr('parentId') + '_' + $(this).attr('id') + ']').attr("checked", true);
                }
                else {
                    $('input[parentId^=' + $(this).attr('parentId') + '_' + $(this).attr('id') + ']').removeAttr("checked");
                }
            }

            var users = '';
            $('div[id*=divUserListForEmail] input:checked').each(function () {
                if ($(this).attr('value') != 'on') {
                    users += '<div onclick="javascript:removeUserDiv(this)" class="div-cross-button"><div class="ui-div-user">' + $(this).attr('value') + '</div></div> ';
                }
            });
            $('#txtUserListForEmail').html(users);

        });
        
        $('.div-admin-tree').click(function () {
            if ($(this).css('background-image').indexOf('plus') != -1) {
                $(this).css('background-image', $(this).css('background-image').replace('plus', 'minus'));

                if ($('div[parentId=' + $(this).attr('id') + ']').length == 0) {
                    $('input[parentId=' + $(this).attr('id') + ']').parent().css('display', 'block');
                }
                else {
                    $('div[parentId=' + $(this).attr('id') + ']').parent().css('display', 'block');
                }
            }
            else {
                $(this).css('background-image', $(this).css('background-image').replace('minus', 'plus'));
                $('input[parentId^=' + $(this).attr('id') + ']').parent().css('display', 'none');
                $('div[parentId^=' + $(this).attr('id') + ']').parent().css('display', 'none');
                $('div[parentId^=' + $(this).attr('id') + ']').css('background-image', $(this).css('background-image').replace('minus', 'plus'));
            }
        });
    };


    pub.removeUserDiv = function(ctl) {
        var text = $(ctl).text();
        text = text.replace(/\./g, "");
        text = text.replace("@","");

        $('input[id="chk' + text.substring(0, text.length) + '"]').removeAttr("checked");
        $(ctl).remove();
    };
    
    return pub;
}();
