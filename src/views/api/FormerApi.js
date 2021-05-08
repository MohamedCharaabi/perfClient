import React, { useState } from 'react'
import axios from 'axios'

const FormerApi = () => {
    const [formers, setformers] = useState([]);

    async function loadFormers() {
        var result = await axios.get(`https://cims-server.herokuapp.com/former`);
        setformers(result.data);
        // setisLoading(false);
    }

    async function deleteFormer(id) {
        try {
            await axios.delete(`https://cims-server.herokuapp.com/former/${id}`);
            loadFormers();
            alert('Former deleted Successfully');
        } catch (error) {
            alert(`Error while deleting:\n ${error.message}`);
        }


        return { formers, loadFormers, deleteFormer };

    }

}
export default FormerApi
