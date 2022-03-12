const users = [
  { id: 0, name: "Hank", organization: 0 },
  { id: 1, name: "Abagnale", organization: 0 },
  { id: 3, name: "Frank", organization: 1 },
  { id: 4, name: "Abbey", organization: 1 },
  { id: 5, name: "Edward", organization: 2 },
  { id: 6, name: "Abel", organization: 2 },
  { id: 7, name: "Reuben", organization: 0 },
  { id: 8, name: "Abelson", organization: 1 }
];

const organizations = [
  { id: 0, name: "Accounting department" },
  { id: 1, name: "Development department" },
  { id: 2, name: "Sales department" }
];

const data = {
  "/users": users,
  "/organizations": organizations
};

function delay(val) {
  return new Promise((res, rej) => setTimeout(val ? res : rej, 500, val));
}

export function mockFetch(url) {
  const payload = data[url];

  return delay(payload);
}
