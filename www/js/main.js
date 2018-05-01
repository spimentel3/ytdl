$(document).ready(function () {

    const storage = window.localStorage;

    var user_modal_options = {
        dismissible: false,
        onCloseEnd: updateAndCheck
    };
    var user_modal = document.querySelector('.modal');
    var user_modal_instance = M.Modal.init(user_modal, user_modal_options);

    if (!checkIfUserExists()){
        user_modal_instance.open();
    }

    function checkIfUserExists(){
        let value = storage.getItem("user_name");
        if (value === null)
            return false;
        return true;
    }

    function updateAndCheck(){
        if ($('#user_name').val() === ""){
            user_modal_instance.open();
            return;
        }
        storage.setItem("user_name", $('#user_name').val() + Math.floor(1000 + Math.random() * 9000));
        console.log(storage.getItem("user_name"));
    }

    $('#download_button').click(function(){
        console.log("Making ajax");

        $("#progress_bar").removeClass("hiddendiv");

        let data = {
            video_url: $('#youtube_link').val(),
            user: storage.getItem("user_name")
        };

        $.ajax({
            method: "GET",
            url: "http://35.196.94.8:3000/get_video",
            crossDomain: true,
            dataType: 'jsonp',
            data: data,
            success: function (json) {
                console.log(json);

                $("#progress_bar").addClass("hiddendiv");

                let b_url = json["url"];
                let user = json["user"];
                let f_url = b_url + "music/" + user + "/";
                json["songs"].forEach(function(song){
                    if (song === "")
                        return;

                    $("#videos").html("");

                    $("#videos").append("" +
                        "<div class=\"row\">\n" +
                        "<div class=\"col s12 m6\">\n" +
                        "<div class=\"card s_card\">\n" +
                        "<div class=\"card-content\">\n" +
                        "<span class=\"card-title\">" + song + "</span>\n" +
                        "</div>\n" +
                        "<div class=\"card-action\">\n" +
                        "<a href=\"" + f_url + song + "\" class=\"btn-small waves-effect waves-light\">Download</a>\n" +
                        "</div>\n" +
                        "</div>\n" +
                        "</div>\n" +
                        "</div>");
                });
            },
            error: function (error) {
                console.log("Error", error);
            }
        });
    });

    // $('#youtube_link').bind("propertychange change click keyup input paste focusout", function(){
    //     console.log("Change");
    //     if ($('#youtube_link').hasClass("valid")){
    //         console.log("Valid");
    //         $('download_button').removeClass("disabled");
    //     }
    //     if ($('#youtube_link').hasClass("invalid")){
    //         console.log("Invalid");
    //         $('download_button').addClass("disabled");
    //     }
    // });


});