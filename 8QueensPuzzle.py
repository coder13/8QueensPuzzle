import math
import random

def rnd(min = 0, max = 10):
	return math.floor(random.random()*(max-min)-min)
    
def validate(g):
	for i in range(8):
		if sum(g[i*8 : i*8+8]) != 1:
			return False
		if sum(g[i : 64 : 8]) != 1:
			return False
	for i in range(7):
		if sum(g[i*8 : 64 : 9]) > 1:
			return False
		if sum(g[7+i*8:64 : 7]) > 1:
			return False
		if sum(g[i : 8*(8-i+1) : 9]) > 1:
			return False
		if sum(g[(7-i) : 8*(8-i+1) : 7]) > 1:
			return False
	return True

def perm():
	a = []
	while len(a)<8:
		r = 2 ** rnd(0,8)
		while r in a:
			r = 2 ** rnd(0,8)
		a.append(r)
	a = [('0' * (8-len(str(bin(i))[2:]))) + str(bin(i))[2:] for i in a]
	a = [int(x) for l in a for x in l]
	return a

grid = perm()
while not validate(grid):
    grid = perm()

for i in range(8):
    print(grid[i*8:i*8+8])
