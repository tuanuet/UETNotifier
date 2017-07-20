/**
 * Check request from brower or mobile
 * @param web
 * @param api
 * @returns {function(*=, *=, *=)}
 * @constructor
 */
export const DistinctionRequest = (web,api) => {
    return (req,res,next) => {
        if(req.headers['type'] !== 'mobile')
            return web(req,res,next);
        return api(req,res,next);
    };
};
