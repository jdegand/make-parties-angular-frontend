import { RsvpObj } from './RsvpObj'

export interface EventObj {
    createdAt: string; 
    desc?: string; 
    eventId: number; 
    imgUrl?: string; 
    rsvps?: RsvpObj[]; 
    takesPlaceOn?: string; 
    title: string; 
    updatedAt: string;
}