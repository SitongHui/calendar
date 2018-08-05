window.onload = function() {
    calender();
}

function calender() {

    var $ = document.querySelectorAll.bind(document);

    var dateObj = (function() {
        var _date = new Date();
        return {
            getDate : function() {
                return _date;
            },
            setDate : function(date) {
                return _date = date;
            }
        }
    })();

    renderHtml();
    showCalender();
    addEvent();

    //工具函数
    /*
     * 将日期表加入到HTML页面上
     * */
    function renderHtml() {
        var calenderMain = $('.calender > .calender-main')[0];
        var calenderMainBody = $('.calender > .calender-main > table')[0];
        var _titleHtml = '<tr>' +
            '<th>日</th>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '</tr>';
        var _bodyHtml = '';
        for(i = 0; i < 6; i++) {
            _bodyHtml += '<tr>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '<td></td>' +
                '</tr>'
        }
        calenderMainBody.innerHTML = _titleHtml + _bodyHtml;
        calenderMain.appendChild(calenderMainBody);
    }

    /*
     * 显示表格中的数据
     * */
    function showCalender() {
        var _year = dateObj.getDate().getFullYear();
        var _month = dateObj.getDate().getMonth() + 1;
        var _dateStr = getDateStr(dateObj.getDate());

        /*显示当前的年、月*/
        var calenderDate = $('.calender > .calender-title > .calender-date')[0];
        var dateTitle = _dateStr.substr(0,4) + '年' + _dateStr.substr(4,2) + '月';
        calenderDate.innerHTML = dateTitle;

        /*显示日期*/
        var calenderData = $('td');
        var _firstDay = new Date(_year, _month - 1, 1);
        for (var i = 0; i < calenderData.length; i++){
            var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());/*星期 日 月 年*/
            var _thisDayStr = getDateStr(_thisDay);/*例如：20180801*/
            calenderData[i].innerText = _thisDay.getDate();
            calenderData[i].setAttribute('data',_thisDayStr);
            if(_thisDayStr == getDateStr(new Date())){
                calenderData[i].className = 'currentday';   /*当天*/
            }else if(_thisDayStr.substr(0,6) == getDateStr(_firstDay).substr(0,6)){
                calenderData[i].className = 'currentmonth';
            }else{
                calenderData[i].className = 'othermonth';
            }
        }

    }

    /*设置输出日期
     * 例如：20180801
     * */
    function getDateStr(date) {
        var _year = date.getFullYear();
        var _month = date.getMonth() + 1;
        var _day =  date.getDate();

        _month = (_month > 9) ? ('' + _month) : ('0' + _month);
        _day = (_day > 9) ? ('' + _day) : ('0' + _day);
        return _year + _month + _day;
    }

    /*添加事件*/
    function addEvent() {
        var lastMonthBtn = $('.calender > .calender-title > .last-month')[0];
        var nextMonthBtn = $('.calender > .calender-title > .next-month')[0];
//            var date = $('td');

        lastMonthBtn.addEventListener('click', function() {
            var date = dateObj.getDate();
            dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
            showCalender();
        }, false);
        nextMonthBtn.addEventListener('click', function() {
            var date = dateObj.getDate();
            dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
            showCalender();
        }, false);

    }

}