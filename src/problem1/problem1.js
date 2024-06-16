const sum_to_n_a = (n) => {
  let sum = 0
  for (let i = 1; i <= n; i++) {
    sum += i
  }
  return sum
}

const sum_to_n_b = (n) => {
  return (n * (n + 1)) / 2
}

const sum_to_n_c = (n) => {
  if (n <= 1) return n
  return n + sum_to_n_c(n - 1)
}

const test = () => {
  console.log(sum_to_n_a(100))
  console.log(sum_to_n_b(100))
  console.log(sum_to_n_c(100))
}

test()
