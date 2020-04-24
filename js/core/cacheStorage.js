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