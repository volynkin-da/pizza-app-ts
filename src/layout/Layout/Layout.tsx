import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import cn from 'classnames';

export function Layout() {
    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img
                        className={styles['userLogo']}
                        src="/avatar.png"
                        alt="Фотография профиля"
                    />
                    <p className={styles['userName']}>Дмитрий Волынкин</p>
                    <p className={styles['userEmail']}>Volynkin-da@yandex.ru</p>
                </div>

                <div className={styles['menu']}>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles['link'], { [styles.active]: isActive })
                        }
                        to="/"
                    >
                        <img src="menu-icon.svg" alt="Иконка меню" />
                        <span>Меню</span>
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            cn(styles['link'], { [styles.active]: isActive })
                        }
                        to="/cart"
                    >
                        <img src="cart-icon.svg" alt="Иконка карточки" />
                        <span>Корзина</span>

                        <span className={styles['productColumn']}>
                            <p className={styles['productColumn_text']}>2</p>
                        </span>
                    </NavLink>
                </div>
                <Button className={styles['exit']} appearence="small">
                    <img
                        className={styles['logoutIcon']}
                        src="cart-button-icon.svg"
                        alt="кнопка выхода"
                    />
                    <span>Выйти</span>
                </Button>
            </div>

            <Outlet />
        </div>
    );
}
