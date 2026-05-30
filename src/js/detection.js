(function () {
  'use strict';

  const ANALYSIS_DURATION_MS = 4000;
  const PROGRESS_TICK_MS = 50;
  const FACE_DETECT_INTERVAL_MS = 120;
  const MODEL_URI = 'models/tiny-face-detector';
  const FACE_DETECTOR_OPTIONS = { inputSize: 224, scoreThreshold: 0.3 };

  let activeStream = null;
  let isAnalyzing = false;
  let lastResultIndex = -1;
  let progressTimerId = null;
  let faceDetectionEnabled = false;
  let faceDetectionTimerId = null;
  let faceDetectionInProgress = false;
  let fakeDeceptionIndex = 0.42;

  const cameraVideo = document.getElementById('camera-view');
  const startButton = document.getElementById('start-detection-btn');
  const reanalyzeButton = document.getElementById('reanalyze-btn');
  const initialPanel = document.getElementById('initial-panel');
  const analyzingPanel = document.getElementById('analyzing-panel');
  const resultPanel = document.getElementById('result-panel');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const statusMessage = document.getElementById('status-message');
  const resultLieType = document.getElementById('result-lie-type');
  const resultPercentage = document.getElementById('result-percentage');
  const resultRisk = document.getElementById('result-risk');
  const resultAdvice = document.getElementById('result-advice');
  const cameraWrapper = document.getElementById('camera-wrapper');
  const faceOverlay = document.getElementById('face-overlay');

  function init() {
    startButton.disabled = true;
    setStatusMessage('顔面嘘指数測定装置を起動中...');

    startButton.addEventListener('click', handleStartClick);
    reanalyzeButton.addEventListener('click', handleReanalyzeClick);
    window.addEventListener('beforeunload', stopCamera);
    window.addEventListener('pagehide', stopCamera);

    loadFaceModel();
  }

  async function loadFaceModel() {
    if (typeof faceapi === 'undefined') {
      enableWithoutFaceDetection('顔面検出モジュールを読み込めませんでした。遠隔解析モードで実施します。');
      return;
    }

    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI);
      faceDetectionEnabled = true;
      startButton.disabled = false;
      setStatusMessage('');
    } catch (error) {
      console.warn('Face model load failed:', error);
      enableWithoutFaceDetection('顔面検出モデルの読み込みに失敗しました。遠隔解析モードで実施します。');
    }
  }

  function enableWithoutFaceDetection(message) {
    faceDetectionEnabled = false;
    startButton.disabled = false;
    setStatusMessage(message);
  }

  function getOverlayDisplaySize() {
    return {
      width: cameraVideo.clientWidth || faceOverlay.width,
      height: cameraVideo.clientHeight || faceOverlay.height
    };
  }

  function syncOverlayDimensions() {
    if (!faceOverlay) {
      return;
    }

    const displaySize = getOverlayDisplaySize();
    faceOverlay.width = displaySize.width;
    faceOverlay.height = displaySize.height;
    faceapi.matchDimensions(faceOverlay, displaySize);
  }

  async function handleStartClick() {
    if (isAnalyzing) {
      return;
    }

    resultPanel.hidden = true;
    initialPanel.hidden = false;
    if (faceDetectionEnabled) {
      setStatusMessage('');
    }

    if (!activeStream) {
      await startCamera();
      return;
    }

    beginAnalysis();
  }

  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatusMessage('カメラが検出されませんでした。遠隔解析モードで実施します。');
      showCameraPlaceholder();
      beginAnalysis();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      activeStream = stream;
      cameraVideo.srcObject = stream;
      await cameraVideo.play();
      await waitForVideoDimensions();
      hideCameraPlaceholder();
      beginAnalysis();
    } catch (error) {
      handleCameraError(error);
    }
  }

  function waitForVideoDimensions() {
    if (cameraVideo.videoWidth > 0 && cameraVideo.videoHeight > 0) {
      return Promise.resolve();
    }

    return new Promise(function (resolve) {
      function onReady() {
        cameraVideo.removeEventListener('loadedmetadata', onReady);
        resolve();
      }

      cameraVideo.addEventListener('loadedmetadata', onReady);
    });
  }

  function handleCameraError(error) {
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      setStatusMessage(
        'カメラへのアクセスが拒否されました。本庁の権限で強制解析を実施します。'
      );
    } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      setStatusMessage('カメラが検出されませんでした。遠隔解析モードで実施します。');
    } else {
      setStatusMessage('カメラの起動に失敗しました。遠隔解析モードで実施します。');
    }

    showCameraPlaceholder();
    beginAnalysis();
  }

  function beginAnalysis() {
    if (isAnalyzing) {
      return;
    }

    isAnalyzing = true;
    initialPanel.hidden = true;
    resultPanel.hidden = true;
    analyzingPanel.hidden = false;
    startButton.disabled = true;
    reanalyzeButton.disabled = true;
    progressBarFill.style.width = '0%';
    fakeDeceptionIndex = 0.35 + Math.random() * 0.5;

    clearFaceOverlay();
    syncOverlayDimensions();
    startFaceDetectionLoop();

    let elapsed = 0;

    if (progressTimerId !== null) {
      clearInterval(progressTimerId);
    }

    progressTimerId = setInterval(function () {
      elapsed += PROGRESS_TICK_MS;
      const progress = Math.min(100, (elapsed / ANALYSIS_DURATION_MS) * 100);
      progressBarFill.style.width = progress + '%';

      if (elapsed >= ANALYSIS_DURATION_MS) {
        clearInterval(progressTimerId);
        progressTimerId = null;
        showResult();
      }
    }, PROGRESS_TICK_MS);
  }

  function startFaceDetectionLoop() {
    if (!faceDetectionEnabled || !faceOverlay) {
      return;
    }

    stopFaceDetectionLoop();

    const detectorOptions = new faceapi.TinyFaceDetectorOptions(FACE_DETECTOR_OPTIONS);
    const ctx = faceOverlay.getContext('2d');
    if (!ctx) {
      return;
    }

    async function runDetection() {
      if (!isAnalyzing) {
        return;
      }

      if (faceDetectionInProgress) {
        scheduleNextDetection();
        return;
      }

      if (
        !activeStream ||
        cameraVideo.readyState < 2 ||
        cameraVideo.videoWidth <= 0
      ) {
        scheduleNextDetection();
        return;
      }

      faceDetectionInProgress = true;

      try {
        const displaySize = getOverlayDisplaySize();
        const detection = await faceapi.detectSingleFace(cameraVideo, detectorOptions);
        if (!isAnalyzing) {
          return;
        }

        clearFaceOverlay();

        const box = getDetectionBox(
          detection ? faceapi.resizeResults(detection, displaySize) : null
        );

        if (box) {
          drawDetectionBox(ctx, box);
          drawFakeMetrics(ctx, box);
        }
      } catch (error) {
        console.warn('Face detection failed:', error);
      } finally {
        faceDetectionInProgress = false;
        scheduleNextDetection();
      }
    }

    function scheduleNextDetection() {
      if (!isAnalyzing) {
        return;
      }

      faceDetectionTimerId = window.setTimeout(runDetection, FACE_DETECT_INTERVAL_MS);
    }

    runDetection();
  }

  function drawDetectionBox(ctx, box) {
    if (!box) {
      return;
    }

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
  }

  function getDetectionBox(detection) {
    if (!detection) {
      return null;
    }

    if (detection.box) {
      return detection.box;
    }

    if (detection.detection && detection.detection.box) {
      return detection.detection.box;
    }

    return null;
  }

  function drawFakeMetrics(ctx, box) {
    if (!box) {
      return;
    }

    fakeDeceptionIndex = Math.min(
      0.99,
      Math.max(0.01, fakeDeceptionIndex + (Math.random() - 0.5) * 0.04)
    );

    ctx.fillStyle = '#00ff00';
    ctx.font = '11px monospace';
    ctx.fillText(
      'DECEPTION INDEX: ' + fakeDeceptionIndex.toFixed(2),
      box.x,
      Math.max(12, box.y - 4)
    );
    ctx.fillText(
      'KUSO-ML v2.3.1',
      box.x,
      Math.min(faceOverlay.height - 4, box.y + box.height + 12)
    );
  }

  function stopFaceDetectionLoop() {
    if (faceDetectionTimerId !== null) {
      window.clearTimeout(faceDetectionTimerId);
      faceDetectionTimerId = null;
    }
  }

  function clearFaceOverlay() {
    if (!faceOverlay) {
      return;
    }

    const ctx = faceOverlay.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, faceOverlay.width, faceOverlay.height);
    }
  }

  function showResult() {
    stopFaceDetectionLoop();
    clearFaceOverlay();

    isAnalyzing = false;
    analyzingPanel.hidden = true;
    resultPanel.hidden = false;
    startButton.disabled = false;
    reanalyzeButton.disabled = false;

    const result = pickRandomResult();
    resultLieType.textContent = result.lieType;
    resultPercentage.textContent = result.percentage.toFixed(1);
    resultRisk.textContent = result.riskLabel;
    resultAdvice.textContent = result.advice;
    resultRisk.className = 'detection-result-risk risk-level-' + getRiskClass(result.riskLevel);
  }

  function pickRandomResult() {
    const patterns = LIE_JUDGMENT_PATTERNS;
    let index = Math.floor(Math.random() * patterns.length);

    if (patterns.length > 1) {
      while (index === lastResultIndex) {
        index = Math.floor(Math.random() * patterns.length);
      }
    }

    lastResultIndex = index;
    return patterns[index];
  }

  function getRiskClass(riskLevel) {
    const riskMap = {
      '低': 'low',
      '中': 'medium',
      '高': 'high',
      '極めて高': 'critical'
    };
    return riskMap[riskLevel] || 'medium';
  }

  function handleReanalyzeClick() {
    if (isAnalyzing) {
      return;
    }

    resultPanel.hidden = true;
    beginAnalysis();
  }

  function stopCamera() {
    stopFaceDetectionLoop();
    clearFaceOverlay();

    if (progressTimerId !== null) {
      clearInterval(progressTimerId);
      progressTimerId = null;
    }

    if (activeStream) {
      activeStream.getTracks().forEach(function (track) {
        track.stop();
      });
      activeStream = null;
    }

    if (cameraVideo) {
      cameraVideo.srcObject = null;
    }
  }

  function setStatusMessage(message) {
    statusMessage.textContent = message;
    statusMessage.hidden = message === '';
  }

  function showCameraPlaceholder() {
    cameraWrapper.classList.add('camera-placeholder-active');
  }

  function hideCameraPlaceholder() {
    cameraWrapper.classList.remove('camera-placeholder-active');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
