/* eslint-env node */

/**
 * Web
 * @param req
 * @param res
 */
const getLogin = (req,res) => {
    res.render('authenticate/login');
};
const postSignUp = (req,res) => {
    res.send('Web post sign up');
}
const postAuthenticate = (req,res) =>{
    res.render('admin/dashboard');
};
export default {
    getLogin,
    postAuthenticate,
    postSignUp
};