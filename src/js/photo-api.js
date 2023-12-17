import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
 
export class ApiByPhoto {
  constructor() {
    this.page = null;
    this.per_page = 20;
    this.photoId;  
  }

 async FetchByPhoto() {
    const params = {
        key: '41261447-8e6e35c805284eb5c4b03f22e',
        image_type: 'photo',
        q: this.photoId,
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.per_page,
   };
   
   try {
     const data = await axios.get('/api/', { params });
     return data;
   } catch {
   console.log(Error)
   }
  };
};
