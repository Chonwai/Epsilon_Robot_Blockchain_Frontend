import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Scatterplot from '../components/Scatterplot';
import ChainAPI from '../api/chain';
import { react, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExploreIcon from '@material-ui/icons/Explore';
import { toast, ToastContainer } from 'react-nextjs-toast';
import 'animate.css';

let currentDay = 1;
let chainSize = 1;

export default function Home() {
    const [chain, setChain] = useState([]);
    const [day, setDay] = useState(currentDay);
    const getSpecifyChainByIndex = async (index = 1) => {
        let data = await ChainAPI.getSpecifyChainByIndex(index);
        console.log(data);
        setChain(data);
    };
    const getChainSize = async () => {
        let data = await ChainAPI.getChainSize();
        console.log(data);
        chainSize = data.size;
    };
    const viewDay = i => {
        currentDay = currentDay + i;
        if (currentDay < 1) {
            currentDay = 1;
        } else if (currentDay > chainSize) {
            currentDay = chainSize;
        }
        setDay(currentDay);
        getSpecifyChainByIndex(currentDay);
    };
    const exploreMore = async () => {
        let data = await ChainAPI.mineBlock();
        if (data.message == 'A block is MINED') {
            toast.notify('Exploration Task Finished!', {
                duration: 10,
                type: 'success',
            });
            chainSize = data.index;
        }
    };
    useEffect(() => {
        getSpecifyChainByIndex();
        getChainSize();
    }, []);
    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: 'url("/image/background.gif")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: 'black',
            }}
        >
            <Head>
                <title>MarsLink</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex w-full">
                <ToastContainer position={'top'} />
                <div className="w-1/5 flex flex-col justify-center items-end animate__animated animate__fadeInUp">
                    <p className="text-white text-7xl">MarsLink</p>
                    <p className="text-white text-2xl">MB955370</p>
                    <p className="text-white text-2xl">MB955702</p>
                    <p className="text-white text-2xl">MB955533</p>
                </div>
                <div className="w-3/5 flex justify-center items-center">
                    <Scatterplot {...chain}></Scatterplot>
                </div>
                <div className="w-1/5 flex flex-col justify-center items-start p-4">
                    <p className="text-white text-2xl mb-4">Mars Day: ε{day}</p>
                    <div className="mb-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<ArrowBackIcon />}
                            onClick={() => {
                                viewDay(-1);
                            }}
                        >
                            Pervious Day
                        </Button>
                    </div>
                    <div className="mb-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            onClick={() => {
                                viewDay(1);
                            }}
                        >
                            Next Day
                        </Button>
                    </div>
                    <div className="mb-4">
                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<ExploreIcon />}
                            onClick={() => {
                                exploreMore(1);
                            }}
                        >
                            Explore More
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
