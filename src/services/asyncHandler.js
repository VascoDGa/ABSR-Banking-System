const asyncHandler = (fn) => async(req,res,next) => {
    try {
        fn(req,res,next)
    }
    catch(err) {
        res.status(400).json({
            success : false,
            message : err.message
        })
    }
}

export default asyncHandler