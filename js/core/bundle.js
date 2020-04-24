(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.core = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function getCacheStorage(){
  let storage =  {}
  return {
    getItem: function(time){
      return Promise.resolve(storage[time])
    },
    setItem: function(key, val){
      storage[key] = val;
      return Promise.resolve()
    },
    emptyAll: function(){
      storage = {};
      return Promise.resolve()
    },
    logout: function(){
      console.log(storage)
    }
  }
}

module.exports = {
  getCacheStorage
}
},{}],2:[function(require,module,exports){
const {getCacheStorage} = require('./cacheStorage');

/*
function reactStorageExist(){
  try{
    console.log('111')
    const {AsyncStorage} = require('react-native')
    console.log('222')
    return true;
  } catch(e){
    console.error('fuck!')
    return false;
  };
}
*/

/*
function getReactStorage(){
  console.error('I am using the AsyncStorage from react-native')
  const {AsyncStorage} = require('react-native')
  AsyncStorage.emptyAll = function(){
    this.clear()
  }
  return AsyncStorage;
}
*/

function dateFormatted(time){
  if(typeof time == 'string'){
    time = new Date(time)
  }
  return [time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-');
}

function getLocalStorage(){
  if(typeof window  == "undefined"){
    throw "Should not get localstorage when not in browser ENV";
  }
  console.warn('I am using the localstorage!');
  const db = window.localStorage;
  return {
    getItem: function(key){
      //return Promise.resolve(storage[key])
      return Promise.resolve(db.getItem(key));
    },
    setItem: function(key, val){
      db.setItem(key, val);
      return Promise.resolve()
    },
    emptyAll: function(){
      db.clear();
      return Promise.resolve()
    },
  }
}

const getStorage = (() => {
  let storage = null;
  return () => {
    if(storage == null){
      storage = typeof window  == 'undefined' ? getCacheStorage() : getLocalStorage();
    }
    return storage;
  }
})();

function validType(type){
  if(typeof type != 'string' || type == ''){
    console.error('Invalid type value: ' + type + ' have been changed to Unknown!');
    return 'Unknown';
  }else{
    return type
  }
}

function validCost(cost){
  if(cost == '' || isNaN(cost) || Number(cost) < 0){
    console.error('Invalid cost value ' +  cost +  ' have been changed to zero!')
    return 0;
  }else{
    return cost;
  }
}

const save = function(costItem){
  const storage = getStorage();
  if(costItem == null){
    return
  }
  costItem.type = validType(costItem.type);
  costItem.cost = validCost(costItem.cost);

  const time = costItem.time == null ? dateFormatted(new Date()) : dateFormatted(new Date(costItem.time));
  const {type = 'Unknown', cost = 0, detail = 'No detail'} = costItem;
  return storage.getItem(time).then(item => {
    const costList = (item == null || item == '') ? [] : JSON.parse(item);
    costList.push({type, cost, detail, time});
    const val = JSON.stringify(costList);
    return storage.setItem(time, val);
  })
}

const isTwoCostEqual = (c1, c2) => {
  const t1 = new Date(c1.time)
  const t2 = new Date(c2.time)
  return c1.type == c2.type && c1.cost == c2.cost && c1.detail == c2.detail && (
    t1.getFullYear() == t2.getFullYear() && t1.getMonth() == t2.getMonth() && t1.getDate() == t2.getDate()
  );

}

const readAllCostInDate = function(time){
  if(typeof time == 'string'){
    time = dateFormatted(new Date(time))
  }else if(time == null){
    time = dateFormatted(new Date())
  }else{
    time = dateFormatted(time)
  }
  const storage = getStorage();
  return storage.getItem(time).then(item => {
    //console.log("ReadAllCostInDate: ")
    //console.log(time, item)
    if(item == null){
      return []
    }else{
      return JSON.parse(item);
    }
  })
}

const emptyAll = function(){
  const storage = getStorage()
  return storage.emptyAll()
}

function validList(list){
  return list.map(item => {
    return {
      type: validType(item.type),
      cost: validCost(item.cost),
      ...item,
    }
  })
}

const saveList = function(list){
  list = validList(list);
  const storage = getStorage();
  const map = {}
  list.forEach(item => {
    item.time = dateFormatted(item.time)
    if(map[item.time] == null){
      map[item.time] = [item]
    }else{
      map[item.time].push(item)
    }
  })
  const all = Object.keys(map).map(key => {
    return storage.getItem(key).then(val => {
      const list = (val == null || val == '') ? [] : JSON.parse(val)
      return storage.setItem(key, JSON.stringify(list.concat(map[key])))
    })
  })
  return Promise.resolve(all)
}


const logoutCacheDb = () => {
  const storage = getStorage()
  if(storage.logout){
    storage.logout()
  }
}

function getIsFirstTimeEnterApp(){
  return getStorage().getItem('non-narrative-mode').then(res => {
    return res == null
  })
}

function exitNarrativeMode(){
  return getStorage().setItem('non-narrative-mode', true)
}

module.exports = {
  save,  isTwoCostEqual, dateFormatted, readAllCostInDate,
  emptyAll,
  readAllCostToday: readAllCostInDate,
  saveList,logoutCacheDb,getIsFirstTimeEnterApp,exitNarrativeMode,
};
},{"./cacheStorage":1}],3:[function(require,module,exports){
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
},{"./db":2}]},{},[3])(3)
});
