import { scaleLinear } from 'https://esm.run/d3-scale'
import { render } from 'https://esm.run/reefjs'

app()

async function app() {
  const items = [
    { d: '2025-05-27', h: 19, cnt: 9 },
    { d: '2025-05-27', h: 20, cnt: 5 },
    { d: '2025-05-27', h: 21, cnt: 7 },
    { d: '2025-05-27', h: 22, cnt: 15 },
    { d: '2025-05-27', h: 23, cnt: 20 },
    { d: '2025-05-28', h: 0, cnt: 9 },
    { d: '2025-05-28', h: 1, cnt: 1 },
    { d: '2025-05-28', h: 2, cnt: 2 },
    { d: '2025-05-28', h: 4, cnt: 2 },
    { d: '2025-05-28', h: 5, cnt: 6 },
    { d: '2025-05-28', h: 6, cnt: 11 },
    { d: '2025-05-28', h: 7, cnt: 3 },
    { d: '2025-05-28', h: 8, cnt: 4 },
    { d: '2025-05-28', h: 9, cnt: 7 },
    { d: '2025-05-28', h: 10, cnt: 10 },
    { d: '2025-05-28', h: 11, cnt: 12 },
    { d: '2025-05-28', h: 12, cnt: 7 },
    { d: '2025-05-28', h: 13, cnt: 9 },
    { d: '2025-05-28', h: 14, cnt: 23 },
    { d: '2025-05-28', h: 15, cnt: 34 },
    { d: '2025-05-28', h: 16, cnt: 8 },
    { d: '2025-05-28', h: 17, cnt: 8 },
    { d: '2025-05-28', h: 18, cnt: 8 },
    { d: '2025-05-28', h: 19, cnt: 9 },
    { d: '2025-05-28', h: 20, cnt: 6 },
    { d: '2025-05-28', h: 21, cnt: 7 },
    { d: '2025-05-28', h: 22, cnt: 16 },
    { d: '2025-05-28', h: 23, cnt: 20 },
    { d: '2025-05-29', h: 0, cnt: 7 },
    { d: '2025-05-29', h: 1, cnt: 4 },
    { d: '2025-05-29', h: 2, cnt: 3 },
    { d: '2025-05-29', h: 4, cnt: 1 },
    { d: '2025-05-29', h: 5, cnt: 6 },
    { d: '2025-05-29', h: 6, cnt: 10 },
    { d: '2025-05-29', h: 7, cnt: 1 },
    { d: '2025-05-29', h: 8, cnt: 3 },
    { d: '2025-05-29', h: 9, cnt: 3 },
  ]

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
    '#app',
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

      <li style="writing-mode: vertical-lr;">${day}</li>
      </ul>`
        })
        .join(''),
  )
}
