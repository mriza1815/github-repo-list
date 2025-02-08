export const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const, hour: '2-digit' as const, minute: '2-digit' as const, second: '2-digit' as const };
    return date.toLocaleDateString('en-US', options);
}