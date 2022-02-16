var nowDate = new Date();
var schedule = {};

var calendarUtil = {
  dateObjGenerator: function (date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };
  },
  dateTbodyGenerator: function (target, dateObj, _schedule, datePeriod) {
    var count = 0;
    var minDate = datePeriod.minDate;
    var maxDate = datePeriod.maxDate;
    var firstMM = minDate.getMonth() + 1 === dateObj.month + 1;
    var lastMM = maxDate.getMonth() + 1 === dateObj.month + 1;

    var today = new Date();
    var formatToday =
      today.getFullYear() +
      this.decimalLeadingZero(today.getMonth() + 1) +
      this.decimalLeadingZero(today.getDate());

    var realYY = String(dateObj.year);

    var realMM = this.decimalLeadingZero(dateObj.month + 1);
    var prevOtherMM = this.decimalLeadingZero(dateObj.month);
    var nextOtherMM = this.decimalLeadingZero(dateObj.month + 2);

    var realFirstDay = new Date(realYY, dateObj.month, 1);
    var realLastDay = new Date(realYY, dateObj.month + 1, 0);
    var prevLastDay = new Date(realYY, dateObj.month, 0);

    var prevMonthLastDay = prevLastDay.getDate();

    $(target)
      .find('.tbl-calendar__title')
      .text(realYY + '.' + realMM);

    this.disabledControl(firstMM, lastMM);

    var html = '<tr>';

    // 이전 달 날짜 생성
    for (var prevDay = 1; prevDay <= realFirstDay.getDay(); prevDay++) {
      var prevYY = dateObj.month === 0 ? realYY - 1 : realYY;
      var prevMM = prevOtherMM === '00' ? '12' : prevOtherMM;
      var prevDD = prevMonthLastDay - realFirstDay.getDay() + prevDay;
      var formatDate = prevYY + prevMM + prevDD;
      var content = _schedule['date_' + formatDate] || '';
      var contentHtml = content.html || '';
      var id = content.id || '';
      var parentClass = content.parentClass || '';
      var todayClass = formatToday === formatDate ? ' today ' : '';
      var _date = new Date(prevYY + '-' + prevMM + '-' + prevDD);
      var disableClass = _date < minDate || _date > maxDate ? ' disabled ' : '';

      html += '<td class="date other-month ';

      if (count === 0) {
        html += 'date__sunday ';
      }

      if (count === 6) {
        html += 'date__saturday ';
      }

      html +=
        parentClass +
        todayClass +
        disableClass +
        '" data-id="' +
        id +
        '" data-date="' +
        formatDate +
        '" data-other-month="prev"><div class="date__default"><div class="date__num">' +
        prevDD +
        '</div>';

      if (contentHtml) {
        html += '<div class="date__text">' + contentHtml + '</div>';
      }

      html += '</div></td>';

      count++;
    }

    // 현재 달 날짜 생성
    for (var realDD = 1; realDD <= realLastDay.getDate(); realDD++) {
      var formatDate = realYY + realMM + this.decimalLeadingZero(realDD);
      var content = _schedule['date_' + formatDate] || '';
      var contentHtml = content.html || '';
      var id = content.id || '';
      var parentClass = content.parentClass || '';
      var todayClass = formatToday === formatDate ? ' today ' : '';
      var _date = new Date(realYY + '-' + realMM + '-' + realDD);
      var disableClass = _date < minDate || _date > maxDate ? ' disabled ' : '';

      html += '<td class="date ';

      if (count % 7 === 0) {
        html += 'date__sunday ';
      }

      if (count % 7 === 6) {
        html += 'date__saturday ';
      }

      html +=
        parentClass +
        todayClass +
        disableClass +
        '" data-id="' +
        id +
        '" data-date="' +
        formatDate +
        '">';

      html +=
        '<div class="date__default"><div class="date__num">' +
        realDD +
        '</div>';

      if (contentHtml) {
        html += '<div class="date__text">' + contentHtml + '</div>';
      }

      html += '</div></td>';

      count++;
      if (count % 7 == 0) html += '</tr>';
    }

    // 다음 달 날짜 생성
    var nextDayCount = count % 7 === 0 ? 0 : 7 - (count % 7);
    for (var nextDay = 1; nextDay <= nextDayCount; nextDay++) {
      var nextYY = dateObj.month === 11 ? realYY + 1 : realYY;
      var nextMM = nextOtherMM === '13' ? '01' : nextOtherMM;
      var nextDD = this.decimalLeadingZero(nextDay);
      var formatDate = nextYY + nextMM + nextDD;
      var content = _schedule['date_' + formatDate] || '';
      var contentHtml = content.html || '';
      var id = content.id || '';
      var parentClass = content.parentClass || '';
      var todayClass = formatToday === formatDate ? ' today ' : '';
      var _date = new Date(nextYY + '-' + nextMM + '-' + nextDD);
      var disableClass = _date < minDate || _date > maxDate ? ' disabled ' : '';

      html +=
        '<td class="date other-month ' +
        parentClass +
        todayClass +
        disableClass +
        '" data-id="' +
        id +
        '" data-date="' +
        formatDate +
        '" data-other-month="next"><div class="date__default"><div class="date__num">' +
        nextDay +
        '</div>';

      if (contentHtml) {
        html += '<div class="date__text">' + contentHtml + '</div>';
      }

      html += '</div></td>';
    }

    html += '</tr>';

    $(target).find('tbody').html(html);
  },
  decimalLeadingZero: function (num) {
    return num < 10 ? '0' + num : String(num);
  },
  disabledControl: function (first, last) {
    var prevButton = $('.tbl-calendar__prev');
    var nextButton = $('.tbl-calendar__next');

    switch (true) {
      case first && last:
        prevButton.addClass('is-disabled');
        nextButton.addClass('is-disabled');
        break;
      case first:
        prevButton.addClass('is-disabled');
        nextButton.removeClass('is-disabled');
        break;
      case last:
        prevButton.removeClass('is-disabled');
        nextButton.addClass('is-disabled');
        break;
      default:
        prevButton.removeClass('is-disabled');
        nextButton.removeClass('is-disabled');
        break;
    }
  },
};

function lgCalendar(target, date, _schedule, datePeriod) {
  var minDate = datePeriod.minDate;
  var maxDate = datePeriod.maxDate;

  if ($(target).length === 0) return;

  if (date != null || date != undefined) nowDate = date;
  if (_schedule != null || _schedule != undefined) schedule = _schedule;

  var dateObj = calendarUtil.dateObjGenerator(nowDate);

  calendarUtil.dateTbodyGenerator(target, dateObj, schedule, datePeriod);

  return {
    setSchedule: function (_schedule) {
      calendarUtil.dateTbodyGenerator(target, dateObj, _schedule, datePeriod);
    },
    prev: function () {
      var isMinDate =
        minDate &&
        new Date(dateObj.year, dateObj.month - 1, 1).getTime() <
          new Date(minDate.getFullYear(), minDate.getMonth(), 1).getTime();

      if (isMinDate) return;

      var prevMonth = new Date(
        dateObj.year,
        dateObj.month - 1,
        nowDate.getDate()
      );
      dateObj = calendarUtil.dateObjGenerator(prevMonth);
      calendarUtil.dateTbodyGenerator(target, dateObj, schedule, datePeriod);
    },
    next: function () {
      var isMaxDate =
        maxDate &&
        new Date(dateObj.year, dateObj.month + 1, 1).getTime() >
          new Date(maxDate.getFullYear(), maxDate.getMonth(), 1).getTime();
      if (isMaxDate) return;

      var nextMonth = new Date(
        dateObj.year,
        dateObj.month + 1,
        nowDate.getDate()
      );
      dateObj = calendarUtil.dateObjGenerator(nextMonth);
      calendarUtil.dateTbodyGenerator(target, dateObj, schedule, datePeriod);
    },
  };
}
