
// document.getElementById('vidos').pause();

function playSound(sound) {
  var song = document.getElementById(sound);

  song.volume = 1;
  if (song.paused) {
    song.play();
    // document.getElementById('vidos').play();
    const button = document.getElementById("boton");
    document.body.style.backgroundImage = "url('piska.jpg')";

    button.style.display = "none";

  } else {
    song.pause();
  }
}

