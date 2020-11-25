window.onload = function(){
    var form = $('form');
    var email = $('#email');
    var textArea = $('p');
    var password = $('#password');
    var _emailError = 'Enter Valid Email Id';
    var _passwordError = 'Password Minimum 8 characters';
    var _emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var _validate = function(){
        if(!_emailRegex.test(email.val())) return {email: true};
        if(password.val().length < 8) return { password: true };
        return true;
    };

    var onSubmit = function(e){
        var result = _validate();
        if(!(typeof result === 'boolean' && result)){
            e.preventDefault();
            if(result.email) textArea.text(_emailError);
            if(result.password) textArea.text(_passwordError);
        }
    };

    form.on('submit', onSubmit);
};