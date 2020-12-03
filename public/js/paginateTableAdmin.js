$(document).ready(function () {
    $('#dtBasicExample').DataTable({
        "pagingType": "full" // "simple" option for 'Previous' and 'Next' buttons only
    });
    $('.dataTables_length').addClass('bs-select');
});