import { useEffect } from 'react';

function Space() {
    useEffect(() => {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function shuffle(arr, number, duplicate) {
            const newArray = [];
            do {
                const randomIndex = getRandomInt(0, arr.length),
                    newItem = newArray.find(el => el === arr[randomIndex]);
                if (!newItem || (newItem && duplicate)) {
                    newArray.push(arr[randomIndex]);
                }
            } while (arr.length !== newArray.length);

            if (number === 0) {
                return newArray;
            } else if (number <= arr.length || duplicate) {
                return newArray.slice(0, number);
            } else {
                return newArray[0];
            }
        }

        function generate() {
            const container = document.querySelector('.space-container'),
                numStar = window.innerWidth / 2;

            container.childNodes.forEach(child => container.removeChild(child));

            for (let i = 0; i < numStar; i++) {
                const star = {},
                    size = getRandomInt(1, 4),
                    color = getRandomInt(100, 255),
                    blueOrYellow = shuffle([true, false]),
                    domStar = document.createElement('div');
                domStar.classList.add('star');
                container.appendChild(domStar);
                domStar.style = `
                  left: ${getRandomInt(0, window.innerWidth)}px;
                  bottom: ${getRandomInt(0, window.innerHeight)}px;
                  width: ${size}px;
                  height: ${size}px;
                  background: rgb(${!blueOrYellow ? color : '255'},255,${
                    blueOrYellow ? color : '255'
                });
                  box-shadow: ${getRandomInt(0, 5)}px ${getRandomInt(0, 5)}px ${size * 5}px rgb(${
                    !blueOrYellow ? color : '255'
                },255,${blueOrYellow ? color : '255'});
                  filter: blur(${getRandomInt(0, 1)}px)
                 `;
            }
        }

        document.addEventListener('DOMContentLoaded', _ => {
            generate();
            setInterval(_ => {
                const generateStars = document.querySelectorAll('.star');
                if (generateStars.length > 0) {
                    const randomStar = getRandomInt(0, generateStars.length - 1);
                    setTimeout(_ => {
                        generateStars[randomStar].style.opacity = getRandomInt(0, 5);
                        setTimeout(_ => {
                            generateStars[randomStar].style.opacity = 1;
                        }, getRandomInt(20, 1000));
                    }, getRandomInt(50, 1000));
                }
            }, 100);
        });

        generate();

        window.addEventListener('resize', generate);
    }, []);
    return <div className="space-container"></div>;
}

export default Space;
