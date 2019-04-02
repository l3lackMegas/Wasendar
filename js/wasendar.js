function wasendarInit(option) {
    var panelTemplate = $('<div class="wasen-panel"><div id="wasen-head"></div><div id="wasen-body"></div></div>'),
        weekTemplate = $('<div class="wasen-week">'),
        dayTemplate = $('<div class="wasen-day"></div>'),
        currDate = new Date(),
        selectedDate = new Date(),
        isFirefox = typeof InstallTrigger !== 'undefined',
        wasuDateStr = function(type, val) {
            type = type.toLowerCase();
            var day = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.']
                fullDay = [
                    'อาทิตย์',
                    'จันทร์',
                    'อังคาร',
                    'พุธ',
                    'พฤหัสบดี',
                    'ศุกร์',
                    'เสา'
                ],
                month = [
                    'ม.ค.',
                    'ก.พ.',
                    'มี.ค.',
                    'ม.ย.',
                    'พ.ค.',
                    'ม.ย.',
                    'ก.ค.',
                    'ส.ค.',
                    'ก.ย.',
                    'ต.ค.',
                    'พ.ย.',
                    'ธ.ค.'
                ]
                fullMonth = [
                    'มกราคม',
                    'กุมภาพันธ์',
                    'มีนาคม',
                    'เมษายน',
                    'พฤษภาคม',
                    'มิถุนายน',
                    'กรกฎาคม',
                    'สิงหาคม',
                    'กันยายน',
                    'ตุลาคม',
                    'พฤศจิกายน',
                    'ธันวาคม'
                ];
            switch(type) {
                case "day": return day[val]; break;
                case "fullday": return fullDay[val]; break;
                case "month": return month[val]; break;
                case "fullmonth": return fullMonth[val]; break;
            }
        },
        wasenFormatDate = function(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
        
            return [day, month, year].join('-');
        },
        wasenGenerateMonth = function(today, isRT) {
            $('#wasen-body').html('');
            var fDay = new Date(today.getFullYear(), today.getMonth(), 1),
            lDay = new Date(today.getFullYear(), today.getMonth() + 1, 0),

            currentDate = 1,
            currentDay = 0;
            $('#wasenHeadText').html(wasuDateStr("fullMonth", today.getMonth()) + ' ' + today.getFullYear());
            $('#wasenHeadText').attr('state', 'day');
            $('#wasen-body', panelTemplate).html('');

            weekText = $(weekTemplate[0].outerHTML),
            weekTextDay = $(dayTemplate[0].outerHTML),
            week = $(weekTemplate[0].outerHTML),
            weekDay = $(dayTemplate[0].outerHTML);
            
            weekText.attr('id', 'wasenday-text');
            for (var index = 0; index <= 6; index++) {
                weekTextDay.html('<a>' + wasuDateStr('day', index) + '</a>');
                weekText.append(weekTextDay[0].outerHTML);
            }
            $('#wasen-body', panelTemplate).append(weekText[0].outerHTML);
            while(currentDate <= lDay.getDate()) {
                for (var index = 0; index <= 6; index++) {
                    weekDay = $(dayTemplate[0].outerHTML);
                    if(currentDay >= fDay.getDay() && currentDate <= lDay.getDate()) {
                        if(currentDate == currDate.getDate() && today.getMonth() == currDate.getMonth() && today.getFullYear() == currDate.getFullYear()) weekDay.addClass('today');
                        var fmDate = wasenFormatDate(new Date(today.getFullYear(), today.getMonth(), currentDate)),
                            cActive = '';
                        if(arrDate[fmDate]) cActive = ' active';
                        weekDay.html('<div class="circle' + cActive + '"><a>' + currentDate + '</a></div>');
                        weekDay.attr('data', fmDate);
                        week.append(weekDay[0].outerHTML);
                        currentDate++;
                    } else {
                        weekDay.css({
                            backgroundColor: 'unset',
                            cursor: 'inherit'
                        });
                        weekDay.html('');
                        week.append(weekDay[0].outerHTML);
                    }
                    currentDay++;
                }
                $('#wasen-body', panelTemplate).append(week[0].outerHTML);
                week.html('');
            }

            if(isRT == true) {
                if(isFirefox == true) {
                    panelTemplate.css({
                        filter: 'blur(2px) brightness(.9)',
                        backgroundColor: '#fff1fb'
                    });
                    return '<div id="unSupportText"><div class="text">ไม่รองรับการแสดงผล</div></div>' + panelTemplate[0].outerHTML;
                } else {
                    return panelTemplate[0].outerHTML;
                }
            } else {
                $('#wasen-body').html($('#wasen-body', panelTemplate).html());
            }
        },
        genYear = function(currentMonth, elm, tDate) {
            $('#wasen-body').html('');
            var week = $(weekTemplate[0].outerHTML),
                weekDay = $(dayTemplate[0].outerHTML);
            elm.attr('state', 'month');
            while(currentMonth <= 11) {
                week = $(weekTemplate[0].outerHTML);
                for (var index = 0; index <= 3; index++) {
                    weekDay = $(dayTemplate[0].outerHTML);
                    if(currentMonth == currDate.getMonth() && tDate.getFullYear() == currDate.getFullYear()) weekDay.addClass('today');
                    weekDay.html('<div class="circle"><a>' + wasuDateStr('fullMonth', currentMonth) + '</a></div>');
                    weekDay.attr('data', wasenFormatDate(new Date(tDate.getFullYear(), currentMonth)));
                    week.append(weekDay[0].outerHTML);
                    currentMonth++;
                }
                $('#wasen-body').append(week[0].outerHTML);
            }
            elm.html(tDate.getFullYear());
        },
        genYears = function(currentMonth, elm, tDate) {
            $('#wasen-body').html('');
            var week = $(weekTemplate[0].outerHTML),
                weekDay = $(dayTemplate[0].outerHTML);
            elm.attr('state', 'years');
            while(currentMonth <= (currDate.getFullYear() + 1)) {
                week = $(weekTemplate[0].outerHTML);
                weekDay = $(dayTemplate[0].outerHTML);
                if(currentMonth == currDate.getFullYear()) weekDay.addClass('today');
                weekDay.html('<div class="circle"><a>' + currentMonth + '</a></div>');
                weekDay.attr('data', wasenFormatDate(new Date(currentMonth, 0)));
                week.append(weekDay[0].outerHTML);
                currentMonth++;
                $('#wasen-body').append(week[0].outerHTML);
            }
            elm.html('เลือกปีที่ต้องการ');
        },
        arrDate = {},
        indexData = function(data, dateFrom, dateTo) {
            var whDate = dateFrom.getFullYear() + (dateFrom.getMonth() + 1) + dateFrom.getDate(),
                whI = 0;
            while(whDate <= (dateTo.getFullYear() + (dateFrom.getMonth() + 1) + dateTo.getDate())) {
                var arrWhKey = wasenFormatDate((dateFrom.getMonth() + 1) + '-' + (dateFrom.getDate() + whI) + '-' + dateFrom.getFullYear());
                if(arrDate[arrWhKey] == undefined) arrDate[arrWhKey] = [];
                arrDate[arrWhKey].push(data.event);
                whDate++;
                whI++;
            }
        };

        $.each(option.data, function(i, value) {
            switch (typeof value.from) {
                case 'string':
                    var crrFrmTime = new Date((value.from).split(' ')[0].split('-')[2], (value.from).split(' ')[0].split('-')[1] - 1, (value.from).split(' ')[0].split('-')[0]),
                        crr2Time = new Date((value.to).split(' ')[0].split('-')[2], (value.to).split(' ')[0].split('-')[1] - 1, (value.to).split(' ')[0].split('-')[0]);
                    break;
                    
                case 'number':
                    var crrFrmTime = new Date(value.from),
                        crr2Time = new Date(value.to);
                    break;
    
                default:
                    break;
            }
            indexData(value, crrFrmTime, crr2Time);
        });

        var targetMonth = new Date(),
        headHtml = '<p class="arrows"><i class="fas fa-angle-left"></i></p>' + 
            '<div id="wasenHeadText" state="day">' + wasuDateStr("fullMonth", currDate.getMonth()) + ' ' + currDate.getFullYear() + '</div>' + 
            '<p class="arrows right"><i class="fas fa-angle-right"></i></p>';

        $('#wasen-head', panelTemplate).html(headHtml);
    
        $(option.id).html(wasenGenerateMonth(targetMonth, true));

        var runFunction = function() {
            $('.wasen-day').click(function() {
                if(arrDate[$(this).attr('data')]) option.fn(this, arrDate[$(this).attr('data')]);
                if($('#wasenHeadText').attr('state') != "day") {
                    $('#wasenHeadText').css('opacity', '0');
                    $('#wasen-body').css('animation', 'zoomOutIn .5s forwards');
                    setTimeout(() => {
                        selectedDate = new Date($(this).attr('data'));
                        switch($('#wasenHeadText').attr('state')) {
                            case "years":
                                genYear(0, $('#wasenHeadText'), selectedDate);
                                break;
        
                            case "month":
                                wasenGenerateMonth(selectedDate);
                                break;
                        }
                        runFunction();
                        $('#wasenHeadText').css('opacity', '');
                        $('#wasen-body').css('animation', 'zoomIn .5s forwards');
                    }, 200);
                } else if($(this).attr('data') != undefined){
                    $('.wasen-day').each(function( index ) {
                        $(this).removeClass('selected');
                      });
                    $(this).addClass('selected');
                    selectedDate = new Date($(this).attr('data'));
                }
                $('.arrows').each(function( index ) {
                    $(this).css({
                        opacity: 1,
                        cursor: ''
                    })
                });
            });
        }

        $('#wasenHeadText').click(function() {
            if($(this).attr('state') != "years") {
                $(this).css('opacity', '0');
                $('#wasen-body').css('animation', 'zoomOut .5s forwards');
                setTimeout(() => {
                    switch($(this).attr('state')) {
                        case "day":
                            genYear(0, $(this), selectedDate);
                            break;
    
                        case "month":
                            $('.arrows').each(function( index ) {
                                $(this).css({
                                    opacity: 0,
                                    cursor: 'initial'
                                })
                            });
                            genYears((currDate.getFullYear() - 2), $(this), selectedDate);
                            break;
                    }
                    runFunction();
                    $(this).css('opacity', '');
                    $('#wasen-body').css('animation', 'zoomInOut .5s forwards');
                }, 200);
            }
        });

        $('.arrows').click(function() {
            if($(this).hasClass('right') == true && $('#wasenHeadText').attr('state') != "years") {
                $('#wasenHeadText').css('opacity', '0');
                $('#wasen-body').css('animation', 'fadeOutLeft .5s forwards');
                setTimeout(() => {
                    switch ($('#wasenHeadText').attr('state')) {
                        case "day":
                            selectedDate = new Date(selectedDate.getFullYear(), (selectedDate.getMonth() + 1), selectedDate.getDate());
                            wasenGenerateMonth(selectedDate);
                        break;
                
                        case "month":
                            selectedDate = new Date((selectedDate.getFullYear() + 1), selectedDate.getMonth(), selectedDate.getDate());
                            genYear(0, $('#wasenHeadText'), selectedDate);
                            break;
                    }
                    $('#wasenHeadText').css('opacity', '');
                    $('#wasen-body').css('animation', 'fadeInRight .5s forwards');
                    runFunction();
                }, 200);
            } else if($(this).hasClass('right') == false && $('#wasenHeadText').attr('state') != "years") {
                $('#wasenHeadText').css('opacity', '0');
                $('#wasen-body').css('animation', 'fadeOutRight .5s forwards');
                setTimeout(() => {
                    switch ($('#wasenHeadText').attr('state')) {
                        case "day":
                            selectedDate = new Date(selectedDate.getFullYear(), (selectedDate.getMonth() - 1), selectedDate.getDate());
                            wasenGenerateMonth(selectedDate);
                        break;
                
                        case "month":
                            selectedDate = new Date((selectedDate.getFullYear() - 1), selectedDate.getMonth(), selectedDate.getDate());
                            genYear(0, $('#wasenHeadText'), selectedDate);
                            break;
                    }
                    $('#wasenHeadText').css('opacity', '');
                    $('#wasen-body').css('animation', 'fadeInLeft .5s forwards');
                    runFunction();
                }, 200);
            }
        });
        runFunction();
        var output = {
            genMonth: wasenGenerateMonth,
            wasuDateStr: wasuDateStr,
            dateSelected: function() {
                return selectedDate;
            }
        }
        return output;
}