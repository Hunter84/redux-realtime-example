import { db } from "../../services/firebase";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({data: amount}), 500)
  });
}

export function updateCount(amount = 1) {
  return db.ref('timer').set({
    count: amount
  });
}
