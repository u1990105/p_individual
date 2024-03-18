#!/usr/bin/php-cgi
<?php
    session_start();
    $ret = new stdClass();

    $ret->pairs = 2;
    $ret->points = 2;
    $ret->cards = 2;

    $conn = oci_connect('u1990105', 'crajpepp', 'ORCLCDB');
    $consulta="SELECT id, pairs, points, cards FROM memory_save ORDER BY id DESC FETCH FIRST 1 ROWS ONLY;)";
    $comanda = oci_parse($conn, $consulta);

    $fila = oci_fetch_array($comanda, OCI ASSOC+OCI_RETURNS_NULLS)
    if $fila != false { 
        $ret->pairs = $fila['PAIRS'];
        $ret->points = $fila['POINTS'];
        $ret->cards = $fila['CARDS'];
    }

    # Baixar de la base de dades
    echo json_encode($ret);
?>

