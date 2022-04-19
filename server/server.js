import cors from "cors";
import nodemailer from "nodemailer";
import createServer from "./app.js";

const PORT = process.env.PORT || 5000;

const app = createServer();

const printedSummery = (checkoutData, productData) => {
  let text = `<p> Total amount - ${checkoutData.totalPrice} Rs</p>
  <p> Shipping address - ${checkoutData.shippingDetails[0].address} Rs</p>
  <p> Payment method - ${checkoutData.paymentMethod} Rs</p>
  <hr>
  <h3> Products </h3>
  <table>
  <tr>
    <th>Product Name </th>
    <th>Price </th>
    <th>Qty </th>
    <th>Total price </th>
    </tr>
  `;

  productData.map((productData) => {
    text =
      text +
      `</tr>
      <td>${productData.prodectName}</td>
      <td>${productData.singleProductPrice}</td>
      <td>${productData.qty}</td>
      <td>${productData.prize}</td>
      </tr>
      <br>
    `;
  });
  return text + "</table>";
};
// mail invoice
app.post("/api/send_mail", cors(), async (req, res) => {
  let { checkOutData, products } = req.body;
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: checkOutData.shippingDetails[0].mailAddress,
    subject: "Check out details",
    html: `<html>
              <head>
              <style>
              table, th, td {
                border: 1px solid;
                width : 50%
              }
              </style>
              </head>

              <h3>Check out Summery Details</h3>

              <div> ${printedSummery(checkOutData, products)} </div>

              <p>Thank you for purches</p>
           </html>`,
  });
});

export const servers = app;

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
