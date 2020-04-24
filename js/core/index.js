const db = require('./db')

const getAnalysis = (costItems) => {
  const result = {};
  let total = 0;
  costItems.forEach(({type, cost}) => {
    if(result[type] == null){
      result[type] = 0
    }
    if(cost == null || isNaN(cost)){
      cost = 0
    }
    result[type] += parseFloat(cost)
    total += parseFloat(cost)
  });

  Object.keys(result).forEach((key) => {
    if(total == 0){
      result[key] = 100;
    }else{
      result[key] = Number((result[key] / total) * 100).toFixed();
    }
  })
  return result
}


const getWeekdates = (dateAsText) => {
  date = new Date(dateAsText);
  const weekday = date.getDay();
  const result = [];
  for(let i = 0; i < 7; i++){
    const temp = new Date(dateAsText);
    temp.setDate(temp.getDate() + i - weekday);
    result.push(db.dateFormatted(temp))
  }
  return result
}

function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}


const totalCostEveryDayInMonth = (date) => {
  const result = {};
  const all = getDaysInMonth(date.getMonth(), date.getFullYear()).map(date => {
    db.readAllCostInDate(date).then((itemList) => {
      return totalCost(itemList)
    }).then(total => {
      result[db.dateFormatted(date)] = total
    })
  })
  return Promise.all(all).then(() => {
    return result;
  });
}

const aggregateCost = (step = 5, dateCostMap) => {
  let acc = 0;
  let startDate = '';
  const result = {};
  Object.keys(dateCostMap).forEach(date => {
    if(acc == 0){
      startDate = date
      result[startDate] = 0
    }
    acc++;
    result[startDate] += Number(dateCostMap[date])
    if(acc >= step){
      acc = 0
    }
  })
  return result;
}


const getMonthlyAnalysis = (date, aggregateFactor = 5) => {
  if(date == null){
    date = new Date()
  }else if(typeof date == 'string'){
    date = new Date(date)
  }
  return totalCostEveryDayInMonth(date).then((dateCostMap) => {
    return aggregateCost(aggregateFactor, dateCostMap)
    //return dateCostMap
  })
} 

const totalCost = (costItems) => {
  return costItems.reduce((acc, {cost}) => {
    return acc + Number(cost)
  },0)
}

const getWeeklyAnalysis = (date) => {
  date = typeof date == 'object' ? db.dateFormatted(date) : db.dateFormatted(new Date(date));
  const weekdates = getWeekdates(date)
  const result = {};
  const all = weekdates.map(weekdate => {
    return db.readAllCostInDate(weekdate).then(costItems => {
      result[weekdate] = totalCost(costItems);
      return true
    })
  })
  return Promise.all(all).then(() => {
    return result
  })
}

function getAnalysisInDate(date){
  return db.readAllCostInDate(date).then(costList => {
    return getAnalysis(costList)
  })
}

function dateToDate(date, offset){
  if(typeof date == 'string'){
    date = new Date(date);
  }
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + offset);
  return db.dateFormatted(newDate);
}

module.exports = {
  getAnalysis,
  totalCost,
  getAnalysisInDate,
  getWeeklyAnalysis,
  getMonthlyAnalysis,
  getCostListInDate: db.readAllCostInDate,
  dateFormatted: db.dateFormatted,
  dateToDate,
  getIsFirstTimeEnterApp: db.getIsFirstTimeEnterApp,
  exitNarrativeMode: db.exitNarrativeMode,
  db
}