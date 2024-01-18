import cn from 'classnames';
import Heading from '../../components/Headling/Headling.tsx';
import Search from '../../components/Search/Search.tsx';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API.ts';
import { Product } from '../../interfaces/product.interface.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList.tsx';

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>();

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: { name }
            });

            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }
            setIsLoading(false);
            return;
        }
    };

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <div className={styles['menu']}>
            <div className={cn(styles['head'])}>
                <Heading>Меню</Heading>
                <Search
                    onChange={updateFilter}
                    placeholder="Введите блюдо или состав"
                ></Search>
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && products.length > 0 && (
                    <MenuList products={products} />
                )}
                {isLoading && <>Загружаем продукты...</>}
                {!isLoading && products.length === 0 && (
                    <>Не найдено блюд по запросу</>
                )}
            </div>
        </div>
    );
}

export default Menu;
