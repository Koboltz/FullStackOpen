import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data)
};

const addNewPerson = personObj => {
    const req = axios.post(baseUrl, personObj)
    return req.then(res => res.data)
}

const deletePerson = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const updatePerson = (id, newPerson) => {
    const req = axios.put(`${baseUrl}/${id}`, newPerson);
    return req.then(res => res.data)
}

const personsService = {
    getAll,
    addNewPerson,
    deletePerson,
    updatePerson
}


export default personsService;