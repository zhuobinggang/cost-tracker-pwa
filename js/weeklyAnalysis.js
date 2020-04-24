function weeklyLineChart(){
  //Create Weekly Barchart
  const ctx2 = document.getElementById('chart--line__week');
  core.getWeeklyAnalysis(new Date()).then(dateCostMaps => {
    const config = {
			type: 'line',
			data: {
        labels: Object.keys(dateCostMaps),
        datasets: [{
          label: '本周支出',
          data: Object.keys(dateCostMaps).map(key => {
            return dateCostMaps[key]
          })
        }],
			},
    }
    console.log(config.data)
    return config
  }).then((config) => {
    new Chart(ctx2, config);
  })
}
      
