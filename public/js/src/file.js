window.onload = function(){
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) { 
          return typeof args[number] != 'undefined'
            ? args[number]
            : match
          ;
        });
      };
    var template = '<div class="card border-secondary mb-3" style="max-width: 40rem;"><div class="card-header">Id : {0}</div><div class="card-body"><h4 class="card-title">{1}</h4><p class="card-text">{2}</p></div></div>';
    var href = window.location.href;
    var id = href.substring(href.lastIndexOf('/') + 1, href.length);


    $.ajax('/api/v1/files/' + id).then(function(file){
        file.content.forEach(function(x){ $(template.format(x.id, x.title, x.body)).appendTo('.container'); });
    });
    $('#sign-out').on('click', function(){
        $.ajax('/api/v1/logout').then(function(){window.location.href = '/login'});
    });
};