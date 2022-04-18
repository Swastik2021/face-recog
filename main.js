
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});


camera = document.getElementById("camera");

Webcam.attach('#camera');



function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '">';
    })
}


//Here we are consoling the ml5.js version, so if we get the version number in console screen without any error it means we are ready to use ml5.js library.
console.log('ml5 version:', ml5.version);

//imageClassifier is a predefined function of ml5.js that is used to trigger the ml5.js image classification function.

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/cPEK3xXkA/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}



function check() {
    img = document.getElementById('captured_img');
   
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results)
        document.getElementById("result_object_name").innerHTML = results[0].label;

        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}