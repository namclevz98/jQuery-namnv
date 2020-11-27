$(document).ready(function (data) {
    data = dataJson;
    let positionsData = '';
    let officesData = '';
    $.each(dataJson.positions, function (sm, data) {
        positionsData += '<option data-v="' + data.id + '" value="' + data.id + '">' + data.name + '</option>';
    });
    $.each(dataJson.offices, function (sm, data) {
        officesData += '<option data-v="' + data.id + '" value ="' + data.id + '">' + data.name + '</option>';
    });
    $.each(dataJson.users, function (key, value) {
        createRow(key, value);
    });
    $('#dataTable tbody').html(dataJson);
    $('.selectPositions').append(positionsData);
    $('.selectOffices').append(officesData);

    $(this).find('.selectPositions').each(function (s) {
        var id = $(this).attr('data-id');
        var val = $(this).val(id);
        val.find("option[value=" + id + "]").attr('selected', true);
    });
    $(this).find('.selectOffices').each(function (s) {
        var id = $(this).attr('data-id');
        var val = $(this).val(id);
        val.find("option[value=" + id + "]").attr('selected', true);
    });

    $('#dataTable').on('click', 'tr', function () {
        var id = $(this).find('td:eq(0)').text();
        var name = $(this).find('td:eq(1)').text();
        var position = $(this).find('td:eq(2)').find('option:selected').text();
        var salary = $(this).find('td:eq(3)').find('input').val();
        var start_date = $(this).find('td:eq(4)').find('input').val();
        var office = $(this).find('td:eq(5)').find('option:selected').text();
        var extn = $(this).find('td:eq(6)').text();

        $('#nameDetail').val(name);
        $('#positionDetail').val(position);
        $('#salaryDetail').val(salary);
        $('#start_dateDetail').val(start_date);
        $('#officeDetail').val(office);
        $('#extnDetail').val(extn);
    });

    $('#btnSearch').on('click', function () {
        search();
    });

    $('#btnClear').on('click', function () {
        reset();
    });

    $('#btnSave').on('click', function () {
        save();
    });

})
function createRow(key, value) {
    dataJson += '<tr>';
    dataJson += '<td>' + value.id + '</td>';
    dataJson += '<td>' + value.name + '</td>';
    dataJson += '<td> <select class="selectPositions" data-id="' + value.position + '"> </select></td>';
    dataJson += '<td> <input type="text" value="' + value.salary + '"></td>';
    dataJson += '<td> <input type="date" value="' + value.start_date + '"></td>';
    dataJson += '<td> <select class="selectOffices" data-id="' + value.office + '"> <select></td>';
    dataJson += '<td>' + value.extn + '</td>';
    dataJson += '<td> <button type="button" class="btn btn-danger">Delete</button></td>';
    dataJson += '</tr>';
}


function reset() {
    $('#idSearch').val('');
    $('#nameSearch').val('');
}

function search() {
    $.each($('#dataTable tbody tr'), function () {
        // if ($(this).find('td:eq(0)').text() != $('#idSearch').val())
        if ($(this).text().toLowerCase().indexOf($('#idSearch').val().toLowerCase()) === -1) {
            $(this).hide();
        } else if ($(this).text().toLowerCase().indexOf($('#nameSearch').val().toLowerCase()) === -1) {
            $(this).hide();
        } else {
            $(this).show();
        }
    })
}

function save() {
    var data = new Array();
    $.each($('#dataTable tbody tr'), function () {
        var item = {
            id: $(this).find('td:eq(0)').text(),
            name: $(this).find('td:eq(1)').text(),
            position: $(this).find('td:eq(2)').find('option:selected').text(),
            salary: $(this).find('td:eq(3)').find('input').val(),
            started_date: $(this).find('td:eq(4)').find('input').val(),
            office: $(this).find('td:eq(5)').find('option:selected').text(),
            extn: $(this).find('td:eq(6)').text()
        };
        data.push(item);
    });
    console.log(data);
}
