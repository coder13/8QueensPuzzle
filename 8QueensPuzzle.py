import sys
import math
import random

def rnd(min = 0, max = 10):
	return math.floor(random.random()*(max-min)-min)

#combines a list of numbers into a single number
def combine(a,b):
        c = 0
        for i in range(len(a)-1,-1,-1):
                c |= a[i]<<(b*i)
        return c

#validates an entire grid
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

#quickly validates an array of x coords
def val(g):
        for i in range(len(g)-1):
                for j in range(i+1, len(g)):
                        if abs(g[j]-g[i]) == abs(j-i):
                                return False
        return True

#generates a random almost valid solution to be quickly validated 
def perm(n=8):
        a = []
        c=0
        while len(a)<n:
                r = rnd(0,n)
                while r in a:
                        r = rnd(0,n)
                a.append(r)
        b = ['0' * ((n-1)-i) + str(10**i) for i in a]
        b = [int(x) for l in b for x in l]
        c = combine(a, math.ceil(math.log(n,2)))
        return (a,b,c)
a = []

def test():
        n = 8
        while len(a) < 95:
                grid = perm(n)
                while not Optimized_val(grid[0]):
                    grid = perm(n)
                b = True
                for i in a:
                        if grid[2] == i[2]: 
                                b = False
                                break
                if b:
                        a.append(grid)
                        print(len(a))

if __name__ == "__main__":
        n = 8
        if len(sys.argv)>1:
                n = int(sys.argv[1])
        grid = perm(n)
        while not val(grid[0]):
                grid = perm(n)

        print('id: ' + str(grid[2]))
        for i in range(n):
                print(str(grid[1][i*n:i*n+n]).replace('1', '@').replace('0','#').replace(', ', '')[1:n+1])
