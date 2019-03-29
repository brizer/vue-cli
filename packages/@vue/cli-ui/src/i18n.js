import Vue from 'vue'
//使用vue的语言包插件
import VueI18n from 'vue-i18n'
//合并整合对象
import deepmerge from 'deepmerge'
import VueTimeago, { createTimeago } from 'vue-timeago'

Vue.use(VueI18n)

Vue.use(VueTimeago, {
  name: 'VueTimeago',
  locale: 'en'
})
//检测当前用户语言
function detectLanguage () {
  try {
    const lang = (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      window.navigator.userLanguage
    return [ lang, lang.toLowerCase(), lang.substr(0, 2) ]
  } catch (e) {
    return undefined
  }
}
//加载本土化语言包
async function autoInstallLocale (lang) {
  try {
    let response = await fetch(`https://unpkg.com/vue-cli-locales/locales/${lang}.json`)
    if (response.ok) {
      const data = await response.json()
      //合并语言包操作
      mergeLocale(lang, data)
      return true
    }
  } catch (e) {}
  return false
}
//自定检测
async function autoDetect () {
  const codes = detectLanguage()
  if (codes && codes[0].indexOf('en') === -1) {
    //如果不是标准的英文
    let ok = false
    let previousCode
    for (const code of codes) {
      if (code === previousCode) continue
      previousCode = code
      //尝试本土化
      ok = await tryAutoLang(code)
      if (ok) break
    }

    if (!ok) {
      console.log(`[UI] No locale data was found for your locale ${codes[0]}.`)
    }

    const dateFnsLocale = i18n.locale.toLowerCase().replace(/-/g, '_')
    Vue.component('VueTimeago', createTimeago({
      name: 'VueTimeago',
      locale: i18n.locale,
      locales: {
        [i18n.locale]: require(`date-fns/locale/${dateFnsLocale}`)
      }
    }))
  }
}
//本土化操作
async function tryAutoLang (lang) {
  console.log(`[UI] Trying to load ${lang} locale...`)
  const result = await autoInstallLocale(lang)
  if (result) {
    i18n.locale = lang
    // eslint-disable-next-line no-console
    console.log(`[UI] Automatically loaded ${lang} locale `)
  }
  return result
}
//使用vue-i18n这个插件来配合使用
const i18n = new VueI18n({
  locale: 'en',
  //本土化失败回滚方案
  fallbackLocale: 'en',
  messages: {
    en: {}
  },
  //是否取消本土化失败警告
  silentTranslationWarn: process.env.NODE_ENV !== 'production'
})

autoDetect()

//通过i18n的api合并语言包
export function mergeLocale (lang, messages) {
  const newData = deepmerge(i18n.getLocaleMessage(lang), messages)
  //将语言包放到i18n中
  i18n.setLocaleMessage(lang, newData)
}

export default i18n
