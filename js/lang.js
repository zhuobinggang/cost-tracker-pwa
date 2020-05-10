

G.lang = (() => {
  const i18n = {
    today: ['今日', 'today', '今日'],
    costPieChart: ['支出饼图', 'cost pie chart', '支出円グラフ'],
    weekCostStastic: ['周支出统计', 'week cost stastics', '週間支出分析'], 
    weekCost: ['周支出', 'week cost', '週間支出'],
    addNewCost: ['新增支出', 'add new cost', '新た支出項の作成'],
    costStastic: ['支出统计', 'cost stastics', '支出分析'],
    monthCost: ['月支出', 'monthly cost', '月次支出'],
    day: ['日', 'day', '日次'],
    date: ['日期', 'date', '日期'],
    week: ['周', 'week', '週'],
    month: ['月', 'month', '月次'],
    year: ['年', 'year', '年次'],
    cost: ['支出', 'cost', '支出'],
    analysis: ['分析', 'analysis', '分析'],
    delete: ['删除', 'delete', '削除'],
    preset: ['预设', 'preset', 'プリセット'],
    type: ['类型', 'type', 'タイプ'],
    food: ['食物', 'food', '食べ物'],
    clothe: ['衣服', 'clothe', '服'],
    study: ['自我充电', 'study', '勉強'],
    paper: ['纸巾', 'toilet paper', 'トイレットペーパー'],
    entertainment: ['娱乐', 'entertainment', '娯楽'],
    detail: ['详情', 'detail', '詳しい'],
    switchLang: ['Switch English', '日本語', '切换中文'],
    wrong: ['错误的', 'wrong', '間違い'],
    no: ['没有', 'no', 'ノー'],
    next: ['下个', 'next', '次の'],
    alert: ['提示', 'alert', '警告'],
    ok: ['好的', 'OK', '了解'],
    my: ['我的', 'my', '私の'],
    your: ['你的', 'your', '君の'],
    his: ['他的', 'his', '彼の'],
    their: ['他们的', 'their', '彼らの'],
    milk: ['牛奶', 'milk', '牛乳'],
    stock: ['长筒袜', 'stock', 'ストッキング'],
    apple: ['苹果', 'apple', '林檎'],
    blue: ['蓝色', 'blue', '青'],
    exit: ['退出', 'exit', '離す'],
    narrative: ['演示', 'narrative', '物語'],
    mode: ['模式', 'mode', 'モード'],
    narrativeEnteredAlert: ['已进入演示模式，可通过侧边栏退出', 'Entered Narrative Mode, Exit Through Sidebar', 'デモモードに入った、サイドバーを使って普通モードに戻る'],
    manage: ['管理', 'manage', '管理'],
  }
  const langIndice = {
    zh: 0,
    ch: 0,
    zho: 0,
    chi: 0,
    en: 1,
    eng: 1,
    ja: 2,
    jpn: 2,
  }
  const getByKey = (key) => {
    return i18n[key][langIndice[lang]];
  }

  function randBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //let lang = 'en';
  let lang = localStorage.getItem('lang') || window.navigator.userLanguage || window.navigator.language || 'en';
  if(lang == null || lang == '' || (Object.keys(langIndice).indexOf(lang) < 0)){
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
      if(langIndice[lang] == null){
        lang = 'en'
      }else if(langIndice[lang] == 0){
        lang = 'en'
      }else if(langIndice[lang] == 1){
        lang = 'ja'
      }else if(langIndice[lang] == 2){
        lang = 'ch'
      }
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
