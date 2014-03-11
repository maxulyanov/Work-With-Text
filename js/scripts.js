$(function(){
    //
    var result = $('#result');
    var spanS = $('<span>Знаков c пробелами: </span>');
    var spanN = $('<span>Знаков без пробелами: </span>');
    var spanW = $('<span>Слов: </span>');

    //Действие
    $('#go').on('click', function(){
        var val = $('textarea').val();
        if(val == ' ' || val == false){
            alert('Введите текст!');
            return false;
        }
        var noSpaces = val.length;
        var spaces = val.replace(/ /g, "").length;
        var words = val;
        words = words.replace(/\r\n?|\n/g, ' ')
        .replace(/ {2,}/g, ' ').replace(/^ /, '').replace(/ $/, '');
        words = words.split(' ').length;
  
        reset();

        //Добавление результатов  
        $(spanS).append('<strong>' + noSpaces + '</strong>');
        $(spanS).appendTo(result);
        $(spanN).append('<strong>' + spaces + '</strong>');
        $(spanN).appendTo(result)
        $(spanW).append('<strong>' + words + '</strong>');
        $(spanW).appendTo('#result')


        if($('#tolower').prop("checked")) makeToLower(val);
        if($('#toupper').prop("checked")) makeToUpper(val);
        if($('#charAt').prop("checked")) makecharAt(val);

    });

    //Проверка чекбоксов на противоречия
    $('input[type="checkbox"]').on('click', function(){
        if($('#tolower').prop("checked")){
            $('#toupper').attr('disabled', 'disabled')
        }
        else{
            $('#toupper').removeAttr('disabled')
        }
        if($('#toupper').prop("checked")){
            $('#tolower').attr('disabled', 'disabled')
        }
        else{
            $('#tolower').removeAttr('disabled')
        }
    })

    //Функции
    function makeToLower(val){
        $('textarea').val(val.toLowerCase());
    };

    function makeToUpper(val){
        $('textarea').val(val.toUpperCase());
    };

    function makecharAt(val){
        var arr = [];
        val = val.split(' ');
        for(var i = 0; i < val.length; i++){
            var newStr = val[i].charAt(0).toUpperCase();
            for(var j = 1; j < val[i].length; j++){
                newStr += val[i].charAt(j)
            } 
            arr.push(newStr);    
        }
        arr = arr.join(' ');  
        $('textarea').val(arr);
    };

    function reset(){
        $(document).find('#result span, #result strong').remove();
    }
});