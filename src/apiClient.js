export class ApiClient {
  
  rootUrl = 'http://127.0.0.1:3001';

  constructor() {} 

  async getPlayers () {
    const response = await fetch(this.rootUrl + '/players', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    const data = await response.json();
   
    return data;
  }
  
  async addPlayer (p) {
    const player = await fetch(this.rootUrl + '/players', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify(p),
    });
    const data = await player.json();
    return data;
  }

}