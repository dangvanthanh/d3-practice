// const data = [
//   {name: 'Alice', math: 93, science: 84},
//   {name: 'Bobby', math: 81, science: 97},
//   {name: 'Carol', math: 74, science: 88},
//   {name: 'David', math: 64, science: 76},
//   {name: 'Emily', math: 80, science: 94},
// ];

// const margin = {top: 10, right: 20, bottom: 20, left: 50};
// const width = 600 - margin.left - margin.right;
// const height = 400 - margin.top - margin.bottom;

// // x Scale
// const xScale = d3
//   .scaleLinear()
//   .domain([0, 100])
//   .range([0, width]);
// // y Scale
// const yScale = d3
//   .scaleBand()
//   .domain(data.map(d => d.name))
//   .range([0, height]);

// function render(subject) {
//   const bars = d3
//     .select('#chart')
//     .selectAll('div')
//     .data(data, d => d.name);

//   bars
//     .enter()
//     .append('div')
//     .attr('class', 'bar')
//     .style('width', 0)
//     .style('height', d => yScale.bandwidth() - 2 + 'px')
//     .merge(bars)
//     .transition()
//     .style('width', d => xScale(d[subject]) + 'px');
// }

// function handlerSubject(s) {
//   s.addEventListener(
//     'click',
//     ev => {
//       const subject = ev.target.getAttribute('data-subject');
//       render(subject);
//     },
//     false,
//   );
// }

// render('math');

// const jsSubject = document.querySelectorAll('.js-subject');

// jsSubject.forEach(s => handlerSubject(s));

// const svg = d3
//   .select('#chart')
//   .append('svg')
//   .attr('width', width + margin.left + margin.right)
//   .attr('height', height + margin.top + margin.bottom)
//   .style('position', 'absolute')
//   .style('top', 0)
//   .style('left', 0);

// const axisContainer = svg
//   .append('g')
//   .attr('transform', `translate(${margin.left}, ${margin.top})`);

// axisContainer
//   .append('g')
//   .attr('transform', `translate(0, ${height})`)
//   .call(d3.axisBottom(xScale));

// axisContainer.append('g').call(d3.axisLeft(yScale));

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const w = 900;
const h = 500;

let svg = d3.select('svg');

svg.attr('width', w).attr('height', h);

let g = svg.append('g').attr('transform', `translate(32, ${h / 2})`);

function update(data) {
  let t = d3.transition().duration(750);

  // let text = g.selectAll('text').data(data);
  let text = g.selectAll('text').data(data, d => d);

  // Exit old
  text
    .exit()
    .attr('class', 'exit')
    .transition(t)
    .attr('y', 60)
    .style('fill-opacity', 1e-6)
    .remove();

  // Update old
  text
    .attr('class', 'update')
    .attr('y', 0)
    .style('fill-opacity', 1)
    .transition(t)
    .attr('x', (d, i) => i * 32);

  // Enter new
  text
    .enter()
    .append('text')
    .attr('class', 'enter')
    .attr('y', -60)
    .attr('x', (d, i) => i * 32)
    .attr('dy', '.35em')
    .style('fill-opacity', 1e-6)
    .text((d, i) => d)
    .transition(t)
    .attr('y', 0)
    .style('fill-opacity', 1);
  // .merge(text)

  text.exit().remove();
}

update(alphabet);

d3.interval(() => {
  update(
    d3
      .shuffle(alphabet)
      .slice(0, Math.floor(Math.random() * 26))
      .sort()
  );
}, 1500);
