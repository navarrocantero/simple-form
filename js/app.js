let name = "name";
let surName = "surName";
let age = "age";
let nameControl = false;
let surNameControl = false;
let ageControl = false;
let equal = "=";
let plus = "+";
let and = "&";
let post = "POST";
let web = "server/validation.php?";

function objetoXHR() {
    if (window.XMLHttpRequest) {// El navegador implementa la interfaz XHR de forma nativa
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) { // El navegador no implementa la interfaz XHR de forma nativa
        // Por ejemplo: Internet explorer.
        var versionesIE = new Array('MsXML2.XMLHTTP.5.0', 'MsXML2.XMLHTTP.4.0',
            'MsXML2.XMLHTTP.3.0', 'MsXML2.XMLHTTP', 'Microsoft.XMLHTTP');
        for (var i = 0; i < versionesIE.length; i++) {
            try {
                /* Se intenta crear el objeto en Internet Explorer comenzando
                en la versión más moderna del objeto hasta la primera versión.
                En el momento que se consiga crear el objeto, saldrá del bucle
                devolviendo el nuevo objeto creado. */

                return new ActiveXObject(versionesIE[i]);
            } catch (errorControlado) {
            }//Capturamos el error,
        }
    }
    /* Si llegamos aquí es porque el navegador no posee ninguna forma de crear el objeto.
     Emitimos un mensaje de error usando el objeto Error.
     Más información sobre gestión de errores en:
     HTTP://www.javascriptkit.com/javatutors/trycatch2.sHTML
     */
    throw new Error("No se pudo crear el objeto XMLHTTPRequest");
}

function validateName() {
    let xhr = new objetoXHR;

    let fieldToValidate = document.getElementById("name").value
    let fieldToSend = name + equal + fieldToValidate;

    if (xhr) {
        xhr.open(post, web)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(fieldToSend);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let data = JSON.parse(this.response);
                console.log(this.response)
                $("#nameError").empty()

                for (d in data) {
                    $("#nameError").append("<p id=" + d + ">" + data[d] + "</p>");
                }

                if (Object.keys(data).length > 0) {
                    $("#name").removeClass("is-valid")
                    $("#name").addClass("is-invalid");
                    nameControl = false;
                } else {
                    $("#name").removeClass("is-invalid")
                    $("#name").addClass("is-valid")
                    nameControl = true
                }
            }

        };
    }
}

function validateSurName() {
    let xhr = new objetoXHR;

    let fieldToValidate = document.getElementById("surName").value
    let fieldName = document.getElementById("name").value
    let fieldToSend = name + equal + fieldName + and + surName + equal + fieldToValidate;
    if (xhr) {
        xhr.open(post, web)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(fieldToSend);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.response)
                let data = JSON.parse(this.response);
                $("#surNameError").empty()

                for (d in data) {
                    $("#surNameError").append("<p id=" + d + ">" + data[d] + "</p>");
                }

                if (Object.keys(data).length > 0) {
                    $("#surName").removeClass("is-valid");
                    $("#surName").addClass("is-invalid");
                    surNameControl = false;
                } else {
                    $("#surName").removeClass("is-invalid");
                    $("#surName").addClass("is-valid")
                    surNameControl = true
                }
            }

        };
    }
}

function validateAge() {
    let xhr = new objetoXHR;

    let fieldToValidate = document.getElementById("age").value
    let fieldToSend = age + equal + fieldToValidate;

    if (xhr) {
        xhr.open(post, web)
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(fieldToSend);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.response)
                let data = JSON.parse(this.response);
                $("#ageError").empty()

                for (d in data) {
                    $("#ageError").append("<p id=" + d + ">" + data[d] + "</p>");
                }

                if (Object.keys(data).length > 0) {
                    $("#age").removeClass("is-valid");
                    $("#age").addClass("is-invalid");
                    ageControl = false;
                } else {
                    $("#age").removeClass("is-invalid");
                    $("#age").addClass("is-valid")
                    ageControl = true
                }
            }

        };
    }
}

function validateForm() {
    return (nameControl && ageControl && surNameControl);


}
