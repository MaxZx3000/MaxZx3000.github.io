class FetchHelper{
    constructor(){
        this.headers = {
            headers: {
                'X-Auth-Token': "66f562fc98dd448eb69a3aac2291a0be"
            }       
        }
        this.baseURL = "https://api.football-data.org/v2/";
    }
    getJson(response){
        return response.json();
    }
    getResponse(response){
        return Promise.resolve(response);
    }
    getErrorResponse(reject){
        return Promise.reject(new Error(reject));
    }
    getJSONData(url){
        return new Promise((resolve, reject)=>{
            fetch(url, this.headers).then((response) => {
                if (response.status === 200){
                    return this.getResponse(response);
                }
                return this.getErrorResponse(response.statusText);
            }).then((json) => resolve(this.getJson(json)))  
        })     
    }
}
export default FetchHelper;