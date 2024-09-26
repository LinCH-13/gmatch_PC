import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 初始化 I18n 翻译资源
const resources = {
    en: {
      translation: {
        'User already exists.': 'User already exists.',

      },
    },
    jp: {
      translation: {
        'User already exists.': 'ユーザ名は既に存在しています',
        'All fields are required.': 'すべてのフィールドは必須です',
      },
    },
    zh: {
      translation: {
        'ユーザ名': '账户名',
        'パスワード': '密码',
        'パスワード確認': '确认密码',
        'User already exists.': '用户已存在。',
        'Username 入力してください': '请输入「Username」栏位',
        'All fields are required.': '所有字段都是必填的',
        'Password 入力してください': '请输入「Password」栏位',
        'Organization ID 入力してください':'请输入「Organization ID」栏位',
        'ようこそGMatchの管理画面へ': '欢迎來到 GMatch',
        'Gmatch アカウント作成':'注册Gmatch账户',
        'アカウント作成':'注册账户',
        '組織ID':'组织ID',
        'ログイン': '登陆',
        'パスワードを忘れた方':'忘记密码',
        'サインイン':'注册'
      },
    },
  };


  if (typeof window !== 'undefined') {
    // PC端环境
    userLanguage = navigator.language.split('-')[0];

} else if (typeof process !== 'undefined') {
    // 服务器端环境
    // 这里假设你在请求处理中获得了用户语言
    userLanguage = process.env.DEFAULT_LANGUAGE || 'jp'; // 从环境变量或其他地方获取
}

i18n
  .use(initReactI18next) // 使用 react-i18next
  .init({
    resources,
    lng: userLanguage, // 使用用户语言
    fallbackLng: 'en', // 回退语言
    keySeparator: true, // 设置为句点来支持嵌套
    interpolation: {
      escapeValue: false, // React 已经防止了 XSS
    },
  });

export default i18n;
