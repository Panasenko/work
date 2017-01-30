function UpdateTableEscalation(id,SheetName,arrData) {
  var table = SpreadsheetApp.openById(id);
  var sheet = table.getSheetByName(SheetName);
  var arr = sheet.appendRow(arrData)
  mainAnalytics(id)
  return "Данные добавлены в таблицу"
}
