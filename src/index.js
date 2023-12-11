import "./styles.css";

const boardSize = 8;

function resolve(boardSize) {
  const results = [];

  const x = [];

  let stopped = false;
  const t = (x, r, m) => {
    for (let i = 0; i < m; i++) {
      let skip = false;
      for (let j = 0; j < r; j++) {
        if (
          x[j] === i || //
          x[j] === i - (r - j) || //
          x[j] === i + (r - j) //
        ) {
          skip = true;
          break;
        }
      }
      if (skip) {
        continue;
      }

      x[r] = i;
      if (r < boardSize - 1) {
        t(x, r + 1, boardSize);
      } else {
        results.push([...x]);
        // stopped = results.length >= 10;
      }
      if (stopped) {
        break;
      }
      delete x[r];
    }
  };

  console.log("start...");
  t(x, 0, boardSize);

  console.log("finish");
  return results;
}

function stringify(solution, boardSize) {
  return solution.map((i) => {
    const a = new Array(boardSize).fill("O");
    a[i] = "X";
    return a.join(" ");
  });
}

const solutions = resolve(boardSize);

const lines = [`solution count: ${solutions.length}`, ""];
solutions.forEach((solution, index) => {
  lines.push(`#${index + 1}`);
  lines.push(...stringify(solution, boardSize));
  lines.push("");
});

const el = document.getElementById("app");
el.innerHTML = lines.map((x) => `<div>${x || "&nbsp;"}</div>`).join("\n");
