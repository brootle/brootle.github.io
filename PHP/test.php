<?php
    $response = http_get("http://www.example.com/", array("timeout"=>1), $info);
    print_r($info);
?>