"use strict";

var currentRound = "";
var currentYear = 2020;

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
    $("#selectYear option[value=" + currentYear +"]").prop("selected", true);

    selectYearAJAX();
});

$("#roundSelector").click(function(e) {
    console.log("Round = " + e.val());

    $.ajax({
        url: "/matches/year/" + $("#selectYear").val() + "/round/" + e.val(),
        method: "GET",
        beforeSend: function() {
            $("#divMatches").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function(data) {
            $("#divRounds").html("");

            data.forEach(e => {
                var match = "";
                match += '<div class="btn-group-toggle mb-2" data-toggle="buttons">';
                match += '<label class="btn btn-outline-primary mr-3">';
                match += '<input type="radio" name="options" id="home">' + e.homeTeam;
                match += '</label>';
                match += '<span class="mr-3">v</span>';
                match += '<label class="btn btn-outline-primary mr-3">';
                match += '<input type="radio" name="options" id="away">' + e.awayTeam;
                match += '</label>';
                match += '<span class="badge badge-secondary">@ ' + e.ground + '</span>';
                match += '</div>';

                $("#divMatches").append(match);
            });
        }
    });
});

function selectYearAJAX() {
    $.ajax({
        url: "/rounds/year/" + $("#selectYear").val(),
        method: "GET",
        beforeSend: function() {
            $("#divRounds").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function(data) {
            currentRound = data.currentRound;
            console.log(currentRound);

            $("#divRounds").html("");

            if (data.preliminary.length != 0) {
                var paginationPreliminary = "";
                paginationPreliminary += '<p class="card-text">Preliminary</p>';
                paginationPreliminary += '<ul class="pagination">';
                paginationPreliminary += '<li class="page-item"><a class="page-link" href="#" onclick="paginationPrev()">Previous</a></li>';
                data.preliminary.forEach(e => {
                    paginationPreliminary += '<li class="page-item" id="roundSelector"><a class="page-link" href="#" onclick="drawMatches(event.target.text); paginationActivate(event.target)">' + e + '</a></li>';
                });
                paginationPreliminary += '<li class="page-item"><a class="page-link" href="#" onclick="paginationNext()">Next</a></li>';
                paginationPreliminary += '<li class="page-item"><a class="page-link" href="#" onclick="paginationCurrent()">Current</a></li>';
                paginationPreliminary += '</ul>';

                $("#divRounds").append(paginationPreliminary);
            }

            var paginationHA = "";
            paginationHA += '<p class="card-text">Home Away</p>';
            paginationHA += '<ul class="pagination">';
            paginationHA += '<li class="page-item"><a class="page-link" href="#" onclick="paginationPrev()">Previous</a></li>';
            data.HA.forEach(e => {
                paginationHA += '<li class="page-item" id="roundSelector"><a class="page-link" href="#" onclick="drawMatches(event.target.text); paginationActivate(event.target)">' + e + '</a></li>';
            });
            paginationHA += '<li class="page-item"><a class="page-link" href="#" onclick="paginationNext()">Next</a></li>';
            paginationHA += '<li class="page-item"><a class="page-link" href="#" onclick="paginationCurrent()">Current</a></li>';
            paginationHA += '</ul>';

            $("#divRounds").append(paginationHA);

            if (data.finals.length != 0) {
                var paginationFinals = "";
                paginationFinals += '<p class="card-text">Finals</p>';
                paginationFinals += '<ul class="pagination">';
                paginationFinals += '<li class="page-item"><a class="page-link" href="#" onclick="paginationPrev()">Previous</a></li>';
                data.finals.forEach(e => {
                    paginationFinals += '<li class="page-item" id="roundSelector"><a class="page-link" href="#" onclick="drawMatches(event.target.text); paginationActivate(event.target)">' + e + '</a></li>';
                });
                paginationFinals += '<li class="page-item"><a class="page-link" href="#" onclick="paginationNext()">Next</a></li>';
                paginationFinals += '<li class="page-item"><a class="page-link" href="#" onclick="paginationCurrent()">Current</a></li>';
                paginationFinals += '</ul>';

                $("#divRounds").append(paginationFinals);
            }

            // If current year select current round
            if ($("#selectYear").val() == currentYear) {
                paginationCurrent();
            }
        }
    });
};

function drawMatches(round) {
    $.ajax({
        url: "/matches/year/" + $("#selectYear").val() + "/round/" + round,
        method: "GET",
        beforeSend: function() {
            $("#divMatches").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function(data) {
            $("#divMatches").html("");

            data.forEach(e => {
                var match = "";
                match += '<div class="btn-group-toggle mb-2" data-toggle="buttons">';
                match += '<label class="btn btn-outline-primary mr-3">';
                match += '<input type="radio" name="options" id="home">' + e.homeTeam;
                if (e.matchStatus != "") {
                    match += '<span class="ml-2 badge badge-secondary">' + e.homePoints + '</span>';
                }
                match += '</label>';
                match += '<span class="mr-3">v</span>';
                match += '<label class="btn btn-outline-primary mr-3">';
                match += '<input type="radio" name="options" id="away">' + e.awayTeam;
                if (e.matchStatus != "") {
                    match += '<span class="ml-2 badge badge-secondary">' + e.awayPoints + '</span>';
                }
                match += '</label>';
                match += '<span class="badge badge-secondary">@ ' + e.ground + '</span>';
                match += '</div>';

                $("#divMatches").append(match);
            });
        }
    });
};

// +---------------------------+
// |                           |
// |    Pagination Controls    |
// |                           |
// +---------------------------+

function paginationActivate(e) {
    // Deactivate all
    $('#divRounds').find('li').removeClass('active');

    // Activate target
    $(e).parent().addClass('active');
};

function paginationNext() {
    // Get current active
    var current = $('#divRounds').find('li.active');

    // Deactivate all
    $('#divRounds').find('li').removeClass('active');

    // Get next
    var next = current.next('#roundSelector');

    // Activate next
    next.addClass('active');

    // Call drawMatches
    drawMatches(next.text());
}

function paginationPrev() {
    // Get current active
    var current = $('#divRounds').find('li.active');

    // Deactivate all
    $('#divRounds').find('li').removeClass('active');

    // Get previous
    var prev = current.prev('#roundSelector');

    // Activate previous
    prev.addClass('active');

    // Call drawMatches
    drawMatches(prev.text());
}

function paginationCurrent() {
    // Get target
    var target = $('#divRounds').find('li:contains('+ currentRound + ')').filter(function(index) { return $(this).text() == currentRound; });

    // Deactivate all
    $('#divRounds').find('li').removeClass('active');

    // Activate target
    target.addClass('active');

    // Call drawMatches
    drawMatches(currentRound);
}

// Select current on load
//     Called in selectYearAJAX to ensure proper loading oder

// +----------------------+
// |                      |
// |    Match Controls    |
// |                      |
// +----------------------+

$('#matchesClear').click(function() {
    // Deactivate all
    $('#divMatches').find('label').removeClass('active');
});