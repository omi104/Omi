/* ExpandCollapseTable functionality for cs version of EC table
Created by: Aftab
Date: 29/01/2013
*/

//input: clicked image object, config parentlevel
function toggleKeyReport(obj, lastCollapsibleLevel) {
    /*Images to be toggled are path independant but must include differencing keyword 'minimize' & 'maximize' in their names.
    If table cell contains two images then first one's image source will be changed*/
    var image = $(obj); //.find('img:first');
    var imagePath = new String(image.attr('src'));

    var rowClicked = $(obj).closest('tr');
    var id = rowClicked.attr('id');
    var level = rowClicked.attr('level');
    var table = $(obj).closest('table');
    var rows = table.find('tr.' + id);

    if ((rowClicked.css('display') == rows.css('display')) && (rowClicked.css('display') == 'none')) return; // already hidden, so return
    //expanding
    if (rows.css('display') == 'none') {
        rows.css('display', '');
        imagePath = imagePath.replace('expand', 'collapse');
        if (level != lastCollapsibleLevel) {
            rows.each(function () {
                $(this).find('img:first').click();
            });
        }
    }
        //collapsing
    else {
        rows.css('display', 'none');
        imagePath = imagePath.replace('collapse', 'expand');
        if (level == lastCollapsibleLevel) {
            rows.each(function () {
                $(this).find('img:first').click();
            });
        }
    }
    image.attr('src', imagePath);
}

function CollapseAllReport(obj, lastCollapsibleLevel) {
    var image = $(obj); //.find('img:first');
    var imagePath = new String(image.attr('src'));

    var rowClicked = $(obj).closest('tr');
    var id = rowClicked.attr('id');
    var level = rowClicked.attr('level');
    var table = $(obj).closest('table');
    var rows = table.find('tr.' + id);

    if ((rowClicked.css('display') == rows.css('display')) && (rowClicked.css('display') == 'none')) return; // already hidden, so return
    rows.css('display', 'none');
    imagePath = imagePath.replace('collapse', 'expand');
    if (level == lastCollapsibleLevel) {
        rows.each(function () {
            $(this).find('img:first').click();
        });
    }
    image.attr('src', imagePath);
}

function ExpandAllReport(obj, lastCollapsibleLevel) {
    var image = $(obj); //.find('img:first');
    var imagePath = new String(image.attr('src'));

    var rowClicked = $(obj).closest('tr');
    var id = rowClicked.attr('id');
    var level = rowClicked.attr('level');
    var table = $(obj).closest('table');
    var rows = table.find('tr.' + id);

    if ((rowClicked.css('display') == rows.css('display')) && (rowClicked.css('display') == 'none')) return; // already hidden, so return
    rows.css('display', '');
    imagePath = imagePath.replace('expand', 'collapse');
    if (level == lastCollapsibleLevel) {
        rows.each(function () {
            $(this).find('img:first').click();
        });
    }
    image.attr('src', imagePath);
}