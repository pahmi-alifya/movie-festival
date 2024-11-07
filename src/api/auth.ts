export const postLogin = async (name: string, password: string) => {
  const response = await fetch(`http://localhost:3000/users`);
  const data = await response.json();

  const user = data.find(
    (u: any) => u.name === name && u.password === password
  );
  console.log("recon sini", user);
  return user;
};
