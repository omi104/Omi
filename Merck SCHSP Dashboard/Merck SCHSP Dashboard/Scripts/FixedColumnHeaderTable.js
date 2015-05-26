// Created By : Sarah Harun  [ Last Updated : May 15 2012 ]


var FixedColumnTable = {
    

        /***************  Settings widths  ***************/
        AdjustTableWidth: function (divWidth,tableWidth) {

            var $sfhtData = $('.sfhtData').width(divWidth); //for sfhtData
            var $mainTable = $sfhtData.find('table').width(tableWidth);
            
            var $sfhtHeader = $('.sfhtHeader').width(divWidth-17); //for sfhtHeader(for vertical scrollbar space using -17)(problem:when no vertical scrollbar)
            var $sfhtTable = $sfhtHeader.find('table').width(tableWidth);

            var $freezCol = $('.freezCol');             //for freezCol
            var $freezColTable = $freezCol.find('table');

            var $freezColHeader = $('.freezColHeader'); // for freezColHeader
            var $freezColHeaderTable = $freezColHeader.find('table');

            $mainTable.find('thead tr:last th').each(function (index) {
                $sfhtTable.find('th:nth(' + index + ')').width($(this).width()); //setting:: sfhtHeader->Table->th.width = sfhtData->Table->th.width 
                $freezColHeaderTable.find('th:nth(' + index + ')').width($(this).width()); //setting:: freezColHeader->Table->th.width = sfhtData->Table->th.width 
            });

            var freezeColTotalWidth = 0;
            var fixedColWidth = 0;

            //calculate:: total width of the fixed columns in sfhtData->Table
            $freezCol.find('table thead tr:last th').each(function (index) {
                fixedColWidth = $mainTable.find('th:nth(' + index + ')').width();
                freezeColTotalWidth += fixedColWidth;
            });

            $freezColTable.width(freezeColTotalWidth); //setting:: total width of freezCol->Table 
            $freezColHeaderTable.width(freezeColTotalWidth); //setting:: total width of freezColHeader->Table
        },




    /***************    Settings heights   ***************/
    AdjustTableHeight: function() {

        var $sfhtData = $('.sfhtData');             // for sfhtData
        var $freezColHeader = $('.freezColHeader'); // for freezColHeader
        var $freezCol = $('.freezCol');             // for freezCol
        var maxHeight = -1111;

        var scrollHeight = $('.sfhtTable').innerHeight() - 17;
        $('.freezCol').height(scrollHeight);

        /*
        * Setting of heights is not necessary if header has data. But in some case there is no data in fixed column header.
        * Setting of heights is necessary where there is no data in header.
        */

        //Calculating:: height for freezColHeader and freezCol from sfhtData->Table->th
        $sfhtData.find('table thead tr th').each(function () {
            if ($(this).height() > maxHeight)
                maxHeight = $(this).height();
        });
    
        //Setting:: freezColHeader Table Header Height
        $freezColHeader.find('table thead tr th').each(function () {
            $(this).height(maxHeight);
        });

        //Setting:: freezCol Table Header Height
        $freezCol.find('table thead tr:first th').each(function () {
            $(this).height(maxHeight);
        });
    },



  /********** Populate Fixed Column Table **********/
    PopulateTable: function (tableId, divWidth, tableWidth) {
    
        /* Adjust height and width of overlapping divs */
        FixedColumnTable.AdjustTableWidth(divWidth,tableWidth);
        FixedColumnTable.AdjustTableHeight();

        /* to scroll two div(data and header) horizontally together */
        $('.sfhtData').scroll(function () { $('.sfhtHeader').scrollLeft(jQuery(this).scrollLeft()); });

        /* to scroll two div(freeze and data) vertically together */
        $('.sfhtData').scroll(function () { $('.freezCol').scrollTop(jQuery(this).scrollTop()); });
    
    }  
};






