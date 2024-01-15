import Button from '../../components/Button/Button';
import styles from './Layout.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slise';
import { useEffect } from 'react';
import { RootState } from '../../store/store';

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img
                        className={styles['userLogo']}
                        src="/avatar.png"
                        alt="Фотография профиля"
                    />
                    <p className={styles['userName']}>{profile?.name}</p>
                    <p className={styles['userEmail']}>{profile?.email}</p>
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
                        <img
                            src="/cart-button-icon.svg"
                            alt="Иконка карточки"
                        />
                        <span>Корзина</span>

                        <span className={styles['productColumn']}>
                            <p className={styles['productColumn_text']}>2</p>
                        </span>
                    </NavLink>
                </div>
                <Button
                    className={styles['exit']}
                    appearence="small"
                    onClick={logout}
                >
                    <img
                        className={styles['logoutIcon']}
                        src="exit-icon.svg"
                        alt="кнопка выхода"
                    />
                    <span>Выйти</span>
                </Button>
            </div>

            <Outlet />
        </div>
    );
}
