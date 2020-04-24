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