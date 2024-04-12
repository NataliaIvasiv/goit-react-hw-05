import axios from "axios";
axios.defaults.baseURL = 'https://api.unsplash.com/search/photos'; 
const fetchApi = async (query, currentPage) => {
   
    const responce = await axios.get(`/?client_id=FTiKXxjaeRfuZ2RTzSQCcKu50g3gL8Gg01hLHqRc9pY&orientation=landscape&query=${query}&per_page=12&page=${currentPage}`)
    return responce;
}

export default fetchApi;