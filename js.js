Arrgl = []
function Saludo() {
    alert('Saludos desde una funcion desde un archivo externo')
}
function AlertaConParametro(msj) {
    alert(msj)
}
function Sumar() {
    n1 = parseInt(prompt('Ingresar el primer numero'))
    n2 = parseInt(prompt('Ingresar el segundo numero'))
    alert('La suma de '.concat(n1).concat('+').concat(n2).concat(' Es: ').concat((n1 + n2)))
}
function AgregaElemArray(dto, argl) {
    argl.push(dto)
}
function Agregando() {
    dt = prompt('Ingresar un dato')
    if (dt.length === 0)
        alert('Faltan datos')
    else {
        AgregaElemArray(dt, Arrgl)
        for (k in Arrgl)
            console.log(Arrgl[k])
    }
}

/*TRABAJANDO FORMULARIOS**************** */
var filasel = -1; seltb = -1; filaselmrc = -1
function llenacombo(combo, dto) {
    if (buscarCombo(combo, dto)) {
        alert('La Cadena '.concat(dto).concat(' Ya existe'));
    }
    else {
        option = document.createElement("option"); option.text = dto;
        combo.add(option, combo[combo.length]); combo.selectedIndex = -1;
    }
}
function buscarCombo(cbo, dt) {
    bd = false
    for (p = 0; p < cbo.length; p++) {
        if (cbo.options[p].value === dt) {
            bd = true; break;
        }
    }
    return bd
}
function BuscarinTable(id) {
    switch (id) {
        case 0: {
            tbl = document.getElementById("tblbdymrc");
            dto = document.getElementById("txbusmrc").value;
            for (f = 0; f < tbl.rows.length; f++) {
                bdr = false
                celdas = tbl.rows[f].getElementsByTagName('td');
                for (let c = 0; c < celdas.length && !bdr; c++) {
                    const comparar = celdas[c].innerHTML.toLowerCase();
                    if (dto.length == 0 || comparar.indexOf(dto) > -1) {
                        bdr = true;
                    }
                }
                if (bdr)
                    tbl.rows[f].style.display = '';
                else
                    tbl.rows[f].style.display = 'none';
            }
            break;
        }
    }
}
function BuscarinTablas(tbl, dtbs) {
    Desmarcar("tblbdymrc")
    for (f = 0; f < tbl.rows.length; f++) {
        bdr = false
        celdas = tbl.rows[f].getElementsByTagName('td');
        for (let c = 0; c < celdas.length && !bdr; c++) {
            const comparar = celdas[c].innerHTML.toLowerCase();
            if (dtbs.length == 0 || comparar.indexOf(dtbs.toLowerCase()) > -1) {
                bdr = true;
            }
        }
        if (bdr)
            tbl.rows[f].style.display = '';
        else
            tbl.rows[f].style.display = 'none';
    }
}
function BuscarinTablas_JQ(tb, dt) {
    $('#' + tb + ' tr').each(function () {
        bdr = false
        celdas = $(this).find("td");
        for (let c = 0; c < celdas.length && !bdr; c++) {
            const comparar = celdas[c].innerHTML.toLowerCase();
            if (dtbs.length == 0 || comparar.indexOf(dtbs.toLowerCase()) > -1) {
                bdr = true;
            }
        }
    });
}

function Cancelarmrc() {
    filaselmrc = -1; LimpiaControlesMRC(); Desmarcar("tblbdymrc");
}
function Cancelarprod() {
    filasel = -1; LimpiaControles(); Desmarcar("tblbdy");
}
function GrabarMarca() {
    if (filaselmrc > -1) {
        alert('Estamos en modo Modificacion')
        return
    }

    if (document.getElementById("txtmrc").value.length > 0) {
        tabl = document.getElementById("tblbdymrc");
        if (buscarTabla(tabl, 1, document.getElementById("txtmrc").value)) {
            alert('La Marca '.concat(document.getElementById("txtmrc").value).concat(' Ya Existe'))
            document.getElementById("txtmrc").select()
        }
        else {
            row = tabl.insertRow(tabl.rows.length);
            row.setAttribute('onclick', 'Seleccionar(this,0)')
            cll1 = row.insertCell(0); cll1.style.textAlign = "center"
            cll2 = row.insertCell(1);
            cll1.innerHTML = GenCodigo1("MRC", tabl);
            cll2.innerHTML = document.getElementById("txtmrc").value;
            Cancelarmrc();
            LlenarMarcas(tabl, 'cbomrc', 1);
        }
    }
    else {
        alert('Faltan datos')
        document.getElementById("txtmrc").focus()
    }
}
function LlenarMarcas(tb, cbo, cln) {
    LimpiarCombo(cbo); cb = document.getElementById(cbo);
    for (f = 0; f < tb.rows.length; f++) {
        option = document.createElement("option");
        option.value = f; option.text = tb.rows[f].cells[cln].innerText;
        cb.add(option, cb[cb.length]);
    }
    cb.selectedIndex = -1;
}
function GrabarProducto() {
    if (filasel > -1) {
        alert('Estamos en modo Modificacion')
        return
    }
    if (document.getElementById("txtprc").value.length > 0) {
        tabl = document.getElementById("tblbdy");
        row = tabl.insertRow(tabl.rows.length);
        row.setAttribute('onclick', 'Salud()')
        cll1 = row.insertCell(0); cll1.style.textAlign = "center"
        cll2 = row.insertCell(1);
        cll3 = row.insertCell(2); cll3.style.textAlign = "center"
        cll4 = row.insertCell(3); cll4.style.textAlign = "center"
        combo = document.getElementById("cbomrc")
        cll1.innerHTML = "COD" + tabl.rows.length;
        cll2.innerHTML = document.getElementById("txtprd").value;
        cll3.innerHTML = combo[combo.selectedIndex].innerHTML;
        cll4.innerHTML = document.getElementById("txtprc").value;
        LimpiaControles()
    }
    else {
        alert('Faltan datos')
        document.getElementById("txtprc").focus()
    }
}
function GrabarProductos() {
    if (filasel > -1) {
        alert('Estamos en modo Modificacion')
        return
    }
    if (document.getElementById("txtprc").value.length > 0) {
        tabl = document.getElementById("tblbdy");
        row = document.createElement("tr");
        row.setAttribute('onclick', 'Seleccionar(this,1)');
        combo = document.getElementById("cbomrc");
        cll1 = document.createElement("td");
        cll1.appendChild(document.createTextNode("COD" + (tabl.rows.length + 1)))
        cll1.style.textAlign = "center"
        cll2 = document.createElement("td");
        cll2.appendChild(document.createTextNode(document.getElementById("txtprd").value))
        cll2.style.textAlign = "left"
        cll3 = document.createElement("td");
        cll3.appendChild(document.createTextNode(combo[combo.selectedIndex].innerHTML))
        cll3.style.textAlign = "center"
        cll4 = document.createElement("td");
        cll4.appendChild(document.createTextNode(document.getElementById("txtprc").value))
        cll4.style.textAlign = "center"; row.appendChild(cll1); row.appendChild(cll2);
        row.appendChild(cll3); row.appendChild(cll4); tabl.appendChild(row);
        LimpiaControles()
    }
    else {
        alert('Faltan datos')
        document.getElementById("txtprc").focus()
    }
}
function GrabarProductos1() { 
    if (filasel > -1) {
        alert('Estamos en modo Modificación');
        return;
    }

    if (document.getElementById("txtprc").value.length > 0) {
        const tabl = document.getElementById("tblbdy");
        const producto = document.getElementById("txtprd").value.trim();
        const marca = document.getElementById("cbomrc").options[document.getElementById("cbomrc").selectedIndex].innerHTML;

        // Validar duplicidad del producto y la marca en la misma fila
        if (buscarTablaDuplicidad(tabl, producto, marca)) {
            alert('El producto "' + producto + '" de la marca "' + marca + '" ya existe.');
            document.getElementById("txtprd").select();
        } else {
            // Crear una nueva fila en la tabla
            const row = tabl.insertRow(tabl.rows.length);
            row.setAttribute('onclick', 'Seleccionar(this,1)');

            row.insertCell(0).innerHTML = "COD" + tabl.rows.length;
            row.insertCell(1).innerHTML = producto;
            row.insertCell(2).innerHTML = marca;
            row.insertCell(3).innerHTML = document.getElementById("txtprc").value.trim();
            LimpiaControles();
        }
    } else {
        alert('Faltan datos');
        document.getElementById("txtprc").focus();
    }
}
function buscarTablaDuplicidad(tabla, producto, marca) {
    for (let p = 0; p < tabla.rows.length; p++) {
        if (
            tabla.rows[p].cells[1].innerHTML.trim().toUpperCase() === producto.toUpperCase() &&
            tabla.rows[p].cells[2].innerHTML.trim().toUpperCase() === marca.toUpperCase()
        ) {
            return true;
        }
    }
    return false;
}
function ModificarProductos(fila) {
    if (document.getElementById("txtprc").value.length > 0) {
        tabla = document.getElementById("tblbdy");
        if (buscarTabla(tabla, 1, document.getElementById("txtprd").value)) {
            alert('El producto: '.concat(document.getElementById("txtprd").value).concat(' Ya Existe'));
            document.getElementById("txtprd").select()
        }
        else {
            tabla.rows[fila].cells[1].innerText = document.getElementById("txtprd").value;
            tabla.rows[fila].cells[2].innerText = document.getElementById("cbomrc")[
                document.getElementById("cbomrc").selectedIndex].innerHTML;
            tabla.rows[fila].cells[3].innerText = document.getElementById("txtprc").value;
            Desmarcar(); LimpiaControles()
        }
    }
    else {
        alert('Faltan datos'); document.getElementById("txtprc").focus()
    }
}
function ModificarMarcas(fila) {
    if (document.getElementById("txtmrc").value.length > 0) {
        tabla = document.getElementById("tblbdymrc");
        if (buscarTabla(tabla, 1, document.getElementById("txtmrc").value)) {
            alert('La marca'.concat(document.getElementById("txtmrc").value).concat(' Ya Existe'));
            document.getElementById("txtmrc").select()
        }
        else {
            tabla.rows[fila].cells[1].innerText = document.getElementById("txtmrc").value;
            Desmarcar("tblbdymrc"); LimpiaControles(); LlenarMarcas(tabla, "cbomrc", 1);
            Cancelarmrc();
        }
    }
    else {
        alert('Faltan datos'); document.getElementById("txtprc").focus()
    }
}
function Eliminamrc() {
    if (filaselmrc > -1) {
        if (confirm('Seguro deseas eliminar la marca seleccionada')) {
            document.getElementById("tblbdymrc").rows[filaselmrc].remove()
            LlenarMarcas(document.getElementById("tblbdymrc"), 'cbomrc', 1)
            LimpiaControlesMRC(); Cancelarmrc();
        }
    }
    else {
        alert('No has seleccionado ninguna Marca')
        document.getElementById("txtmrc").focus()
    }
}
function Eliminarprod() {
    if (filasel > -1) {
        if (confirm('Seguro deseas eliminar la marca seleccionada')) {
            document.getElementById("tblbdy").rows[filasel].remove()
            LlenarMarcas(document.getElementById("tblbdy"), 'cbomrc', 1)
            LimpiaControles(); Cancelarprod();
        }
    }
    else {
        alert('No has seleccionado ninguna Marca')
        document.getElementById("txtprd").focus()
    }
}
function LimpiaControles() {
    document.getElementById('txtmrc').value = ""
    document.getElementById("txtprd").value = ""
    document.getElementById("txtprc").value = ""
    document.getElementById("cbomrc").selectedIndex = -1
    document.getElementById("txtprd").focus()
}
function LimpiarCombo(cbo) {
    var options = document.querySelectorAll('#'.concat(cbo).concat(' option'));
    options.forEach(o => o.remove());
}
function LimpiaControlesMRC() {
    document.getElementById("txtmrc").value = ""
    document.getElementById("txtmrc").focus()
}
function SoloNumeros(event) {
    const tecla = event.which || event.keyCode; 
    const entrada = event.target.value; 
    if (
        (tecla >= 48 && tecla <= 57) || tecla === 46 || tecla === 8 || tecla === 37 || tecla === 39) {if (tecla === 46 && entrada.includes(".")) {
            event.preventDefault();}} else {event.preventDefault(); }
}

function Seleccionar(F, i) {
    switch (i) {
        case 0: {
            tabla = document.getElementById("tblbdymrc"); filaselmrc = F.rowIndex - 1;
            document.getElementById("txtmrc").value = tabla.rows[filaselmrc].cells[1].innerText
            Desmarcar('tblbdymrc');
            document.getElementById("tblbdymrc").rows[filaselmrc].style.backgroundColor = 'red'
            document.getElementById("tblbdymrc").rows[filaselmrc].style.color = 'white'
            break;
        }
        case 1: {
            tabla = document.getElementById("tblbdy"); filasel = F.rowIndex - 1;
            document.getElementById("txtprd").value = tabla.rows[filasel].cells[1].innerText
            document.getElementById("txtprc").value = tabla.rows[filasel].cells[3].innerText
            document.getElementById("cbomrc").selectedIndex = buscarPos(
                document.getElementById("cbomrc"), tabla.rows[filasel].cells[2].innerText);
            Desmarcar('tblbdy');
            document.getElementById("tblbdy").rows[filasel].style.backgroundColor = 'red'
            document.getElementById("tblbdy").rows[filasel].style.color = 'white'
            break;
        }
        case 3: {
            $("#tabla1 tr").css("background-color", "green");
            break;
        }
    }
}
function buscarPos(cbo1, dto) {
    ps = -1
    for (p = 0; p < cbo1.length; p++) {
        if (cbo1.options[p].text === dto) {
            ps = p; break;
        }
    }
    return ps
}
function buscaEnCbocnJQ(cb, dt) {
    bdr = false
    $("#" + cb + " option").each(function () {
        if ($(this).text().toLowerCase() === dt.toLowerCase())
            bdr = true
    });
    return bdr
}
function buscarTabla_JQ(tb, col, dt) {
    flg = false
    $('#' + tb + ' tr').each(function () {
        if ($(this).find("td").eq(col).html().toLowerCase() === dt.toLowerCase()) {
            flg = true;
        }
    });
    return flg
}
function buscarTabla(tab, col, dto) {
    bdr = false
    for (p = 0; p < tab.rows.length; p++) {
        if (tab.rows[p].cells[col].innerHTML.toUpperCase() === dto.toUpperCase()) {
            bdr = 3 > 1; break;
        }
    }
    return bdr
}
function Desmarcar(ntb) {
    for (f = 0; f < document.getElementById(ntb).rows.length; f++) {
        document.getElementById(ntb).rows[f].style.backgroundColor = '#ff0'
        document.getElementById(ntb).rows[f].style.color = '#000'
    }
}
function IniciarFrmPrdts() {
    document.getElementById("txtmrc").focus()
    document.getElementById("cbomrc").selectedIndex = -1
}
function cajsLlenas() {
    return $('#txcdo').val() && $('#txpdt').val() && $('#txpco').val()
}
function AgreFilasenTableConJQ() {
    if (cajsLlenas()) {
        if (buscarTabla_JQ("tabla1", 0, $('#txcdo').val())) {
            alert('Codigo ' + $('#txcdo').val())
            $('#txcdo').select()
        }
        else {
            $('#tabla1').append("<tr onclick='Selecprod(this)'><td>" + $('#txcdo').val()
                + "</td><td>" + $('#txpdt').val() + "</td><td>" + $('#txpco').val() + "</td></tr>");

            // $('#tabla1').prepend("<tr><td>"+$('#txcdo').val()+"</td><td>"+$('#txpdt').val()
            // +"</td><td>"+$('#txpco').val()+"</td></tr>");
            $('#txcdo').val(''); $('#txpdt').val('');
            $('#txpco').val(''); $('#txcdo').focus();
        }
    }
    else alert('Faltan Datossss')
}

function Selecprod(f) {
    //  alert(f.rowIndex)
    // let filas=;
    //  Desmarcar('tabla1')
    // $('#tabla1 tr').each(function(){
    //  $(this).css("background-color", "#fff");
    // });
    // $("#tabla1").find("tr")[1].css("background-color", "green")
    // $("#tabla1").rows(f.rowIndex).css("background-color", "green");
    //   Seleccionar(f.rowIndex,3)
}
function SeleccionaElementCbo_JQ(idcb) {
    return $('#' + idcb + ' option:selected').html()
    //    return $("#"+idcb+" option:selected").text()
}
function AgregarenCbodesdeTx_JQ(idtx, idcbo) {
    if ($('#' + idtx).val().trim().length === 0) {
        alert('Faltan datos')
    }
    else {
        if (buscaEnCbocnJQ(idcbo, $("#" + idtx).val())) {
            alert('El dato ' + $("#" + idtx).val() + ' Ya Existe')
            $("#" + idtx).select()
        }
        else {
            AgregarCbo_JQ($("#" + idtx).val(), idcbo)
            $("#" + idtx).val(""); $("#" + idtx).focus()
        }

    }
    $('#tx1').focus()
}
function AgregarCbo_JQ(dt, idcb) {
    let $prepara = $('#'.concat(idcb).concat(' option'));
    $('#'.concat(idcb)).append($('<option />', {
        text: dt, value: $prepara.length,
    }));
    document.getElementById(idcb).selectedIndex = -1
}
function EliminaElemSelect_JQ(idcbo) {
    if (confirm('Seguro de eliminar')) {
        $('#' + idcbo + ' option:selected').remove()
        DesmarcarCbo(idcbo)
    }
}
function ParImpar(n) {
    if (n % 2 === 0)
        return true
    else
        return false
}
function DesmarcarCbo(idecbo) {
    document.getElementById(idecbo).selectedIndex = -1
}
function MarcaCheckLong_JQ(idcb, idopc1, idopc2) {
    dt = SeleccionaElementCbo_JQ(idcb)
    alert(dt)
    MarcaOpcion(idopc1, false)
    MarcaOpcion(idopc2, false)
    if (ParImpar(dt.length))
        MarcaOpcion(idopc1, true)
    else
        MarcaOpcion(idopc2, true)
}
function MarcaOpcion(idopc, dtbo) {
    $('#' + idopc).attr('checked', dtbo);
}
function ObtenerEdad() {
    if ($('#fna').val() === "") {
        alert("Debe ingresar una fecha.");
        $('#fna').focus()
    }
    else {
        $('#tx2').val("La edad es: " + calEdad('fna') + " Años")
    }
}
function calEdad(idfe) {
    let hoy = new Date()
    let fechaNacimiento = new Date($('#' + idfe).val())
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() <
        fechaNacimiento.getDate()))
        edad--
    return edad
}
function VolverTxt(t1) {
    if ($('#' + t1).val().trim().length === 0) $('#' + t1).focus()
}
function Ejecucion1() {
    $('#btn1').on('click', function () {
        AgregarenCbodesdeTx_JQ('tx1', 'cbo1')
    });

    $('#cbo1').change(function () {
        MarcaCheckLong_JQ('cbo1', 'rdpi1', 'rdpi2')
    });

    $('#btn2').click(function () {
        EliminaElemSelect_JQ('cbo1')
    });

    $("#tx1").keypress(function (e) {
        if (e.which == 13) {
            AgregarenCbodesdeTx_JQ('tx1', 'cbo1')
        }
    });

    $('#btn').on('click', function () {
        ObtenerEdad()
    });
}
function GenCodigo(cdn, tbl) {
    ctd = tbl.rows.length;
    cod = cdn + ctd.toString(); bd = false
    while (!bd) {
        if (buscarTabla(tbl, 0, cod)) {
            ctd++;
            cod = cdn + ctd.toString();
        }
        else
            bd = 5 > 2
    }
    return cod
}
function GenCodigo1(cdn, tbl) {
    bd = false
    for (i = 1; i < tbl.rows.length; i++) {
        cod = cdn + i.toString();
        if (!buscarTabla(tbl, 0, cod)) {
            bd = true; break;
        }
    }
    if (!bd)
        cod = cdn + tbl.rows.length.toString()
    return cod
}

function Ejecucion2() {
    //  $("#tabla1 tr").on('click', function() {
    //     // var toma1 = "";
    //     //     $("#tabla1").find("tr").each(function() {
    //     //         toma1 += $(this).find('td:eq(1)').html();            
    //     //    }); 
    //     alert("hOLAS SIEMPRE");
    // });

    $('#tabla1').on('click', function () {
        catd = $(this).rows.length;
        alert("Holas" + catd)
        // $("#tabla1").find("tr").each(function() {
        //  toma1 += $(this).find('td:eq(1)').html();            
        // }); 
        // alert(toma1)
    });
    $('#txpdt').on('focus', function () {
        VolverTxt("txcdo")
    });
    $('#txpco').on('focus', function () {
        VolverTxt("txpdt")
    });
    $('#txpco').on('keypress', function (e) {
        if (e.which == 13) {
            AgreFilasenTableConJQ()
        }
    });
    $('#bt1').on('click', function () {
        if ($('#tx1').val().length > 0) {
            bdr = false
            if (!buscaEnCbocnJQ('cbo', $('#tx1').val())) {
                $('#cbo').append($('<option>', { value: $('#cbo').length, text: $('#tx1').val() }));
                $('#tx1').val('');
                document.getElementById('cbo').selectedIndex = -1;
            }
            else {
                alert('El Dato: '.concat($('#tx1').val()).concat(' Ya Existe'))
                $('#tx1').select()
            }
        }
        else
            alert('Faltan Datos')
        $('#tx1').focus()
    });
    $('#bt2').on('click', function () {
        if ($("#cbo option:selected").text()) {
            $('#cbo option:selected').remove()
            document.getElementById('cbo').selectedIndex = -1
        }
        else
            alert('Tienes que seleccionar un Elemento')
    });
    $('#cbo').on('change', function () {
        alert($("#cbo option:selected").text())
    });
    $('#tx1').on('keyup', function () {
        $('#tx2').val($('#tx1').val())
    });
    $('#btR').on('click', function () {
        BuscarinTablas_JQ('tabla1', '')
        // if(buscarTabla_JQ('tabla1',1,$('#tx1').val())){
        //  alert('El dato: '+$('#tx1').val()+' Ya Existe')
        // }
        // else{
        //   alert('No Existe')  
    });
    $('#tx2').on('keyup', function () {
        // filtrarTabla_JQ('tabla1',col,dt)
    });
    $('.btAgregar').on('click', function () {
        AgreFilasenTableConJQ();
    });

}

window.onload = function () {
    //FORMULARIO DE PRODUCTOS
    /*Iniciar los formularios******** */
    IniciarFrmPrdts()
        /* Crear Marcas ********* */
    document.getElementById("btngbmrc").addEventListener('click', function () {
        GrabarMarca()
    }, false);

    /*Crear Productos********* */
    document.getElementById("btngb").addEventListener('click', function () {
        GrabarProductos1()
    }, false);

    /*Modificar Marcas********* */
    document.getElementById("btnmdfcmrc").addEventListener('click', function () {
        ModificarMarcas(filaselmrc)
    }, false);

    /*Modificar Productos********* */
    document.getElementById("btnmdfc").addEventListener('click', function () {
        ModificarProductos(filasel)
    }, false);
    /*Eliminar Productos */
    document.getElementById("eliminar").addEventListener('click', function () {
        Eliminarprod()
    }, false);

    /*Cancelar Marca********* */
    document.getElementById("btncanmrc").addEventListener('click', function () {
        Cancelarmrc()
    }, false);

    /* Cancelar Producto */
    document.getElementById("btncancelar").addEventListener('click', function () {
        Cancelarprod()
    }, false);

    /*Buscar Marca********* */
    document.getElementById("txbusmrc").addEventListener('keyup', function () {
        BuscarinTablas(document.getElementById("tblbdymrc"),
            document.getElementById("txbusmrc").value)
    }, false);

    /*Buscar Productos********* */
    document.getElementById("txbus").addEventListener('keyup', function () {
        BuscarinTablas(document.getElementById("tblbdy"),
            document.getElementById("txbus").value)
    }, false);

    /*Eliminar Marca*/
    document.getElementById("btnelimrc").addEventListener('click', function () {
        Eliminamrc()
    }, false);

    document.getElementById("txtprc").addEventListener("keypress", function (event) {
        SoloNumeros(event);
    }, false);

    /*Pasar el control al seleccionar una marca********* */
    document.getElementById("cbomrc").addEventListener('change', function () {
        document.getElementById("txtprc").focus()
    }, false);

    //FORMULARIO DE PRODUCTOS

    //CLICK EN EL BOTON DE COMANDO
    document.getElementById("btn1").addEventListener('click', function () {
        if (document.getElementById("tx1").value.length > 0) {
            dt = document.getElementById("tx1").value;
            cbo = document.getElementById("cbo1");
            llenacombo(cbo, dt); document.getElementById("tx1").value = "";
            document.getElementById("tx1").focus();
        }
        else {
            alert('Faltan datos');
            document.getElementById("tx1").focus();
        }
    }, false);

    //SELECCIONAR EN LA LISTA DESPLEGABLE
    document.getElementById("cbo1").addEventListener('change', function () {
        ps = document.getElementById("cbo1").selectedIndex
        document.getElementById("tx1").value = (document.getElementById(
            "cbo1").options[ps].value)
        if ((document.getElementById("tx1").value.length % 2 === 0))
            document.getElementById("rdpi1").checked = true
        else
            document.getElementById("rdpi2").checked = true
        document.getElementById("tx1").select()
    }, false);

}


    // TRABAJANDO FORMULARIOS **************** */