import styles from './Nav.module.css';

function Nav (props) {

    const navLinks = [
        { name: 'Главная', path: '/' },
        { name: 'О нас', path: '/about' },
        { name: 'Услуги', path: '/services' },
    ];

    return (
        <nav>
            <ul>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <a href={link.path} className={styles.link}>{link.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;