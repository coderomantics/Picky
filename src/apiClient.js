export class ApiClient {
  
  rootUrl = 'http://127.0.0.1:3008';

  constructor() {} 

  // async getFilledForm () {
  //   const response = await fetch(this.rootUrl, {
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   })
  //   const data = await response.json();
   
  //   return data;
  // }
  
  async postFilledForm (form) {
    const post = await fetch(this.rootUrl + '/form', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify(form),
    });
    const data = await post.json();
    return data;
  }
  
  

}