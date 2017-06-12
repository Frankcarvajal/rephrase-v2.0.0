export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const selectLanguage = (userLanguage) => ({
  type: SELECT_LANGUAGE,
  userLanguage
});