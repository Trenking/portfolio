<?php
function get_events(){
    global $db;
    $query = "SELECT * FROM events";
    $res = mysqli_query($db,$query);
    return mysqli_fetch_all($res, MYSQLI_ASSOC);
}

function print_arr($arr){
    echo '<pre>' . print_r($arr, true) . '<pre>';
}

function get_json($arr, $is_full){
    if($is_full){
        $data = '[';
        foreach($arr as $item){
            $data .= '{"id": "' . $item['id'] . '" ,"title": "'. $item['title'] . '" ,"url": "' . $item['url']. '" ,"description": "'. $item['description'] . '" ,"date": "' . $item['date'] . '" ,"region": ' . $item['region'] . '" ,"event_type": "' . $item['event_type'] . '"}';
        };
        $data .= ']';
    }else{
        $data = '[';
        foreach($arr as $item){
            $data .= '{"date": "' . $item['date'] . '", "title": "' . $item['title']  . '" ,"description": "' . $item['description'] . '" ,"url": "' . $item['url']. '"},';
        };
        $data .= ']';
    }
   
    return $data;
}
?>
