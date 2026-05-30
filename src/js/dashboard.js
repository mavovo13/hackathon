/* 嘘資源管理庁 — ダッシュボード描画ロジック */

(function () {
  /* ---------- グラフデータ生成 ---------- */
  function buildChartData() {
    var labels = [];
    var values = [];
    LIE_RESERVE_HISTORY.forEach(function (d) {
      labels.push(d.year.toString());
      values.push(d.amount);
    });
    return { labels: labels, values: values };
  }

  /* ---------- アノテーション生成 ---------- */
  function buildAnnotations() {
    var annotations = {};
    var idx = 0;
    LIE_RESERVE_HISTORY.forEach(function (d) {
      if (!d.events) return;
      d.events.forEach(function (ev) {
        var id = "event" + idx;
        annotations[id] = {
          type: "line",
          xMin: d.year.toString(),
          xMax: d.year.toString(),
          borderColor: ev.color,
          borderWidth: 2,
          borderDash: [4, 2],
          label: {
            display: true,
            content: ev.label.split("\n"),
            position: "start",
            backgroundColor: ev.color,
            color: "#ffffff",
            font: {
              size: 10,
              family: '"MS PGothic","MS Pゴシック",sans-serif'
            },
            padding: { top: 3, bottom: 3, left: 4, right: 4 },
            yAdjust: -6
          }
        };
        idx++;
      });
    });
    return annotations;
  }

  /* ---------- グラフ初期化 ---------- */
  function initChart() {
    var canvas = document.getElementById("lieChart");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var chartData = buildChartData();

    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "世界嘘残量（キロウソ / Kuso）",
            data: chartData.values,
            borderColor: "#003399",
            backgroundColor: "rgba(0,51,153,0.08)",
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: "#003399",
            fill: true,
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "年",
              color: "#336699",
              font: { size: 11 }
            },
            ticks: {
              color: "#333333",
              maxTicksLimit: 12,
              font: { size: 10 }
            },
            grid: { color: "rgba(0,0,0,0.06)" }
          },
          y: {
            title: {
              display: true,
              text: "残量（キロウソ / Kuso）",
              color: "#336699",
              font: { size: 11 }
            },
            min: 0,
            max: 110000,
            ticks: {
              color: "#333333",
              callback: function (v) {
                return v.toLocaleString();
              },
              font: { size: 10 }
            },
            grid: { color: "rgba(0,0,0,0.06)" }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#333333",
              font: { size: 11 },
              boxWidth: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return "残量: " + ctx.parsed.y.toLocaleString() + " Kuso";
              }
            }
          },
          annotation: {
            annotations: buildAnnotations()
          }
        }
      }
    });
  }

  /* ---------- 統計パネル更新 ---------- */
  function updateStatsPanel() {
    var ids = {
      currentAmount: "statCurrentAmount",
      consumptionRate: "statConsumptionRate",
      depletionYear: "statDepletionYear",
      mainSource: "statMainSource"
    };
    var el;
    el = document.getElementById(ids.currentAmount);
    if (el) el.textContent = CURRENT_AMOUNT;
    el = document.getElementById(ids.consumptionRate);
    if (el) el.textContent = CONSUMPTION_RATE;
    el = document.getElementById(ids.depletionYear);
    if (el) el.textContent = DEPLETION_YEAR;
    el = document.getElementById(ids.mainSource);
    if (el) el.textContent = MAIN_SOURCE;
  }

  /* ---------- TOP5テーブル生成 ---------- */
  function buildIncidentTable() {
    var tbody = document.getElementById("incidentTableBody");
    if (!tbody) return;

    LIE_INCIDENTS_TOP5.forEach(function (incident) {
      var tr = document.createElement("tr");
      if (incident.rank === 1) tr.className = "rank-1";

      var rankTd = document.createElement("td");
      rankTd.className = "rank-cell";
      rankTd.textContent = incident.rank;

      var nameTd = document.createElement("td");
      nameTd.textContent = incident.name;

      var yearTd = document.createElement("td");
      yearTd.textContent = incident.year;
      yearTd.style.whiteSpace = "nowrap";

      var consumptionTd = document.createElement("td");
      consumptionTd.className = "consumption-cell";
      consumptionTd.textContent = incident.consumption.toLocaleString() + " Kuso";

      var rateTd = document.createElement("td");
      rateTd.textContent = incident.consumptionRate;

      var noteTd = document.createElement("td");
      noteTd.textContent = incident.note;
      noteTd.style.fontSize = "11px";
      noteTd.style.color = "#555555";

      tr.appendChild(rankTd);
      tr.appendChild(nameTd);
      tr.appendChild(yearTd);
      tr.appendChild(consumptionTd);
      tr.appendChild(rateTd);
      tr.appendChild(noteTd);
      tbody.appendChild(tr);
    });
  }

  /* ---------- 初期化 ---------- */
  function init() {
    updateStatsPanel();
    buildIncidentTable();
    if (typeof Chart !== "undefined") {
      initChart();
    } else {
      var container = document.getElementById("chartContainer");
      if (container) {
        container.innerHTML = "<p style='color:#666;padding:20px;text-align:center;'>【データ準備中】グラフの読み込みに失敗しました。ページを再読み込みしてください。</p>";
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
