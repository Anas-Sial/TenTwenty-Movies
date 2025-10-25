export const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString)
    return `In Theaters ${date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })}`
}