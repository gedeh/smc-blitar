import accents from "@components/static/main-accent.json"

export const randomAccent = () => {
    const max = accents.length - 1
    const index = Math.floor(Math.random() * max)
    return accents[index]
}
