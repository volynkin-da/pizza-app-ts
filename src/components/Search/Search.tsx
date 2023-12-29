import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
    { isValid = true, className, ...props },
    ref
) {
    return (
        <div className={styles['search']}>
            <img
                className={styles['icon']}
                src="/search-icon.svg"
                alt="Иконка поиска"
            />
            <input
                ref={ref}
                {...props}
                className={cn(styles['search_input'], className, {
                    [styles['invalid']]: isValid
                })}
            />
        </div>
    );
});

export default Search;
