window.onload = function(){
    var signout = $('#sign-out');
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
      };
      var tbody = $('tbody');

    $('form').on('submit', function(e){
        var fd = new FormData(); 
        var files = $('#inputFile')[0].files;
        if(!files.length) e.preventDefault();
    });
    var template = '<tr><th scope="row">{0}</th><td>{1}</td></tr>';

    $.ajax('/api/v1/files').then(function(data){
        data.map(function(x){ return template.format(x.id, x.name); }).forEach(function(x){$(x).appendTo(tbody);});
    });
    tbody.on('click', function(e){
        var id = $(e.target).closest('tr').find('th').text();
        window.location.href = '/files/' + id;
    });

    signout.on('click', function(){
        $.ajax('/api/v1/logout').then(function(){window.location.href = '/login'});
    });
};