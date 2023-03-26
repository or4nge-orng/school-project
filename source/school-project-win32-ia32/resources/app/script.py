import sys
import sqlite3

db = sqlite3.connect('products.db')
cur = db.cursor()

result = 0

type_data = sys.argv[1]
out_data = sys.argv[2]  
in_val = sys.argv[3]

if type_data == 'error':
    print("error", flush=True)
else:
    cur.execute(f'SELECT {type_data} FROM products WHERE type = ?', (out_data,))
    weight = cur.fetchone()
    weight = weight[0]

    if (in_val.isdigit()):
        out_val = int(in_val)
        result = out_val / weight
        print(round(result, 1), flush=True)
    else:
        print('error')