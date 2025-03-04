import {
    createHashRouter,
    createRoutesFromElements,
    Link,
    Route,
    RouterProvider,
} from 'react-router-dom'
import { Layout } from 'app/layout'
import clsx from 'clsx'
import { selectBookDescriptionBook } from 'entities/book/bookDescripton'
import { useTheme } from 'entities/theme'
import { BookDescription } from 'pages/bookDescription'
import { Cart } from 'pages/cart'
import { Categories } from 'pages/categories'
import { Category } from 'pages/category'
import { HomePage } from 'pages/homePage'
import { SearchResults } from 'pages/searchResults'
import { CATEGORIES } from 'shared/consts'
import { useAppSelector } from 'shared/lib/store'
import { Fallback } from 'shared/ui/fallback'

import '../styles/index.scss'

const getCategoryNameByLink = (link?: string): string | undefined => {
    for (const values of Object.values(CATEGORIES)) {
        const findEl = values.find((item) => item.link === link)

        if (findEl) {
            return findEl.title
        }
    }
    return undefined
}

/** Dynamic path parameter types for breadcrumbs. */
interface IParamsDynamicPath {
    /** Page path name. */
    pathname: string
    /** Page parameters. */
    params?: { categoryId: string; bookId: string }
    /** Additional data for the name of bread crumbs. */
    data?: string
}

export const AppRouter = () => {
    const { theme } = useTheme()

    const book = useAppSelector(selectBookDescriptionBook)

    const getDynamicPathForCategory = ({
        pathname,
        params,
    }: IParamsDynamicPath): JSX.Element => {
        return (
            <Link to={pathname}>
                {getCategoryNameByLink(params?.categoryId) ??
                    params?.categoryId}
            </Link>
        )
    }

    const getDynamicPathForBook = ({
        pathname,
        data,
    }: IParamsDynamicPath): JSX.Element => <Link to={pathname}>{data}</Link>

    const routers = createRoutesFromElements(
        <Route
            path='/'
            element={<Layout />}
            handle={{ crumb: <Link to='/'>Home</Link> }}
            errorElement={<Fallback />}>
            <Route index element={<HomePage />} />
            <Route
                path='books'
                handle={{
                    crumb: <Link to='/books'>Books</Link>,
                }}>
                <Route index element={<Categories />} />
                <Route
                    path=':categoryId'
                    element={<Category />}
                    handle={{
                        crumb: getDynamicPathForCategory,
                    }}
                />
                <Route
                    path='description/:bookId'
                    element={<BookDescription />}
                    loader={() => book.title}
                    handle={{
                        crumb: getDynamicPathForBook,
                    }}
                />
            </Route>

            <Route
                path='cart'
                element={<Cart />}
                handle={{
                    crumb: <Link to='/cart'>Cart</Link>,
                }}
            />
            <Route path='/search/:searchLine' element={<SearchResults />} />
        </Route>
    )

    const router = createHashRouter(routers, {})

    return (
        <div className={clsx('app', theme)}>
            <RouterProvider router={router} />
        </div>
    )
}
