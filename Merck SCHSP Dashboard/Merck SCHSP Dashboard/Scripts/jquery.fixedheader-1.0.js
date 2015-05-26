/**
* Fixed Header 1.0
* 
* Requires: jQuery 1.2 or greater
* Author: Chaitanya Kurada
* Purpose: Freezes <thead> ...</thead> portion of table while scrolling 
           vertically or horizontally.
* Usage: $("#tableID").FixHeader([ignoreColspan]);
* Arguments: ignoreColspan -> true : when at least one thead column spans multiple columns in tbody
                           -> false: when at least one thead column spans multiple columns in thead 
* Thanks to jquery.stickytable.js plugin 
  from http://blog.bollysite.com/2010/08/09/jquery-fixed-table-header-plugin/
*/

(function($) {
    $.fn.FixHeader = function(ignoreColspan) {

        var tableID = "#" + $(this).attr('id');

        var theadBackground = $(tableID + " thead").css("background-color");

        //if no background for header, make background white
        if (theadBackground == "transparent") {
            theadBackground = "white";
            $(tableID + " thead").css("background-color", "white");
        }

        //add a div for fixed header
        $(this).parent().append("<div id='FixedHeaderContainer' style='background:" + theadBackground + "'><table id='FixedHeader'></table></div>");

        $(tableID + " thead").clone().appendTo('#FixedHeader');

        //get the class of the table       
        var tableClass = $(this).attr('class');

        $("#FixedHeader").attr('class', tableClass);

        $("#FixedHeader").css('z-index', '10');

        $("#FixedHeader").css('border-collapse', 'collapse');

        $("#FixedHeader").css('position', 'fixed');

        //ie 6 doesn't have 'fixed' postitioning
        if ($.browser.msie && $.browser.version.substr(0, 1) < 7)
            $("#FixedHeader").css('position', 'absolute');

        AdjustWidth();

        $("#FixedHeaderContainer").hide();

        //get the original left and top
        var cutoffTop = $(this).offset().top;

        var cutoffLeft = $(this).offset().left;

        $(window).scroll(function() {

            //current left and top
            var currentTop = $(document).scrollTop();

            var currentLeft = $(document).scrollLeft();

            //vertical scroll detected
            if (currentTop > cutoffTop) {

                $('#FixedHeaderContainer').show();

                //ie 6 
                if ($('#FixedHeader').css('position') == "absolute") {

                    $('#FixedHeader').css('top', currentTop + 'px');

                    $('#FixedHeaderContainer').css('left', (cutoffLeft - currentLeft) + 'px');

                }
                else { //other browsers

                    $('#FixedHeader').css('margin', '0px 0px 0px 0px');

                    $('#FixedHeader').css('top', '0px');

                    $('#FixedHeader').css('left', (cutoffLeft - currentLeft) + 'px');
                }

            }
            else {
                $('#FixedHeaderContainer').hide();
            }

        });

        function AdjustWidth() {

            var tableWidth = $(tableID).outerWidth(true);

            var theadCells = $(tableID + " thead td");

            var fixedCells = $("#FixedHeader thead td");

            for (var j = 0; j < theadCells.length; j++) {

                //remove any colspans for fixed header
                if ($(fixedCells[j]).attr('colspan') && ignoreColspan)
                    $(fixedCells[j]).attr('colspan', '1');

                //assign fixed width to each thead cell
                $(fixedCells[j]).width($(theadCells[j]).width());
            }

            $('#FixedHeader').width(tableWidth);           

        }

        //adjust width when resized
        $(window).resize(function() {
            AdjustWidth();
        });

        return $(this);
    };
})(jQuery);