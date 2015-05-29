var ForgetPassword = function() {
    var pub = this;
    var pri = {};
    
    pub.ForgetPasswordSubmit = function() {
        var userId = $('input#loginID').val();
        if (userId.length == 0) {
            $('.input-error').html('Please enter your user name');
            return false;
        }
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: 'ForgotPassword?userName=' + userId,
            success: function (message) {
                $('#small-modal-content').html(message);
                $("#common-Modal").removeClass("fade").modal("hide");
                $("#my-small-modal").modal("show").addClass("fade");
            },
            error: function (data, textStatus) {
                $('#small-modal-content').html(textStatus);
                $("#common-Modal").removeClass("fade").modal("hide");
                $("#my-small-modal").modal("show").addClass("fade");
            }
        });
        return true;
    };

    pri.ForgetPasswordOnSuccess = function(message) {
        alert(message);
        var path = location.pathname.replace('undefined/', '').replace('Account/ChangePassword', '');
        window.location = path;
    };

    pub.ShowForgetPasswordDialog = function () {
        $('#common-Modal').modal('show').addClass("fade");
    };

    return pub;
}();










