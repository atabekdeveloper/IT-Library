export { default as categoryPreviewReducer } from './model/categoryPreviewSlice'
export { fetchCategoryPreview } from './model/categoryPreviewThunk'
export {
    selectCategoryPreviewBooks,
    selectCategoryPreviewError,
    selectCategoryPreviewLoading,
} from './model/selectors'
export { type IBookPreviewState } from './model/types'
