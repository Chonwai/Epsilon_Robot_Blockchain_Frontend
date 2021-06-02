import axios from 'axios';

async function getChain() {
    let res = await axios.get('http://localhost:5001/chain');
    return res.data;
}

async function getChainSize() {
    let res = await axios.get('http://localhost:5001/chain/size');
    return res.data;
}

async function getSpecifyChainByIndex(index) {
    let res = await axios.get(`http://localhost:5001/chain/${index}`);
    return res.data;
}

async function mineBlock() {
    let res = await axios.get(`http://localhost:5001/chain/mine`);
    return res.data;
}

async function getTagNetwork() {
    let res = await axios.get('http://localhost:5001/tags');
    return res.data;
}

export default {
    getChain,
    getChainSize,
    getSpecifyChainByIndex,
    mineBlock,
    getTagNetwork,
};
