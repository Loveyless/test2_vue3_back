import { createI18n } from "vue-i18n";
import EN from "./en"
import ZH from "./zh"

//获取当前语言
const getCurrentLanguage = () => {
  //navigator获取浏览器的各种信xi
  const language = navigator.language; //中文就是zh 英文en
  localStorage.setItem("language", language);
  return language.includes("zh");
};

//创建i18n实例
const i18n = createI18n({
  legacy: false, //you must set `false`, to use Composition API
  globalInjection: true, //全局函数
  locale: getCurrentLanguage() ? "en" : "zh", //语言

  messages: {
    //数据源 这个可以写上面在挂进来
    en: {
      ...EN
    },
    zh: {
      ...ZH
    },
  },
});

export default i18n;

//globalInjection:true
// 这允许 Vue I18n 将以下属性和函数注入到组件中：

// $i18n：使用以下全局范围 Composer 实例属性包装的对象
// locale
// fallbackLocale
// availableLocales
// $t: tComposer 的全局作用域函数
// $rt: rtComposer 的全局作用域函数
// $d: dComposer 的全局作用域函数
// $n: nComposer 的全局作用域函数
// $tm: tmComposer 的全局作用域函数
