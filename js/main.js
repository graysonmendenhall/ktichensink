function capturePhoto(){
    //alert("hooray!");
navigator.camera.getPicture(uploadPhoto, null, {sourceType:1,quality: 60});
}

function uploadPhoto(data){
    //where you send the image file to the server
    
        cameraPic.src = data;
            //cameraPic.src = "data:image/jpeg;base64," + data;
            //Successful upload to the server
            navigator.notification.alert(
                'Your Photo has been uploaded',
                okay,
            'Photo Uploaded',
            'OK'
             
            );
}

function okay(){
    // Do something
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log("onDeviceReady()");
    navigator.geolocation.getCurrentPosition(generateMap, onError);
   
}