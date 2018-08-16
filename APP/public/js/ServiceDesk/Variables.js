var stararr = [];
var checkboxarr = [];
var tab = 1;
var created = false;
var currenttab = "tab-1";

function InputGen(name, type){
    if(type.toLowerCase() == "select")
    return '<div class="form-group">' +
    '<label for="'+name+'">'+name+':</label>' +
    '<select id="'+name+'" name="'+name+'"' + 
    'class="form-control" required></select>'+
    '</div>'
    else if(type.toLowerCase() == "hidden")
    return '<div class="form-group">' +
    '<input type="'+type+'" id="'+name+'" ' +
    'class="form-control" name="'+name+'" ' +
    'placeholder="'+name+'"></div>'
    else  
    return '<div class="form-group">' +
    '<label for="'+name+'">'+name+':</label>' +
    '<input type="'+type+'" id="'+name+'" ' +
    'class="form-control" name="'+name+'" ' +
    'placeholder="'+name+'"></div>'
  }

var Forms = {
    CreatePC: [
      '<h2 class="form-new-heading">Opret Ny PC</h2>',
      InputGen("template", "select"),
      InputGen("name", "text"),
      InputGen("make", "text"),
      InputGen("model", "text"),
      InputGen("serial", "text"),
      InputGen("cpu", "text"),
      InputGen("ram", "select"),
      InputGen("hdd", "select"),
      InputGen("description", "text"),
      InputGen("status", "select"),
      '<button id="btn-submit" ' +
      'class="btn btn-lg btn-primary btn-block" ' + 
      'type="submit">Opret</button>',
      '<button id="btn-back" ' +
      'class="btn btn-lg btn-danger btn-block" ' +
      'type="">Annuller</button>'
    ],
    ShowOrder: [
      '<h2 class="form-new-heading">Ordre</h2>',
      InputGen("id", "hidden"),    
      InputGen("name", "text"),
      InputGen("email", "text"),
      InputGen("number", "text"),
      InputGen("make", "text"),
      InputGen("model", "text"),
      InputGen("cpu", "text"),
      InputGen("ram", "text"),
      InputGen("hdd", "text"),
      InputGen("price", "text"),
      InputGen("status", "select"),
      '<button id="btn-submit" ' +
      'class="btn btn-lg btn-primary btn-block" ' + 
      'type="submit">Gem</button>',
      '<button id="btn-back" ' +
      'class="btn btn-lg btn-danger btn-block" ' +
      'type="">Annuller</button>'
    ],
    ShowPC: [
      '<h2 class="form-new-heading">PC</h2>',
      InputGen("template", "select"),
      InputGen("make", "text"),
      InputGen("model", "text"),
      InputGen("serial", "text"),
      InputGen("cpu", "text"),
      InputGen("ram", "text"),
      InputGen("hdd", "text"),
      InputGen("description", "text"),
      InputGen("status", "select"),
      '<button id="btn-submit" ' +
      'class="btn btn-lg btn-primary btn-block" ' + 
      'type="submit">Gem</button>',
      '<button id="btn-back" ' +
      'class="btn btn-lg btn-danger btn-block" ' +
      'type="">Annuller</button>'
    ]
};