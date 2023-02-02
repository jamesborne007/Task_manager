const notFound = (res,req) => {
    res.status(404).json({message: 'route Not Found'})
}
module.exports = notFound