//it is better way to write a try and catch fun
module.exports = (fn) =>{
    return (req,res,next) =>{
        fn(req,res,next).catch(next);
    }
}