function doGet(request) {  
  var backResult = "";
    
  switch(request.parameter.callfunc){
    case "createTableEsc":
      backResult = {"resultCreate": CreateTableEscalation()};
      break
      case "UpdateTableEsc":
      backResult = {"resultUpdate": UpdateTableEscalation(request.parameter.tableId, request.parameter.SheetName, request.parameter.strData.split(","))};      
      break
      default: backResult = {"result": "Функция не выбрана"};  
  }

  return ContentService.createTextOutput(JSON.stringify(backResult)).setMimeType(ContentService.MimeType.JSON); 
}
