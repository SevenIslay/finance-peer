window.onload = function(){
    var href = window.location.href;
    var token = href.substring(href.lastIndexOf('/') + 1, href.length);
    localStorage.setItem('auth', token);
    window.location.href = '/home';
};