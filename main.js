import { scaleLinear } from 'https://esm.run/d3-scale'
import { render } from 'https://esm.run/reefjs'

app()

async function app() {
  const [arr, dep] = await Promise.all([
    fetch('./arr-heatmap.json').then((res) => res.json()),
    fetch('./dep-heatmap.json').then((res) => res.json()),
  ])
  Heatmap({ items: arr, nodeToRender: '#arr-heatmap' })
  Heatmap({ items: dep, nodeToRender: '#dep-heatmap' })
}

function Heatmap({ items, nodeToRender }) {
  const max = Math.max(...items.map((d) => d.cnt))

  const color = scaleLinear(
    [0, max],
    ['rgb(165, 216, 255)', 'rgb(59, 91, 219)'],
  )

  const days = new Map()
  for (const item of items) {
    const box = days.get(item.d) ?? []
    box.push(item)

    days.set(item.d, box)
  }

  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(d.getDate()).padStart(2, '0')}`

  console.log(today)

  const yAxis = `<ul class="day">
    <li class="hour" style="background:none;border-color: #fff;">0</li>
    <li class="hour" style="background:none;border-color: #fff;">1</li>
    <li class="hour" style="background:none;border-color: #fff;">2</li>
    <li class="hour" style="background:none;border-color: #fff;">3</li>
    <li class="hour" style="background:none;border-color: #fff;">4</li>
    <li class="hour" style="background:none;border-color: #fff;">5</li>
    <li class="hour" style="background:none;border-color: #fff;">6</li>
    <li class="hour" style="background:none;border-color: #fff;">7</li>
    <li class="hour" style="background:none;border-color: #fff;">8</li>
    <li class="hour" style="background:none;border-color: #fff;">9</li>
    <li class="hour" style="background:none;border-color: #fff;">10</li>
    <li class="hour" style="background:none;border-color: #fff;">11</li>
    <li class="hour" style="background:none;border-color: #fff;">12</li>
    <li class="hour" style="background:none;border-color: #fff;">13</li>
    <li class="hour" style="background:none;border-color: #fff;">14</li>
    <li class="hour" style="background:none;border-color: #fff;">15</li>
    <li class="hour" style="background:none;border-color: #fff;">16</li>
    <li class="hour" style="background:none;border-color: #fff;">17</li>
    <li class="hour" style="background:none;border-color: #fff;">18</li>
    <li class="hour" style="background:none;border-color: #fff;">19</li>
    <li class="hour" style="background:none;border-color: #fff;">20</li>
    <li class="hour" style="background:none;border-color: #fff;">21</li>
    <li class="hour" style="background:none;border-color: #fff;">22</li>
    <li class="hour" style="background:none;border-color: #fff;">23</li>
  </ul>`

  render(
    nodeToRender,
    yAxis +
      Array.from(days.entries())
        .map(([day, values]) => {
          const hours = new Map(values.map((i) => [i.h, i]))

          return `<ul class="day">
      ${Array.from({ length: 24 }, (_, hour) => {
        const v = hours.get(hour)
        const style =
          v != null
            ? `background-color: ${color(
                v.cnt,
              )}; border-color: rgb(28, 126, 214);`
            : ''

        return `<li class="hour" style="${style}">${v?.cnt ?? ''}</li>`
      }).join('')}

      <li class="label" data-today="${day === today}">${day}</li>
      </ul>`
        })
        .join(''),
  )
}
