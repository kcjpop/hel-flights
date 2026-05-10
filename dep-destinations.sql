select
    route_1 as destination_code,
    route_n_1 as destination_name,
    count(*) as flight_count
from dep
group by route_1, route_n_1
order by count(*) desc, destination_name;
