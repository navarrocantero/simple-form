<?php
$regExpName = "/^[a-zA-Z\\s\\,]+$/";
$regExpSurName = "/^[a-zA-Z\.\'\-]{2,50}(?: [a-zA-Z\.\'\-]{2,50})+$/";

$name = isset($_POST['name']) ? trim($_POST['name']):"" ;
$surName = isset($_POST['surName']) ? trim($_POST['surName']):"" ;
$age = isset($_POST['age']) ? trim($_POST['age']):"" ;

$minNameValue = 3;
$minSurNameValue = 5;
$minAgeValue = 18;

$nameErrors = [];
$surNameErrors = [];
$ageErrors = [];

// Condicion doble para entrar solo si es para editar el $name

    if ($name !== "" && $surName === "") {

        if (strlen($name) < $minNameValue) {
            $nameErrors += [
                "lenght" => "-The min lenght required is 3",
            ];
        }

        if ($name[0] !== strtoupper($name[0])) {
            $nameErrors += [
                "upper" => "-The first letter must be Capital letter",
            ];
        }

        if (preg_match($regExpName, $name) === 0) {
            $nameErrors += [
                "invalid" => "- Only  A-Z values",
            ];
        }


        echo(json_encode($nameErrors));
    }


if ($surName !== "") {


    if (strlen($surName) < $minSurNameValue) {
        $surNameErrors += [
            "lenght" => "-The min lenght required is 5",
        ];
    }

    if ($surName === $name) {
        $surNameErrors += [
            "same" => "- The name cant be equals surname",
        ];
    }

    if (preg_match($regExpSurName, $surName) === 0) {
        $surNameErrors += [
            "invalid" => "- Must be at least one whitespace",
        ];
    }

    echo(json_encode($surNameErrors));
}

if ($age !== "") {
    if ($age < $minAgeValue) {
        $ageErrors += [
            "lower" => "- The min age required is 18"
        ];
    }
    echo(json_encode($ageErrors));
}

