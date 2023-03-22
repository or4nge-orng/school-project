import sys

def my_print(str):
    print('python-output(' + str + ')')


# CODE


while True:
    line = sys.stdin.readline()

    my_print(line)
    exit(0)