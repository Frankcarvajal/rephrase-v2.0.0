const options = [
  {
    name: 'Spanish',
    value: 'es'
  },
  {
    name: 'English',
    value: 'en'
  },
  {
    name: 'Chinese-Simplified',
    value: 'zh-CN'
  },
  {
    name: 'Chinese-Traditional',
    value: 'zh-TW'
  },
  {
    name: 'French',
    value: 'fr'
  },
  {
    name: 'German',
    value: 'de'
  },
  {
    name: 'Japanese',
    value: 'ja'
  }

];

export function setUpOptions(defaultLanguage, options){
  let index;
  options.forEach((option, i) => {
    if (option.value === defaultLanguage){
      index = i;
    }
  })
  let firstHalf = options.slice(0,index);
  let secondHalf = options.slice(index+1);
  const result = [options[index], ...firstHalf, ...secondHalf];
  console.log(result);
  return result;
}

export default options;