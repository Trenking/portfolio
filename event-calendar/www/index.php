<?php
require_once 'config.php';
require_once 'functions.php';
$events = get_events();
$events = get_json($events, false);
?>
<!DOCTYPE HTML 5>
<html>
<head>
    <meta charset="utf-8">
    <title>Календарь событий</title>
    <link rel="stylesheet" href="jQueryEventCalendar/css/eventCalendar.css">
    <link rel="stylesheet" href="jQueryEventCalendar/css/eventCalendar_theme_responsive.css">
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <div id='eventCalendar'>
    </div>
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="jQueryEventCalendar/js/moment.js"></script>
    <script src="jQueryEventCalendar/js/jquery.eventCalendar.js"></script>
    <script>
    $(function(){
        
        var data = <?php echo $events; ?>;
        $('#eventCalendar').eventCalendar({
            jsonData:data,
            dateFormat: 'dddd DD-MM-YYYY',
            jsonDateFormat:'human',
            openEventInNewWindow:true,
            locales: {
                locale: "ru",
                monthNames: [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                    "Июль", "Август", "Сенябрь", "Октябрь", "Ноябрь", "Декабрь" ],
                dayNames: [ 'Воскресенье','Понедельник','Вторник','Среда',
                    'Четверг','Пятница','Суббота' ],
                dayNamesShort: [ 'Вс','Пн','Вт','Ср', 'Чт','Пт','Сб' ],
                txt_noEvents: "Нет событий на данный период",
                txt_SpecificEvents_prev: "",
                txt_SpecificEvents_after: ":",
                txt_next: "Следующее",
                txt_prev: "Предыдущее",
                txt_NextEvents: "Следующие события:",
                txt_GoToEventUrl: "Посмотреть событие",
                moment: {
                    "months" : [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                    "Июль", "Август", "Сенябрь", "Октябрь", "Ноябрь", "Декабрь" ],
                    "monthsShort" : [ "Янв", "Фев", "Мрт", "Апр", "Май", "Июн",
                            "Июл", "Авг", "Сен", "Окт", "Нбр", "Дек" ],
                    "weekdays" : [ 'Воскресенье','Понедельник','Вторник','Среда',
                    'Четверг','Пятница','Суббота' ],
                    "weekdaysShort" : [ "Вс","Пн","Вт","Ср","Чт","Пн","Сб" ],
                    "weekdaysMin" : [ "Вс","Пн","Вт","Ср","Чт","Пн","Сб" ],
                    "longDateFormat" : {
                        "LT" : "H:mm",
                        "LTS" : "LT:ss",
                        "L" : "DD/MM/YYYY",
                        "LL" : "D [de] MMMM [de] YYYY",
                        "LLL" : "D [de] MMMM [de] YYYY LT",
                        "LLLL" : "dddd, D [de] MMMM [de] YYYY LT"
                    },
                    "week" : {
                        "dow" : 1,
                        "doy" : 4
                    }
                }
              }
        });
    });
    </script>
</body>
</html>