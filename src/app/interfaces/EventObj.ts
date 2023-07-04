import { RsvpObj } from './RsvpObj'

export interface EventObj {
    eventId?: string,
    title: string,
    desc: string,
    imgUrl: string,
    takesPlaceOn: Date,
    createdAt?: Date,
    updatedAt?: Date,
    rsvps: RsvpObj[]
}