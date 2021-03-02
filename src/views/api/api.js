import axios from 'axios'

const base_url = "https://cims-server.herokuapp.com/";


export const getThemes = async () => {
    const resp = await axios.get(`${base_url}theme`);
    return resp.data;
}
