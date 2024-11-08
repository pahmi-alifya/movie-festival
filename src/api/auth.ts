export const postLogin = async (name: string, password: string) => {
  const response = await fetch(`http://localhost:3000/users`);
  const data = await response.json();

  const user = data.find(
    (u: any) => u.name === name && u.password === password
  );

  return user;
};

export const postCreateUser = async (user: {
  name: string;
  password: string;
}) => {
  const response = await fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return { data, message: "Success" };
};

export const checkUser = async (name: string) => {
  const response = await fetch(`http://localhost:3000/users`);
  const data = await response.json();

  const user = data.find((u: any) => u.name === name);

  return user;
};
