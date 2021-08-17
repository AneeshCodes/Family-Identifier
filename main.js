Webcam.set({
  width: 350,
  height: 300,
  image_format: 'png',
  png_quality: 90
})

var camera = document.getElementById('camera');
Webcam.attach('#camera');

function takesnapshot()
{
  Webcam.snap(function(data_uri){
    document.getElementById('result').innerHTML = "<img id='captured_image' src='" + data_uri + "'>";  
  })
}

console.log('ml5 version', ml5.version)

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dqCBdI2he/model.json",modelLoaded)

function modelLoaded()
{
  console.log('model is loaded')
}

function check()
{
  var img = document.getElementById('captured_image')
  classifier.classify(img, gotResult)
}

function gotResult(error, results){
  if (error){
    console.error(error)
  }
  else{
    console.log(results);
    document.getElementById('objectname').innerHTML = results[0].label
    var decimal = results[0].confidence.toFixed(2)
    var numeral = decimal*100
    document.getElementById('accuracy').innerHTML = numeral + "%";
  }
}