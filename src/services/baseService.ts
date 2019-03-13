
export class BaseService {

  constructor() { }

  getJson = async (url: string) => {
    try {
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      console.error('err:', err)
    }
  };

  getRequest = async (url: string) => {
    try {
      let response = await fetch(url, {method: "GET"});
      let blob = await response.blob();
      let image = await URL.createObjectURL(blob);
      return image;
    } catch (err) {
      console.error('err:', err)
    }
  }
}
