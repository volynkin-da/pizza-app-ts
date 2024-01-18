import Headling from '../../components/Headling/Headling';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const total = items
        .map((item) => {
            const product = cartProducts.find((p) => p.id === item.id);
            if (!product) {
                return 0;
            }
            return item.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setCartProducts(res);
    };

    const chekout = async () => {
        const { data } = await axios.post(
            `${PREFIX}/order`,
            {
                products: items
            },
            { headers: { Authorization: `Bearer ${jwt}` } }
        );
        navigate('/success');
        dispatch(cartActions.clean());
        console.log(data);
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return (
        <div className={styles['cart']}>
            <Headling className={styles['headling']}>Корзина</Headling>
            {items.map((i) => {
                const product = cartProducts.find((p) => p.id === i.id);
                if (!product) {
                    return;
                }
                return (
                    <CartItem key={product.id} count={i.count} {...product} />
                );
            })}
            {cartProducts.length > 0 && (
                <div>
                    <div className={styles['line']}>
                        <div className={styles['text']}>Итог</div>
                        <div className={styles['price']}>
                            {total}&nbsp;<span>₽</span>
                        </div>
                    </div>
                    <hr className={styles['hr']} />
                    <div className={styles['line']}>
                        <div className={styles['text']}>Доставка</div>
                        <div className={styles['price']}>
                            {DELIVERY_FEE}&nbsp;<span>₽</span>
                        </div>
                    </div>
                    <hr className={styles['hr']} />
                    <div className={styles['line']}>
                        <div className={styles['text']}>
                            Итог{' '}
                            <span className={styles['total-count']}>
                                ({items.length})
                            </span>
                        </div>
                        <div className={styles['price']}>
                            {total + DELIVERY_FEE}&nbsp;<span>₽</span>
                        </div>
                    </div>

                    <div className={styles['checkout']}>
                        <Button appearence="big" onClick={chekout}>
                            оформить
                        </Button>
                    </div>
                </div>
            )}
            {cartProducts.length === 0 && <div>Корзина пуста</div>}
        </div>
    );
}
