import pandas as pd
import numpy as np

df = pd.read_csv('temperatur_ch.csv')

#print(df.head())
head = df

head = head.drop(columns=['djf','mam','jja','son','winter','summer','year'])
#print(head)

long_head = head.melt(id_vars='time', var_name='month', value_name='temperature')
long_head['datestring'] = long_head.apply(lambda row: str(int(row.time)) + '-' +str(row.month) , axis=1)
long_head['date'] = pd.to_datetime(long_head['datestring'])
long_head = long_head.sort_values(['date'])
long_head = long_head.drop(columns=['datestring','date'])
print(long_head)
long_head.to_csv('temperatur_ch_long.csv', encoding='utf-8',index=False,header=True)
