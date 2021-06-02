import axios from 'axios';

async function getChain() {
    let res = await axios.get('http://localhost:5001/chain');
    return res.data;
}

async function getTagNetwork() {
    let res = await axios.get('http://localhost:5001/tags');
    return res.data;
}

export default {
    getChain,
    getTagNetwork,
};
