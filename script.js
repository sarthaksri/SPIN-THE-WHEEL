document.addEventListener("DOMContentLoaded", function() {
  const spinBtn = document.getElementById("spin_btn");
  const text = document.getElementById("text");
  const popupCard = document.getElementById("popup-card");
  const closePopup = document.getElementById("close-popup");
  const popupResult = document.getElementById("popup-result");
  const spinAgainBtn = document.getElementById("spin-again-btn");

  const spinValues = [
    { minDegree: 61, maxDegree: 90, value: 100 },
    { minDegree: 31, maxDegree: 60, value: 200 },
    { minDegree: 0, maxDegree: 30, value: 300 },
    { minDegree: 331, maxDegree: 360, value: 400 },
    { minDegree: 301, maxDegree: 330, value: 500 },
    { minDegree: 271, maxDegree: 300, value: 600 },
    { minDegree: 241, maxDegree: 270, value: 700 },
    { minDegree: 211, maxDegree: 240, value: 800 },
    { minDegree: 181, maxDegree: 210, value: 900 },
    { minDegree: 151, maxDegree: 180, value: 1000 },
    { minDegree: 121, maxDegree: 150, value: 1100 },
    { minDegree: 91, maxDegree: 120, value: 1200 },
  ];

  const size = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

  var spinColors = [
    "#400135",
    "#F2A81D",
  ];

  let spinWheel = new Chart(document.getElementById("spinWheel"), {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: ["$100", "$200", "$300", "$400", "$500", "$600", "$700", "$800", "$900", "$1000", "$1100", "$1200"],
      datasets: [
        {
          backgroundColor: spinColors,
          data: size,
        },
      ],
    },
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          rotation: 90,
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: 20 },
        },
      },
    },
  });

  const generateValue = (angleValue) => {
    for (let i of spinValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        popupResult.innerHTML = `<p> $${i.value} !</p>`;
        popupCard.style.display = "flex"; // Show the popup
        spinBtn.disabled = false; // Enable the Spin button
        break;
      }
    }
  };

  let count = 0;
  let resultValue = 101;
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    let rotationInterval = window.setInterval(() => {
      spinWheel.options.rotation = spinWheel.options.rotation + resultValue;
      spinWheel.update();
      if (spinWheel.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        spinWheel.options.rotation = 0;
      } else if (count > 15 && spinWheel.options.rotation == randomDegree) {
        generateValue(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  });

  closePopup.addEventListener("click", () => {
    popupCard.style.display = "none"; // Hide the popup
  });

  spinAgainBtn.addEventListener("click", () => {
    popupCard.style.display = "none"; // Hide the popup
    spinBtn.disabled = false; // Enable the Spin button
  });
});
