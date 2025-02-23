export { default as bookDescriptionReducer } from './model/bookDescriptionSlice'
export { fetchBookDescription } from './model/bookDescriptionThunk'
export {
    selectBookDescriptionBook,
    selectBookDescriptionError,
    selectBookDescriptionLoading,
} from './model/selectors'
export { type IBookDescriptionState } from './model/types'
