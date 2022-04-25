import axios from 'axios';
 


export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data:  {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': 'fe9034e14cmsh32f23e03a965e30p1fe97cjsn36b2d3c7f70c'
          }
        });
        
        return data;
    } catch (error) {

    }
}