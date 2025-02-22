# COMS 2132 Homework 1 -- Written Portion
## Rayan Hayle RAH2236

## 2.1 ) Arrange the following functions in increasing order of their asymptotic growth rate. Indicate it two functions grow at the same rate.

- Order of Growth	slowest to fastest:
O(1)	constant 
O(logb n)	logarithmic  
O(n)	linear 
O(n logb n)	
O(n²)	quadratic
O(n³)	cubic
O(c!)	exponential (for any c)

**-Answer slowest to fastest nd function growth:**
128 (Constant)
log N (Logarithmic)
N (Linear)
N + 1 (Same as N, Linear)
N² (Quadratic)
N³ (Cubic)
2ᴺ (Exponential)
3ᴺ (Exponential, faster than 2ᴺ)
4ᴺ (Exponential, faster than 3ᴺ)
N! (Factorial, fastest growth)

## 2.2) The first year, they required 2 sacks of grain. Each subsequent year, the tribute was squared. The second year, the vassals had to pay 4 sacks of grain, then 16, then 256, then 65536, ... 


### (a) What would the tribute be in year N?
 - Year 1: \( T(1) = 2 \)
- Year 2: \( T(2) = T(1)^{T(1)} = 2^2 = 4 \)
- Year 3: \( T(3) = T(2)^{T(2)} = 4^4 = 256 \)
- Year 4: \( T(4) = T(3)^{T(3)} = 256^{256} \)
   
  - The recursion tribe in N is:
      $$T(N) = T(N-1)^{T(N-1)} $$  
   
### (b) How many years would it take for the annual tribute payment to reach D sacks of grain?
 $$ D ≤ T(N) $$


## 2.3) The number of operations executed by algorithm A is 8 N log ⁡ N and the number of operations executed by algorithm B is 2 N 2 . Determine N 0 such that A is better than B for N ≥ N 0 . Show your solution path.
A is Ta(N) = 8 Nlog⁡ N
B is Tb(N) = 2N²
Goal: Ta(N) < Tb(N)
$$
  1. 8N logN < 2N²
  2. 8 logN < 2N -> divde N both sids
  3. 4 logN < N -> divde 2 both sids
  4. Set N = 25 and plug in 
  5. 12.8756 < 25 True 
  Algorithm A is better than Algorithm B
$$
