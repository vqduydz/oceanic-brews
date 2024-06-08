function rmVNTones(str: string): string {
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
  str = str.replace(/\s+/g, ' ').trim();
  return str;
}

function rmSpecialChars(str: string): string {
  str = str.replace(/[^a-zA-Z0-9\s]/g, ' ');
  str = str.replace(/\s+/g, ' ').trim();
  return str;
}

function generateSlug(str: string): string {
  str = rmVNTones(str);
  str = rmSpecialChars(str);
  str = str.toLowerCase().replace(/ /g, '-');
  return str;
}

export default { generateSlug, rmSpecialChars, rmVNTones };
