!function i(s,r,l){function d(t,e){if(!r[t]){if(!s[t]){var a="function"==typeof require&&require;if(!e&&a)return a(t,!0);if(c)return c(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=r[t]={exports:{}};s[t][0].call(o.exports,function(e){return d(s[t][1][e]||e)},o,o.exports,i,s,r,l)}return r[t].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)d(l[e]);return d}({1:[function(e,t,a){"use strict";var i=[],s=[],r="tab-1";function n(e,t){return"select"==t.toLowerCase()?'<div class="form-group"><label for="'+e+'">'+e+':</label><select id="'+e+'" name="'+e+'"class="form-control" required></select></div>':"hidden"==t.toLowerCase()?'<div class="form-group"><input type="'+t+'" id="'+e+'" class="form-control" name="'+e+'" placeholder="'+e+'"></div>':'<div class="form-group"><label for="'+e+'">'+e+':</label><input type="'+t+'" id="'+e+'" class="form-control" name="'+e+'" placeholder="'+e+'"></div>'}var o={CreatePC:['<h2 class="form-new-heading">Opret Ny PC</h2>',n("template","select"),n("name","text"),n("make","text"),n("model","text"),n("serial","text"),n("cpu","text"),n("ram","select"),n("hdd","select"),n("description","text"),n("status","select"),'<button id="btn-submit" class="btn btn-lg btn-primary btn-block" type="submit">Opret</button>','<button id="btn-back" class="btn-back btn btn-lg btn-danger btn-block" type="button">Annuller</button>'],ShowOrder:['<h2 class="form-new-heading">Ordre</h2>',n("cid","hidden"),n("id","hidden"),n("name","text"),n("email","text"),n("number","text"),n("make","text"),n("model","text"),n("cpu","text"),n("ram","text"),n("hdd","text"),n("price","text"),n("status","select"),n("PC","select"),'<button id="btn-submit" class="btn btn-lg btn-primary btn-block" type="submit">Gem</button>','<button id="btn-back" class="btn-back btn btn-lg btn-danger btn-block" type="button">Annuller</button>'],ShowPC:['<h2 class="form-new-heading">PC</h2>',n("id","hidden"),n("make","text"),n("model","text"),n("serial","text"),n("cpu","text"),n("ram","text"),n("hdd","text"),n("description","text"),n("status","select"),'<button id="btn-submit" class="btn btn-lg btn-primary btn-block" type="submit">Gem</button>','<button id="btn-back" class="btn-back btn btn-lg btn-danger btn-block" type="button">Annuller</button>']},c=io.connect("localhost");function l(){$("tr").off(),$('.main tr input[type="checkbox"]').off(),$(".main table tr .delete").off(),$(".star").off()}function d(){c.emit("SQLQuery","SELECT * FROM `PC` where ItemStatus != 'klar til salg' AND ItemStatus != 'skrottet'")}function p(){c.emit("SQLQuery","SELECT * FROM `PC` where ItemStatus = 'klar til salg'")}function f(){c.emit("SQLQuery","CALL GetOrders()")}function m(e){$("#template").off(),$(".close-form, .btn-back").off(),$("#form-new-edit form").html(""),$("#form-new-edit form").attr("id","altform"),o[e].forEach(function(e){$("#form-new-edit form").append(e)}),"CreatePC"==e?$(".edit-form").css("display","none"):$(".edit-form").css("display",""),$(".close-form, .btn-back").click(function(){$(".tab").css("display",""),"tab-1"==r?f():"tab-2"==r?p():"tab-3"==r&&d()})}function u(e,t){m(e);var a={ShowOrder:["OrderByID","CALL GetOrderByID("+t+")"],ShowPC:["PCElement",t]};c.emit(a[e][0],a[e][1])}c.on("SQLQueryResponse",function(e){$("#form-new-edit").css("display",""),l(),$("#tab-btn-3").hasClass("active")?($(".create-pc").css("display","block"),$('.main #searchdiv input[type="text"]').attr("placeholder","Søg i Computere"),$("#tab-3").css("display",""),$("#tab-3").find("tr").remove(),e.forEach(function(e){$("#tab-3").append('<tr id="'+e.ID+'"><td><label class = "containers"> <input type = "checkbox" > <span class = "checkmark" > </span> </label>  </td>  <td > <a class = "material-icons star" > stars </a>  </td>  <td >'+e.PCMake+" "+e.PCModel+"</td>  <td >"+e.Serial+'</td>  <td > <i class = "material-icons delete" >delete</i> </td></tr >')})):$("#tab-btn-2").hasClass("active")?($("#tab-2").css("display",""),$(".create-pc").css("display",""),$('.main #searchdiv input[type="text"]').attr("placeholder","Søg i Klargjorte Computere"),$("#tab-2").find("tr").remove(),e.forEach(function(e){$("#tab-2").append('<tr id="'+e.ID+'"><td><label class = "containers"> <input type = "checkbox" > <span class = "checkmark" > </span> </label>  </td>  <td > <a class = "material-icons star" > stars </a>  </td>  <td >'+e.PCMake+" "+e.PCModel+"</td>  <td >"+e.Serial+'</td>  <td > <i class = "material-icons delete" >delete</i> </td></tr >')})):$("#tab-btn-1").hasClass("active")&&($("#tab-1").css("display",""),$('.main #searchdiv input[type="text"]').attr("placeholder","Søg i Ordrer"),$(".create-pc").css("display",""),$("#tab-1").find("tr").remove(),e[0].forEach(function(e){$("#tab-1").append('<tr id="'+e.WID+'"><td><label class = "containers"> <input type = "checkbox" > <span class = "checkmark" > </span> </label>  </td>  <td > <a class = "material-icons star" > stars </a>  </td>  <td >'+e.FirstName+" "+e.LastName+"</td>  <td >"+e.Mail+'</td>  <td > <i class = "material-icons delete" >delete</i> </td></tr >')})),$(function(){l(),$(".main table tr .delete").click(function(){if("tab-2"==r||"tab-3"==r){var e=$(this).closest("tr").attr("id");c.emit("DeletePC",e)}}),$("tr td:nth-of-type(3), tr td:nth-of-type(4)").click(function(){var e=$(this).closest("tr").attr("id");$("#form-new-edit").css("display","block"),$("#"+r).css("display","none"),$(".tab").css("display","none"),console.log(r),u("tab-1"==r?"ShowOrder":"ShowPC",e),$(".create-pc").css("display","none")}),$("tr").hover(function(){var a=this;$(this).find('input[type="checkbox"]').is(":checked")?$(this).find(".checkmark").css("background","#bbb"):$(this).find(".checkmark").css("background","#ccc"),$(this).find(".star").css("color","#ccc"),i.forEach(function(e,t){e.id==$(a).attr("id")&&e.checked&&$(a).find(".star").css("color","yellow")}),$(this).find(".delete").css("color","#ccc")},function(){var a=this;$(this).find(".delete").css("color",""),$(this).find(".checkmark").css("background",""),$(this).find(".star").css("color",""),i.forEach(function(e,t){e.id==$(a).attr("id")&&e.checked&&$(a).find(".star").css("color","yellow")})}),$(".main table tr .delete").hover(function(){$(this).css("color","rgb(255, 60, 60)")},function(){$(this).css("color","#ccc")}),$(".star").on("click",function(){var a=this;console.log("hej");var n=-1;i.forEach(function(e,t){e.id==$(a).closest("tr").attr("id")&&(n=t)}),-1==n&&(n=i.length,i.push({id:$(this).closest("tr").attr("id"),checked:$(this).prop("checked")})),i[n].checked?$(this).css("color",""):$(this).css("color","yellow"),i[n].checked=!i[n].checked}),$('.main tr input[type="checkbox"]').click(function(){var a=this;$(this).prop("checked");var n=-1;s.forEach(function(e,t){e.id==$(a).closest("tr").attr("id")&&(n=t)}),-1==n&&(n=s.length,s.push({id:$(this).closest("tr").attr("id"),checked:!1})),s[n].checked=!s[n].checked;var o=0;s.forEach(function(e,t){e.checked&&o++}),0<o&&"tab-1"!=r?$(".delete-selected").css("display","block"):$(".delete-selected").css("display","")})})}),c.on("DeletePCResponse",function(e){"tab-1"==r?f():"tab-2"==r?p():"tab-3"==r&&d()}),c.on("DeleteMultiplePCResponse",function(e){"tab-1"==r?f():"tab-2"==r?p():"tab-3"==r&&d()}),c.on("RAMOptionsResponse",function(e){e[0].forEach(function(e,t){$("#ram").append('<option value="'+e.Size+'">'+e.Size+" GB RAM </option>")})}),c.on("HDDOptionsResponse",function(e){e[0].forEach(function(e,t){$("#hdd").append('<option value="'+e.Size+'">'+e.Size+" GB </option>")})}),c.on("GetTemplatesResponse",function(e){var t;t=e,$("#template").append('<option value="0"> --- </option>'),$("#template").append('<option value="ny"> Ny Template </option>'),$("#status").append('<option value="Ukendt" selected="selected">Ukendt</option>'),$("#status").append('<option value="Klar til salg">Klar til salg</option>'),$("#status").append('<option value="Venter på reservedele">Venter på reservedele</option>'),$("#status").append('<option value="Skrottet">Skrottet</option>'),t[0].forEach(function(e,t){$("#template").append('<option value="'+e.ID+'">'+e.Name+" </option>")}),$("#template").on("change",function(){var a=this;if(0!=$("#template").val()&&"ny"!=$("#template").val()){var n=0;t[0].forEach(function(e,t){e.ID==$(a).val()&&(n=t)}),$("#name").val(t[0][n].Name),$("#make").val(t[0][n].PCMake),$("#model").val(t[0][n].PCModel),$("#cpu").val(t[0][n].CPU),$("#description").val(t[0][n].Description),$("#ram").val(t[0][n].RAM),$("#hdd").val(t[0][n].HDD),$("#name").prop("readonly","readonly"),$("#make").prop("readonly","readonly"),$("#model").prop("readonly","readonly"),$("#cpu").prop("readonly","readonly"),$("#description").prop("readonly","readonly"),$("#hdd").attr("disabled","disabled")}else"ny"==$("#template").val()?($("#name").val(""),$("#make").val(""),$("#model").val(""),$("#cpu").val(""),$("#description").val(""),$("#name").prop("readonly",!1)):($("#name").val(""),$("#make").val(""),$("#model").val(""),$("#cpu").val(""),$("#description").val(""),$("#name").prop("readonly",!0)),$("#make").prop("readonly",!1),$("#model").prop("readonly",!1),$("#cpu").prop("readonly",!1),$("#description").prop("readonly",!1),$("#ram").attr("disabled",!1),$("#hdd").attr("disabled",!1)})}),c.on("InsertTemplateResponse",function(e){}),c.on("InsertPCResponse",function(e){$(".tab").css("display",""),$("#form-new-edit").css("display",""),d()}),c.on("PCElementResponse",function(e){console.log(e);$("#form-new-edit").find("#id").val(e[0][0].ID),$("#form-new-edit").find("#make").val(e[0][0].PCMake),$("#form-new-edit").find("#model").val(e[0][0].PCModel),$("#form-new-edit").find("#serial").val(e[0][0].Serial),$("#form-new-edit").find("#cpu").val(e[0][0].CPU),$("#form-new-edit").find("#ram").val(e[0][0].RAM+"GB"),$("#form-new-edit").find("#hdd").val(e[0][0].Storage),$("#form-new-edit").find("#description").val(e[0][0].Description),[{value:"klar til salg"},{value:"skrottet"},{value:"ny"}].forEach(function(e){$("#form-new-edit").find("#status").append('<option value="'+e.value+'">'+e.value+"</option>")}),$("#form-new-edit").find("#status").val(e[0][0].ItemStatus.toLowerCase()),$("#form-new-edit").find(".form-control").each(function(){"status"==$(this).attr("id")&&$(this).prop("disabled",!0),$(this).prop("readonly",!0),$("#form-new-edit form").attr("id","SavePC"),$("#SavePC").off(),$("#SavePC").on("submit",function(e){if(e.preventDefault(),!$("#form-new-edit").find("#ram").prop("readonly")){var t=$("#SavePC").serializeArray();c.emit("UpdatePC",t),console.log(t)}})})}),c.on("OrderByIDResponse",function(e){$("#form-new-edit").find("#cid").val(e[0][0].CID),$("#form-new-edit").find("#id").val(e[0][0].WID),$("#form-new-edit").find("#name").val(e[0][0].FirstName+" "+e[0][0].LastName),$("#form-new-edit").find("#email").val(e[0][0].Mail),$("#form-new-edit").find("#number").val(e[0][0].Phone),$("#form-new-edit").find("#make").val(e[0][0].PCMake),$("#form-new-edit").find("#model").val(e[0][0].PCModel),$("#form-new-edit").find("#cpu").val(e[0][0].CPU),$("#form-new-edit").find("#ram").val(e[0][0].RAM+"GB"),$("#form-new-edit").find(".form-control").each(function(){"status"==$(this).attr("id")&&$(this).prop("disabled",!0),$(this).prop("readonly",!0)}),$("#form-new-edit form").attr("id","SaveOrder"),$("#SaveOrder").off(),$("#SaveOrder").on("submit",function(e){if(e.preventDefault(),!$("#form-new-edit").find("#ram").prop("readonly")){var t=$("#SaveOrder").serializeArray();c.emit("UpdateOrder",t),console.log(t)}});var a=e[0][0].DiskSizes.split(", "),n=e[0][0].DiskTypes.split(", "),o="";a.forEach(function(e,t){o+=e+" "+n[t],t!=a.length-1&&(o+=", ")}),$("#form-new-edit").find("#hdd").val(o),$("#form-new-edit").find("#price").val(e[0][0].Price);var t="ny";"ny"==e[0][0].Status.toLowerCase()&&(t="afsluttet"),$("#form-new-edit").find("#status").append('<option value="'+e[0][0].Status+'">'+e[0][0].Status+'</option><option value="'+t+'">'+t+"</option>"),$("#form-new-edit").find("#PC").append("<option>ingen</option>"),$("#form-new-edit").find("#status").off(),$("#form-new-edit").find("#PC").prop("disabled",!0),$("#form-new-edit").find("#status").change(function(){"Ny"==$(this).val()?$("#form-new-edit").find("#PC").prop("disabled",!0):$("#form-new-edit").find("#PC").prop("disabled",!1)}),c.emit("GetPCs")}),c.on("GetPCsResponse",function(e){e.forEach(function(e){$("#form-new-edit").find("#PC").append('<option value="'+e.ID+'">'+e.PCMake+" "+e.PCModel+"</option>")}),$("#form-new-edit").find("#PC").val(e[0][0].PC)}),c.on("UpdateOrderResponse",function(e){console.log(e),$(".tab").css("display",""),$("#form-new-edit").css("display",""),f()}),c.on("UpdatePCResponse",function(e){console.log(e),$(".tab").css("display",""),$("#form-new-edit").css("display",""),"tab-1"==r?f():"tab-2"==r?p():"tab-3"==r&&d()}),$(".create-pc").click(function(){m("CreatePC"),c.emit("RAMOptions"),c.emit("HDDOptions"),c.emit("GetTemplates"),$(".create-pc").css("display",""),$("#form-new-edit").css("display","block"),$("#tab-3").css("display","none"),$(".tab").css("display","none")}),$("#altform").on("submit",function(e){e.preventDefault(),console.log(e);$("#altform").serializeArray();$(".tab").css("display","");var t=$("#name").val(),a=$("#make").val(),n=$("#model").val(),o=$("#serial").val(),i=$("#cpu").val(),s=$("#ram").val(),r=$("#hdd").val(),l=$("#description").val(),d=$("#status").val();"ny"==$("#template").val()?c.emit("SaveTemplate",{name:t,make:a,model:n,cpu:i,ram:s,hdd:r,desc:l}):c.emit("InsertPC",{make:a,model:n,serial:o,cpu:i,ram:s,hdd:r,desc:l,status:d})}),$(".edit-form").click(function(){$("#form-new-edit").find(".form-control").each(function(){"status"==$(this).attr("id")&&$(this).prop("disabled",!1),$(this).prop("readonly",!1)})}),$(".delete-selected").click(function(){var t=[];s.forEach(function(e){e.checked&&t.push(e.id)}),c.emit("DeleteMultiplePC",t)}),$(".tablinks").each(function(){$(this).on("click",function(e){!function(e,t){var a,n,o;for(r=t,n=document.getElementsByClassName("tabcontent"),a=0;a<n.length;a++)n[a].style.display="none";for(o=document.getElementsByClassName("tablinks"),a=0;a<o.length;a++)o[a].className=o[a].className.replace(" active","");s.forEach(function(e){$("#"+e.id).find('input[type="checkbox"]').prop("checked",!1)}),i.forEach(function(e){$("#"+e.id).find(".star").css("color","#eee")}),s=[],i=[],$(".delete-selected").css("display",""),document.getElementById(t).style.display="table",e.currentTarget.className+=" active","tab-2"==t?p():"tab-1"==t?f():"tab-3"==t&&d()}(e,e.target.id.replace("-btn",""))})}),f(),$("#search_text").keyup(function(){var e,t,a,n,o;for(e=document.getElementById("search_text").value.toUpperCase(),t=document.getElementById(r).getElementsByTagName("tr"),o=0;o<t.length;o++)a=t[o].getElementsByTagName("td")[2],n=t[o].getElementsByTagName("td")[3],(a||n)&&(-1==a.innerHTML.toUpperCase().indexOf(e)&&-1==n.innerHTML.toUpperCase().indexOf(e)?t[o].style.display="none":t[o].style.display="")})},{}]},{},[1]);
//# sourceMappingURL=ServiceDesk.js.map
