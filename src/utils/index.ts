// export function debounce<T extends (...args: unknown[]) => void>(
//     fn: T,
//     delay: number = 300,
// ): (...args: Parameters<T>) => void  {

//     let timer: ReturnType<typeof setTimeout>;

//     return (...args) => {
//         clearTimeout(timer)
//         timer = setTimeout(() => {
//             fn(...args)
//         }, delay)
//     }
// }



export function debounce<Args extends unknown[]>(
    fn: (...args: Args) => void,
    delay: number = 300
) {

    let timer: ReturnType<typeof setTimeout>;

    return (...args: Args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}
