$("#btnRefreshData").click(function() {
    $.ajax({
        url: "/refreshdata",
        method: "GET"
    })
});

$("#selectYear").change(function() {
    selectYearAJAX();
});

$(document).ready(function() {
    $("#selectYear option[value='2020']").prop("selected", true);

    selectYearAJAX();
});

function selectYearAJAX() {
    $.ajax({
        url: "/rounds/year/" + $("#selectYear").val(),
        method: "GET",
        beforeSend: function() {
            $("#divRounds").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function(data) {
            $("#divRounds").html("");

            if (data.preliminary.length != 0) {
                var paginationPreliminary = "";
                paginationPreliminary += '<p class="card-text">Preliminary</p>';
                paginationPreliminary += '<ul class="pagination">';
                paginationPreliminary += '<li class="page-item"><a class="page-link" href="#">Previous</a></li>';
                data.preliminary.forEach(e => {
                    paginationPreliminary += '<li class="page-item"><a class="page-link" href="#">' + e + '</a></li>';
                });
                paginationPreliminary += '<li class="page-item"><a class="page-link" href="#">Next</a></li>';
                paginationPreliminary += '<li class="page-item"><a class="page-link" href="#">Current</a></li>';
                paginationPreliminary += '</ul>';

                $("#divRounds").append(paginationPreliminary);
            }

            var paginationHA = "";
            paginationHA += '<p class="card-text">Home Away</p>';
            paginationHA += '<ul class="pagination">';
            paginationHA += '<li class="page-item"><a class="page-link" href="#">Previous</a></li>';
            data.HA.forEach(e => {
                paginationHA += '<li class="page-item"><a class="page-link" href="#">' + e + '</a></li>';
            });
            paginationHA += '<li class="page-item"><a class="page-link" href="#">Next</a></li>';
            paginationHA += '<li class="page-item"><a class="page-link" href="#">Current</a></li>';
            paginationHA += '</ul>';

            $("#divRounds").append(paginationHA);

            if (data.finals.length != 0) {
                var paginationFinals = "";
                paginationFinals += '<p class="card-text">Finals</p>';
                paginationFinals += '<ul class="pagination">';
                paginationFinals += '<li class="page-item"><a class="page-link" href="#">Previous</a></li>';
                data.finals.forEach(e => {
                    paginationFinals += '<li class="page-item"><a class="page-link" href="#">' + e + '</a></li>';
                });
                paginationFinals += '<li class="page-item"><a class="page-link" href="#">Next</a></li>';
                paginationFinals += '<li class="page-item"><a class="page-link" href="#">Current</a></li>';
                paginationFinals += '</ul>';

                $("#divRounds").append(paginationFinals);
            }
        }
    });
}