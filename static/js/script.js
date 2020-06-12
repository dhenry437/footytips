$("#btnRefreshData").on('click', function() {
    $.ajax({
        url: '/refreshdata',
        method: 'GET'
    })
})