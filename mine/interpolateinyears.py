import pandas as pd
import numpy as np

df = pd.read_csv('temperatur_ch.csv')

#print(df.head())
head = df

head = head.drop(columns=['djf','mam','jja','son','winter','summer'])
#print(head)

head = head.drop(columns=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'])
#print(head)
newdf = head.copy()

newdf['temperature'] = newdf['year']

newdf = newdf.drop(columns=['year'])
print(newdf)

for index, row in head.iterrows():
    #print(row['time'])
    for i in range(12):
        newdf = newdf.append({'time' : int(row['time']) + ((i+1)/12)} , ignore_index=True)

newdf = newdf.sort_values(['time'])

newdf['temperature'] = newdf['temperature'].interpolate(method='linear')
print(newdf) 



#long_head = head.melt(id_vars='time', var_name='month', value_name='temperature')
#long_head['datestring'] = long_head.apply(lambda row: str(int(row.time)) + '-' +str(row.month) , axis=1)
#long_head['date'] = pd.to_datetime(long_head['datestring'])
#long_head = long_head.drop(columns=['datestring','date'])
#long_head = long_head.sort_values(['date'])
#print(long_head)
newdf.to_csv('temperatur_ch_years_interpolated.csv', encoding='utf-8',index=False,header=True)
