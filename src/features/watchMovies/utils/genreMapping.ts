import { GenreWithImage, TMDBGenre } from '../types';

export const genreImageMapping: Record<number, string> = {
    28: 'https://images.unsplash.com/photo-1490775696818-7832285c7240?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974', // Action - Mad Max
    12: 'https://images.unsplash.com/photo-1531352568100-8194a5f7a16e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742', // Adventure - Fantastic Beasts
    16: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Animation - Family movie
    35: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742', // Comedy - We're the Millers
    80: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Crime - Peaky Blinders
    99: 'https://images.unsplash.com/photo-1649192537902-7b06265dd08f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1548', // Documentary - Nature
    18: 'https://plus.unsplash.com/premium_photo-1683219368393-96002fb69cd6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Drama - Me Before You
    10751: 'https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742', // Family
    14: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1738', // Fantasy - Fantastic Beasts
    36: 'https://images.unsplash.com/photo-1503925802536-c9451dcd87b5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Horror - It
    10402: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940', // Music - Drama theme
    9648: 'https://images.unsplash.com/photo-1641363405766-5a08334be83e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Mystery - Thriller theme
    10749: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742', // Romance - Me Before You
    878: 'https://images.unsplash.com/photo-1635698054698-1eaf72c5a894?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Science Fiction - Mad Max
    10770: 'https://images.unsplash.com/photo-1652004329896-f78a898ffcb7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2062', // TV Movie - Drama theme
    53: 'https://images.unsplash.com/photo-1635593083614-a2bac25c2ddb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VGhyaWxsZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900', // Thriller
    10752: 'https://plus.unsplash.com/premium_photo-1716078137428-aabec80b2c34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // War - Action theme
    37: 'https://plus.unsplash.com/premium_photo-1670897798400-f91a1db8525b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740', // Western - Holiday theme
};

export const mapGenresWithImages = (genres: TMDBGenre[]): GenreWithImage[] => {
    return genres.map(genre => ({
        ...genre,
        imageUrl: genreImageMapping[genre.id] || 'https://image.tmdb.org/t/p/w500/4q2hz2m8UXgG4jwuWigD2X0F6Rz.jpg', // Default image
    }))
}
