

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
    date: ['日期', 'date'],
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
    study: ['自我充电', 'study'],
    paper: ['纸巾', 'toilet paper'],
    entertainment: ['娱乐', 'entertainment'],
    detail: ['详情', 'detail'],
    switchLang: ['Switch English', '切换中文'],
    wrong: ['错误的', 'wrong'],
    no: ['没有', 'no'],
    next: ['下个', 'next'],
    alert: ['提示', 'alert'],
    ok: ['好的', 'OK'],
    my: ['我的', 'my'],
    your: ['你的', 'your'],
    his: ['他的', 'his'],
    their: ['他们的', 'their'],
    milk: ['牛奶', 'milk'],
    stock: ['长筒袜', 'stock'],
    apple: ['苹果', 'apple'],
    blue: ['蓝色', 'blue'],
    exit: ['退出', 'exit'],
    narrative: ['演示', 'narrative'],
    mode: ['模式', 'mode'],
    narrativeEnteredAlert: ['已进入演示模式，可通过侧边栏退出', 'Entered Narrative Mode, Exit Through Sidebar'],
    manage: ['管理', 'manage'],
  }
  const langIndice = {
    ch: 0,
    en: 1,
  }
  const getByKey = (key) => {
    return i18n[key][langIndice[lang]];
  }

  function randBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //let lang = 'en';
  let lang = localStorage.getItem('lang') || window.navigator.userLanguage || window.navigator.language || 'en';
  if(lang == null || lang == '' || (lang!='ch' && lang != 'en')){
    lang = 'en'
  }

  function i18nAttrToString(attrVal){
    return attrVal.split(' ').map(key => {
      return getByKey(key)
    }).join(delim());
  }

  function delim(){
    return lang == 'en' ? ' ' : '';
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
    switchLang: () => {
      lang = lang == 'en' ? 'ch' : 'en';
      localStorage.setItem('lang', lang);
    },
    delim: delim,
    getByKeys: (keys) => {
      return keys.split(' ').map(getByKey).join(delim());
    },
    randomTypeGenerator: () => {
      const keys = ['food', 'clothe', 'entertainment', 'study', 'paper']
      return getByKey(keys[randBetween(0, keys.length - 1)]);
    },
    randomDetailGenerator: () => {
      const first = ['my', 'your', 'his', 'their'];
      const second = ['milk', 'stock', 'apple', 'blue'];
      return getByKey(first[randBetween(0, first.length - 1)]) + delim() + getByKey(second[randBetween(0, second.length - 1)]);
    }
  }
})();
