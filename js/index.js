function rgbStrTorgba(str){
  return str.replace(')', ', 0.4)').replace('rgb', 'rgba')
}

(() => {
  //Init global variable
  console.log('DD???')

  window.G = {
    id: (id) => {
      return document.getElementById(id)
    },
    show: (element) => {
      element.style.display = ''
    },
    hide: (element) => {
      element.style.display = 'none'
    },
    state: {
      chartColors: {
        red: "rgb(255, 99, 132)",
        yellow: "rgb(255, 205, 86)",
        blue: "rgb(54, 162, 235)",
        green: "rgb(75, 192, 192)",
        grey: "rgb(201, 203, 207)",
        orange: "rgb(255, 159, 64)",
        purple: "rgb(153, 102, 255)",
      }
    },
    fn: {
      changeToolbarTitle: (title) => {
        document.getElementById('toolbar__title').innerHTML = title;
      },
      reloadLineChart: (canvasId, labels, values, legend) => {
        const ctx2 = document.getElementById(canvasId);
        const config = {
    			type: 'line',
    			data: {
            labels,
            datasets: [{
              label: legend,
              data: values,
              backgroundColor: rgbStrTorgba(G.state.chartColors.green),
            }],
          },
          options: {
            tooltips: {
              enabled: false,
            }
          }

        }
        new Chart(ctx2, config);
      },
      reloadPieChart: (id, values, labels) => {
        const ctx = document.getElementById(id);
        const chartData = {
          datasets: [{
            data: values,
            backgroundColor: Object.keys(G.state.chartColors).map(key => {
              return G.state.chartColors[key]
            }),
          }],
          labels,
        }
        new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
        });
      },
      aggregatedTypeCostList: (costs) => {
        return Promise.resolve(costs).then(costs => {
          // 相同type聚合
          const typeCostMap =  costs.reduce((typeCostMap, cur) => {
            const {type, cost} = cur;
            if(typeCostMap[type] != undefined){
              typeCostMap[type] = typeCostMap[type] + parseInt(cost);
            }else{
              typeCostMap[type] = parseInt(cost);
            }
            return typeCostMap;
          }, {});
          // map转成[{type, cost}]
          const typeCostList = Object.keys(typeCostMap).reduce((acc, key) => {
            acc.push({type: key, cost: typeCostMap[key]});
            return acc;
          }, []);
          return typeCostList;
        });
      }
    }

  };
  G.index = {
    fn: {
      openSplitter: () => {
        document.getElementById('menu').open();
      },
      load: (page) => {
        document.getElementById('navigator--main').bringPageTop(page);
        document.getElementById('menu').close();
      }
    }
  }
  G.index.daily_analysis = {
    state: {
      dateOffset: 0,
    },
    fn: {
      onShow: () => {
        const today = new Date()
        const date = new Date()
        date.setDate(date.getDate() + G.index.daily_analysis.state.dateOffset)
        if(today.getFullYear() == date.getFullYear() && today.getMonth() == date.getMonth() && today.getDate() == date.getDate()){
          G.fn.changeToolbarTitle(`今日支出饼图`);
        }else{
          G.fn.changeToolbarTitle(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}支出饼图`);
        }
        const ctx = document.getElementById('chart--pie__day');
        core.db.readAllCostInDate(date).then(costs => {
          const chartData = {
            datasets: [{
              data: costs.map(it => it.cost),
              backgroundColor: Object.keys(G.state.chartColors).map(key => {
                return G.state.chartColors[key]
              }),
            }],
            labels: costs.map(it => it.type)
          }
          return [chartData, costs]
        }).then(([data, costs]) => {
          window.dayChart = new Chart(ctx, {
            type: 'doughnut',
            data,
          });
          return costs
        }).then(costs => {
          const list = document.getElementById('list__daily-cost')
          list.innerHTML = ''
          costs.forEach((cost, indice) => {
            const li = `
              <ons-list-item expandable>
                ${cost.type}: ${cost.cost}
                <div class="expandable-content">
                  <div class="expandable-content__daily-cost--container">
                    <div>${cost.detail}</div>
                    <div onclick="G.index.daily_analysis.fn.delete(${indice})" class="expandable-content__daily-cost--right">
                      <div class="delete__daily-cost--text">delete</div>
                    </div>
                  </div>
                </div>
              </ons-list-item>
            `;
            list.appendChild(ons.createElement(li))
          })
        })
      },
      delete: (indice) => {
        const date = new Date()
        date.setDate(date.getDate() + G.index.daily_analysis.state.dateOffset)
        console.log('delete' + indice)
        core.remove(indice, date).then(() => {
          G.index.daily_analysis.fn.onShow()
        })
        //TODO: delete item in date with indice
      },
      prevDay: () => {
        G.index.daily_analysis.state.dateOffset -= 1;
        G.index.daily_analysis.fn.onShow()
      },
      nextDay: () => {
        G.index.daily_analysis.state.dateOffset += 1;
        G.index.daily_analysis.fn.onShow()
      }
    }
  }
  G.index.weekly_analysis = {
    state: {
      weekOffset: 0,
    },
    fn: {
      onShow: () => {
        G.fn.changeToolbarTitle('周支出统计')
        const date = new Date()
        date.setDate(date.getDate() +  G.index.weekly_analysis.state.weekOffset * 7)
         
        core.getWeeklyAnalysis(date).then(dateCostMaps => {
          const labels = Object.keys(dateCostMaps)
          const values = labels.map(key => {
            return dateCostMaps[key]
          })
          G.fn.reloadLineChart('chart--line__week', labels, values, '周支出');
        })

        //Show pie chart
        G.index.weekly_analysis.fn.showPieChart()
      },
      prevWeek: () => {
        G.index.weekly_analysis.state.weekOffset -= 1;
        G.index.weekly_analysis.fn.onShow()
      },
      nextWeek: () => {
        G.index.weekly_analysis.state.weekOffset += 1;
        G.index.weekly_analysis.fn.onShow()
      },
      showPieChart: () => {
        //1. 当前周所有支出，相同type聚合，然后按照总量排序
        //2. 根据排序结果输出饼图
        const date = new Date()
        date.setDate(date.getDate() +  G.index.weekly_analysis.state.weekOffset * 7)
        // 当前周所有支出
        core.getCostsThisWeek(date).then(costs => {
          // 聚合
          return G.fn.aggregatedTypeCostList(costs);
        }).then(typeCostList => {
          // 根据排序结果输出饼图
          const sorted = typeCostList.sort((a, b) => {
            return parseInt(b.cost) - parseInt(a.cost)
          })
          const values = sorted.map(item => {
            return parseInt(item.cost)
          })
          const labels = sorted.map(item => {
            return item.type
          })
          G.fn.reloadPieChart('chart--pie__week', values, labels);
        });
      },
    }
  }
  G.index.daily_analysis.new_cost = {
    fn: {
      onShow: () => {
        G.fn.changeToolbarTitle('新增支出')

        //如果之前为空填充当前时间
        if(G.id('input--year__new-cost').value || G.id('input--month__new-cost').value || G.id('input--date__new-cost').value){
          // Do Nothing
        }else{
          G.index.daily_analysis.new_cost.fn.resetTime()
        }

        // 检查是否显示清除按钮
        G.index.daily_analysis.new_cost.fn.checkShowClearBtn()
      },
      resetTime: (date = new Date()) => {
        G.id('input--year__new-cost').value = date.getFullYear()
        G.id('input--month__new-cost').value =  date.getMonth() + 1
        G.id('input--date__new-cost').value =  date.getDate()
      },
      onSelectChange: (event) => {
        const {target} = event
        document.getElementById('input--type__new-cost').value = target.value
        G.index.daily_analysis.new_cost.fn.checkShowClearBtn()
      },
      newCost: () => {
        const type = G.id('input--type__new-cost').value
        const cost = G.id('input--cost__new-cost').value
        const detail = G.id('input--detail__new-cost').value
        const time = new Date()
        G.id('input--year__new-cost').value && time.setFullYear(G.id('input--year__new-cost').value)
        G.id('input--month__new-cost').value && time.setMonth(parseInt(G.id('input--month__new-cost').value) - 1)
        G.id('input--date__new-cost').value && time.setDate(G.id('input--date__new-cost').value)
        G.index.daily_analysis.new_cost.fn.resetTime(time)
        return core.db.save({type, cost, detail, time}).then(() => {
          //返回首页并显示新的饼图
          G.index.fn.load('daily-analysis.html')
        })
      },
      onInputChange: ({target}) => {
        G.index.daily_analysis.new_cost.fn.checkShowClearBtn()
      },
      // 检查是否显示清除按钮
      checkShowClearBtn: () => {
        const shouldShowClearBtn = G.index.daily_analysis.new_cost.fn.formInputAndSelects().map(valuable => valuable.value).find(val => val != null && val != '') != null;
        if(shouldShowClearBtn){
          //show clear btn
          G.show(document.getElementById('fab--clear__new-cost'))
        }else{
          G.hide(document.getElementById('fab--clear__new-cost'))
        }
      },
      formInputAndSelects: () => {
        const prefix = 'input--';
        const suffix = '__new-cost';
        const inputs = ['type', 'cost', 'detail', 'year', 'month', 'date'].map(modifier => {
          return document.getElementById(`${prefix}${modifier}${suffix}`)
        })
        return inputs.concat(document.getElementById('select--type__new-cost'))
      },
      clearForm: () => {
        G.index.daily_analysis.new_cost.fn.formInputAndSelects().forEach(el => {
          el.value = ''
        })
        G.hide(document.getElementById('fab--clear__new-cost'))
      }
    }
  }
  G.index.monthly_analysis = {
    fn: {
      onShow: () => {
        G.fn.changeToolbarTitle('月支出统计')
        core.getMonthlyAnalysis().then(dateCostMaps => {
          const labels = Object.keys(dateCostMaps);
          const values = labels.map(key => {
            return dateCostMaps[key];
          })
          G.fn.reloadLineChart('chart--line__month', labels, values, '月支出')
        })

        // 月支出饼图
        G.index.monthly_analysis.fn.showPieChart()
      },
      showPieChart: () => {
        //1. 当前月所有支出，相同type聚合，然后按照总量排序
        //2. 根据排序结果输出饼图
        // 当前周所有支出
        core.getCostsThisMonth().then(costs => {
          // 聚合
          return G.fn.aggregatedTypeCostList(costs);
        }).then(typeCostList => {
          // 根据排序结果输出饼图
          const values = typeCostList.map(item => {
            return parseInt(item.cost)
          })
          const labels = typeCostList.map(item => {
            return item.type
          })
          G.fn.reloadPieChart('chart--pie__month', values, labels);
        });
      },
    }
  }
})();
