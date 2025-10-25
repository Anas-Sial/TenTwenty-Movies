import { Showtime } from "../types"

export const dates = ['5 Mar', '6 Mar', '7 Mar', '8 Mar', '9 Mar']

export const showtimes: Showtime[] = [
    {
        id: '1',
        time: '12:30',
        hall: 'Cinetech + Hall 1',
        price: 50,
        bonus: 2500,
        availableSeats: 45,
        totalSeats: 60
    },
    {
        id: '2',
        time: '13:30',
        hall: 'Cinetech + Hall 2',
        price: 75,
        bonus: 3000,
        availableSeats: 38,
        totalSeats: 60
    },
    {
        id: '3',
        time: '15:00',
        hall: 'Cinetech + Hall 1',
        price: 50,
        bonus: 2500,
        availableSeats: 52,
        totalSeats: 60
    }
]

export const seatLayout = [
    { row: 1, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }, // 18 seats
    { row: 2, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
    { row: 3, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
    { row: 4, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] }, // 22 seats
    { row: 5, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
    { row: 6, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
    { row: 7, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
    { row: 8, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
    { row: 9, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats
    { row: 10, seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] }, // 24 seats (VIP)
]

export const unavailableSeats = ['1-5', '2-8', '3-11', '4-2', '5-14', '6-6', '7-9', '8-3', '9-12', '10-5']
