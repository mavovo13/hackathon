(function () {
  'use strict';

  const ANALYSIS_DURATION_MS = 4000;
  const PROGRESS_TICK_MS = 50;

  let activeStream = null;
  let isAnalyzing = false;
  let lastResultIndex = -1;
  let progressTimerId = null;

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

  function init() {
    startButton.addEventListener('click', handleStartClick);
    reanalyzeButton.addEventListener('click', handleReanalyzeClick);
    window.addEventListener('beforeunload', stopCamera);
    window.addEventListener('pagehide', stopCamera);
  }

  async function handleStartClick() {
    if (isAnalyzing) {
      return;
    }

    resultPanel.hidden = true;
    initialPanel.hidden = false;
    setStatusMessage('');

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
      hideCameraPlaceholder();
      beginAnalysis();
    } catch (error) {
      handleCameraError(error);
    }
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

  function showResult() {
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
