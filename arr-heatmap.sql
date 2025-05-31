-- arrival heatmap
select strftime(sdt, '%Y-%m-%d') as d, hour(sdt) as h, count(*) as cnt
from arr
group by d, h
order by d, h;
