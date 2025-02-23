import clsx from 'clsx'
import { CartPreview } from 'entities/cart'
import { Search } from 'features/search'
import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Menu from 'shared/assets/icons/menu.svg?react'
import { CONTENT_NAVIGATION_MENU } from 'shared/consts'

import './header.scss'

export const Header = () => {
    const [isViewHeader, setIsViewHeader] = useState(true)
    const [isViewNavigationMenu, setIsViewNavigationMenu] = useState(false)
    const navigate = useNavigate()
    const onChangeViewHeader = (inView: boolean): void => {
        setIsViewHeader(inView)
    }

    const onToggleHideNavigationMenu = (): void => {
        setIsViewNavigationMenu((prevState) => !prevState)
    }

    const navigationContent = CONTENT_NAVIGATION_MENU.map((item) => (
        <li key={item.title} className='layout__navigation-menu-item'>
            <NavLink
                to={item.link}
                end
                onClick={onToggleHideNavigationMenu}
                className={({ isActive }) =>
                    clsx(
                        'layout__navigation-menu-link',
                        isActive && 'layout__navigation-menu-link_active'
                    )
                }>
                {item.title}
            </NavLink>
        </li>
    ))

    return (
        <>
            <InView as='div' onChange={(inView) => onChangeViewHeader(inView)}>
                <header className='header _container'>
                    <div className='header__wrapper'>
                        <Link to='/'>
                            <h2 className='header__title'>IT Library</h2>
                        </Link>
                        <Search className='header__search' />
                        <div className='header__btn-wrapper'>
                            <CartPreview onClick={() => navigate('/cart')} />
                        </div>

                        <button
                            type='button'
                            onClick={onToggleHideNavigationMenu}
                            aria-label='toggle view menu'
                            className='header__menu-open-btn'>
                            <Menu className='header__menu-icon' />
                        </button>
                    </div>
                </header>
            </InView>
            <nav
                className={clsx(
                    'header__navigation-menu',
                    !isViewHeader && 'layout__navigation-menu_sticky'
                )}>
                <div
                    className={clsx(
                        'header__navigation-menu-wrapper',
                        !isViewNavigationMenu &&
                            'header__navigation-menu-wrapper_hide',
                        '_container'
                    )}>
                    <ul className='header__navigation-menu-list'>
                        {navigationContent}
                    </ul>

                    <div className='header__navigation-menu-btn-wrapper'>
                        <CartPreview className='header__navigation-menu-button' />
                    </div>
                </div>
            </nav>
        </>
    )
}
