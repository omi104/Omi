

function UserManagement() {
    dataSet = dataSet.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&quot;/g, '"');
    dataSet = $.parseJSON(dataSet);
    var table = $('#list').DataTable({
        responsive: true,
        data: dataSet,
        columnDefs: [
            { "searchable": false, "orderable": false, "targets": 0 },
            { "orderable": false, "targets": 2 },
            { "orderable": false, "targets": 3 },
            { "orderable": false, "width": "20%", "targets": 4 },
            { "orderable": false, "targets": 5 },
            { "orderable": false, "targets": 6 },
            { "orderable": false, "width": "13%" ,"targets": 7 },
            { "orderable": false, "targets": 8 },
            { "orderable": false, "targets": 9 }
        ],
        order: [[1, 'asc']],
        columns: [
            {
                data: null, bsort:false,
                defaultContent: '<a href="javascript:void(0)" class="editor_edit" title="Edit user"><i class="fa fa-edit"></i></a> <a href="javascript:void(0)" class="editor_remove" title="Delete user"><i class="fa fa-user-times"></i></a> <a href="javascript:void(0)" class="editor_reset_password" title="Reset Password"><i class="fa fa-key"></i></a>'
            },
            { data: 'UserName' },
            { data: 'FirstName' },
            { data: 'LastName' },
            { data: 'Position' },
            { data: 'Email' },
            { data: 'Role' },
            { data: 'GeoCode' },
            { data: 'Org' },
            { data: 'ReceiveEmailAlert' }
        ]
    });

    $('#list tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    // Edit record
    $('#list').on('click', 'a.editor_edit', function (e) {
        e.preventDefault();
        $('#validation-error').empty();
        var row = table.row($(this).parents('tr')).data();
        $('#UserName').val(row.UserName);
        $("input#UserName").prop('disabled', true);
        $('#FirstName').val(row.FirstName);
        $('#LastName').val(row.LastName);
        $('#Email').val(row.Email);
        $("#Role").val(row.Role);
        $("#GeoCode").val(row.GeoCode);
        $("#Position").val(row.Position);
        $("#Org").val(row.Org);
        if (row.ReceiveEmailAlert == false)
            $("#ReceiveEmailAlert").val("0");
        else
            $("#ReceiveEmailAlert").val("1");
        $('#Action').val('edit');
        $('#myModal').modal('show').addClass("fade");
    });

    // Remove record
    $('#list').on('click', 'a.editor_remove', function (e) {
        e.preventDefault();
        var row = table.row($(this).parents('tr')).data();
        $('#UserName').val(row.UserName);
        $('#remove-record-modal').modal('show');
    });

    $('#delete-user').click(function () {
        $('#remove-record-modal').modal('hide');
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: 'UserOperation/Delete?userName=' + $('#UserName').val(),
            success: function (message) {
                $('#small-modal-content').text(message);
                $("#small-modal").modal("show");
            },
            error: function (data, textStatus) {
                $('#small-modal-content').text(textStatus);
                $("#small-modal").modal("show");
            }
        });
    });

    $("#saveUser-details").click(function () {
        $('#validation-error').empty();
        var errorMsg = "";
        if ($("#UserName").val() == "") {
            errorMsg = "<li>UserName required</li>";
        }
        if ($("#Email").val() == "") {
            errorMsg += "<li>Email required</li>";
        }
        if (errorMsg != "") {
            $('#validation-error').html(errorMsg);
            return;
        }
        var emailAlert = false;
        if ($("#ReceiveEmailAlert").val() == "1")
            emailAlert = true;
        var myData = {
            UserName: $("#UserName").val(),
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            Email: $("#Email").val(),
            Role: $("#Role").val(),
            Position: $("#Position").val(),
            GeoCode: $("#GeoCode").val(),
            Org: $("#Org").val(),
            ReceiveEmailAlert: emailAlert,
            Action: $("#Action").val()
        };

        $.ajax({
            url: 'UserOperation/Update',
            type: 'POST',
            data: myData,
            success: function (message) {
                $('#small-modal-content').text(message);
                $("#myModal").removeClass("fade").modal("hide");
                $("#small-modal").modal("show");
            },
            error: function (data, textStatus) {
                $('#small-modal-content').text(textStatus);
                $("#myModal").removeClass("fade").modal("hide");
                $("#small-modal").modal("show");
            }
        });
    });

    $('#button-add-user').click(function (e) {
        e.preventDefault();
        $('#validation-error').empty();
        var row = table.row('.selected');
        $('#UserName').val(row.UserName);
        $("input#UserName").prop('disabled', false);
        $('#FirstName').val(row.FirstName);
        $('#LastName').val(row.LastName);
        $('#Email').val(row.Email);
        $("#Role option:selected").text(row.Role);
        if (row.ReceiveEmailAlert == false)
            $("#ReceiveEmailAlert option:selected").text('No');
        else
            $("#ReceiveEmailAlert option:selected").text('Yes');
        $('#Action').val('add');
        $('#myModal').modal('show').addClass("fade");
    });
    
    // Reset Password
    $('#list').on('click', 'a.editor_reset_password', function (e) {
        e.preventDefault();
        var row = table.row($(this).parents('tr')).data();
        $('#UserName').val(row.UserName);
        $('#myModalBody').text('Do you want to Reset Password for the User : ' + row.UserName + ' ?');
        $("#common-Modal").modal("show").addClass('fade');
    });

    $('#small-modal').on('hidden.bs.modal', function () {
        window.CommandCenter.loadWidget(widgetName);
    });

    $('#reset-password').click(function () {
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: 'ForgotPassword?userName=' + $('#UserName').val() + '&isReset=true',
            success: function (message) {
                $('#small-modal-content').text(message);
                $("#common-Modal").removeClass("fade").modal("hide");
                $("#small-modal").modal("show");
            },
            error: function (data, textStatus) {
                $('#small-modal-content').text(textStatus);
                $("#common-Modal").removeClass("fade").modal("hide");
                $("#small-modal").modal("show");
            }
        });
    });
}