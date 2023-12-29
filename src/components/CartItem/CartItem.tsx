import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
function CartItem(props: CartItemProps) {
    return (
        <div className={styles['item']}>
            <div
                className={styles['image']}
                style={{ backgroundImage: `url('${props.image}')` }}
            ></div>
            <div className={styles['description']}>
                <div className={styles['name']}>{props.name}</div>
                <div className={styles['price']}>{props.price}&nbsp;₽</div>
            </div>
            <div className={styles['actions']}>
                <button className={styles['minus']}>
                    <img src="/minus-icon.svg" alt="Удалить из корзины" />
                </button>
                <div className={styles['number']}>{props.count}</div>
                <button className={styles['plus']}>
                    <img src="/plus-icon.svg" alt="Добавить в корзину" />
                </button>
                <button className={styles['remove']}>
                    <img src="/delete-icon.svg" alt="Удалить все" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
