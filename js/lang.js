G.lang = (() => {
  const i18n = {
    today: ['今日', 'today'],
    costPieChart: ['支出饼图', 'cost pie chart'],
    weekCostStastic: ['周支出统计', 'week cost stastics'], 
    weekCost: ['周支出', 'week cost'],
    addNewCost: ['新增支出', 'add new cost'],
    costStastic: ['支出统计', 'cost stastics'],
    monthCost: ['月支出', 'monthly cost'],
    day: ['日', 'day'],
    week: ['周', 'week'],
    month: ['月', 'month'],
    year: ['年', 'year'],
    cost: ['支出', 'cost'],
    analysis: ['分析', 'analysis'],
    delete: ['删除', 'delete'],
    preset: ['预设', 'preset'],
    type: ['类型', 'type'],
    food: ['食物', 'food'],
    clothe: ['衣服', 'clothe'],
    entertainment: ['娱乐', 'entertainment'],
    detail: ['详情', 'detail'],
  }
  const langIndice = {
    ch: 0,
    en: 1,
  }
  const getByKey = (key) => {
    return i18n[key][langIndice[lang]];
  }
  //let lang = 'en';
  let lang = 'ch';

  function i18nAttrToString(attrVal){
    return attrVal.split(' ').map(key => {
      return getByKey(key)
    }).join(lang=='en'?' ':'');
  }

  return {
    getByKey,
    refresh: () => {
      [...document.getElementsByClassName('i18n')].forEach(el => {
        el.innerText = i18nAttrToString(el.getAttribute('i18n'));
      });

      //特殊处理input
      [...document.getElementsByClassName('i18n-input')].forEach(el => {
        const input = el.getElementsByTagName('input')[0];
        const span = el.getElementsByTagName('span')[0];

        result = i18nAttrToString(el.getAttribute('i18n'))

        span.innerHTML = result;
        input.setAttribute('placeholder', result);
      });

      //特殊处理option
      [...document.getElementsByClassName('i18n-option')].forEach(el => {
        result = i18nAttrToString(el.getAttribute('i18n'));
        el.setAttribute('value', result);
        el.innerHTML = result;
      });
    },
  }
})();
