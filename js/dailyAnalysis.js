
function createDailyPieChart(){
  //Create today pie chart
  const ctx = document.getElementById('chart--pie__day');
  core.db.readAllCostToday().then(costs => {
    return {
      datasets: [{
        data: costs.map(it => it.cost)
      }],
      labels: costs.map(it => it.type)
    }
  }).then(data => {
    new Chart(ctx, {
      type: 'doughnut',
      data,
    });
  })
}

