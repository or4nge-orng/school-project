import sys
#import sqlite3

#db = sqlite3.connect('products.db')
#cur = db.cursor()

tbs = {
    "salt": 25,
    "flour": 10,
    "sugar": 25,
    "sugar_dust": 25
}
tsp = {
    "salt": 8,
    "flour": 3,
    "sugar": 8,
    "sugar_dust": 10
}
gls = {
    "salt": 240,
    "flour": 130,
    "sugar": 180,
    "sugar_dust": 140
}

result = 0

type_data = sys.argv[1]
out_data = sys.argv[2]  
in_val = sys.argv[3]

if type_data == 'error':
    print("error", flush=True)
else:
    #cur.execute(f'SELECT {type_data} FROM products WHERE type = ?', (out_data,))
    #weight = cur.fetchone()
    #weight = weight[0]

    if (in_val.isdigit()):
        out_val = int(in_val)
        if out_data == 'tbs':
            weight = tbs[type_data]
            result = out_val / weight
            print(round(result, 1), flush=True)
        elif out_data == 'tsp':
            weight = tsp[type_data]
            result = out_val / weight
            print(round(result, 1), flush=True)
        elif out_data == 'gls':
            weight = gls[type_data]
            result = out_val / weight
            print(round(result, 1), flush=True)
        else:
            print('error', flush=True)
    else:
        print('error', flush=True)