function mainAnalytics(tableId) {
  var table = SpreadsheetApp.openById(tableId);  
  var valueSheet = table.getSheetByName("Эскалации");
  //получаем количество заполненных строк
  var numRows = valueSheet.getDataRange().getNumRows()
  //получаем необходимый столбец
  
  var arrayResultyEmployee_error = parsArrayEmployee_error(valueSheet.getSheetValues(2,1,numRows-1,8))
  
 
  
  //открываем лист Аналитики
  var valueSheetAnalit = table.getSheetByName("Аналитика"); 
  valueSheetAnalit.getRange("B2").setValue(arrayResultyEmployee_error["employee_error"].count)
  valueSheetAnalit.getRange("B3").setValue(arrayResultyEmployee_error["No_employee_mistakes"].countError_Alert)
  valueSheetAnalit.getRange("B4").setValue(arrayResultyEmployee_error["No_employee_mistakes"].countIncorrect_escalation) 
  
  for(var key in arrayResultyEmployee_error["employee_error"].typeEsc){    
    valueSheetAnalit.getRange(getTypeEsc(key)).setValue(arrayResultyEmployee_error["employee_error"].typeEsc[key].count);  
  }
}  




function getTypeEsc(typeEsc){
  switch(typeEsc){
    case "returnsInHD":
      return "B8";
      break
      case "returnWithWO":
      return "B6";
      break  ;
    case "keywordsError":
      return "B7";
      break;
    case "passNPS":
      return "B9";
      break;
    case "BeckHD":
      return "B10";
      break;  
    case "BeckHD_NMKC":
      return "B11";
      break; 
  }
}

function parsArrayEmployee_error(arr){  
  
  obj = {}
  obj.employee_error = {};
  obj.employee_error.count = 0;
  obj.employee_error.AllCount = 0;
  obj.employee_error.typeEsc = {};
  obj.employee_error.oper = {};
  
  obj.No_employee_mistakes = {}
  obj.No_employee_mistakes.countError_Alert = 0;
  obj.No_employee_mistakes.countIncorrect_escalation = 0;
  
  
  for(var i = 0; i < arr.length; i++){
    
    //ПОДСЧЕТ ПОДТВЕРЖДЕННЫХ
    if(arr[i][6] === "confirmed_Alert") {
      
      // подсчет подтвержденных ошибка сотрудника
      obj.employee_error.count++;
      
      //подсчет подтвержденных в разрезе типов эскалаций 
      if(obj.employee_error.typeEsc[arr[i][5]] === undefined) obj.employee_error.typeEsc[arr[i][5]] = {};
      if(obj.employee_error.typeEsc[arr[i][5]].count === undefined) obj.employee_error.typeEsc[arr[i][5]].count = 0;  
      obj.employee_error.typeEsc[arr[i][5]].count++;
    }
    
    
    if(arr[i][6] === "Error_Alert") obj.No_employee_mistakes.countError_Alert++;
    if(arr[i][6] === "incorrect_escalation") obj.No_employee_mistakes.countIncorrect_escalation++;    
  }

  return obj;
}
