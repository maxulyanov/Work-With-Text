$(function(){
    //
    var result = $('#result');
    var spanS = $('<span>Знаков c пробелами: </span>');
    var spanN = $('<span>Знаков без пробелами: </span>');
    var spanW = $('<span>Слов: </span>');
    var spanUW = $('<span>Уникальных слов: </span>');
    var spanO = $('<span>Предложений: </span>');
    var spanSN = $('<span>Пробелов: </span>');
    var spanCN = $('<span>Запятых: </span>');
    ok();

    //Действие
    $('#go').on('click', function(){
        var val = $('textarea').val();
        var croplen = $('#cropLenTxt').val();
        var replaceX = $('#replaceTxt').val();
        if(val == ' ' || val == false){
            overlay();
            return false;
        }
        $('#result').css('top', '-150px')

        var noSpaces = val.length;
        var spaces = val.replace(/ /g, "").length;
        var words = val;
        words = words.replace(/\r\n?|\n/g, ' ')
        .replace(/ {2,}/g, ' ').replace(/^ /, '').replace(/ $/, '');
        words = words.split(' ').length;
        var offer = val;
        offer = offer.split('.').length;
        var uniqueElem = val;
        uniqueElem = uniqueElem.split(' ');
        var finalUnique = unique(uniqueElem);
        finalUnique = finalUnique.length;
        var sp = val;
        var spacesN = lenSpan(sp);
        var com = val;
        var comNFinal = comN(com);

        reset();

        //Добавление результатов  
        $(spanS).append('<strong>' + noSpaces + '</strong>');
        $(spanS).appendTo(result);
        $(spanN).append('<strong>' + spaces + '</strong>');
        $(spanN).appendTo(result)
        $(spanW).append('<strong>' + words + '</strong>');
        $(spanW).appendTo('#result')
        $(spanUW).append('<strong>' + finalUnique + '</strong>');
        $(spanUW).appendTo('#result')
        $(spanO).append('<strong>' +  offer + '</strong>');
        $(spanO).appendTo('#result')
        $(spanSN).append('<strong>' +  spacesN + '</strong>');
        $(spanSN).appendTo('#result')
        $(spanCN).append('<strong>' +  comNFinal + '</strong>');
        $(spanCN).appendTo('#result')

        $('#result').animate({
            top : '0px'
        }, 800)

        if($('#tolower').prop("checked")) makeToLower(val);
        if($('#toupper').prop("checked")) makeToUpper(val);
        if($('#charAt').prop("checked")) makecharAt(val);
        if($('#cropTxt').prop("checked"))makeCrop(val, croplen);
        if($('#cropTag').prop("checked")){$('textarea').val(makeCropTag(val))};
        if($('#translate').prop("checked")){$('textarea').val(transliterate(val))};
        if($('#replaceSp').prop("checked")){$('textarea').val(makeReplace(val, replaceX))};


    });

    //Сброс
    $('#reset').on('click', function(){
        $('#result').css('top', '-150px');
    });
    

    //Закрыть затемнение
     $('#ok').on('click', function(){
        ok();
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

    //Ввод только целых чисел
    $('#cropLenTxt').bind("change keyup input click", function() {
        if(this.value.match(/[^0-9]/g)){
        this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    //Транслит
    transliterate =(
        function(){
            var
                rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
                eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
            ;
            return function(text, engToRus) {
                var x;
                for(x = 0; x < rus.length; x++) {
                    text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
                    text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase()); 
                }
                return text;
            }
        }
    )();

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
    };

    function makeCrop(val, croplen){
        $('textarea').val(val.substr(0,croplen));
    };

    function unique(arr){
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            if(arr[i] == ''){
                delete arr[i];
            }
            else{
                var str = arr[i].toLowerCase();
                obj[str] = true;
            }
        }
        return Object.keys(obj);
    };

    function lenSpan(sp){
        return sp.split(' ').length-1;
    }

    function comN(com){
        return com.split(',').length-1;
    }

    function makeCropTag(val){
        return  val.replace(/<.*?>/g, '');
    }

    function makeReplace(val, replaceX){
        return  val.replace(/ /g, replaceX);
    };

    function overlay(){
        $('#overlay').animate({
            'opacity': '0.4',
            'z-index' : '4'
        }, 200)
        $('#overcontent').animate({
            'opacity': '1',
            'z-index' : '5'
        }, 200)
    };

    function ok(){
        $('#overlay, #overcontent').css({
            'opacity': '0',
            'z-index' : '0'
        })
    };


});