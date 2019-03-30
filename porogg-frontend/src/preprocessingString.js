const preprocessingString=(str)=>{
  const regExp=/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  str=str.replace(regExp, "")
  return str;
};

export default preprocessingString;
