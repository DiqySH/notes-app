export const sayHello = (req, res) => {
  res.status(200).json({
    message: "Greetings, Diqy!",
  });
};
