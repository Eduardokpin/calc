// Add row on add button click
$(document).on("click", ".add", function () {
  var empty = false;
  const VRTE = 4.0350
  const cerca = 2.61
  const adubo = 0.16
  const hidrog = 0.05
  const form = 50.44
  const herb = 26.52
  

  var sel = $(this).parents("tr").find("select");
  sel.each(function () {
    if (!$(this).val()) {
      $(this).addClass("error");
      empty = true;
    } else {
      $(this).removeClass("error");
    }
  });
  var input = $(this).parents("tr").find('input[type="number"]');
  input.each(function () {
    if (!$(this).prop('disabled')){
      if (!$(this).val() || parseInt($(this).val())>parseInt($(this).prop('max'))) {
        $(this).addClass("error");
        alert("Valor inválido ou acima do permitido em: " + $(this).prop('name') + ".\nValor máximo permitido: " + $(this).prop('max'));
        $(this).val($(this).prop('max'));
        empty = true;
      } else {
        $(this).removeClass("error");
      }
    }
  switch (true) {
    case parseFloat($('#area').val())<=1:
      fx = 400
      if(parseFloat($('#cerca').val())>fx*parseFloat($('#area').val())){
        alert("Valor inválido ou acima do permitido em cerca.\nValor máximo permitido:" + fx*parseFloat($('#area').val()));
        $('#cerca').addClass("error");
        empty = true;
        $('#cerca').val(fx*parseFloat($('#area').val()));
      }else{
        $(this).removeClass("error");
      }      
      break;
    case parseFloat($('#area').val())>1 && parseFloat($('#area').val())<=2:
      fx=300
      if(parseFloat($('#cerca').val())>fx*parseFloat($('#area').val())){
        alert("Valor inválido ou acima do permitido em cerca.\nValor máximo permitido:" + fx*parseFloat($('#area').val()));
        $('#cerca').addClass("error");
        empty = true;
        $('#cerca').val(fx*parseFloat($('#area').val()));
      }else{
        $(this).removeClass("error");
      }      
      break;
    case parseFloat($('#area').val())>2 && parseFloat($('#area').val())<=3:
      fx=270
      if(parseFloat($('#cerca').val())>fx*parseFloat($('#area').val())){
        alert("Valor inválido ou acima do permitido em cerca.\nValor máximo permitido:" + fx*parseFloat($('#area').val()));
        $('#cerca').addClass("error");
        empty = true;
        $('#cerca').val(fx*parseFloat($('#area').val()));
      }else{
        $(this).removeClass("error");
      }      
      break;
    case parseFloat($('#area').val())>3 && parseFloat($('#area').val())<4:
      fx=250
      if(parseFloat($('#cerca').val())>fx*parseFloat($('#area').val())){
        alert("Valor inválido ou acima do permitido em cerca.\nValor máximo permitido:" + fx*parseFloat($('#area').val()));
        $('#cerca').addClass("error");
        empty = true;
        $('#cerca').val(fx*parseFloat($('#area').val()));
      }else{
        $(this).removeClass("error");
      }      
      break;
    case parseFloat($('#area').val())>=4:
      fx=220
      if(parseFloat($('#cerca').val())>fx*parseFloat($('#area').val())){
        alert("Valor inválido ou acima do permitido em cerca.\nValor máximo permitido:" + fx*parseFloat($('#area').val()));
        $('#cerca').addClass("error");
        empty = true;
        $('#cerca').val(fx*parseFloat($('#area').val()));
      }else{
        $(this).removeClass("error");
      }      
      break;
      default:
      break;
  }  
  
  });
  $(this).parents("tr").find(".error").first().focus();
  if (!empty) {
    var index = $("table.result tbody tr:last-child").index();
    var row0 ="<tr><p>" + "<td>" + sel.val() + " com área " + $(this).parents("tr:nth-child(1)").find("input").val() +"ha</p>"
    if($('#mudas').val()>0 && !$('#herbicidas').prop("checked")){
      row0 = row0 + "<p>" +$('#mudas').val()+ "un  de mudas</p>"
    }
    if($('#mudas').val()>0 && $('#herbicidas').prop("checked")){
      row0 = row0 + "<p>" +$('#mudas').val()+ "un de mudas com herbicidas</p>"
    }
    if($('#cerca').val()>0){
      row0 = row0 + "<p>" +$('#cerca').val()+ "m de cerca</p>"
    }
    row0 += "</td>"; 

    switch(sel.val()){
      case "FPE"://LP
        valor = 450 * VRTE * $('#area').val().replace(',','.') ;
        rows = ""
        rows += "<td>" + valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) + "</td>";
        for(let i = 0; i<5 ; i++){ 
          rows += "<td>"+ (valor*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
        }
        break;
      case "REG"://LP e CP
      valorLP = 380 * VRTE * $('#area').val().replace(',','.');
      valorCP = cerca * VRTE * $('#cerca').val();
      rows = "";
      rows += "<td>" + (valorCP+valorLP).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valorLP*0.2+valorCP*0.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valorLP*0.2+valorCP*0.3).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valorLP*0.2+valorCP*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      for(let i = 0 ; i<2; i++){
        rows += "<td>"+ (valorLP*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      }   
      break;

      case "REC"://LP e CP
      valorLP = 400 * VRTE * $('#area').val().replace(',','.');
      valorCP = 0;

      valorCP +=0.71 * VRTE * $('#mudas').val();
      valorCP +=cerca * VRTE * $('#cerca').val();     
      valorCP +=adubo * VRTE * $('#mudas').val();
      valorCP +=hidrog * VRTE * $('#mudas').val();
      valorCP +=form * VRTE * $('#area').val().replace(',','.');
      if($('#herbicidas').prop("checked")){
        valorCP +=herb * VRTE * $('#area').val().replace(',','.');
      }
      rows = "";
      rows += "<td>" + (valorCP+valorLP).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valorLP*0.2+valorCP*0.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valorLP*0.2+valorCP*0.3).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valorLP*0.2+valorCP*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      for(let i = 0 ; i<2; i++){
        rows += "<td>"+ (valorLP*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      }   
      break;

      case "SAF"://CP
      valor = 0;
      rows = "";

      valor +=1.04 * VRTE * $('#mudas').val();
      valor +=cerca * VRTE * $('#cerca').val();    
      valor +=adubo * VRTE * $('#mudas').val();
      valor +=hidrog * VRTE * $('#mudas').val();
      valor +=form * VRTE * $('#area').val().replace(',','.') ; 
      if($('#herbicidas').prop("checked")){
        valor +=herb * VRTE * $('#area').val().replace(',','.') ;
      }

      rows += "<td>" + (valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.3).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";

      for(let i = 0 ; i<2; i++){
        rows += "<td>"+(0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"</td>";
      }
      break;

      case "FMA"://CP
      valor = 0;
      rows = "";

      valor +=0.47 * VRTE * $('#mudas').val() ;
      valor +=cerca * VRTE * $('#cerca').val();      
      valor +=adubo * VRTE * $('#mudas').val();
      valor +=hidrog * VRTE * $('#mudas').val();
      valor +=form * VRTE * $('#area').val().replace(',','.'); 
      if($('#herbicidas').prop("checked")){
        valor +=herb * VRTE * $('#area').val().replace(',','.');
      }
      rows += "<td>" + (valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.3).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      for(let i = 0 ; i<2; i++){
        rows += "<td>"+(0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"</td>";
      }
      break;

      case "SSP"://CP
      valor = 0;
      rows = "";

      valor +=0.56 * VRTE * $('#mudas').val() ;//mudas
      valor +=cerca * VRTE * $('#cerca').val();      
      valor +=adubo * VRTE * $('#mudas').val();
      valor +=hidrog * VRTE * $('#mudas').val();
      valor +=form * VRTE * $('#area').val().replace(',','.'); 
      if($('#herbicidas').prop("checked")){
        valor +=herb * VRTE * $('#area').val().replace(',','.'); 
      }

      rows += "<td>" + (valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.5).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.3).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      rows += "<td>"+ (valor*0.2).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})  + "</td>";
      for(let i = 0 ; i<2; i++){
        rows += "<td>"+(0).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"</td>";
      }
      break;

      default:
      alert("Modalidade não escolhida!")
        break;
      
    }
    rowf = '<td><a class="delete" title="Deletar" data-toggle="tooltip"><img id="del" src="./pacotes/imgs/del.svg"></a></td>'+ "</tr>";
    row = row0+rows+rowf
    $("table.result").append(row);
    $("table.result tbody").eq(index + 1);
    sel.each(function () {
      $(this).val("");
    });
    input.each(function () {
      $(this).val("");
    });
    $('#herbicidas').prop("checked",false);
    $('input').prop('disabled',true);
    calcular();
  }
});
// Delete row on delete button click
$(document).on("click", ".delete", function () {
  $(this).parents("tr").remove();
  $(".add-new").removeAttr("disabled");
  calcular();
});

function calcular() {
  var table = document.getElementsByClassName('resultados');
  arrayanos = [0,0,0,0,0,0];
  valor = 0;
  //var regex = /\d+\,\d+/;
  for (var i = 0; i<table[0].rows.length; i++) {
    row = table[0].rows[i];
    for (var j = 1; j<row.cells.length-1 ; j++) {
      valor = row.cells[j].innerHTML;
      valor = valor.replace('R$&nbsp;','').replace('.','').replace(',','.')
      valor = parseFloat(valor);
      arrayanos[j-1] += valor;
    }  
 }
 
 i = 0;
  arrayanos.forEach(function mostrar(item) {
    $('.ano'+i).text(item.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
    i++;
  });
}

$(document).on("change",'select', function(){
  switch ($(this).val()) {
    case null:
      $('#mudas').prop('max',0);
      $('input').prop('disabled',true)
      break;
    case 'SAF':
      $('#mudas').prop('max','1500');
      $('input').prop('disabled',false);
      $('input').val('');
      break;
    case 'FMA':
      $('input').prop('disabled',false);
      $('#mudas').prop('max',1100);
      $('input').val('');
      break;
    case 'SSP':      
      $('input').prop('disabled',false);
      $('#mudas').prop('max',300);
      $('input').val('');
      break;
    case 'REC':
      $('input').prop('disabled',false);
      $('#mudas').prop('max',1500);
      $('input').val('');
      break;
    case 'REG':
      $('#area').prop('disabled', false);
      $('#mudas').prop('disabled', true);
      $('#herbicidas').prop('disabled',true);
      $('#cerca').prop('disabled', false);
      $('#mudas').prop('max',0);
      $('input').val('');     
      break;
    case 'FPE':
      $('#area').prop('disabled', false);
      $('#mudas').prop('disabled', true);
      $('#herbicidas').prop('disabled',true);
      $('#cerca').prop('disabled', true);
      $('#mudas').prop('max',0);
      $('input').val('');
      break;
    default:
      break;
  }
})

$(document).on("click", ".print", function () {
  window.print();
});

