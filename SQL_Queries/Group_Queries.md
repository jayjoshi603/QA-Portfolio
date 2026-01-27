Analytical queries using GROUP BY clauses in the sample database.

## Total customer as per country

```
SELECT COUNT(ID), Country
FROM Customer
GROUP BY Country;
```

*Results:*
| Count(ID) | Country |
|-----------|---------|
|2|	US      |         |
|2|	Afghanistan|         |
|1	|Australia|
|1	|India|
|1	|Singapore|

--------

## Maxium Orders as per City

```
SELECT max(Packages), City
FROM Orders
GROUP BY ID;
```

*Results:*

| Max(Packages) | City |
|-----------|---------|
|40|	new York      |         |
|30|	Kabul|         |
|20	|Kabul|
|10	|Sydney|
|10|Shenghai|
|2	|Delhi|

--------

## Group By with Join query

```
SELECT customer.city, COUNT(Orders.ID) AS Packages FROM Orders
LEFT JOIN orders ON customer.ID = orders.ID
GROUP BY City;
```

*Results:*

| ID | City | Orderid| Packages | 
|----|------|---------|----------|
|3|Kabul|3|30|
|4|New York|4|9|
|5|Delhi|5|11|
|6|Shenghai|6|13|
