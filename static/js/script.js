"use strict";

var currentRound = "";
var currentYear = 2021;

$.fn.exists = function () {
    return this.length !== 0;
}

$("#btnRefreshData").click(function () {
    var input = prompt("Authorize");
    if (input === null) {
        return; //break out of the function early
    }

    $.ajax({
        url: "/refreshdata",
        method: "POST",
        data: {
            input: input
        },
        beforeSend: function () {
            $.toast({
                text: "Refreshing...", // Text that is to be shown in the toast
                heading: 'Refresh Data', // Optional heading to be shown on the toast
                icon: 'info', // Type of toast icon
                showHideTransition: 'fade', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                textAlign: 'left', // Text alignment i.e. left, right or center
                loader: false, // Whether to show loader or not. True by default
            });
        },
        success: function () {
            $.toast({
                text: "Done", // Text that is to be shown in the toast
                heading: 'Refresh Data', // Optional heading to be shown on the toast
                icon: 'success', // Type of toast icon
                showHideTransition: 'fade', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                textAlign: 'left', // Text alignment i.e. left, right or center
                loader: false, // Whether to show loader or not. True by default
            });
        },
        statusCode: {
            401: function () {
                $.toast({
                    text: "Invalid password", // Text that is to be shown in the toast
                    heading: 'Refresh Data', // Optional heading to be shown on the toast
                    icon: 'error', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    textAlign: 'left', // Text alignment i.e. left, right or center
                    loader: false, // Whether to show loader or not. True by default
                });
            }
        }
    })
});

$("#selectYear").change(function () {
    selectYearAJAX();
});

$(document).ready(function () {
    $("#selectYear option[value=" + currentYear + "]").prop("selected", true);

    selectYearAJAX();
});

function selectYearAJAX() {
    $.ajax({
        url: "/rounds/year/" + $("#selectYear").val(),
        method: "GET",
        beforeSend: function () {
            $("#divRounds").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function (data) {
            currentRound = data.currentRound;

            if ($("#divRoundsMobile").css('display') == "block") {
                $("#divRoundsMobile").html("");

                var selectRounds = "";
                selectRounds += '<select class="form-control mb-3" onchange="drawMatches(this.value)" id="selectRounds">';
                data.preliminary.forEach(e => {
                    selectRounds += '<option value="' + e + '">' + e + '</option>';
                });
                data.HA.forEach(e => {
                    selectRounds += '<option value="' + e + '">' + e + '</option>';
                });
                data.finals.forEach(e => {
                    selectRounds += '<option value="' + e + '">' + e + '</option>';
                });
                selectRounds += '</select>';

                $("#divRoundsMobile").append(selectRounds);

                // If current year select current round
                if ($("#selectYear").val() == currentYear) {
                    $("#selectRounds option[value=" + currentRound + "]").prop("selected", true);

                    drawMatches(currentRound);
                }
            } else {
                $("#divRounds").html("");

                if (data.preliminary.length != 0) {
                    var paginationPreliminary = "";
                    paginationPreliminary += '<p class="card-text">Preliminary</p>';
                    paginationPreliminary += '<ul class="pagination">';
                    paginationPreliminary += '<li class="page-item"><a class="page-link" onclick="paginationPrev()">Previous</a></li>';
                    data.preliminary.forEach(e => {
                        paginationPreliminary += '<li class="page-item" id="roundSelector"><a class="page-link" onclick="drawMatches(event.target.text); paginationActivate(event.target)">' + e + '</a></li>';
                    });
                    paginationPreliminary += '<li class="page-item"><a class="page-link" onclick="paginationNext()">Next</a></li>';
                    paginationPreliminary += '<li class="page-item"><a class="page-link" onclick="paginationCurrent()">Current</a></li>';
                    paginationPreliminary += '</ul>';

                    $("#divRounds").append(paginationPreliminary);
                }

                var paginationHA = "";
                paginationHA += '<p class="card-text">Home Away</p>';
                paginationHA += '<ul class="pagination">';
                paginationHA += '<li class="page-item"><a class="page-link" onclick="paginationPrev()">Previous</a></li>';
                data.HA.forEach(e => {
                    paginationHA += '<li class="page-item" id="roundSelector"><a class="page-link" onclick="drawMatches(event.target.text); paginationActivate(event.target)">' + e + '</a></li>';
                });
                paginationHA += '<li class="page-item"><a class="page-link" onclick="paginationNext()">Next</a></li>';
                paginationHA += '<li class="page-item"><a class="page-link" onclick="paginationCurrent()">Current</a></li>';
                paginationHA += '</ul>';

                $("#divRounds").append(paginationHA);

                if (data.finals.length != 0) {
                    var paginationFinals = "";
                    paginationFinals += '<p class="card-text">Finals</p>';
                    paginationFinals += '<ul class="pagination">';
                    paginationFinals += '<li class="page-item"><a class="page-link" onclick="paginationPrev()">Previous</a></li>';
                    data.finals.forEach(e => {
                        paginationFinals += '<li class="page-item" id="roundSelector"><a class="page-link" onclick="drawMatches(event.target.text); paginationActivate(event.target)">' + e + '</a></li>';
                    });
                    paginationFinals += '<li class="page-item"><a class="page-link" onclick="paginationNext()">Next</a></li>';
                    paginationFinals += '<li class="page-item"><a class="page-link" onclick="paginationCurrent()">Current</a></li>';
                    paginationFinals += '</ul>';

                    $("#divRounds").append(paginationFinals);
                }

                // If current year select current round
                if ($("#selectYear").val() == currentYear) {
                    paginationCurrent();
                }
            }
        }
    });
};

function drawMatches(round) {
    $.ajax({
        url: "/matches/year/" + $("#selectYear").val() + "/round/" + round,
        method: "GET",
        beforeSend: function () {
            $("#divMatches").html('<div class="alert alert-secondary"><div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div></div>')
        },
        success: function (data) {
            $("#divMatches").html("");

            data.forEach(e => {
                var match = "";
                match += '<div class="btn-group-toggle" data-toggle="buttons">';
                match += '<label class="btn btn-outline-primary mr-3 my-1 teamSelector home">';
                match += '<input type="radio" name="options" id="home">' + e.homeTeam;
                if (e.matchStatus != "") {
                    match += '<span class="ml-2 badge badge-secondary">' + e.homePoints + '</span>';
                }
                match += '</label>';
                match += '<span class="mr-3">v</span>';
                match += '<label class="btn btn-outline-primary mr-3 my-1 teamSelector away">';
                match += '<input type="radio" name="options" id="away">' + e.awayTeam;
                if (e.matchStatus != "") {
                    match += '<span class="ml-2 badge badge-secondary">' + e.awayPoints + '</span>';
                }
                match += '</label>';
                match += '<span class="badge badge-secondary d-none d-sm-inline">@ ' + e.ground + '</span>';
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

    if (current.next('#roundSelector').length != 0) {
        // Deactivate all
        $('#divRounds').find('li').removeClass('active');

        // Get next
        var next = current.next('#roundSelector');

        // Activate next
        next.addClass('active');

        // Call drawMatches
        drawMatches(next.text());
    }
}

function paginationPrev() {
    // Get current active
    var current = $('#divRounds').find('li.active');

    if (current.prev('#roundSelector').length != 0) {
        // Deactivate all
        $('#divRounds').find('li').removeClass('active');

        // Get previous
        var prev = current.prev('#roundSelector');

        // Activate previous
        prev.addClass('active');

        // Call drawMatches
        drawMatches(prev.text());
    }
}

function paginationCurrent() {
    // Get target
    var target = $('#divRounds').find('li:contains(' + currentRound + ')').filter(function (index) { return $(this).text() == currentRound; });

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

$('#matchesClear').click(function () {
    // Deactivate all
    $('#divMatches').find('label').removeClass('active');
});

$('#matchesRandom').click(function () {
    // Deactivate all
    $('#divMatches').find('label').removeClass('active');

    $('#divMatches').find('div.btn-group-toggle').each(function () {
        if (Math.random() >= 0.5) {
            $(this).children('label:first').addClass('active');
        } else {
            $(this).children('label:last').addClass('active');
        }
    });
});

// +-------------+
// |             |
// |    Email    |
// |             |
// +-------------+

$('#sendEmail').click(function () {
    var messageText = "";
    var messageHTML = "";
    var round = -1;
    round = $('#divRounds').find('li.active').children('a').text() || $("#selectRounds").val();
    var name = $('#name').val();
    var ccEmail = $('#ccEmail').val();

    // Validate
    var form = $(this.form)[0]
    if (form.checkValidity() === false) {
        form.classList.add('was-validated');
        return;
    }

    messageText += name + "'s Round " + round + " Footy Tips\n";
    messageText += "\n";
    $('#divMatches').find('div.btn-group-toggle').each(function () {
        if ($(this).children('label:first').hasClass('active')) {
            messageText += "**" + $(this).children('label:first').text().replace(/[\$][0-9].[0-9]*/g, '') + "**";
        } else {
            messageText += $(this).children('label:first').text().replace(/[\$][0-9].[0-9]*/g, '');
        }
        messageText += " v "
        if ($(this).children('label:last').hasClass('active')) {
            messageText += "**" + $(this).children('label:last').text().replace(/[\$][0-9].[0-9]*/g, '') + "**" + "\n";
        } else {
            messageText += $(this).children('label:last').text().replace(/[\$][0-9].[0-9]*/g, '') + "\n";
        }
    });
    messageText += "\n";
    messageText += "Created using Footy Tipping v2\n";
    messageText += "footytipping.app\n";

    messageHTML += "<html>\n";
    messageHTML += "<body>\n";
    messageHTML += "<p>" + name + "'s Round " + round + " Footy Tips</p>\n";
    $('#divMatches').find('div.btn-group-toggle').each(function () {
        if ($(this).children('label:first').hasClass('active')) {
            messageHTML += "<b>" + $(this).children('label:first').text().replace(/[\$][0-9].[0-9]*/g, '') + "</b>";
        } else {
            messageHTML += $(this).children('label:first').text().replace(/[\$][0-9].[0-9]*/g, '');
        }
        messageHTML += " v "
        if ($(this).children('label:last').hasClass('active')) {
            messageHTML += "<b>" + $(this).children('label:last').text().replace(/[\$][0-9].[0-9]*/g, '') + "</b>";
        } else {
            messageHTML += $(this).children('label:last').text().replace(/[\$][0-9].[0-9]*/g, '');
        }
        messageHTML += "<br>\n"
    });
    messageHTML += "<br>\n";
    messageHTML += "<p>Created using Footy Tips v2<br>\n";
    messageHTML += "<a href='footytipping.app'>footytipping.app</a></p>\n";
    messageHTML += "<body>\n";
    messageHTML += "<html>\n";

    $.ajax({
        url: "/sendemail",
        method: "POST",
        data: {
            "toEmail": $('#toEmail').val(),
            "ccEmail": ccEmail,
            "text": messageText,
            "html": messageHTML,
            "name": name,
            "round": round,
            "g-recaptcha-response": grecaptcha.getResponse()
        },
        beforeSend: function () {
            $.toast({
                text: "Sending...", // Text that is to be shown in the toast
                heading: 'Email', // Optional heading to be shown on the toast
                icon: 'info', // Type of toast icon
                showHideTransition: 'fade', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                textAlign: 'left', // Text alignment i.e. left, right or center
                loader: false, // Whether to show loader or not. True by default
            });
        },
        success: function () {
            $.toast({
                text: "Email sent to " + $('#toEmail').val(), // Text that is to be shown in the toast
                heading: 'Email', // Optional heading to be shown on the toast
                icon: 'success', // Type of toast icon
                showHideTransition: 'fade', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                textAlign: 'left', // Text alignment i.e. left, right or center
                loader: false, // Whether to show loader or not. True by default
            });

            // Reset reCAPTCHA
            grecaptcha.reset()
        },
        statusCode: {
            401: function () {
                $.toast({
                    text: "Invalid reCAPTCHA", // Text that is to be shown in the toast
                    heading: 'Email', // Optional heading to be shown on the toast
                    icon: 'error', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    textAlign: 'left', // Text alignment i.e. left, right or center
                    loader: false, // Whether to show loader or not. True by default
                });

                // Reset reCAPTCHA
                grecaptcha.reset()
            },
            500: function () {
                $.toast({
                    text: "Failed to send email", // Text that is to be shown in the toast
                    heading: 'Email', // Optional heading to be shown on the toast
                    icon: 'error', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    textAlign: 'left', // Text alignment i.e. left, right or center
                    loader: false, // Whether to show loader or not. True by default
                });
            }
        }
    });
});

// +------------+
// |            |
// |    Odds    |
// |            |
// +------------+

$("#btnOdds").click(function () {
    console.log("btnOdds");

    if (!$('.oddsBadge').length) {
        $.toast({
            text: "You need to fetch the odds first. Use the dropdown arrow.", // Text that is to be shown in the toast
            heading: 'Missing Odds', // Optional heading to be shown on the toast
            icon: 'error', // Type of toast icon
            showHideTransition: 'fade', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 6000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
            stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
            textAlign: 'left', // Text alignment i.e. left, right or center
            loader: false, // Whether to show loader or not. True by default
        });
    }
    else {
        $('#divMatches').find('label').removeClass('active');

        $('#divMatches').find('div.btn-group-toggle').each(function () {
            if (parseFloat($(this).find('.home').find('.oddsBadge').text().substring(1)) <= parseFloat($(this).find('.away').find('.oddsBadge').text().substring(1))) {
                $(this).children('label:first').addClass('active');
            } else {
                $(this).children('label:last').addClass('active');
            }
        });
    }
})

$(".oddsType").click(function () {
    var selectedRound = $("#roundSelector.active").text() || $("#selectRounds").val()
    if (selectedRound == currentRound) {
        $.ajax({
            url: '/odds/type/' + this.id,
            method: "GET",
            beforeSend: function () {
                $.toast({
                    text: "Fetching...", // Text that is to be shown in the toast
                    heading: 'Odds', // Optional heading to be shown on the toast
                    icon: 'info', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    textAlign: 'left', // Text alignment i.e. left, right or center
                    loader: false, // Whether to show loader or not. True by default
                });
            },
            success: function (data) {
                var prevTeam = null;
                var prevTeamSelector = null;
                var count = 0;

                $('.oddsBadge').remove(); // Clear odds

                data.forEach(match => {
                    prevTeam = null;
                    prevTeamSelector = null;
                    count = 0;

                    match.forEach(team => {
                        count++;

                        if (count == 1 && $('.teamSelector:contains(' + team.team + ')').filter(function () { return $(this).text() === team.team ? true : false; }).exists()) {
                            prevTeam = team;
                            prevTeamSelector = $('.teamSelector:contains(' + team.team + ')').filter(function () { return $(this).text() === team.team ? true : false; });
                        }

                        if (count == 2 && prevTeamSelector != null) {
                            if (prevTeamSelector.parent().children('.teamSelector:contains(' + team.team + ')').filter(function () { return $(this).text() === team.team ? true : false; })) {
                                prevTeamSelector.parent().children('.teamSelector:contains(' + team.team + ')').filter(function () { return $(this).text() === team.team ? true : false; }).append('<br class="d-inline d-sm-none"><span class="ml-2 d-none d-sm-inline"></span><span class="badge badge-secondary oddsBadge">$' + team.odds + '</span>');
                                prevTeamSelector.append('<br class="d-inline d-sm-none"><span class="ml-2 d-none d-sm-inline"></span><span class="badge badge-secondary oddsBadge">$' + prevTeam.odds + '</span>');
                            }
                        }
                    })
                });

                $.toast({
                    text: "Done", // Text that is to be shown in the toast
                    heading: 'Odds', // Optional heading to be shown on the toast
                    icon: 'success', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    textAlign: 'left', // Text alignment i.e. left, right or center
                    loader: false, // Whether to show loader or not. True by default
                });
            },
            statusCode: {
                500: function () {
                    $.toast({
                        text: "Failed to fetch odds", // Text that is to be shown in the toast
                        heading: 'Odds', // Optional heading to be shown on the toast
                        icon: 'error', // Type of toast icon
                        showHideTransition: 'fade', // fade, slide or plain
                        allowToastClose: true, // Boolean value true or false
                        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                        position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                        textAlign: 'left', // Text alignment i.e. left, right or center
                        loader: false, // Whether to show loader or not. True by default
                    });
                }
            }
        });
    }
});

// +---------------+
// |               |
// |    Cookies    |
// |               |
// +---------------+

window.onload = (event) => {
    // Cookie Disclaimer
    if (Cookies.get('cookieDisclaimerDismised') == null) {
        var innerHTML = '';
        innerHTML += '<div class="alert alert-warning alert-dismissible fade show" role="alert" id="cookieDisclaimer">';
        innerHTML += '<strong>This app uses cookies.</strong> Cookies are used to enhance the user experience, by using this app you consent to the use of cookies.';
        innerHTML += '<button type="button" class="close" onclick="cookieDisclaimerDismiss()" data-dismiss="alert" aria-label="Close">';
        innerHTML += '<span aria-hidden="true">×</span>';
        innerHTML += '</button>';
        innerHTML += '</div>';

        $('#cookieDisclaimer').html(innerHTML);
    }

    if (Cookies.get('emailName') != null) {
        $('#name').val(Cookies.get('emailName'));
    }

    if (Cookies.get('emailToEmail') != null) {
        $('#toEmail').val(Cookies.get('emailToEmail'));
    }

    if (Cookies.get('emailCcEmail') != null) {
        $('#ccEmail').val(Cookies.get('emailCcEmail'));
    }
};

function cookieDisclaimerDismiss() {
    Cookies.set('cookieDisclaimerDismised', true);
};


// Save text
$('#name').focusout(function () {
    Cookies.set('emailName', $(this).val());
});

$('#toEmail').focusout(function () {
    Cookies.set('emailToEmail', $(this).val());
});

$('#ccEmail').focusout(function () {
    Cookies.set('emailCcEmail', $(this).val());
});
