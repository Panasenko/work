function CreateTableEscalation() {
  var obj = {};

  // Получаем текущий месяц и год
  var nowMonthYear = (function() {
    var now = new Date();
    var nowMonth = now.getMonth() + 1
    if (nowMonth < 10) nowMonth = "0" + nowMonth
    return (nowMonth + "/" + now.getFullYear()).toString()
  })();

  // создаем таблицу с выбранным названием
  var ssNew = SpreadsheetApp.create("Эскалации за " + nowMonthYear);
  //Открываем таблицу
  var table = SpreadsheetApp.openById(ssNew.getId());
  //Добавляем доступ к таблице
  table.addEditors(["maksim.panasenko@privatbank.ua", "panasenkomaksim@gmail.com"])

  createPage(table,dataSettings()) 
  
  obj.idTables = ssNew.getId();
  obj.SheetNameTables = ssNew.getName();
  obj.getUrlTables = ssNew.getUrl();
  return obj;
}


function createPage(table, dataPage) {

  //Переименовываем первый лист (Аналитика)
  var pageAnalysts = table.getSheets()[0].setName("Аналитика").getName();
  var AnaliticSheet = table.getSheetByName(pageAnalysts);

  //Заполняем страницу значениями
  var rangeAnalitic = AnaliticSheet.getRange("A1:B11").setValues([
    ["Общие расчеты", "Количество"],
    ["Подтвержденные эскалации", 0],
    ["Неподтвержденные эскалации", 0],
    ["Ошибочные эскалации", 0],
    ["Типы эскалации", ""],
    ["Возврат в HD с ордером", 0],
    ["Запрещенные фразы в примечании", 0],
    ["Превышение допустимого количества возвратов", 0],
    ["Возврат в HD заявок NPS", 0],
    ["Превышение времени возврата в HD", 0],
    ["Превышение времени возврата в HD заявки НМКЦ", 0]
  ]);
  //Закрашиваем фон
  AnaliticSheet.getRange("A1:A11").setBackground("#cfdcfc")
  AnaliticSheet.getRange("A1:B1").setBackground("#5e89ed").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontWeights([
    ["bold", "bold"]
  ])
  AnaliticSheet.getRange("A5:B5").setBackground("#5e89ed").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontWeights([
      ["bold", "bold"]
    ])
    //Устанавливаем ширину колонок
  AnaliticSheet.setColumnWidth(1, 350).setColumnWidth(2, 100);


  var SheetName = [];
  for (var i = 0; i < dataPage.length; i++) {
    var firstSheet = table.insertSheet(dataPage[i].namePage).getName();
    var valueSheet = table.getSheetByName(firstSheet);
    //закрепляем строку
    valueSheet.setFrozenRows(1);
    //Получаем диапазон данных
    var rangefirst = valueSheet.getRange(dataPage[i].pageRange);
    // Добавляем шапку
    rangefirst.setValues([dataPage[i].pageHeader])
      // Закрашиваем фон шапки, добавляем цвет шрифта,выравниваем по центру и делает заголовок жирным
    rangefirst.setBackground("#6D9EEB").setFontColor("white").setHorizontalAlignment("center").setFontWeights(dataPage[i].setFontWeights);

    //подгоняем ширину
    var withColumn = dataPage[i].withColumn;
    var key = 1,
      key2 = 0;
    while (key2 < withColumn.length) {
      valueSheet.setColumnWidth(key, withColumn[key2]);
      key++;
      key2++;
    }

    var g = 2;
    while (g < 100) {
      valueSheet.getRange("A" + g + ":" + dataPage[i].lastRange + g)
        .setWraps(dataPage[i].Wraps)
        .setVerticalAlignments(dataPage[i].VerticalAlignments)
        .setHorizontalAlignments(dataPage[i].HorizontalAlignments);
      g++;
    }


  }
  
  //Добавление графиков
  var valueSheetAnalit = table.getSheetByName("Аналитика"); 
   var chart = valueSheetAnalit.newChart()
     .setChartType(Charts.ChartType.PIE)
     .addRange(valueSheetAnalit.getRange("A2:B4"))
     .setPosition(1, 4, 0, 0)
     .build();
 valueSheetAnalit.insertChart(chart);
 var chart2 = valueSheetAnalit.newChart()
     .setChartType(Charts.ChartType.PIE)
     .addRange(valueSheetAnalit.getRange("A6:B11"))
     .setPosition(19, 4, 0, 0)
     .build();
 valueSheetAnalit.insertChart(chart2);
  

}