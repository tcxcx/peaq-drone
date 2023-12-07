import axios from 'axios';
import {
    useQuery
} from 'react-query'


const getAllDrones = async () => {
    try {
        const response = await axios.get('http://localhost:5000/drone-listing');
        if (response.status > 200) { throw new Error("Failed to fetch data."); }
        return response?.data;
    } catch (err) {
        throw new Error(err.message);
    }
}

function useDrones() {
    return useQuery('all_drones', getAllDrones);
}
export default useDrones;
