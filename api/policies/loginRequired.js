/**
loginRequired

@module      :: Policy
@description :: Simple policy to allow any authenticated user
@docs        :: http://sailsjs.org/#!documentation/policies
 */
module.exports = async function(req, res, next) {
  var referer;
  referer = req.path.split('/');
  if (UserService.getLoginState(req)) {
    let userInfo = UserService.getLoginUser(req);
    let role = await db.Role.find({
      where: {authority: 'admin'}
    });
    if(referer['1'] === 'admin'){
      if (userInfo.RoleId === role.id) {
        return next();
      } else {
        return res.redirect('/');
      }
    }else{
      return next();
    }
  }
  if (referer['1'] === 'admin') {
    return res.redirect('/admin/login');
  } else {
    return res.redirect('/');
  }
};

// ---
// generated by coffee-script 1.9.2
