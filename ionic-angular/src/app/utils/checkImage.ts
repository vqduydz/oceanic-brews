function checkImage(url: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    let timer: number;
    const img: HTMLImageElement = new Image();

    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      resolve(null);
    };

    img.onload = function () {
      clearTimeout(timer);
      resolve(url);
    };

    timer = window.setTimeout(function () {
      img.src = '//!!!!/noexist.jpg';
      resolve(null);
    }, 2000);

    img.src = url;
  });
}

export default checkImage;
