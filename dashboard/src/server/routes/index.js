export default {
    configure: (app, router) => {
        router.get("/", (req, res) => {
            res.render("index")
        })

        router.get("/health", (req, res) => {
            res.json({ status: "ok" })
        })
    }
}
