$(document).ready(function () {
    var cTable = $("#myList");
    size_li = $("#myList > tbody > tr").size();
    var cRows = cTable.find('tr:gt(0)');
    var cRowCount = cRows.size();
    $('#myList > tbody > tr').hide();
    x=10;
    $('#myList > tbody > tr:lt('+x+')').show();
    $('#loadMore').click(function () {
        x= (x+10 <= size_li) ? x+10 : size_li;
        $('#myList > tbody > tr:lt('+x+')').show();        
        //$('#myList li:lt('+x+')').show();
    });
    $('#showLess').click(function () {
        x=(x-2<0) ? 3 : x-2;
        $('#myList > tbody >tr ').not(':lt('+x+')').hide();
    });
});