window.onload = function(){
    var form = $('form');
    var email = $('#email');
    var textArea = $('#textArea');
    var name = $('#name');
    var password = $('#password');
    var password2 = $('#password2');
    var _emailError = 'Enter Valid Email Id';
    var _passwordError = 'Password Minimum 8 characters';
    var _nameError = 'Please Enter Name';
    var _passWordNotMatching = 'Passwords don\'t match. Please retype.';
    var _emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var _validate = function(){
        if(!name.val()) return {error : _nameError};
        if(!_emailRegex.test(email.val())) return {error: _emailError};
        if(password.val().length < 8) return { error: _passwordError };
        if(password.val() !== password2.val()) return { error: _passWordNotMatching };
        
        return true;
    };

    var onSubmit = function(e){
        var result = _validate();
        if(!(typeof result === 'boolean' && result)){
            e.preventDefault();
            if(result.error) textArea.text(result.error);
        }
    };

    form.on('submit', onSubmit);
};