module.exports = Object.freeze({
  FREE: {
    name: "FREE",
    maxActiveGoals: 1,
    price: 0, //in $s
    isUnlimited: true,
  },
  MONTHLY: {
    name: "MONTHLY",
    maxActiveGoals: 5,
    price: 4.99, //in $s
    isUnlimited: false,
  },
});
