import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Scatterplot from '../components/Scatterplot';
import ChainAPI from '../api/chain';
import { react, useEffect, useState } from 'react';
import 'animate.css';

export default function Home() {
    const [chain, setChain] = useState([]);
    const [tagNetwork, setTagNetwork] = useState([]);
    const getChain = async () => {
        let data = await ChainAPI.getChain();
        console.log(data);
        setChain(data);
    };
    const getTagNetwork = async () => {
        let data = await ChainAPI.getTagNetwork();
        console.log(data);
        setTagNetwork(data);
    };
    useEffect(() => {
        getTagNetwork();
        getChain();
    }, []);
    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: 'url("https://i.giphy.com/97aL1TzOeZ7QHlVV9N.gif")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Head>
                <title>MarsLink</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex w-full">
                <div className="w-1/4 flex flex-col justify-center items-end animate__animated animate__fadeInUp">
                    <p className="text-white text-7xl">MarsLink</p>
                    <p className="text-white text-2xl">MB955370</p>
                    <p className="text-white text-2xl">MB955702</p>
                    <p className="text-white text-2xl">MB955533</p>
                </div>
                <div className="w-3/4 flex justify-center items-center">
                    <Scatterplot {...chain}></Scatterplot>
                </div>
            </main>
        </div>
    );
}
