import { FC } from 'react'
import { Link } from 'react-router-dom'
import ArrowRight from 'shared/assets/icons/arrowRight.svg?react'
import DefaulImageAuthor from 'shared/assets/images/defaultAuthor.png'
import { Carousel } from 'shared/ui/carousel'

import './author.scss'

interface IAuthor {
    authors: string[]
}

const AuthorContent = (props: { author: string }) => {
    const { author } = props

    return (
        <div className='author'>
            <h2 className='author__title'>Authors</h2>
            <div className='author__wrapper-names'>
                <img src={DefaulImageAuthor} alt="Author's default." />
                <h3 className='author__names'>{author}</h3>
            </div>
            <div className='author__wrapper-link'>
                <Link to={`/search/${author}`} className='author__link'>
                    Read more
                </Link>
                <ArrowRight />
            </div>
        </div>
    )
}

export const Author: FC<IAuthor> = (props) => {
    const { authors } = props

    const authorsContent = authors.map((item) => (
        <AuthorContent author={item} />
    ))

    return authors.length > 1 ? (
        <Carousel autoWidth disableDotsControls className='author__carousel'>
            {authorsContent}
        </Carousel>
    ) : (
        <AuthorContent author={authors[0]} />
    )
}
