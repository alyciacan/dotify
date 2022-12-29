const cleanData = (dataObj) => {
     return Object.keys(dataObj).reduce((newObj, currKey) => {
      newObj[currKey] = []
      dataObj[currKey].items.forEach(item => {
        if(item.type === "album") {
          var newItem = new Album(item)
        } else if(item.type === "track") {
          var newItem = new Track(item)
        }
        newObj[currKey].push(newItem)
      })
      return newObj;
    }, {})
  }
  
  export default cleanData;