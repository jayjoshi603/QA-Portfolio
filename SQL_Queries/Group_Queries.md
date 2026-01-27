Analytical queries using GROUP BY clauses in the sample database.

## Totle customer as per country

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
