export async function request(data) {
  return new Promise((res, rej) => {
    if (data.comment === "reject") {
      return rej({ message: "you failed", response: { status: 400 } });
    }
    setTimeout(res, 1000, { id: Date.now(), ...data });
  });
}
