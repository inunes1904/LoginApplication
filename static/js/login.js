// Verifica se a checkbox esta pressionada ou nao
$('input[name=checkbox]').change(function() {
    if ($(this).is(':checked')) {
        $('input[name=checkbox]').val('True')
    } else {
        $('input[name=checkbox]').val('False')
    }
    });
    