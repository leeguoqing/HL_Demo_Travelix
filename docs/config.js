

function log() {
    document.getElementById('results').innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}

//document.getElementById("login").addEventListener("click", login, false);
//document.getElementById("api").addEventListener("click", api, false);
//document.getElementById("logout").addEventListener("click", logout, false);

//#################### Please change configurations here with your own properties.
var auth_server_uri = "https://v1.api.us.janrain.com/"
var customer_id = "e0fe87a8-5911-4ea2-a2ea-9e98d2cf9805";
var client_id = "000604d7-3e90-4a9e-8791-0e0b64d19e16";
var redirect_uri = "http://travelix.guoqing.li/callback.html";
var post_logout_redirect_uri = "http://travelix.guoqing.li/index.html";
//#################### Configuarations over. 


var profile_url = auth_server_uri + customer_id + "/auth-ui/profile?client_id=" + client_id;
var userinfo_url = auth_server_uri + customer_id + "/profiles/oidc/userinfo";
var config = {
    authority: auth_server_uri + customer_id + "/login/",
    client_id: client_id,
    redirect_uri: redirect_uri,
    response_type: "code",
    scope:"openid email profile",
    post_logout_redirect_uri : post_logout_redirect_uri,
    metadata : {end_session_endpoint : auth_server_uri + customer_id+"/auth-ui/logout?client_id=" + client_id,
                issuer: auth_server_uri + customer_id + "/login",
                authorization_endpoint: auth_server_uri + customer_id + "/login/authorize",
                token_endpoint: auth_server_uri + customer_id + "/login/token",
                introspection_endpoint: auth_server_uri + customer_id + "/login/token/introspect",
                revocation_endpoint: auth_server_uri + customer_id + "/login/token/revoke",
                userinfo_endpoint: auth_server_uri + customer_id + "/profiles/oidc/userinfo",
                jwks_uri: auth_server_uri + customer_id + "/login/jwk",
                }
};
var mgr = new Oidc.UserManager(config);

mgr.getUser().then(function (user) {
    if (user) {
        log(user.profile.email);        
        document.getElementById("user_box_profile").style.display = "show";
        document.getElementById("user_box_logout").style.display = "show";
        document.getElementById("user_box_login").style.display = "none";
    }
    else {
        document.getElementById("user_box_profile").style.display = "none";
        document.getElementById("user_box_logout").style.display = "none";
        document.getElementById("user_box_login").style.display = "show";
    }
});

function profile() {
    window.open(profile_url, "_blank");
}

function login() {
    mgr.signinRedirect();
}

function api() {
    mgr.getUser().then(function (user) {
        var url = userinfo_url;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}

function logout() {
     mgr.signoutRedirect();
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var issso = GetQueryString("sso")
if (issso=='true')
{
    login();
}
