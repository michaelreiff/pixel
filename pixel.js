
$('#btn_start').click( function () {
    $("#run").val("1");
    console.log("start");
    run();
});


$('#btn_stop').click( function () {
    $("#run").val("0");
});


$('#btn_create').click( function pixel () {
    let box_width = $("#box_input").val();
    let box_height = box_width;
    let pixel_width = $("#pixel_input").val();
    let pixel_height = pixel_width;
    let c_min = $("#min_input").val();;
    let c_max = $("#max_input").val();;
    let box = $( "#box" );
    
    box.empty();
    
    box.animate({
        width: box_width,
        height: box_height
    }, {
        duration: 400,
        complete: function() {
            
            loop_pixel(
                pixel_width,
                pixel_height,
                c_min,
                c_max
            );
            
        }
    });
});


function loop_pixel( w, h, c_min, c_max ) {    
    
    let x = get_anzahl_x();
    let y = get_anzahl_y();

    for (let i = 1; i < x+1; i++) { // Zeilen
        for (let j = 1; j < y+1; j++) { // Reihen
            set_pixel( w, h, "pixel_"+i+"_"+j, c_min, c_max);        
        }
    }
    
    $('div.pixel').hover( function ( elem ) {
        let id = $(this).attr("id");
        //let temp = ;
        const t = id.slice(6).split("_");
        let x = parseInt(t[0]);
        let y = parseInt(t[1]);
        
        change_pixel( "#"+id );
        change_pixel( "#pixel_" + (x-1) + "_"+y );
        change_pixel( "#pixel_" + (x+1) + "_"+y );
        change_pixel( "#pixel_" + x + "_" + (y+1) );
        change_pixel( "#pixel_" + x + "_" + (y-1) );

    });
}


function set_pixel( w, h, id, c_min, c_max ) {    
    var chanel = getRandomInt(1, 3);
    var r = (chanel == 1) ? getRandomInt(c_min, c_max): getRandomInt(0, 255);
    var g = (chanel == 2) ? getRandomInt(c_min, c_max): getRandomInt(0, 255);
    var b = (chanel == 3) ? getRandomInt(c_min, c_max): getRandomInt(0, 255);

    $("#box").append("<div class='pixel' id='"+id+"' style='background-color:rgb("+r+", "+g+", "+b+"); width:"+w+"px; height: "+h+"px'></div>");
}


function change_pixel( selector = "" ) {    
    let pixel = "";
    if( selector == "") {
        let x = getRandomInt(1, get_anzahl_x());
        let y = getRandomInt(1, get_anzahl_y());
        pixel = $(".pixel#pixel_"+x+"_"+y);
    } else {
        pixel = $(selector)
    }
    
    var chanel = getRandomInt(1, 3);
    
    let c_min = 0;
    let c_max = 50;

    var r = (chanel == 1) ? getRandomInt(c_min, c_max): getRandomInt(0, 255);
    var g = (chanel == 2) ? getRandomInt(c_min, c_max): getRandomInt(0, 255);
    var b = (chanel == 3) ? getRandomInt(c_min, c_max): getRandomInt(0, 255);
    var chanel = getRandomInt(1, );

    pixel.css("background-color", "#fff");
    //pixel.animate({backgroundColor: "rgb("+r+", "+g+", "+b+")"}, '400');
    pixel.css("background-color", "rgb("+r+", "+g+", "+b+")");
}


function get_anzahl() {
    return get_anzahl_x() * get_anzahl_y();
}


function get_anzahl_x() {
    let box_width = $("#box_input").val();
    let pixel_width = $("#pixel_input").val();
    
    return Math.round( box_width/pixel_width );
}


function get_anzahl_y() {
    let box_height = $("#box_input").val();
    let pixel_height = $("#pixel_input").val();

    return Math.round( box_height/pixel_height );
}


function run () {
    setTimeout(() => {
        change_pixel();

        if ( $("#run").val() == "1") {
            run();
        } else {
            console.log("Stop");
        }
    }, 100)
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}