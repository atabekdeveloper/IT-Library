import { IBookDescription } from 'shared/api/book'
import { RejectedDataType } from 'shared/types'

export interface IBookDescriptionState {
    /** Book description. */
    readonly book: IBookDescription
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
