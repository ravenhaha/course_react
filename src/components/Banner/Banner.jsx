import styles from './Banner.module.css';
import { useState } from 'react';
import blackImg from './black.jpg';
import redImg from './red.jpg';

function Banner() {
    const [isFirst, setIsFirst] = useState(true);

    const imageStyle = {
        width: '100px',
        height: '100px',
    };

    return (
        <div className={isFirst ? styles.container : styles.containerAlt}>
            {isFirst ? (
                <img style={imageStyle} src={blackImg} alt="Картинка 1" />
            ) : (
                <img style={imageStyle}  src={redImg} alt="Картинка 2" />
            )}
            <button onClick={() => setIsFirst(!isFirst)}>switch</button>
        </div>
    );
}

export default Banner;