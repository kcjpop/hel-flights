select
    route_1 as destination_code,
    string_agg(distinct route_n_1, ', ' order by route_n_1 desc)
        as destination_name,
    count(*) as flight_count
from arr
group by route_1
order by count(*) desc;
