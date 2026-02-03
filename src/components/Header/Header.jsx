import Nav from "../Nav/Nav.jsx";
import {useEffect, useState} from "react";

function Header () {

    const [isNum, setNum] = useState(0);

    const handleClick = () => {
        setNum((prev) => prev + 1);
    }

    useEffect(() => {
        console.log('🟢 Компонент смонтирован');

        return () => {
            console.log('🔴 Компонент размонтирован');
        };
    }, []);

    useEffect(() => {
        console.log('🔄 Компонент обновлён, count:', isNum);
    }, [isNum]);

    return (
        <header>
            <Nav />
            <button onClick={handleClick}>{isNum}</button>
        </header>
    )
}

export default Header;